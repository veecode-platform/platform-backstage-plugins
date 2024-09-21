import React from "react";
import { alertApiRef, errorApiRef, useApi } from "@backstage/core-plugin-api";
import { kongServiceManagerApiRef } from "../api";
import { KongServiceManagerContext } from "./KongServiceManagerContext";
import { PluginCard } from "../utils/types";
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotation } from "../hooks";
import { AssociatedPluginsResponse, CreatePlugin, CreateRoute, IKongPluginSpec } from "@veecode-platform/backstage-plugin-kong-service-manager-common";
import { addPluginsAssociated, addPluginsPerCategory, addSelectedPlugin, AssociatedPluginsReducer, initialAssociatedPluginsState, initialPluginsPerCategoryState, initialPluginsToSpecState, initialSelectedPluginState, initialSelectedSpecState, PluginsPerCategoryReducer, PluginsToSpecReducer, removePluginAssociated, SelectedPluginReducer, SelectedSpecReducer } from "./state";

interface KongServiceManagerProviderProps {
    children : React.ReactNode
};

export const KongServiceManagerProvider: React.FC<KongServiceManagerProviderProps> = ({children}) => {

  const [allAssociatedPluginsState, associatedPluginsDispatch ] = React.useReducer(AssociatedPluginsReducer, initialAssociatedPluginsState);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [selectedPluginState, selectedPluginDispatch ] = React.useReducer(SelectedPluginReducer, initialSelectedPluginState);
  const [ associatedPluginsName, setAssociatedPluginsName] = React.useState<string[]|[]>([]); 
  const [pluginsPerCategoryState, pluginsPerCategoryDispatch ] = React.useReducer(PluginsPerCategoryReducer, initialPluginsPerCategoryState);
  const [configState, setConfigState ] = React.useState<any|null>(null); 
  const [searchTerm, setSeachTerm] = React.useState<string>("");
  const { entity } = useEntity();
  const { serviceName,kongInstances } = useEntityAnnotation(entity);
  const [instance, setInstance] = React.useState<string>(kongInstances ? kongInstances[0] : "");
  const [selectedSpecState, selectedSpecDispatch] = React.useReducer(SelectedSpecReducer, initialSelectedSpecState);
  const [ pluginsToSpecState, pluginsToSpecDispatch ] = React.useReducer(PluginsToSpecReducer,initialPluginsToSpecState);
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

  const setPluginState = (data: PluginCard ) => selectedPluginDispatch(addSelectedPlugin(data));

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
              pluginsPerCategoryDispatch(addPluginsPerCategory(plugins))
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
        if (plugins !== null && plugins !== undefined) associatedPluginsDispatch(addPluginsAssociated(plugins));
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
        if(response && allAssociatedPluginsState) {
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
        if(response && allAssociatedPluginsState) {
            associatedPluginsDispatch(removePluginAssociated(pluginId))
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

  const getSpecs = async() => {
    try{
      if(entity){
        const response = await api.getSpecs(entity.kind, entity.metadata.name);
        if(response) return response;
      }
      return null
    }
    catch(e:any){
      errorApi.post(e);
      return null
    }
  }

  const getPluginsInSpecs = async(specName:string) => {
    try{
      if(specName){
        const response = await api.getPluginsFromSpec(specName);
        if(response) return response;
      }
      return null
    }
    catch(e:any){
      errorApi.post(e);
      return null
    }
  }

  const getConfig = (pluginName:string) => {
    if(allAssociatedPluginsState){
      const config = allAssociatedPluginsState.find( associatedPlugin => associatedPlugin.name === pluginName && associatedPlugin.config);
     
      if(config){
        const filteredConfig = Object.fromEntries(
          Object.entries(config.config).filter(([_, value]) => value !== null)
        );
        
        return {...config, filteredConfig}
      }

    }
    return {}
  }

   const listAllPluginsForSpec =  async (specName:string) => {
      
        const pluginsInSpec = await getPluginsInSpecs(specName);
        
        if(allAssociatedPluginsState && pluginsPerCategoryState && pluginsInSpec){

          const pluginsList = pluginsPerCategoryState.flatMap(category=>
            category.plugins
            .filter((plugin) => plugin.associated)
            .map((plugin) => ({
              image: plugin.image,
              name: plugin.name,
              slug: plugin.slug,
              description: plugin.description,
              config: getConfig(plugin.name), 
              enabledToSpec: false,
            }))
        );

        pluginsList.forEach((plugin) => {
          const isInSpec = pluginsInSpec.some((specPlugin) => specPlugin.name === plugin.name);
          plugin.enabledToSpec = isInSpec ? true : false;
        }); 
        
        return pluginsList;

        }   

        return []
    }

    const applyKongPluginsToSpec = async (specName:string,title:string,message:string,location:string,plugins:IKongPluginSpec[]) => {
      try{
        const response = await api.applyPluginsToSpec(specName, title,message,location,plugins);
        return response
      }
      catch(e:any){
        errorApi.post(e);
        return {
            status: 400,
            message: 'Pull Request aborted'
        }
      }
    }


  React.useEffect(()=>{
    if(allAssociatedPluginsState){
      getAssociatedPuginsName(allAssociatedPluginsState);
    }
  },[allAssociatedPluginsState]);

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
        allAssociatedPluginsState,
        associatedPluginsName,
        getPluginFields,
        enablePlugin,
        disablePlugin,
        handleToggleDrawer,
        openDrawer,
        setPluginState,
        selectedPluginState,
        editPlugin,
        pluginsPerCategoryState,
        configState,
        setConfigState,
        setSearchState,
        searchTerm,
        createRoute,
        editRoute,
        removeRoute,
        getRoute,
        getSpecs,
        selectedSpecState,
        selectedSpecDispatch,
        listAllPluginsForSpec,
        pluginsToSpecState,
        pluginsToSpecDispatch,
        applyKongPluginsToSpec
      }}
    >
      {children}
    </KongServiceManagerContext.Provider>
  );

}


export const useKongServiceManagerContext = () => React.useContext(KongServiceManagerContext)