import { errorApiRef, useApi } from "@backstage/core-plugin-api";
import React, { ReactNode } from "react";
import { useState } from "react";
import { kongServiceManagerApiRef } from "../../api";
import { KongServiceManagerContext } from "./KongServiceManagerContext";
import { AssociatedPluginsResponse, RoutesResponse, ServiceInfoResponse } from "../../utils/types";

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
      const details = await api.getServiceInfo(serviceIdOrName as string, proxyPath as string);
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
      const routes = await api.getRoutesFromService(serviceIdOrName as string, proxyPath as string);
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
      }}
    >
      {children}
    </KongServiceManagerContext.Provider>
  );

}