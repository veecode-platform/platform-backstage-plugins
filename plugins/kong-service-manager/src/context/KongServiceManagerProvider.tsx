/* eslint-disable @backstage/no-undeclared-imports */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { alertApiRef, errorApiRef, useApi } from "@backstage/core-plugin-api";
import React, { ReactNode, useContext, useEffect } from "react";
import { useState } from "react";
import { kongServiceManagerApiRef } from "../api";
import { KongServiceManagerContext } from "./KongServiceManagerContext";
import { AssociatedPluginsResponse, CreatePlugin, PluginPerCategory, PluginCard, CreateRoute } from "../utils/types";
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotation } from "../hooks";

interface KongServiceManagerProviderProps {
    children : ReactNode
};

export const KongServiceManagerProvider: React.FC<KongServiceManagerProviderProps> = ({children}) => {

  const { entity } = useEntity();
  const { serviceName, workspace,kongInstances } = useEntityAnnotation(entity);
  const [instance, setInstance] = useState<string>(kongInstances ? kongInstances[0] : "");
  const [allAssociatedPlugins, setAllAssociatedPlugins] = useState<AssociatedPluginsResponse[]|null>(null);
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
        if(instance && serviceName && workspace){
            const plugins = await api.getAllEnabledPlugins(workspace,serviceName,instance,searchTerm);
            if(plugins) {
              setPluginsPerCategory(plugins)
              return plugins
            }
          }
          return null       
      }
     catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const listAssociatedPlugins = async () =>{
    try{
      if(instance && serviceName && workspace){
        const plugins = await api.getServiceAssociatedPlugins(workspace,serviceName,instance);
        if (plugins !== null && plugins !== undefined) setAllAssociatedPlugins(plugins);
      }
    }
    catch(e:any){
        errorApi.post(e);
    }
  }

  const getServiceDetails = async () =>{
    try{ 
      if(instance && serviceName && workspace){
          const details = await api.getServiceInfo(workspace,serviceName, instance);
          if(details) return details;
        }
        return null;
    } catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const getRoutesList = async () => {
    try{ 
      if(instance && serviceName && workspace){
        const routes = await api.getRoutesFromService(workspace,serviceName, instance);
        if(routes) return routes;
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const getRoute = async (routeNameOrId: string) => {
    try{ 
      if(instance && serviceName && workspace){
        const route = await api.getRouteFromService(workspace,serviceName,routeNameOrId,instance);
        if(route) return route;
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const createRoute = async (config: CreateRoute) => {
    try {
      if(instance && serviceName && workspace){
        const response = await api.createRouteFromService(workspace, serviceName, config, instance);
        if(response) {
           await getRoutesList();
           return alertApi.post({
            message: 'Route successfully create!',
            severity: 'success',
            display: 'transient',
          });
        }
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const editRoute = async (routeNameOrId: string, config: CreateRoute) => {
    try {
      if(instance && serviceName && workspace){
        const response = await api.editRouteFromService(workspace, serviceName, routeNameOrId, config, instance);
        if(response) {
           await getRoutesList();
           return alertApi.post({
            message: 'Route successfully update!',
            severity: 'success',
            display: 'transient',
          });
        }
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const removeRoute = async (routeNameOrId: string) => {
    try{ 
      if(instance && serviceName && workspace){
        const response = await api.removeRouteFromService(workspace,serviceName,routeNameOrId,instance);
        if(response && allAssociatedPlugins) {
          await getRoutesList();
          return alertApi.post({
            message: 'Route successfully delete!',
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

  const getPluginFields = async (pluginName: string) => {
    try{ 
      if(instance && workspace){
        const fields = await api.getPluginFields(workspace, pluginName, instance);
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
      if(instance && serviceName && workspace){
        const response = await api.createServicePlugin(workspace,serviceName, config,instance);
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
      if(instance && serviceName && workspace){
        const response = await api.editServicePlugin(workspace,serviceName, pluginId, config, instance);
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
      if(instance && serviceName && workspace){
        const response = await api.removeServicePlugin(workspace,serviceName, pluginId,instance);
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
        getRoutesList,
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
        setSearchState,
        searchTerm,
        createRoute,
        editRoute,
        removeRoute,
        getRoute
      }}
    >
      {children}
    </KongServiceManagerContext.Provider>
  );

}


export const useKongServiceManagerContext = () => useContext(KongServiceManagerContext)