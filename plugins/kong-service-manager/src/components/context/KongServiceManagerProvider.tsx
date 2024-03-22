/* eslint-disable react-hooks/exhaustive-deps */
import { alertApiRef, errorApiRef, useApi } from "@backstage/core-plugin-api";
import React, { ReactNode, useEffect } from "react";
import { useState } from "react";
import { kongServiceManagerApiRef } from "../../api";
import { KongServiceManagerContext } from "./KongServiceManagerContext";
import { AssociatedPluginsResponse, CreatePlugin, PluginPerCategory, PluginCard, RoutesResponse, ServiceInfoResponse } from "../../utils/types";

interface KongServiceManagerProviderProps {
    children : ReactNode
};

export const KongServiceManagerProvider: React.FC<KongServiceManagerProviderProps> = ({children}) => {

  const [instance, setInstance] = useState<string>("");
  const [serviceNameOrIdState, setServiceNameOrIdState ] = useState<string>("");
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

  const setServiceNameOrIdData = (serviceNameOrId:string)  =>{
    setServiceNameOrIdState(serviceNameOrId)
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

  const listAllEnabledPlugins = async (serviceIdOrName:string) => {
    try{
        if(instance && serviceIdOrName){
            const plugins = await api.getNewEnabledPlugins(serviceIdOrName,instance,searchTerm);
            setPluginsPerCategory(plugins);
          }       
      }
     catch(e:any){
      errorApi.post(e);
    }
  }

  const listAssociatedPlugins = async (serviceIdOrName:string) =>{
    try{
      if(instance && serviceIdOrName){
        const plugins = await api.getServiceAssociatedPlugins(serviceIdOrName,instance);
        if (plugins !== null && plugins !== undefined) setAllAssociatedPlugins(plugins);
      }
    }
    catch(e:any){
        errorApi.post(e);
    }
  }

  const getServiceDetails = async (serviceIdOrName: string) =>{
    try{ 
      if(instance && serviceIdOrName){
          const details = await api.getServiceInfo(serviceIdOrName, instance);
          if(details) setServiceDetails(details);
        }
    } catch(e:any){
      errorApi.post(e);
    }
  }

  const getRoutesList = async (serviceIdOrName: string) => {
    try{ 
      if(instance && serviceIdOrName){
        const routes = await api.getRoutesFromService(serviceIdOrName, instance);
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

  const enablePlugin = async (serviceIdOrName: string, config: CreatePlugin) => {
    try{ 
      if(instance && serviceIdOrName){
        const response = await api.createServicePlugin(serviceIdOrName, config,instance);
        if(response) {
           await listAssociatedPlugins(serviceIdOrName);
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

  const editPlugin = async (serviceIdOrName: string, pluginId: string,config: CreatePlugin) => {
    try{ 
      if(instance && serviceIdOrName){
        const response = await api.editServicePlugin(serviceIdOrName, pluginId, config, instance);
        if(response) {
          await listAssociatedPlugins(serviceIdOrName);
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

  const disablePlugin = async (serviceIdOrName: string, pluginId: string) => {
    try{ 
      if(instance && serviceIdOrName){
        const response = await api.removeServicePlugin(serviceIdOrName, pluginId,instance);
        if(response && allAssociatedPlugins) {
          const newAssociatedPluginsData = allAssociatedPlugins.filter(p => p.id !== pluginId && p);
            setAllAssociatedPlugins(newAssociatedPluginsData);
            await listAllEnabledPlugins(serviceIdOrName);
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
   if(serviceNameOrIdState) listAllEnabledPlugins(serviceNameOrIdState)
  },[searchTerm])

  return (
    <KongServiceManagerContext.Provider
      value={{
        instance,
        setInstanceState,
        setServiceNameOrIdData,
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