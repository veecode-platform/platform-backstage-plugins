import React from "react";
import { alertApiRef, errorApiRef, useApi } from "@backstage/core-plugin-api";
import { kongServiceManagerApiRef } from "../api";
import { KongServiceManagerContext } from "./KongServiceManagerContext";
import { AssociatedPluginsResponse, CreatePlugin, PluginPerCategory, PluginCard, CreateRoute } from "../utils/types";
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotation } from "../hooks";

interface KongServiceManagerProviderProps {
    children : React.ReactNode
};

export const KongServiceManagerProvider: React.FC<KongServiceManagerProviderProps> = ({children}) => {

  const [allAssociatedPlugins, setAllAssociatedPlugins] = React.useState<AssociatedPluginsResponse[]|null>(null);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [selectedPlugin, setSelectedPlugin] = React.useState<PluginCard|null>(null);
  const [ associatedPluginsName, setAssociatedPluginsName] = React.useState<string[]|[]>([]);
  const [pluginsPerCategory, setPluginsPerCategory] = React.useState<PluginPerCategory[]|[]>([]); 
  const [configState, setConfigState ] = React.useState<any|null>(null);
  const [searchTerm, setSeachTerm] = React.useState<string>("");
  const { entity } = useEntity();
  const { serviceName,kongInstances } = useEntityAnnotation(entity);
  const [instance, setInstance] = React.useState<string>(kongInstances ? kongInstances[0] : "");
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
            const plugins = await api.getEnabledPlugins(instance,serviceName,searchTerm);
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
      if(instance && serviceName){
        const plugins = await api.getServiceAssociatedPlugins(instance,serviceName);
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
          const details = await api.getServiceInfo(instance,serviceName);
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
      if(instance && serviceName){
        const routes = await api.getRoutesFromService(instance,serviceName);
        if(routes) return routes;
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const getRoute = async (routeId: string) => {
    try{ 
      if(instance && serviceName){
        const route = await api.getRouteFromService(instance,serviceName,routeId);
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
      if (instance && serviceName){
        const response = await api.createRouteFromService(instance, serviceName, config);
        if (response) {
          return response;
        }
      }
      return null
    } catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const editRoute = async (routeId: string, config: CreateRoute) => {
    try {
      if(instance && serviceName){
        const response = await api.editRouteFromService(instance, serviceName, routeId, config);
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

  const removeRoute = async (routeId: string) => {
    try{ 
      if(instance && serviceName){
        const response = await api.removeRouteFromService(instance,serviceName,routeId);
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
      if(instance){
        const fields = await api.getPluginFields(instance, pluginName);
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
        const response = await api.createServicePlugin(instance,serviceName, config);
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
        const response = await api.editServicePlugin(instance,serviceName, pluginId, config);
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
        const response = await api.removeServicePlugin(instance,serviceName, pluginId);
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

  React.useEffect(()=>{
    if(allAssociatedPlugins){
      getAssociatedPuginsName(allAssociatedPlugins);
    }
  },[allAssociatedPlugins]);

  React.useEffect(()=>{
   if(serviceName) listAllEnabledPlugins()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchTerm])

  React.useEffect(()=>{
    if(instance){
      getServiceDetails();
      listAllEnabledPlugins();
      getRoutesList();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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


export const useKongServiceManagerContext = () => React.useContext(KongServiceManagerContext)