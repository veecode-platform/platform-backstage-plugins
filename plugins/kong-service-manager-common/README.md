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

- `kongServiceManagerReadServicePermission` 👉 Allows service information to be read,
- `kongServiceManagerReadPluginsAvailablePermission` 👉 Allows you to read the plugins available for the service,
- `kongServiceManagerReadPluginsAssociatedPermission` 👉 Reads the associated plugins for the service,
- `kongServiceManagerReadRoutesPermission` 👉 Allows you to read all service routes,
- `kongServiceManagerApplyPluginToServicePermission` 👉 Allows you to apply a plugin to the service,
- `kongServiceManagerUpdatePluginOnTheServicePermission` 👉 Allows you to edit a plugin already installed in the service,
- `kongServiceManagerDisablePluginFromServicePermission` 👉 Allows you to disable a service plugin,
- `kongServiceManagerCreateRoutePermission` 👉 Allows you to create a route for the service,
- `kongServiceManagerUpdateRoutePermission` 👉 Allows you to edit an existing route in the service,
- `kongServiceManagerDeleteRoutePermission` 👉 Allows you to remove an existing route from the service,
- `kongServiceManagerReadPluginsAvailableForRoutePermission` 👉 Reads all the plugins available for the route,
- `kongServiceManagerApplyPluginsAvailableToRoutePermission` 👉 Enable a plugin for a route,
- `kongServiceManagerReadPluginsAssociatedForRoutePermission` 👉 Reads all the plugins associated with the route,
- `kongServiceManagerUpdatePluginOnTheRoutePermission` 👉 Allows you to edit a plugin applied to a route,
- `kongServiceManagerDisablePluginFromRoutePermission` 👉 Allows you to remove a plugin from a route,
- `kongServiceManagerReadSpecsPermission` 👉 It allows you to read the specs of the source code, if they are properly pointed out,
- `kongServiceManagerUpdateSpecPermission` 👉 Allows project specs to be updated.


> 🚨 View Backstage docs to learn how to set up your instance of Backstage to use these permissions.