/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import { KongServiceManagerContext } from './KongServiceManagerContext';
import { PluginCard } from '../utils/types';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotation } from '../hooks';
import {
  AssociatedPluginsResponse,
  CreatePlugin,
  CreateRoute,
  HttpMethod,
  IKongPluginSpec,
  IPluginsWithPrefix,
} from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import {
  addPluginsAssociated,
  addPluginsPerCategory,
  addRoutePluginsAssociated,
  addSelectedPlugin,
  AssociatedPluginsReducer,
  AssociatedRoutePluginsReducer,
  initialAssociatedPluginsState,
  initialAssociatedRoutePluginsState,
  initialPluginsPerCategoryState,
  initialPluginsToSpecState,
  initialSelectedPluginState,
  initialSelectedSpecState,
  PluginsPerCategoryReducer,
  PluginsToSpecReducer,
  removePluginAssociated,
  removeRoutePluginAssociated,
  SelectedPluginReducer,
  SelectedSpecReducer,
} from './state';
import { kongServiceManagerApiRef } from '../api';
import { alertApiRef, errorApiRef, useApi } from '@backstage/core-plugin-api';
import { ANNOTATION_LOCATION } from '@backstage/catalog-model';
import { removePropsNull } from '../utils/helpers/removePropsNull';
import { formatObject } from '../utils/helpers/formactObject';
import { transformPath } from '../utils/helpers/transformPath';

interface KongServiceManagerProviderProps {
  children: React.ReactNode;
}

export const KongServiceManagerProvider: React.FC<KongServiceManagerProviderProps> = ({ children }) => {

  const [allAssociatedPluginsState, associatedPluginsDispatch] = React.useReducer(AssociatedPluginsReducer, initialAssociatedPluginsState);
  const [allAssociatedRoutePluginsState, associatedRoutePluginsDispatch] = React.useReducer(AssociatedRoutePluginsReducer, initialAssociatedRoutePluginsState);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [selectedPluginState, selectedPluginDispatch] = React.useReducer(SelectedPluginReducer,initialSelectedPluginState, );
  const [associatedPluginsName, setAssociatedPluginsName] = React.useState<string[] | []>([]);
  const [ associatedRoutePluginsName, setAssociatedRoutePluginsName ] = React.useState<string[]|[]>([]);
  const [pluginsPerCategoryState, pluginsPerCategoryDispatch] = React.useReducer(PluginsPerCategoryReducer, initialPluginsPerCategoryState);
  const [configState, setConfigState] = React.useState<any | null>(null);
  const [searchTerm, setSeachTerm] = React.useState<string>('');
  const [routeId, setRouteId] = React.useState<string | null>(null);
  const [isRoute, setIsRoute] = React.useState<boolean>(false);
  const { entity } = useEntity();
  const { serviceName, kongInstances, kongSpecs } = useEntityAnnotation(entity);
  const [instance, setInstance] = React.useState<string>(
    kongInstances ? kongInstances[0] : '',
  );
  const [selectedSpecState, selectedSpecDispatch] = React.useReducer(
    SelectedSpecReducer,
    initialSelectedSpecState,
  );
  const [pluginsToSpecState, pluginsToSpecDispatch] = React.useReducer(
    PluginsToSpecReducer,
    initialPluginsToSpecState,
  );
  const api = useApi(kongServiceManagerApiRef);
  const errorApi = useApi(errorApiRef);
  const alertApi = useApi(alertApiRef);

  const setInstanceState = (instanceState: string) => {
    setInstance(instanceState);
  };

  const setSearchState = (search: string) => {
    setSeachTerm(search);
  };

  const handleToggleDrawer = () => {
    if (!openDrawer) setConfigState(null);
    setOpenDrawer(!openDrawer);
  };

  const setPluginState = (data: PluginCard) => selectedPluginDispatch(addSelectedPlugin(data));

  const getAssociatedPuginsName = (
    pluginsParams: AssociatedPluginsResponse[],
  ) => {
    const newData: string[] = [];
    pluginsParams.map(p => {
      newData.push(p.name);
    });
    setAssociatedPluginsName(newData);
  };

  const getAssociatedRoutePuginsName = (
    pluginsParams: AssociatedPluginsResponse[],
  ) => {
    const newData: string[] = [];
    pluginsParams.map(p => {
      newData.push(p.name);
    });
    setAssociatedRoutePluginsName(newData);
  };

  /**
   *  Service
   */

  const getServiceDetails = async () => {
    try {
      if (instance && serviceName) {
        const details = await api.getServiceInfo(instance, serviceName);
        setIsRoute(false);
        if (details) return details;
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  const listAllEnabledPlugins = async () => {
    try {
      if (instance && serviceName) {
        const plugins = await api.getEnabledPlugins(
          instance,
          serviceName,
          searchTerm,
        );
        if (plugins) {
          pluginsPerCategoryDispatch(addPluginsPerCategory(plugins));
          return plugins;
        }
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  const listAssociatedPlugins = async () => {
    try {
      if (instance && serviceName) {
        const plugins = await api.getServiceAssociatedPlugins(
          instance,
          serviceName,
        );
        if (plugins !== null && plugins !== undefined) {
          associatedPluginsDispatch(addPluginsAssociated(plugins));
          return plugins;
        }
      }
      return [];
    } catch (e: any) {
      errorApi.post(e);
      return [];
    }
  };

  const enablePlugin = async (config: CreatePlugin) => {
    try {
      if (instance && serviceName) {
        const response = await api.createServicePlugin(
          instance,
          serviceName,
          config,
        );
        if (response) {
          await listAssociatedPlugins();
          return alertApi.post({
            message: 'Plugin successfully enabled!',
            severity: 'success',
            display: 'transient',
          });
        }
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  const editPlugin = async (pluginId: string, config: CreatePlugin) => {
    try {
      if (instance && serviceName) {
        const response = await api.editServicePlugin(
          instance,
          serviceName,
          pluginId,
          config,
        );
        if (response) {
          await listAssociatedPlugins();
          return alertApi.post({
            message: 'Plugin successfully edited!',
            severity: 'success',
            display: 'transient',
          });
        }
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  const disablePlugin = async (pluginId: string) => {
    try {
      if (instance && serviceName) {
        const response = await api.removeServicePlugin(
          instance,
          serviceName,
          pluginId,
        );
        if (response && allAssociatedPluginsState) {
          associatedPluginsDispatch(removePluginAssociated(pluginId));
          await listAllEnabledPlugins();
          return alertApi.post({
            message: 'Plugin successfully disabled',
            severity: 'success',
            display: 'transient',
          });
        }
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  /**
   * plugins
   */
  const getPluginFields = async (pluginName: string) => {
    try {
      if (instance) {
        const fields = await api.getPluginFields(instance, pluginName);
        if (fields) {
          return fields;
        }
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  /**
   * Routes
   */
  const getRoutesList = async () => {
    try {
      if (instance && serviceName) {
        const routes = await api.getRoutesFromService(instance, serviceName);
        if (routes) return routes;
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  const getRoute = async (routeNameOrId:string) => {
    try {
      if (instance && serviceName && routeNameOrId) {
        const route = await api.getRouteFromService(
          instance,
          serviceName,
          routeNameOrId,
        );
        setIsRoute(true);
        setRouteId(routeNameOrId);
        if (route) return route;
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  const createRoute = async (config: CreateRoute) => {
    try {
      if (instance && serviceName) {
        const response = await api.createRouteFromService(
          instance,
          serviceName,
          config,
        );
        if (response) {
          return response;
        }
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  const editRoute = async (config: CreateRoute) => {
    try {
      if (instance && serviceName && routeId) {
        const response = await api.editRouteFromService(
          instance,
          serviceName,
          routeId,
          config,
        );
        if (response) {
          await getRoutesList();
          return alertApi.post({
            message: 'Route successfully update!',
            severity: 'success',
            display: 'transient',
          });
        }
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  const removeRoute = async () => {
    try {
      if (instance && serviceName && routeId) {
        const response = await api.removeRouteFromService(
          instance,
          serviceName,
          routeId,
        );
        if (response) {
          await getRoutesList();
          return alertApi.post({
            message: 'Route successfully delete!',
            severity: 'success',
            display: 'transient',
          });
        }
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  const listAllEnabledRoutePlugins = async () => {
    try {
      if (instance && serviceName && routeId) {
        const plugins = await api.getEnabledRoutePlugins(
          instance,
          routeId,
          searchTerm,
        );
        if (plugins) {
          pluginsPerCategoryDispatch(addPluginsPerCategory(plugins));
          return plugins;
        }
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  const listAssociatedRoutePlugins = async () => {
    try {
      if (instance && routeId) {
        const plugins = await api.getRouteAssociatedPlugins(
          instance,
          routeId,
        );
        if (plugins !== null && plugins !== undefined) {
          associatedRoutePluginsDispatch(addRoutePluginsAssociated(plugins));
          return plugins;
        }
      }
      return [];
    } catch (e: any) {
      errorApi.post(e);
      return [];
    }
  };

  const enablePluginToRoute = async (
    config: CreatePlugin,
  ) => {
    try {
      if (instance && routeId) {
        const response = await api.addRoutePlugin(
          instance,
          routeId,
          config,
        );
        if (response) {
          await listAssociatedRoutePlugins();
          alertApi.post({
            message: 'Plugin successfully enabled!',
            severity: 'success',
            display: 'transient',
          });
          return response;
        }
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  const editPluginFromRoute = async (
    pluginId: string,
    config: CreatePlugin,
  ) => {
    try {
      if (instance && routeId && pluginId) {
        const response = await api.editRoutePlugin(
          instance,
          routeId,
          pluginId,
          config,
        );
      if(response){
        await listAssociatedRoutePlugins();
        return alertApi.post({
          message: 'Plugin successfully edited!',
          severity: 'success',
          display: 'transient',
        });
      }
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  const disabledPluginFromRoute = async (
    pluginId: string,
  ) => {
    try {
      if (instance && routeId && pluginId) {
        const response = await api.removeRoutePlugin(
          instance,
          routeId,
          pluginId,
        );
       if(response && allAssociatedPluginsState){
        associatedRoutePluginsDispatch(removeRoutePluginAssociated(pluginId));
        return alertApi.post({
          message: 'Plugin successfully disabled',
          severity: 'success',
          display: 'transient',
        });
       }
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  /**
   * Specs
   */
  const getSpecs = async () => {
    try {
      if (kongSpecs && entity) {
        const response = await api.getAllSpecs(
          entity.metadata?.annotations?.[ANNOTATION_LOCATION] as string,
          kongSpecs,
        );
        if (response) return response;
      }
      return null;
    } catch (e: any) {
      errorApi.post(e);
      return null;
    }
  };

  /**
   * Service
  */

  const getConfigFromService = async (pluginName: string) => {
    const asociatedPlugins = await listAssociatedPlugins();

    if (asociatedPlugins) {
      const data = asociatedPlugins.find(
        associatedPlugin =>
          associatedPlugin.name === pluginName && associatedPlugin.config,
      );

      if (data) {
        const filteredConfig = removePropsNull(data.config);
        return { ...filteredConfig };
      }
    }
    return {};
  };

  const listAllServicePluginsForSpec = async () => {
    if (!selectedSpecState) return [];

    const pluginsInSpec = Object.keys(selectedSpecState)
      .filter(key => key.startsWith('x-kong'))
      .map(key => selectedSpecState[key]);

    if (allAssociatedPluginsState && pluginsInSpec) {
      const enableServicePlugins = await listAllEnabledPlugins();
      if(enableServicePlugins){
        const pluginsList = await Promise.all(
          enableServicePlugins.flatMap(category =>
            category.plugins
              .filter(plugin => plugin.associated)
              .map(async plugin => ({
                image: plugin.image,
                name: plugin.name,
                slug: plugin.slug,
                description: plugin.description,
                config: await getConfigFromService(plugin.slug),
                enabledToSpec: !!pluginsInSpec.find(p => p.name === plugin.slug),
              })),
          ),
        );
        return pluginsList;
      }
    }
    return [];
  };

  const applyKongServicePluginsToSpec = async (
    specName: string,
    title: string,
    message: string,
    location: string,
    plugins: IKongPluginSpec[],
  ) => {
    try {
      if (selectedSpecState) {
        // delete kong's plugin (old state)
        for (const key in selectedSpecState) {
          if (key.startsWith('x-kong')) {
            delete selectedSpecState[key];
          }
        }

        // map new plugins
        const pluginsWithPrefix: IPluginsWithPrefix = {};

        plugins.map(plugin => {
          const pluginKey = `x-kong-${plugin.name
            .replace(' ', '-')
            .toLowerCase()}`;
          const newData = {
            name: plugin.name,
            enabled: plugin.enabled,
            config: plugin.config,
          };
          pluginsWithPrefix[`${pluginKey}`] = newData;
        });

        const definitionUpdated = {
          openapi: selectedSpecState.openapi,
          info: selectedSpecState.info,
          externalDocs: selectedSpecState.externalDocs,
          servers: selectedSpecState.servers,
          tags: selectedSpecState.tags,
          ...pluginsWithPrefix,
          paths: selectedSpecState.paths,
          components: selectedSpecState.components,
        };

        const fileContent = formatObject(definitionUpdated);

        const response = await api.applyPluginsToSpec(
          specName,
          location,
          fileContent,
          title,
          message,
        );
        return response;
      }
      return {
        status: 400,
        message: 'Pull Request aborted',
      };
    } catch (e: any) {
      errorApi.post(e);
      return {
        status: 400,
        message: 'Pull Request aborted',
      };
    }
  };

  /**
  * Route
  */

  const getConfigFromRoute = async (pluginName: string) => {
    const associatedPlugins = await listAssociatedRoutePlugins();

    if (associatedPlugins) {
      const data = associatedPlugins.find(
        associatedPlugin =>
          associatedPlugin.name === pluginName && associatedPlugin.config,
      );

      if (data) {
        const filteredConfig = removePropsNull(data.config);
        return { ...filteredConfig };
      }
    }
    return {};
  };

  const listAllRoutePluginsForSpec = async (path:string, method: HttpMethod) => {
    if (!selectedSpecState) return [];

    const formattedPath = transformPath(path);
    const specPath = selectedSpecState.paths;
    const pathResult = specPath[formattedPath][method];

    const pluginsInPath = Object.keys(pathResult)
      .filter(key => key.startsWith('x-kong'))
      .map(key => pathResult[key]);

    if (allAssociatedRoutePluginsState && pluginsInPath) {
     const enableRoutePlugins = await listAllEnabledRoutePlugins();
     if(enableRoutePlugins){
      const pluginsList = await Promise.all(
        enableRoutePlugins.flatMap(category =>
          category.plugins
            .filter(plugin => plugin.associated)
            .map(async plugin => ({
              image: plugin.image,
              name: plugin.name,
              slug: plugin.slug,
              description: plugin.description,
              config: await getConfigFromRoute(plugin.slug),
              enabledToSpec: !!pluginsInPath.find(p => p.name === plugin.slug),
            })),
        ),
      );
      return pluginsList;
     }
    }
    return [];
  };

  const applyKongRoutePluginsToSpec = async (
    specName: string,
    title: string,
    message: string,
    location: string,
    path: string,
    method: HttpMethod,
    plugins: IKongPluginSpec[],
  ) => {

    try {
      if (selectedSpecState) {

        const formattedPath = transformPath(path);
        const specPaths = selectedSpecState.paths;
        const pathSelected = specPaths[formattedPath][method];
  
        // delete kong's plugin (old state)
        for (const key in pathSelected) {
          if (key.startsWith('x-kong')) {
            delete pathSelected[key];
          }
        }

        // map new plugins
        const pluginsWithPrefix: IPluginsWithPrefix = {};

        plugins.map(plugin => {
          const pluginKey = `x-kong-${plugin.name
            .replace(' ', '-')
            .toLowerCase()}`;
          const newData = {
            name: plugin.name,
            enabled: plugin.enabled,
            config: plugin.config,
          };
          pluginsWithPrefix[`${pluginKey}`] = newData;
        });

        const updatedMethod = { ...pathSelected, ...pluginsWithPrefix };
        
        const definitionUpdated = {
          ...selectedSpecState,
          paths: {
            ...specPaths,
            [formattedPath]: {
              ...specPaths[formattedPath],
              [method]: updatedMethod,
            },
          },
        };

        const fileContent = formatObject(definitionUpdated);

        const response = await api.applyPluginsToSpec(
          specName,
          location,
          fileContent,
          title,
          message,
        );
        return response;
      }
      return {
        status: 400,
        message: 'Pull Request aborted',
      };
    } catch (e: any) {
      errorApi.post(e);
      return {
        status: 400,
        message: 'Pull Request aborted',
      };
    }
  };


  React.useEffect(() => {
    if (allAssociatedPluginsState) {
      getAssociatedPuginsName(allAssociatedPluginsState);
    }
  }, [allAssociatedPluginsState]);

  React.useEffect(()=>{
    if (allAssociatedRoutePluginsState) {
      getAssociatedRoutePuginsName(allAssociatedRoutePluginsState);
    }
  },[allAssociatedRoutePluginsState])

  React.useEffect(() => {
    if (isRoute && routeId) {
      listAllEnabledRoutePlugins();
    };
    if(!isRoute && serviceName){
      listAllEnabledPlugins();
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  React.useEffect(() => {
    if (instance) {
      getServiceDetails();
      getRoutesList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance]);

  return (
    <KongServiceManagerContext.Provider
      value={{
        entity,
        serviceName,
        instance,
        kongSpecs,
        routeId,
        setRouteId,
        isRoute,
        setIsRoute,
        setInstanceState,
        allAssociatedPluginsState,
        associatedPluginsDispatch,
        allAssociatedRoutePluginsState,
        associatedRoutePluginsDispatch,
        associatedPluginsName,
        associatedRoutePluginsName,
        handleToggleDrawer,
        openDrawer,
        setPluginState,
        selectedPluginState,
        pluginsPerCategoryState,
        pluginsPerCategoryDispatch,
        configState,
        setConfigState,
        setSearchState,
        searchTerm,
        selectedSpecState,
        selectedSpecDispatch,
        pluginsToSpecState,
        pluginsToSpecDispatch,
        getServiceDetails,
        listAllEnabledPlugins,
        listAssociatedPlugins,
        enablePlugin,
        editPlugin,
        disablePlugin,
        getPluginFields,
        getRoutesList,
        getRoute,
        createRoute,
        editRoute,
        removeRoute,
        listAllEnabledRoutePlugins,
        listAssociatedRoutePlugins,
        enablePluginToRoute,
        editPluginFromRoute,
        disabledPluginFromRoute,
        getSpecs,
        listAllServicePluginsForSpec,
        applyKongServicePluginsToSpec,
        listAllRoutePluginsForSpec,
        applyKongRoutePluginsToSpec
      }}
    >
      {children}
    </KongServiceManagerContext.Provider>
  );
};

export const useKongServiceManagerContext = () =>
  React.useContext(KongServiceManagerContext);
