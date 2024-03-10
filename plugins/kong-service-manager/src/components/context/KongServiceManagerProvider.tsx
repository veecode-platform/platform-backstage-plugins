import { alertApiRef, errorApiRef, useApi } from "@backstage/core-plugin-api";
import React, { ReactNode, useEffect } from "react";
import { useState } from "react";
import { kongServiceManagerApiRef } from "../../api";
import { KongServiceManagerContext } from "./KongServiceManagerContext";
import { AssociatedPluginsResponse, CreatePlugin, PluginCard, PluginsPerCategoryType, RoutesResponse, ServiceInfoResponse } from "../../utils/types";
import PluginsInfoData from '../../data/plugins.json';
import { KongPluginsCategoriesEnum } from "../../utils/enums/KongPluginCategories";

interface KongServiceManagerProviderProps {
    children : ReactNode
};

export const KongServiceManagerProvider: React.FC<KongServiceManagerProviderProps> = ({children}) => {

  const [allAssociatedPlugins, setAllAssociatedPlugins] = useState<AssociatedPluginsResponse[]|null>(null);
  const [allRoutes, setAllRoutes] = useState<RoutesResponse[]|null>(null);
  const [serviceDetails, setServiceDetails] = useState<ServiceInfoResponse|null>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedPlugin, setSelectedPlugin] = useState<PluginCard|null>(null);
  const [ associatedPluginsName, setAssociatedPluginsName] = useState<string[]|[]>([]);
  const [pluginsPerCategory, setPluginsPerCategory] = useState<PluginsPerCategoryType>({
    ai: { plugins: [] },
    auth: { plugins: [] },
    security: { plugins: [] },
    trafficControl: { plugins: [] },
    serverless: { plugins: [] },
    analitics: { plugins: [] },
    transformations: { plugins: [] },
    logging: { plugins: [] },
  }); 
  const [configState, setConfigState ] = useState<any|null>(null);
  const api = useApi(kongServiceManagerApiRef);
  const errorApi = useApi(errorApiRef);
  const alertApi = useApi(alertApiRef);

  const handleToggleDrawer = () => {
    if(!openDrawer) setConfigState(null);
    setOpenDrawer(!openDrawer);
  }

  const setPluginState = (data: PluginCard ) => setSelectedPlugin(data);

  const getAssociatedPuginsName = ( pluginsParams : AssociatedPluginsResponse[] ) => {
    const newData : string[] = []
    pluginsParams.map(p => {
      newData.push(p.name)
    })
    setAssociatedPluginsName(newData)
};

  const listAllEnabledPlugins = async (proxyPath:string)=>{
    try{
        const plugins = await api.getEnabledPlugins(proxyPath);
        if (plugins !== null && plugins !== undefined){

            const pluginsData: PluginsPerCategoryType = { 
              ai: { plugins: [] },
              auth: { plugins: [] },
              security: { plugins: [] },
              trafficControl: { plugins: [] },
              serverless: { plugins: [] },
              analitics: { plugins: [] },
              transformations: { plugins: [] },
              logging: { plugins: [] },
            };

            plugins.forEach(pluginName => {
              PluginsInfoData.categories.forEach(c => {
                const foundPlugin = c.plugins.find(i => i.slug === pluginName);
        
                if (foundPlugin) {
                  const isAssociated = (associatedPluginsName && associatedPluginsName.length >= 1) && associatedPluginsName.find( i => i === pluginName);
                  const newPlugin = {
                    name: foundPlugin.name,
                    slug: foundPlugin.slug,
                    associated: isAssociated ? true : false,
                    image: foundPlugin.image,
                    tags: foundPlugin.tags,
                    description: foundPlugin.description,
                  };
        
                  switch (c.category) {
                    case KongPluginsCategoriesEnum.ai:
                      (pluginsData.ai.plugins as PluginCard[]).push(newPlugin);
                      return;
                    case KongPluginsCategoriesEnum.analitics:
                      (pluginsData.analitics.plugins as PluginCard[]).push(newPlugin);
                      return;
                    case KongPluginsCategoriesEnum.auth:
                      (pluginsData.auth.plugins as PluginCard[]).push(newPlugin);
                      return;
                    case KongPluginsCategoriesEnum.logging:
                      (pluginsData.logging.plugins as PluginCard[]).push(newPlugin);
                      return;
                    case KongPluginsCategoriesEnum.security:
                      (pluginsData.security.plugins as PluginCard[]).push(newPlugin);
                      return;
                    case KongPluginsCategoriesEnum.serverless:
                      (pluginsData.serverless.plugins as PluginCard[]).push(newPlugin);
                      return;
                    case KongPluginsCategoriesEnum.trafficControl:
                      (pluginsData.trafficControl.plugins as PluginCard[]).push(newPlugin);
                      return;
                    case KongPluginsCategoriesEnum.transformations:
                      (pluginsData.transformations.plugins as PluginCard[]).push(newPlugin);
                      return;
                    default:
                      return;
                  }
                }
              });
            });

            setPluginsPerCategory(prev => ({ ...prev, ...pluginsData }));
            return pluginsData;
        
        }
        return []
    }
    catch(e:any){
        errorApi.post(e);
        return []
    }
  }

  const listAssociatedPlugins = async (serviceIdOrName:string,proxyPath:string)=>{
    try{
        const plugins = await api.getServiceAssociatedPlugins(serviceIdOrName,proxyPath);
        if (plugins !== null && plugins !== undefined){
          setAllAssociatedPlugins(plugins);
          return plugins;
        }
        return []
    }
    catch(e:any){
        errorApi.post(e);
        return []
    }
  }

  const getServiceDetails = async (serviceIdOrName: string, proxyPath: string) =>{
    try{ 
      const details = await api.getServiceInfo(serviceIdOrName, proxyPath);
      if(details) {
        setServiceDetails(details);
        return details
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null
    }
  }

  const getRoutesList = async (serviceIdOrName: string, proxyPath: string) => {
    try{ 
      const routes = await api.getRoutesFromService(serviceIdOrName, proxyPath);
      if(routes) {
        setAllRoutes(routes);
        return routes
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null
    }
  }

  const getPluginFields = async (pluginName: string, proxyPath: string) => {
    try{ 
      const fields = await api.getPluginFields(pluginName, proxyPath);
      if(fields) {
        return fields
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null
    }
  }

  const enablePlugin = async (serviceIdOrName: string, config: CreatePlugin, proxyPath: string) => {
    try{ 
      const response = await api.createServicePlugin(serviceIdOrName, config,proxyPath);
      if(response) {
         await listAssociatedPlugins(serviceIdOrName,proxyPath);
         return alertApi.post({
          message: 'Plugin successfully enabled!',
          severity: 'success',
          display: 'transient',
      });
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null
    }
  }

  const editPlugin = async (serviceIdOrName: string, config: CreatePlugin, proxyPath: string) => {
    try{ 
      const response = await api.editServicePlugin(serviceIdOrName, config,proxyPath);
      if(response) {
        return alertApi.post({
          message: 'Plugin successfully enabled!',
          severity: 'success',
          display: 'transient',
      });
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null
    }
  }

  const disablePlugin = async (serviceIdOrName: string, pluginId: string, proxyPath: string) => {
    try{ 
      const response = await api.removeServicePlugin(serviceIdOrName, pluginId,proxyPath);
      if(response && allAssociatedPlugins) {
          const newAssociatedPluginsData = allAssociatedPlugins.filter(p => p.id !== pluginId && p);
            setAllAssociatedPlugins(newAssociatedPluginsData);
            await listAllEnabledPlugins(proxyPath);
            return alertApi.post({
              message: 'Plugin successfully disabled',
              severity: 'success',
              display: 'transient',
          });   
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null
    }
  }

  useEffect(()=>{
    if(allAssociatedPlugins){
      getAssociatedPuginsName(allAssociatedPlugins);
    }
  },[allAssociatedPlugins]);

  return (
    <KongServiceManagerContext.Provider
      value={{
        listAllEnabledPlugins,
        getServiceDetails,
        serviceDetails,
        getRoutesList,
        allRoutes,
        listAssociatedPlugins,
        allAssociatedPlugins,
        associatedPluginsName,
        getPluginFields,
        enablePlugin,
        disablePlugin,
        handleToggleDrawer,
        openDrawer,
        setPluginState,
        selectedPlugin,
        editPlugin,
        pluginsPerCategory,
        configState,
        setConfigState
      }}
    >
      {children}
    </KongServiceManagerContext.Provider>
  );

}