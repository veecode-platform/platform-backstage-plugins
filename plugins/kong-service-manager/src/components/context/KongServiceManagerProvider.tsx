import { alertApiRef, errorApiRef, useApi } from "@backstage/core-plugin-api";
import React, { ReactNode } from "react";
import { useState } from "react";
import { kongServiceManagerApiRef } from "../../api";
import { KongServiceManagerContext } from "./KongServiceManagerContext";
import { AssociatedPluginsResponse, CreatePlugin, RoutesResponse, ServiceInfoResponse } from "../../utils/types";

interface KongServiceManagerProviderProps {
    children : ReactNode
};

export const KongServiceManagerProvider: React.FC<KongServiceManagerProviderProps> = ({children}) => {

  const [allEnabledPlugins, setAllEnabledPlugins] = useState<string[]|null>(null);
  const [allAssociatedPlugins, setAllAssociatedPlugins] = useState<AssociatedPluginsResponse[]|null>(null);
  const [allRoutes, setAllRoutes] = useState<RoutesResponse[]|null>(null);
  const [serviceDetails, setServiceDetails] = useState<ServiceInfoResponse|null>(null);
  const api = useApi(kongServiceManagerApiRef);
  const errorApi = useApi(errorApiRef);
  const alertApi = useApi(alertApiRef);

  const listAllEnabledPlugins = async (proxyPath:string)=>{
    try{
        const plugins = await api.getEnabledPlugins(proxyPath);
        if (plugins !== null && plugins !== undefined){
            setAllEnabledPlugins(plugins);
            return plugins;
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
      if(response) {
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

  return (
    <KongServiceManagerContext.Provider
      value={{
        listAllEnabledPlugins,
        allEnabledPlugins,
        getServiceDetails,
        serviceDetails,
        getRoutesList,
        allRoutes,
        listAssociatedPlugins,
        allAssociatedPlugins,
        getPluginFields,
        enablePlugin,
        disablePlugin
      }}
    >
      {children}
    </KongServiceManagerContext.Provider>
  );

}