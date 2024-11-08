# kong-service-manager Backend

## Intro 💡

The `Kong-service-manager-backend` plugin provides the backend for the [Kong Service Manager plugin](https://github.com/veecode-platform/platform-backstage-plugins/tree/master/plugins/kong-service-manager),
it provides endpoints to serve the service interface, the crud for handling plugins and the routes under the kong service.

## Pre-requisites

- Get an updated version of Backstage.
  

## Installation 🔧


If you are using yarn 3.x:

```bash
yarn workspace backend add @veecode-platform/plugin-kong-service-manager-backend
```

If you are using other versions:

```bash
yarn add --cwd packages/backend @veecode-platform/plugin-kong-service-manager-backend
```


## Getting started

### Settings in `app-config.yaml`

We start by configuring the kong in the file `app-config.yaml`, which is in the root of your project:

```yaml
kong:
  instances:
    - id: kong-instance01
      apiBaseUrl: ${ KONG_HOST ]
      workspace: ${ KONG_WORKSPACE }  # Optional Only if your version is enterprise
      auth:
        kongAdmin: ${ KONG_ADMIN_TOKEN } # optional if the instance is enterprise
        custom:  # optional if the kong is in community mode and depending on the authentication used
          header: ${ KONG_HEADER }  # Ex: Authorization or key-auth
          value: ${ KONG_AUTH } # Ex: Basic $your_token or how the token is added depending on the approach
   ```

You also need to configure the `config.d.ts` file in the backend:
`packages > backend > src > config.d.ts`:

```ts
export interface Config {
  kong?: {
      instances?: Array<{
        id: string;
        apiBaseUrl: string;
        workspace?: string;
        auth:{
          kongAdmin?: string,
          custom?:{
            header: string,
            value: string
          }
        }
        }>;
      }
}
```


The next step will be to configure the backend:

#### ⭐ Legacy Backend

Create a file called **kong.ts** in `packages> backend > src > plugins > kong.ts`:

```ts
import { PluginEnvironment } from '../types';
import { Router } from 'express';
import {createRouter} from '@veecode-platform/plugin-kong-service-manager-backend';

export default async function createPlugin({
  logger,
  discovery,
  config
}: PluginEnvironment): Promise<Router> {

  return await createRouter({
    logger,
    discovery,
    config
  });
}
```
In `packages > backend > src > index.ts`:

```diff
+ import kong from './plugins/kong'
...
async function main() {
  const config = await loadBackendConfig({
    argv: process.argv,
    logger: getRootLogger(),
  });
  const createEnv = makeCreateEnv(config);
...
+ const kongEnv = useHotMemoize(module, () => createEnv('kong'));
...
+ apiRouter.use('/kong', await kong(kongEnv));
...
}
```

#### 🆕 New Backend

In `packages > backend > src > index.ts`:

```diff

import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
backend.add(import('@backstage/plugin-techdocs-backend/alpha'));
...

+ backend.add(import('@veecode-platform/plugin-kong-service-manager-backend'));

backend.start();
```

<br>


## Routes

| Method | Path                                        | Endpoint                                               |
|--------|---------------------------------------------|--------------------------------------------------------|
| Get    | /:instanceName/services/:serviceName                      | backendBaseUrl/api/kong/:instance/services/:serviceName                               |
| Get    | /:instanceName/plugins              | backendBaseUrl/api/kong/:instance/plugins  |
| Get    | /:instanceName/services/plugins/fields                    | backendBaseUrl/api/kong/services/plugins/fields        |
| Get    | /:instanceName/services/:serviceName/plugins/associated   | backendBaseUrl/api/kong/:instance/services/:serviceName/plugins/associated |
| Post   | /:instanceName/services/:serviceName/plugins              | backendBaseUrl/api/kong/:instance/services/:serviceName/plugins  |
| Patch  | /:instanceName/services/:serviceName/plugins/:pluginId              | backendBaseUrl/api/kong/:instance/services/:serviceName/plugins  |
| Delete | /:instanceName/services/:serviceName/plugins/pluginId              | backendBaseUrl/api/kong/:instance/services/:serviceName/plugins  |
| Get    | /:instanceName/services/:serviceName/routes               | backendBaseUrl/api/kong/:instance/services/:serviceName/routes   |
| Get    | /:instanceName/services/:serviceName/routes/:routeId      | backendBaseUrl/api/kong/:instance/services/:serviceName/routes/:routeId |
| Post   | /:instanceName/services/:serviceName/routes      | backendBaseUrl/api/kong/:instance/services/:serviceName/routes |  
| Patch  | /:instanceName/services/:serviceName/routes/:routeId      | backendBaseUrl/api/kong/:instance/services/:serviceName/routes/:routeId |
| Delete | /:instanceName/services/:serviceName/routes/:routeId      | backendBaseUrl/api/kong/:instanceservices/:serviceName/routes/:routeId |



---


## Permissions

**See 👉**[Kong Service Manager Common](https://github.com/veecode-platform/platform-backstage-plugins/blob/kong-feature-permission/plugins/kong-service-manager-common/README.md)

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


> 🚨 View Backstage docs to learn how to set up your instance of Backstage to use these permissions.