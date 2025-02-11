# Kong Service Manager Common 

This plugin provides typing and permissions for the  [Kong Service Manager](https://platform.vee.codes/plugin/kong-service-manager/)  & [Kong Service Manager Backend](https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/kong-service-manager-backend/README.md).


### Our community

> 💬  **Join Us**
>
> Join our community to resolve questions about our **Plugins**. We look forward to welcoming you! <br>
>
>    [Go to Community  🚀](https://github.com/orgs/veecode-platform/discussions)

<br><br>

## 🚀 Getting started: 

<br>

If you are using yarn 3.x:

```bash
yarn workspace app add @veecode-platform/plugin-kong-service-manager-common

#or

yarn workspace backend add @veecode-platform/plugin-kong-service-manager-common
```

If you are using other versions:

```bash
yarn add --cwd packages/app @veecode-platform/plugin-kong-service-manager-common

# or

yarn add --cwd packages/backend @veecode-platform/plugin-kong-service-manager-common

```

## Permissions

This plugin provides the following permissions:

- `kongServiceReadPermission` 👉 Allows service information to be read,
- `kongReadAvailablePluginsPermission` 👉 Allows you to read the plugins available for the service,
- `kongRoutesReadPermission` 👉 Allows you to read all service routes,
- `kongApplyPluginToServicePermission` 👉 Allows you to apply a plugin to the service,
- `kongUpdateServicePluginPermission` 👉 Allows you to edit a plugin already installed in the service,
- `kongDisableServicePluginPermission` 👉 Allows you to disable a service plugin,
- `kongRouteCreatePermission` 👉 Allows you to create a route for the service,
- `kongUpdateRoutePermission` 👉 Allows you to edit an existing route in the service,
- `kongRouteDeletePermission` 👉 Allows you to remove an existing route from the service,
- `kongApplyPluginToRoutePermission` 👉 Enable a plugin for a route,
- `kongUpdateRoutePluginPermission` 👉 Allows you to edit a plugin applied to a route,
- `kongDisableRoutePluginPermission` 👉 Allows you to remove a plugin from a route,
- `kongReadSpecsPermission` 👉 It allows you to read the specs of the source code, if they are properly pointed out,
- `kongUpdateSpecPermission` 👉 Allows project specs to be updated.
-  `kongAIPluginsPermission` 👉 Allows you to manipulate Plugins from the AI category.
-  `kongAuthPluginsPermission` 👉 Allows you to manipulate Plugins from the Authentication category.
-  `kongSecurityPluginsPermission` 👉 Allows you to manipulate Plugins from the Security category.
-  `kongTrafficPluginsPermission` 👉 Allows you to manipulate Plugins from the Traffic Control category.
-  `kongServerlessPluginsPermission` 👉 Allows you to manipulate Plugins from the Serverless category.
-  `kongTransformPluginsPermission` 👉 Allows you to manipulate Plugins from the Transformations category.
-  `kongLoggingPluginsPermission` 👉 Allows you to manipulate Plugins from the Logging category.
-  `kongAnalyticsPluginsPermission` 👉 Allows the manipulation of Plugins from the Analytics & Monitoring category.


> 🚨 View Backstage docs to learn how to set up your instance of Backstage to use these permissions.
