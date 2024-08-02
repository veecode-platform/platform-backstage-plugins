# Scaffolder backend module VeeCode Extensions Plugin

## Intro 💡

The plugin **Scaffolder backend module VeeCode Extensions** offers two new customized actions to be used in your backstage application:

- parseJSON
- createFile

## Installation 🔧


If you are using yarn 3.x:

```bash
yarn workspace backend add @veecode-platform/backstage-plugin-scaffolder-backend-module-veecode-extensions
```

If you are using other versions:

```bash
yarn add --cwd packages/backend @veecode-platform/backstage-plugin-scaffolder-backend-module-veecode-extensions
```


## Getting started

#### ⭐ Legacy Backend

### parseJSON

Receive objects transformed into strings, through a request or a specific field, parse this output and return an object with values that can be used in your template.

in `packages/backend/src/plugins/scaffolder.ts`:

```diff
import { CatalogClient } from '@backstage/catalog-client';
import { createBuiltinActions, createRouter } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import type { PluginEnvironment } from '../types';
import { ScmIntegrations } from '@backstage/integration';
+ import { parseJsonAction } from '@veecode-platform/backstage-plugin-scaffolder-backend-module-veecode-extensions';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const catalogClient = new CatalogClient({
    discoveryApi: env.discovery,
  });
  const integrations = ScmIntegrations.fromConfig(env.config);

  const actions = [
+   parseJsonAction(),
    ...createBuiltinActions({
      integrations,
      config: env.config,
      catalogClient,
      reader: env.reader,
    }),
  ];


  return await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    reader: env.reader,
    catalogClient,
    identity: env.identity,
    actions
  });
}
```

Here's an example:

```yaml

     - title: Custom Field
      properties:
        customField:
          title: Reuse Info
          type: string
          ui:field: customField   # example output: "{ "name": "test", "endpoint": "xxxxxxxxx", "type": "yyyyyyy" }"

... #in steps

steps:
   - id: parseInfo
     name: parse Json for infos
     action: veecode-platform:extensions:parseJSON
     input: 
        resource: ${{parameters.customField}}

    - id: template
          name: Fetch Skeleton + Template
          action: fetch:template
          input:
            url: ./skeleton      
            values:
              componentId: ${{ parameters.componentId }}
              description: ${{ parameters.description }}
              resourceName: ${{ steps.parseInfo.output.result.name}}
              resourceEndPoint: ${{ steps.parseInfo.output.result.endpoint}}
              resourceType: ${{ steps.parseInfo.output.result.type}}
  ...
```

---

### CreateFile

This custom action has the functionality of creating a file in the project generated through your template. It works as follows:
It receives content in `base64`, and the format and name of the file to be created:

> ℹ️ So far, the accepted formats are **YAML** and **JSON**

in `packages/backend/src/plugins/scaffolder.ts`:

```diff
import { CatalogClient } from '@backstage/catalog-client';
import { createBuiltinActions, createRouter } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import type { PluginEnvironment } from '../types';
import { ScmIntegrations } from '@backstage/integration';
+ import { createFileAction } from '@veecode-platform/backstage-plugin-scaffolder-backend-module-veecode-extensions';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const catalogClient = new CatalogClient({
    discoveryApi: env.discovery,
  });
  const integrations = ScmIntegrations.fromConfig(env.config);

  const actions = [
+   createFileAction(),
    ...createBuiltinActions({
      integrations,
      config: env.config,
      catalogClient,
      reader: env.reader,
    }),
  ];


  return await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    reader: env.reader,
    catalogClient,
    identity: env.identity,
    actions
  });
}
```

```yaml
      - id: writeFile
      name: Create File
      action: veecode-platform:extensions:createFile
      input:
        path: ./${{ parameters.componentId }}.yaml  # file name + ".extension"
        content: ${{ parameters.UploadFilePicker }}  # referring to the field that was uploaded or the content you want to convey
        format: yaml     # format
```
The ideal use for this function is the custom field **UploadFile**, which allows you to upload files using the template. files through the template and transforms it into `base64` to be consumed by this action.
Here's how to install this field [here ⭐](https://github.com/veecode-platform/platform-backstage-plugins/tree/master/plugins/veecode-scaffolder-extensions) 




#### 🆕 New Backend

To use the new backend system, just add a single import and it will inject all the actions available in the plugin.
Usage is similar to that described above.

In `packages > backend > src > index.ts`:

```diff

import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
backend.add(import('@backstage/plugin-techdocs-backend/alpha'));
...

+ backend.add(@veecode-platform/backstage-plugin-scaffolder-backend-module-veecode-extensions/alpha);


backend.start();
```

<br>