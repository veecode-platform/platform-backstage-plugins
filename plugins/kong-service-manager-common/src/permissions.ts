import { createPermission } from '@backstage/plugin-permission-common';

/**
 * Services
 * @public
 */

export const kongReadServicePermission = createPermission({
    name: 'kong.read.service',
    attributes: { action: 'read'}
})

export const kongReadPluginsAvailableServicePermission = createPermission({
    name: 'kong.read.plugins.available.service',
    attributes: { action: 'read'}
})

export const kongReadRoutesPermission = createPermission({
    name: 'kong.read.routes',
    attributes: { action: 'read'}
})

export const kongApplyPluginServicePermission = createPermission({
    name: 'kong.apply.plugins.service',
    attributes: { action: 'create'}
})

export const kongUpdatePluginServicePermission = createPermission({
    name: 'kong.update.plugin.service',
    attributes: { action: 'update'}
})

export const kongDisablePluginServicePermission = createPermission({
    name: 'kong.disable.plugin.service',
    attributes: { action: 'delete'}
})


/**
 * Routes
 * @public
 */

export const kongCreateRoutePermission = createPermission({
    name: 'kong.create.route',
    attributes: { action: 'create'}
})

export const kongUpdateRoutePermission = createPermission({
    name: 'kong.update.route',
    attributes: { action: 'update'}
})

export const kongDeleteRoutePermission = createPermission({
    name: 'kong.delete.route',
    attributes: { action: 'delete' }
})

export const kongReadPluginsAvailableRoutePermission = createPermission({
    name: 'kong.read.plugins.available.route',
    attributes: { action: 'read'}
})

export const kongApplyPluginsAvailableRoutePermission = createPermission({
    name: 'kong.apply.plugins.available.route',
    attributes: { action: 'create'}
})

export const kongReadPluginsAssociatedRoutePermission = createPermission({
    name: 'kong.read.plugins.associated.route',
    attributes: { action: 'read'}
})

export const kongUpdatePluginRoutePermission = createPermission({
    name: 'kong.update.plugin.route',
    attributes: { action: 'update'}
})

export const kongDisablePluginRoutePermission = createPermission({
    name: 'kong.disable.plugin.route',
    attributes: { action: 'delete'}
})


/**
 *  Specs
 *  @public
*/

export const kongReadSpecsPermission = createPermission({
    name: 'kong.read.specs',
    attributes: { action: 'read'}
})

export const kongUpdateSpecPermission = createPermission({
    name: 'kong.update.spec',
    attributes: { action: 'update'}
})


export const kongServiceManagerPermissions = {
    kongReadServicePermission,
    kongReadPluginsAvailableServicePermission,
    kongReadRoutesPermission,
    kongApplyPluginServicePermission,
    kongUpdatePluginServicePermission,
    kongDisablePluginServicePermission,
    kongCreateRoutePermission,
    kongUpdateRoutePermission,
    kongDeleteRoutePermission,
    kongReadPluginsAvailableRoutePermission,
    kongApplyPluginsAvailableRoutePermission,
    kongReadPluginsAssociatedRoutePermission,
    kongUpdatePluginRoutePermission,
    kongDisablePluginRoutePermission,
    kongReadSpecsPermission,
    kongUpdateSpecPermission
}