/* eslint-disable @backstage/no-undeclared-imports */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { alertApiRef, errorApiRef, useApi } from "@backstage/core-plugin-api";
import React, { ReactNode, useEffect } from "react";
import { useState } from "react";
import { kongServiceManagerApiRef } from "../../api";
import { KongServiceManagerContext } from "./KongServiceManagerContext";
import { AssociatedPluginsResponse, CreatePlugin, PluginPerCategory, PluginCard, RoutesResponse, ServiceInfoResponse } from "../../utils/types";
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotation } from "../../hooks";

interface KongServiceManagerProviderProps {
    children : ReactNode
};

export const KongServiceManagerProvider: React.FC<KongServiceManagerProviderProps> = ({children}) => {

  const { entity } = useEntity();
  const { serviceName, kongInstances } = useEntityAnnotation(entity);
  const [instance, setInstance] = useState<string>(kongInstances ? kongInstances[0] : "");
  const [allAssociatedPlugins, setAllAssociatedPlugins] = useState<AssociatedPluginsResponse[]|null>(null);
  const [allRoutes, setAllRoutes] = useState<RoutesResponse[]|null>(null);
  const [serviceDetails, setServiceDetails] = useState<ServiceInfoResponse|null>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedPlugin, setSelectedPlugin] = useState<PluginCard|null>(null);
  const [ associatedPluginsName, setAssociatedPluginsName] = useState<string[]|[]>([]);
  const [pluginsPerCategory, setPluginsPerCategory] = useState<PluginPerCategory[]|[]>([]); 
  const [configState, setConfigState ] = useState<any|null>(null);
  const [searchTerm, setSeachTerm] = useState<string>("")
  const api = useApi(kongServiceManagerApiRef);
  const errorApi = useApi(errorApiRef);
  const alertApi = useApi(alertApiRef);


  const setInstanceState = (instanceState: string) => {
    setInstance(instanceState);
  }

  const setSearchState = (search: string) => {
    setSeachTerm(search);
  }

  const handleToggleDrawer = ()  => {
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

  const listAllEnabledPlugins = async () => {
    try{
        if(instance && serviceName){
            const plugins = await api.getAllEnabledPlugins(serviceName,instance,searchTerm);
            setPluginsPerCategory(plugins);
          }       
      }
     catch(e:any){
      errorApi.post(e);
    }
  }

  const listAssociatedPlugins = async () =>{
    try{
      if(instance && serviceName){
        const plugins = await api.getServiceAssociatedPlugins(serviceName,instance);
        if (plugins !== null && plugins !== undefined) setAllAssociatedPlugins(plugins);
      }
    }
    catch(e:any){
        errorApi.post(e);
    }
  }

  const getServiceDetails = async () =>{
    try{ 
      if(instance && serviceName){
          const details = await api.getServiceInfo(serviceName, instance);
          if(details) setServiceDetails(details);
        }
    } catch(e:any){
      errorApi.post(e);
    }
  }

  const getRoutesList = async () => {
    try{ 
      if(instance && serviceName){
        const routes = await api.getRoutesFromService(serviceName, instance);
        if(routes) setAllRoutes(routes);
      }
    } catch(e:any){
      errorApi.post(e);
    }
  }

  const getPluginFields = async (pluginName: string) => {
    try{ 
      if(instance){
        const fields = await api.getPluginFields(pluginName, instance);
        if(fields) {
          return fields
        }
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null
    }
  }

  const enablePlugin = async (config: CreatePlugin) => {
    try{ 
      if(instance && serviceName){
        const response = await api.createServicePlugin(serviceName, config,instance);
        if(response) {
           await listAssociatedPlugins();
           return alertApi.post({
            message: 'Plugin successfully enabled!',
            severity: 'success',
            display: 'transient',
          });
        }
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null
    }
  }

  const editPlugin = async (pluginId: string,config: CreatePlugin) => {
    try{ 
      if(instance && serviceName){
        const response = await api.editServicePlugin(serviceName, pluginId, config, instance);
        if(response) {
          await listAssociatedPlugins();
          return alertApi.post({
            message: 'Plugin successfully edited!',
            severity: 'success',
            display: 'transient',
         });
        }
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null
    }
  }

  const disablePlugin = async (pluginId: string) => {
    try{ 
      if(instance && serviceName){
        const response = await api.removeServicePlugin(serviceName, pluginId,instance);
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

  useEffect(()=>{
   if(serviceName) listAllEnabledPlugins()
  },[searchTerm])

  useEffect(()=>{
    if(instance){
      getServiceDetails();
      listAllEnabledPlugins();
      getRoutesList();
    }
  },[instance])

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
        setConfigState,
        setSearchState
      }}
    >
      {children}
    </KongServiceManagerContext.Provider>
  );

}