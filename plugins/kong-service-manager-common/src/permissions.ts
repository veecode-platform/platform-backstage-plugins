import { createPermission } from '@backstage/plugin-permission-common';

/**
 * Services
 * @public
 */

export const kongServiceManagerReadServicePermission = createPermission({
    name: 'kong.service.manager.read.service',
    attributes: { action: 'read'}
})

export const kongServiceManagerReadPluginsAvailablePermission = createPermission({
    name: 'kong.service.manager.read.plugins.available',
    attributes: { action: 'read'}
})

export const kongServiceManagerReadPluginsAssociatedPermission = createPermission({
    name: 'kong.service.manager.read.plugins.associated',
    attributes: { action: 'read'}
})

export const kongServiceManagerReadRoutesPermission = createPermission({
    name: 'kong.service.manager.read.routes',
    attributes: { action: 'read'}
})

export const kongServiceManagerApplyPluginToServicePermission = createPermission({
    name: 'kong.service.manager.apply.plugins.to.service',
    attributes: { action: 'create'}
})

export const kongServiceManagerUpdatePluginOnTheServicePermission = createPermission({
    name: 'kong.service.manager.update.plugin.on.the.service',
    attributes: { action: 'update'}
})

export const kongServiceManagerDisablePluginFromServicePermission = createPermission({
    name: 'kong.service.manager.disable.plugin.from.service',
    attributes: { action: 'delete'}
})


/**
 * Routes
 * @public
 */

export const kongServiceManagerCreateRoutePermission = createPermission({
    name: 'kong.service.manager.create.route',
    attributes: { action: 'create'}
})

export const kongServiceManagerUpdateRoutePermission = createPermission({
    name: 'kong.service.manager.update.route',
    attributes: { action: 'update'}
})

export const kongServiceManagerDeleteRoutePermission = createPermission({
    name: 'kong.service.manager.delete.route',
    attributes: { action: 'delete' }
})

export const kongServiceManagerReadPluginsAvailableForRoutePermission = createPermission({
    name: 'kong.service.manager.read.plugins.available.for.route',
    attributes: { action: 'read'}
})

export const kongServiceManagerApplyPluginsAvailableToRoutePermission = createPermission({
    name: 'kong.service.manager.apply.plugins.available.to.route',
    attributes: { action: 'create'}
})

export const kongServiceManagerReadPluginsAssociatedForRoutePermission = createPermission({
    name: 'kong.service.manager.read.plugins.associated.for.route',
    attributes: { action: 'read'}
})

export const kongServiceManagerUpdatePluginOnTheRoutePermission = createPermission({
    name: 'kong.service.manager.update.plugin.on.the.route',
    attributes: { action: 'update'}
})

export const kongServiceManagerDisablePluginFromRoutePermission = createPermission({
    name: 'kong.service.manager.disable.plugin.from.route',
    attributes: { action: 'delete'}
})


/**
 *  Specs
 *  @public
*/

export const kongServiceManagerReadSpecsPermission = createPermission({
    name: 'kong.service.manager.read.specs',
    attributes: { action: 'read'}
})

export const kongServiceManagerUpdateSpecPermission = createPermission({
    name: 'kong.service.manager.update.spec',
    attributes: { action: 'update'}
})


export const kongServiceManagerPermissions = {
    kongServiceManagerReadServicePermission,
    kongServiceManagerReadPluginsAvailablePermission,
    kongServiceManagerReadPluginsAssociatedPermission,
    kongServiceManagerReadRoutesPermission,
    kongServiceManagerApplyPluginToServicePermission,
    kongServiceManagerUpdatePluginOnTheServicePermission,
    kongServiceManagerDisablePluginFromServicePermission,
    kongServiceManagerCreateRoutePermission,
    kongServiceManagerUpdateRoutePermission,
    kongServiceManagerDeleteRoutePermission,
    kongServiceManagerReadPluginsAvailableForRoutePermission,
    kongServiceManagerApplyPluginsAvailableToRoutePermission,
    kongServiceManagerReadPluginsAssociatedForRoutePermission,
    kongServiceManagerUpdatePluginOnTheRoutePermission,
    kongServiceManagerDisablePluginFromRoutePermission,
    kongServiceManagerReadSpecsPermission,
    kongServiceManagerUpdateSpecPermission
}