# kong-service-manager

## Intro 💡

The `Kong-service-manager-backend` plugin provides the backend for the [Kong Service Manager] plugin(https://github.com/veecode-platform/platform-backstage-plugins/tree/master/plugins/kong-service-manager),
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
      host: ${ KONG_HOST ]
      workspace: ${ KONG_WORKSPACE }  # or "default"
      token: ${ KONG_ACCESS_TOKEN }
   ```

You also need to configure the `config.d.ts` file in the backend:
`packages > backend > src > config.d.ts`:

```ts
export interface Config {
    kong?: {
        instances?: Array<{
          id: string;
          host: string;
          workspace: string;
          token?: string;
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
+ import { kongServiceManagerPlugin } from '@veecode-platform/backstage-plugin-infracost-backend';

const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
backend.add(import('@backstage/plugin-techdocs-backend/alpha'));
...

+ backend.add(kongServiceManagerPlugin);

backend.start();
```

<br>


## Routes

| Method | Path                                        | Endpoint                                               |
|--------|---------------------------------------------|--------------------------------------------------------|
| Get    | /services/:serviceName                      | backendBaseUrl/api/kong/                               |
| Get    | /services/:serviceName/plugins              | backendBaseUrl/api/kong/services/:serviceName/plugins  |
| Get    | /services/plugins/fields                    | backendBaseUrl/api/kong/services/plugins/fields        |
| Get    | /services/:serviceName/plugins/associated   | backendBaseUrl/api/kong/services/:serviceName/plugins/associated |
| Post   | /services/:serviceName/plugins              | backendBaseUrl/api/kong/services/:serviceName/plugins  |
| Patch  | /services/:serviceName/plugins              | backendBaseUrl/api/kong/services/:serviceName/plugins  |
| Delete | /services/:serviceName/plugins              | backendBaseUrl/api/kong/services/:serviceName/plugins  |
| Get    | /services/:serviceName/routes               | backendBaseUrl/api/kong/services/:serviceName/routes   |
| Get    | /services/:serviceName/routes/:routeId      | backendBaseUrl/api/kong/services/:serviceName/routes/:routeId |
| Post   | /services/:serviceName/routes/:routeId      | backendBaseUrl/api/kong/services/:serviceName/routes/:routeId |
| Patch  | /services/:serviceName/routes/:routeId      | backendBaseUrl/api/kong/services/:serviceName/routes/:routeId |
| Delete | /services/:serviceName/routes/:routeId      | backendBaseUrl/api/kong/services/:serviceName/routes/:routeId |


