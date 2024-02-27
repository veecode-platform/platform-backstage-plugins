import { errorApiRef, useApi } from "@backstage/core-plugin-api";
import React, { ReactNode } from "react";
import { useState } from "react";
import { kongServiceManagerApiRef } from "../../api";
import { KongServiceManagerContext } from "./KongServiceManagerContext";
import { ServiceInfoResponse } from "../../utils/types";

interface KongServiceManagerProviderProps {
    children : ReactNode
};

export const KongServiceManagerProvider: React.FC<KongServiceManagerProviderProps> = ({children}) => {

  const [allPluginsEnabled, setAllPluginsEnabled] = useState<string[]|null>(null);
  const [serviceDetails, setServiceDetails] = useState<ServiceInfoResponse|null>(null);
  const api = useApi(kongServiceManagerApiRef);
  const errorApi = useApi(errorApiRef);

  const listAllPluginsEnabled = async (proxyPath:string)=>{
    try{
        const plugins = await api.getEnabledPlugins(proxyPath);
        if (plugins !== null && plugins !== undefined){
            setAllPluginsEnabled(plugins);
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

  return(
    <KongServiceManagerContext.Provider
        value={{
            allPluginsEnabled,
            listAllPluginsEnabled,
            getServiceDetails,
            serviceDetails
        }}
     >
        {children}
    </KongServiceManagerContext.Provider>
  )

}