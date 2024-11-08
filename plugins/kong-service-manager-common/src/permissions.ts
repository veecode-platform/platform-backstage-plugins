import { createPermission } from '@backstage/plugin-permission-common';

/**
 * Services
 * @public
 */

export const kongServiceReadPermission = createPermission({
    name: 'kong.service.read',
    attributes: { action: 'read'}
})

export const kongReadAvailablePluginsPermission= createPermission({
    name: 'kong.read.available.plugins',
    attributes: { action: 'read'}
})

export const kongRoutesReadPermission = createPermission({
    name: 'kong.routes.read',
    attributes: { action: 'read'}
})

export const kongApplyPluginToServicePermission = createPermission({
    name: 'kong.apply.plugins.service',
    attributes: { action: 'create'}
})

export const kongUpdateServicePluginPermission = createPermission({
    name: 'kong.update.service.plugin',
    attributes: { action: 'update'}
})

export const kongDisableServicePluginPermission = createPermission({
    name: 'kong.disable.service.plugin',
    attributes: { action: 'delete'}
})


/**
 * Routes
 * @public
 */

export const kongRouteCreatePermission = createPermission({
    name: 'kong.route.create',
    attributes: { action: 'create'}
})

export const kongUpdateRoutePermission = createPermission({
    name: 'kong.route.update',
    attributes: { action: 'update'}
})

export const kongRouteDeletePermission = createPermission({
    name: 'kong.route.delete',
    attributes: { action: 'delete' }
})

// export const kongReadPluginsAvailableRoutePermission = createPermission({
//     name: 'kong.read.plugins.available.route',
//     attributes: { action: 'read'}
// })

export const kongApplyPluginToRoutePermission = createPermission({
    name: 'kong.apply.plugins.route',
    attributes: { action: 'create'}
})

export const kongUpdateRoutePluginPermission = createPermission({
    name: 'kong.update.route.plugin',
    attributes: { action: 'update'}
})

export const kongDisableRoutePluginPermission = createPermission({
    name: 'kong.disable.route.plugin',
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
    kongServiceReadPermission,
    kongReadAvailablePluginsPermission,
    kongRoutesReadPermission,
    kongApplyPluginToServicePermission,
    kongUpdateServicePluginPermission,
    kongDisableServicePluginPermission,
    kongRouteCreatePermission,
    kongUpdateRoutePermission,
    kongRouteDeletePermission,
    kongApplyPluginToRoutePermission,
    kongUpdateRoutePluginPermission,
    kongDisableRoutePluginPermission,
    kongReadSpecsPermission,
    kongUpdateSpecPermission
}