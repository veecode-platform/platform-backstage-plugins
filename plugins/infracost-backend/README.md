# Infracost backend Plugin

## Intro 💡

The Infracost-backend plugin works in conjunction with the [infracost](https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/infracost/README.md), it adds a new entity to its Backstage called **Infracost**, together with its custom processor, saves the reference in the application database by creating a new schema named **infracost**, where the table **projects_estimate** is created, where the reference is stored and extracted from an interaction layer with the database and served in the routing layer. Its baseUrl is linked to the baseUrl of the backend and its routes are called like this: `backendBaseUrl/api/infracost/`.<br>
The processor is configured by ingesting a timer that scans the catalog and keeps the data up to date. We'll explain how to configure each step below.<br>
The Infracost Plugin proposes the display of a cost estimate based on the infrastructure adopted in your project and the respective provider. This mechanism is triggered through a specific job in the project pipeline that will create the new entity and ingest its location into the Backstage catalog.

## Pre-requisites

- Get an updated version of Backstage.
- Have a Backstage with a properly configured Postgres database, if you haven't already, see how to set it up [here](https://backstage.io/docs/tutorials/switching-sqlite-postgres/).


## Installation 🔧


If you are using yarn 3.x:

```bash
yarn workspace backend add @veecode-platform/backstage-plugin-infracost-backend
```

If you are using other versions:

```bash
yarn add --cwd packages/backend @veecode-platform/backstage-plugin-infracost-backend
```


## Getting started

### Settings in `app-config.yaml`

We start by configuring the processor schedule in the file `app-config.yaml`, which is in the root of your project:

```yaml
catalog:
...
  providers:
    infracost:
      default:
        schedule:        
          frequency: 
            minutes: ${INFRACOST_PROVIDER_REFRESH_FREQUENCY}
          timeout: 
            minutes: ${INFRACOST_PROVIDER_TIMEOUT}
          initialDelay:
            seconds: ${INFRACOST_PROVIDER_INITIAL_DELAY}
   ```

The next step will be to configure the backend:
In `packages > backend > src > plugins > catalog.ts`:

```diff
import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
+ import { InfracostEntityProcessor, InfracostEntityProvider } from '@veecode-platform/backstage-plugin-infracost-backend';


export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  
  const builder = await CatalogBuilder.create(env);
+  const cacheService = env.cache.getClient();

...
+   const infracostEntityProviders = InfracostEntityProvider.fromConfig(env.config, {
+     id: 'default',
+     logger: env.logger,
+     cache: cacheService,
+     database: env.database,
+     schedule: env.scheduler.createScheduledTaskRunner({
+          frequency: {minutes: 30},
+          timeout: {minutes: 1},
+          initialDelay: {seconds: 15}
+     }),
+  });
  
+   builder.addEntityProvider(
+     infracostEntityProviders,
+   );
      
+  const infracostProcessor = new InfracostEntityProcessor(env.config, env.logger, cacheService)
+  builder.addProcessor(infracostProcessor)

 ...

builder.addProcessor(new ScaffolderEntitiesProcessor());

  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}
```
Then, still in the `plugins` folder, create a file called `infracost.ts`, which will contain this code:

```ts

import { PluginEnvironment } from '../types';
import { Router } from 'express';
import {
  DatabaseInfracostStore,
  createRouter,
} from '@veecode-platform/backstage-plugin-infracost-backend';

export default async function createPlugin({
  logger,
  database,
  config,
}: PluginEnvironment): Promise<Router> {
  const db = await DatabaseInfracostStore.create({
    database: database,
    logger
  });
  return await createRouter({
    logger,
    database: db,
    config,
  });
}
```
And finally, in `packages > backend > src > index.ts`:

```diff
+ import infracost from './plugins/infracost'
...
async function main() {
  const config = await loadBackendConfig({
    argv: process.argv,
    logger: getRootLogger(),
  });
  const createEnv = makeCreateEnv(config);
...
+ const infraconstEnv = useHotMemoize(module, () => createEnv('infracost'));
...
+ apiRouter.use('/infracost', await infracost(infraconstEnv));
...
}
```

<br>

## kind Infracost

Here's how kind is structured:

```yaml
apiVersion: veecode.backstage.io/v1alpha1
kind: Infracost
metadata:
  name: "ec2-cluster-test"
  annotations:
    backstage.io/techdocs-ref: dir:.
spec:
  type: FinOps
  lifecycle: experimental
  owner: "group:default/admin"
  estimate:
   $text: ./infracost-base.json
```

Notice that in `spec.estimate` it makes a reference to an internal file called "infracost-base.json", this will be the file generated by the project pipeline, and it must have the name of the file with the infracost information, for good practice we encourage you to follow the name used in this example.
Basically, this is the structure of the file **infracost-base.json** : [infracost-schema](https://github.com/infracost/infracost/tree/master/schema).

<br>

## Routes

Although we have routes for all the methods, such as Create, Update, Delete and Get, so far the plugin only uses 2 endpoints:

| Method | Path   | Endpoint                              |
|--------|--------|---------------------------------------|
| Get    | /      | backendBaseUrl/api/infracost/         |
| Get    | /:name | backendBaseUrl/api/infracost/:name    |

