import { errorApiRef, useApi } from "@backstage/core-plugin-api";
import React, { ReactNode } from "react";
import { useState } from "react";
import { kongServiceManagerApiRef } from "../../api";
import { KongServiceManagerContext } from "./KongServiceManagerContext";

interface KongServiceManagerProviderProps {
    children : ReactNode
};

export const KongServiceManagerProvider: React.FC<KongServiceManagerProviderProps> = ({children}) => {

  const [allPluginsEnabled, setAllPluginsEnabled] = useState<string[]|null>(null);
  const api = useApi(kongServiceManagerApiRef);
  const errorApi = useApi(errorApiRef);

  const listAllPluginsEnabled = async ()=>{
    try{
        const plugins = await api.getEnabledPlugins();
        if (plugins !== null && plugins !== undefined){
            return setAllPluginsEnabled(plugins)
        }
        return []
    }
    catch(e:any){
        errorApi.post(e);
        return []
    }
  }

  return(
    <KongServiceManagerContext.Provider
        value={{
            allPluginsEnabled,
            listAllPluginsEnabled
        }}
     >
        {children}
    </KongServiceManagerContext.Provider>
  )

}