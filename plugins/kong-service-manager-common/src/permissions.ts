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

// services

export const kongReadSpecsPermission = createPermission({
    name: 'kong.read.specs',
    attributes: { action: 'read'}
})

export const kongUpdateSpecPermission = createPermission({
    name: 'kong.update.spec',
    attributes: { action: 'update'}
})

export const kongUpdateRoutePathInSpecPermission = createPermission({  
    name: 'kong.update.route.path',
    attributes: { action: 'update'}
})

/**
 * plugins ( categories )
 * @public
 *  AI - ai
    Authentication → auth
    Security → security
    Traffic Control → traffic
    Serverless → serverless
    Transformation → transform
    Logging → logging
    Analytics & Monitoring → analytics
    Proxy Caching → cache
    Datastore → datastore
    Enterprise → enterprise
    Observability → observe
    Rate Limiting → ratelimit
    Load Balancing → loadbalancer
    gRPC Support → grpc
    Request/Response Validation → validate
    Custom Plugins → custom
 */
export const kongAIPluginsPermission = createPermission({  
    name: 'kong.read.auth.plugins',
    attributes: { action: 'read'}
});

export const kongAuthPluginsPermission = createPermission({  
    name: 'kong.read.auth.plugins',
    attributes: { action: 'read'}
});
export const kongSecurityPluginsPermission = createPermission({  
    name: 'kong.read.security.plugins',
    attributes: { action: 'read'}
});
export const kongTrafficPluginsPermission = createPermission({  
    name: 'kong.read.traffic.plugins',
    attributes: { action: 'read'}
});
export const kongServerlessPluginsPermission = createPermission({  
    name: 'kong.read.serverless.plugins',
    attributes: { action: 'read'}
});
export const kongTransformPluginsPermission = createPermission({  
    name: 'kong.read.transform.plugins',
    attributes: { action: 'read'}
});
export const kongLoggingPluginsPermission = createPermission({  
    name: 'kong.read.logging.plugins',
    attributes: { action: 'read'}
});
export const kongAnalyticsPluginsPermission = createPermission({  
    name: 'kong.read.analytics.plugins',
    attributes: { action: 'read'}
});

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
    kongUpdateSpecPermission,
    kongUpdateRoutePathInSpecPermission,
    kongAIPluginsPermission,
    kongAuthPluginsPermission,
    kongSecurityPluginsPermission,
    kongTrafficPluginsPermission,
    kongServerlessPluginsPermission,
    kongTransformPluginsPermission,
    kongLoggingPluginsPermission,
    kongAnalyticsPluginsPermission
}