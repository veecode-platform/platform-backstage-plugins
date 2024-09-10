import { createRouteRef, createSubRouteRef } from '@backstage/core-plugin-api';

export const kongServiceRouteRef = createRouteRef({
  id: 'kong-service-manager-deprecated',
});

export const routesListRouteRef = createSubRouteRef({
  id: 'all-routes-deprecated',
  parent: kongServiceRouteRef,
  path: '/all-routes'
});

export const pluginsListRouteRef = createSubRouteRef({
  id: 'all-plugins-deprecated',
  parent: kongServiceRouteRef,
  path: '/all-plugins'
})

export const removePluginRouteRef = createSubRouteRef({
  id: 'remove-plugin-deprecated',
  parent: kongServiceRouteRef,
  path: '/remove-plugin'
})

export const addPluginRouteRef = createSubRouteRef({
  id: 'add-plugin-deprecated',
  parent: kongServiceRouteRef,
  path: '/add-plugin'
})