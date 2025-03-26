# Vee Backend

## Intro 💡

Vee Backend is a plugin that provisions communication with the APIS of the AI engines, processing the data, creating vectors and managing chats and makes them available to the front-end plugin `vee`.
As a first delivery only one engine is available, the **openAI**.

## Pre-requisites

- Get an updated version of Backstage.
- Have an openai token.
  

## Installation 🔧


If you are using yarn 3.x:

```bash
yarn workspace backend add @veecode-platform/backstage-plugin-vee-backend
```

If you are using other versions:

```bash
yarn add --cwd packages/backend @veecode-platform/backstage-plugin-vee-backend
```


## Getting started

### Settings in `app-config.yaml`

We start by configuring the `vee` in the file `app-config.yaml`, which is in the root of your project:

```yaml
vee:
  openai:
    apiBaseUrl: https://api.openai.com/v1
    apiKey: ${OPENAI_API_KEY}
    model: gpt-4o #The desired model, for best results use gpt-4o >
    templateGeneration:
      model: ${CUSTOM_MODEL} <- This model needs to be trained to generate qualified templates.
      catalog: ${TEMPLATE_CATALOG_URL}
   ```

You also need to configure the `config.d.ts` file in the backend:
`packages > backend > src > config.d.ts`:

```ts
export interface Config {
    vee?:{
      openai?: {
        apiBaseUrl: string;
        apiKey: string;
        model: string;
        timeout?:string;
        templateGeneration?: {
          model?: string;
          catalog?: string;
        }
      }
    }
}
```


The next step will be to configure the backend:

#### ⭐ Legacy Backend

Create a file called **vee.ts** in `packages> backend > src > plugins > vee.ts`:

```ts
import { PluginEnvironment } from '../types';
import { Router } from 'express';
import {createRouter} from '@veecode-platform/backstage-plugin-vee-backend';

export default async function createPlugin({
  logger,
  auth,
  httpAuth,
  httpRouter,
  permissions,
  discovery,
  config
}: PluginEnvironment): Promise<Router> {

  return await createRouter({
  logger,
  auth,
  httpAuth,
  httpRouter,
  permissions,
  discovery,
  config
  });
}
```
In `packages > backend > src > index.ts`:

```diff
+ import vee from './plugins/vee'
...
async function main() {
  const config = await loadBackendConfig({
    argv: process.argv,
    logger: getRootLogger(),
  });
  const createEnv = makeCreateEnv(config);
...
+ const veeEnv = useHotMemoize(module, () => createEnv('vee'));
...
+ apiRouter.use('/vee', await vee(veeEnv));
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

+ backend.add(import('@veecode-platform/backstage-plugin-vee-backend'));

backend.start();
```

<br>
### 🤖 Training your AI model<br><br>
To ensure that the results follow the expected pattern, we need to train with the model used.<br>
Here's how ➡️ [click](https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/vee/training-your-model/README.md).
   ```


## 🌎 Routes

| Method | Path                              | Endpoint                                      |
|--------|-----------------------------------|-----------------------------------------------|
| POST   | `/submit-repo`                    | `backendBaseUrl/api/vee/submit-repo`          |
| POST   | `/chat-analyze-repo`              | `backendBaseUrl/api/vee/chat-analyze-repo`    |
| DELETE | `/chat-analyze-repo`              | `backendBaseUrl/api/vee/chat-analyze-repo`    |
| POST   | `/clone-repository`               | `backendBaseUrl/api/vee/clone-repository`     |
| POST   | `/partial-clone-repository`       | `backendBaseUrl/api/vee/partial-clone-repository`|
| POST   | `/submit-template`                | `backendBaseUrl/api/vee/submit-template`      |
| POST   | `/chat-template`                  | `backendBaseUrl/api/vee/chat-template`        |
| DELETE | `/chat-template`                  | `backendBaseUrl/api/vee/chat-template`        |
| GET    | `/fixedOptions`                   | `backendBaseUrl/api/vee/fixedOptions`         |
| GET    | `/fixedOptions/:fixedOptionsId`   | `backendBaseUrl/api/vee/fixedOptions/:fixedOptionsId`|
| POST   | `/fixedOptions`                   | `backendBaseUrl/api/vee/fixedOptions`         |
| PATCH  | `/fixedOptions/:fixedOptionsId`   | `backendBaseUrl/api/vee/fixedOptions/:fixedOptionsId`|
| DELETE | `/fixedOptions/:fixedOptionsId`   | `backendBaseUrl/api/vee/fixedOptions/:fixedOptionsId`|
| GET    | `/stacks`                         | `backendBaseUrl/api/vee/stacks`               |
| GET    | `/stacks/:stackId`                | `backendBaseUrl/api/vee/stacks/:stackId`      |
| POST   | `/stacks`                         | `backendBaseUrl/api/vee/stacks`               |
| PATCH  | `/stacks/:stackId`                | `backendBaseUrl/api/vee/stacks/:stackId`      |
| DELETE | `/stacks/:stackId`                | `backendBaseUrl/api/vee/stacks/:stackId`      |
| GET    | `/plugins`                        | `backendBaseUrl/api/vee/plugins`              |
| GET    | `/plugins/:pluginId`              | `backendBaseUrl/api/vee/plugins/:pluginId`    |
| POST   | `/plugins`                        | `backendBaseUrl/api/vee/plugins`              |
| PATCH  | `/plugins/:pluginId`              | `backendBaseUrl/api/vee/plugins/:pluginId`    |
| DELETE | `/plugins/:pluginId`              | `backendBaseUrl/api/vee/plugins/:pluginId`    |

---


### 🔐 Permissions
The permissions for the first version are broader, less granular and follow the following patternPermissions
The permissions for the first version are broader, less granular and follow the following pattern:

| Permission                               | Description                                              |
|------------------------------------------|----------------------------------------------------------|
| `veeReadPermission`                      | Permission to read the Vee plugin                        |
| `veeAnalyzerReadPermission`              | Permission for the plugin to analyze code                |
| `veeAnalyzerSaveChangesInRepoPermission` | Permission to save changes to the repository via pull request |
| `veeAccessSettingsPanelPermission`       | Permission to access settings                            |
| `veeGenerateTemplatePermission`          | Access to the template generation menu                   |
| `veeSaveTemplatePermission`              | Permission to save templates                             |
| `veeManageStacksPermission`              | Manage stacks (create, edit, delete)                     |
| `veeManagePluginsPermission`             | Manage plugins (create, edit, delete)                    |
| `veeManageFixedOptions`                  | Manage fixed options (create, edit, delete)              |

<br><br>

##### 💡 To find out more about permissions [here](https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/vee-common/README.md)


> 🚨 View Backstage docs to learn how to set up your instance of Backstage to use these permissions.
