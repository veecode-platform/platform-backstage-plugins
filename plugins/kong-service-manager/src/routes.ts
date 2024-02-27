import { createRouteRef, createSubRouteRef } from '@backstage/core-plugin-api';

export const kongServiceRouteRef = createRouteRef({
  id: 'kong-service-manager',
});

export const routesListRouteRef = createSubRouteRef({
  id: 'all-routes',
  parent: kongServiceRouteRef,
  path: '/all-routes'
});

export const pluginsListRouteRef = createSubRouteRef({
  id: 'all-plugins',
  parent: kongServiceRouteRef,
  path: '/all-plugins'
})

export const removePluginRouteRef = createSubRouteRef({
  id: 'remove-plugin',
  parent: kongServiceRouteRef,
  path: '/remove-plugin'
})

export const addPluginRouteRef = createSubRouteRef({
  id: 'add-plugin',
  parent: kongServiceRouteRef,
  path: '/add-plugin'
})