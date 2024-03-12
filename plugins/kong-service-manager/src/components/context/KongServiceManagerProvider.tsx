import { alertApiRef, errorApiRef, useApi } from "@backstage/core-plugin-api";
import React, { ReactNode, useEffect } from "react";
import { useState } from "react";
import { kongServiceManagerApiRef } from "../../api";
import { KongServiceManagerContext } from "./KongServiceManagerContext";
import { AssociatedPluginsResponse, CreatePlugin, PluginCard, PluginsPerCategoryType, RoutesResponse, ServiceInfoResponse } from "../../utils/types";
// import PluginsInfoData from '../../data/plugins.json';
import { KongPluginsCategoriesEnum } from "../../utils/enums/KongPluginCategories";
import { PluginsInfoData } from "../../data/data";

interface KongServiceManagerProviderProps {
    children : ReactNode
};

export const KongServiceManagerProvider: React.FC<KongServiceManagerProviderProps> = ({children}) => {

  const [instance, setInstance] = useState<string>("");
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

  const setInstanceState = (instanceState: string) => {
    setInstance(instanceState);
  }

  const handleToggleDrawer = () => {
    if(!openDrawer) setConfigState(null)
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

  const listAllEnabledPlugins = async ()=>{
    try{
        const plugins = await api.getEnabledPlugins(instance!);
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

  const listAssociatedPlugins = async (serviceIdOrName:string)=>{
    try{
        const plugins = await api.getServiceAssociatedPlugins(serviceIdOrName,instance!);
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

  const getServiceDetails = async (serviceIdOrName: string) =>{
    try{ 
      const details = await api.getServiceInfo(serviceIdOrName, instance!);
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

  const getRoutesList = async (serviceIdOrName: string) => {
    try{ 
      const routes = await api.getRoutesFromService(serviceIdOrName, instance!);
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

  const getPluginFields = async (pluginName: string) => {
    try{ 
      const fields = await api.getPluginFields(pluginName, instance!);
      if(fields) {
        return fields
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null
    }
  }

  const enablePlugin = async (serviceIdOrName: string, config: CreatePlugin) => {
    try{ 
      const response = await api.createServicePlugin(serviceIdOrName, config,instance!);
      if(response) {
         await listAssociatedPlugins(serviceIdOrName);
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

  const editPlugin = async (serviceIdOrName: string, pluginId: string,config: CreatePlugin) => {
    try{ 
      const response = await api.editServicePlugin(serviceIdOrName, pluginId, config, instance!);
      if(response) {
        await listAssociatedPlugins(serviceIdOrName);
        return alertApi.post({
          message: 'Plugin successfully edited!',
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

  const disablePlugin = async (serviceIdOrName: string, pluginId: string) => {
    try{ 
      const response = await api.removeServicePlugin(serviceIdOrName, pluginId,instance!);
      if(response && allAssociatedPlugins) {
          const newAssociatedPluginsData = allAssociatedPlugins.filter(p => p.id !== pluginId && p);
            setAllAssociatedPlugins(newAssociatedPluginsData);
            await listAllEnabledPlugins();
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
        instance,
        setInstanceState,
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