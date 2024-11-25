# VeeCode Assistant AI Backend

## Intro 💡

VeeCode Assistant AI Backend is a plugin that provisions communication with the APIS of the AI engines, processing the data, creating vectors and managing chats and makes them available to the front-end plugin `veecode-assistant-ai`.
As a first delivery only one engine is available, the **openAI**.

## Pre-requisites

- Get an updated version of Backstage.
- Have an openai token.
  

## Installation 🔧


If you are using yarn 3.x:

```bash
yarn workspace backend add @veecode-platform/backstage-plugin-veecode-assistant-ai-backend
```

If you are using other versions:

```bash
yarn add --cwd packages/backend @veecode-platform/backstage-plugin-veecode-assistant-ai-backend
```


## Getting started

### Settings in `app-config.yaml`

We start by configuring the `veecode-assistant-ai` in the file `app-config.yaml`, which is in the root of your project:

```yaml
veecodeAssistantAI:
  openai:
    apiBaseUrl: https://api.openai.com/v1
    apiKey: ${OPENAI_API_KEY}
    assistantName: VeeCode Platform AI #by default we have VeeCode Platform AI
    model: gpt-4o #The desired model, for best results use gpt-4o >
    instructions: 'You are an assistant specialized in the VeeCode platform and Backstage.' #Instructions field for the assistant, by default set to basic
    timeout: 600 #optional
    dataset:    # This key is optional, only if you use the component to generate templates
      model: ft:gpt-4o-2024-08-06:xxxxxxxxxxxx  # the model must be trained
      references:  # References are pre-created template models, following the desired stack, which are referenced through their location (we'll explain more below).
        - id: Terraform Project             
          source: https://xxxxxxxxxxxxx
        - id: Springboot
          source: https://xxxxxxxxxxxxx
        - id: OpenApi
          source: https://xxxxxxxxxxxxx
   ```

You also need to configure the `config.d.ts` file in the backend:
`packages > backend > src > config.d.ts`:

```ts
export interface Config {
    veecodeAssistantAI?:{
      openai?: {
        apiBaseUrl: string;
        apiKey: string;
        assistant: string;
        model: string;
        instructions: string;
        timeout?:string;
        dataset?: {
          model?: string;
          references?: Array<{
            id: string;
            source: string;
            }>;
        }
      }
    }
}
```


The next step will be to configure the backend:

#### ⭐ Legacy Backend

Create a file called **veecodeAssistantAI.ts** in `packages> backend > src > plugins > veecodeAssistantAI.ts`:

```ts
import { PluginEnvironment } from '../types';
import { Router } from 'express';
import {createRouter} from '@veecode-platform/backstage-plugin-veecode-assistant-ai-backend';

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
+ import veecodeAssistantAI from './plugins/veecodeAssistantAI'
...
async function main() {
  const config = await loadBackendConfig({
    argv: process.argv,
    logger: getRootLogger(),
  });
  const createEnv = makeCreateEnv(config);
...
+ const veecodeAssistantAIEnv = useHotMemoize(module, () => createEnv('veecodeAssistantAI'));
...
+ apiRouter.use('/veecode-assistant-ai', await veecodeAssistantAI(veecodeAssistantAIEnv));
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

+ backend.add(import('@veecode-platform/backstage-plugin-veecode-assistant-ai-backend'));

backend.start();
```

<br>

## To train your model and use the template creation module with AI:

To do this, in this example we created this training data set to tune the AI.

**AI used**: OpenAI
**Base model** ': gpt4o
**Data set**: https://gist.github.com/caiolombello/209ef48d1a0e8b0ba76ad83be6fb013f

### AI system prompt:

You are a wizard specialized in writing Backstage templates and configuring `catalog-info.yaml` files. When answering questions or providing code examples, please follow these guidelines: 

1. **Present Yourself as an Expert**: Always start as a Backstage expert, focused on creating templates and configuring `catalog-info.yaml`. 

2. **Provide Complete Answers**: Include complete code in your answers, with no omissions. Ensure that all instructions and parameters are presented clearly and in detail.

3. **Use Structured Formats**: Structure your responses using code markup such as YAML or JSON. Use placeholders (`${}`) where the user must enter their own values.

4. **Validate Compliance and Accuracy**: Ensure that all responses comply with Backstage standards and best practices. Include valid and complete examples.

5. **Explain Customizations**: When providing examples, highlight where and how users should customize the templates to meet their specific needs.

6. **Maintain Clarity and Conciseness**: Present information clearly and concisely, avoiding ambiguity.

7. **Use Placeholders and Annotations**: Use placeholders (`${ values.parameterName }`) for variables to be replaced with actual values. Add annotations to explain the purpose of each field or parameter.

---
### AI Response Example 

```yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: rds-devops-template
  title: RDS DevOps Template
  description: Template for provisioning an RDS instance on AWS.
  annotations: backstage.io/techdocs-ref: dir:.
tags:
 - platform-templates
 - devops
 - aws
spec:
  owner: vertigo/devops
  type: devops

parameters:
 - title: "Environment Settings"
 properties:
  createNewEnvironment:
  title: "Environment Settings"
  type: object
   properties:
    create_new_environment:
    title: "Create new environment"
    type: boolean
    enum:
    - false
    - true
    enumNames:
    - No
    - Yes
    default: false
```

**Response guidelines**
List all necessary properties : include all the properties and specifications needed for a `catalog-info.yaml` valid file.

Highlight possible customizations: clearly explain how and where the user can customize the template, highlighting specific parameters.

Maintain a clear structure: organize answers clearly so that they are easier for users to understand and implement.

Be complete and precise: all instructions must be complete and precise, avoiding assumptions about the user's knowledge.

## My test:

**Input**:
Generate a template for this module:

rds = { instance_class = "db.t3.small" deletion_protection = false multi_az = false availability_zone = "us-east-1a" db = { engine = "postgres" engine_version = "14.4" family = "postgres14" name = "postgres" } storage = { type = "gp2" allocated = 5 max_allocated = 100 encrypted = true } backup = { retention_period = 30 window = "04:00-06:00" } maintenance = { window = "tue:02:00-tue:04:00" auto_minor_version_upgrade = true } } credentials = { username = "postgres" password = "password_secret" }


**output**:
Of course! Here is a complete Backstage template based on the configuration provided for your RDS module:

apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: rds-devops-template
  title: RDS DevOps Template 
  description: Template for provisioning an RDS instance on AWS.
  annotations:
    backstage.io/techdocs-ref: dir:.
  tags:
    - platform-templates
    - devops
    - aws
spec:
  owner: vertigo/devops
  type: devops
  parameters:
    - title: "Environment Settings"
      properties:
        createNewEnvironment:
          title: "Environment Settings"
          type: object
          properties:
            create_new_environment:
              title: "Create new environment"
              type: boolean
              enum:
                - false
                - true
              enumNames:
                - No
                - Yes
              default: false
            environment_name:
              title: "Environment name"
              type: string
              description: "Choose an existing environment or specify a new one."
              ui:field: EnvironmentSelect
              ui:options:
                creatable: true
                backstagePlugin: true
              ui:backstagePlugin:
                name: "environment"
                valueField: "environment_name"
                labelField: "environment_name"
              ui:widget: "EnvironmentExists"
              ui:exists:
                section: "settings"
            environment_time_to_live:
              title: "Environment TTL"
              description: "This is the default environment TTL. It will be forced if the environment is new."
              type: object
              ui:field: CategoryGrid
              properties:
                set_max_lifetime:
                  title: "Set max lifetime"
                  type: boolean
                  default: false
                max_lifetime:
                  title: "Max lifetime"
                  type: string
                  default: ""
                  ui:widget: DateTimePicker
            instances_settings:
              title: "Instances settings"
              type: object
              ui:field: CategoryGrid
              properties:
                allowPerInstanceShutdown:
                  title: "Allow per instance shutdown"
                  type: boolean
                  description: "Allow requests to create and delete instances individually."
                  default: false
    - title: "Deployment Settings"
      properties:
        rds:
          title: "RDS Instance Configuration"
          type: object
          properties:
            instance_class:
              title: "Instance Class"
              type: string
              default: "db.t3.small"
            deletion_protection:
              title: "Deletion Protection"
              type: boolean
              default: false
            multi_az:
              title: "Multi-AZ Deployment"
              type: boolean
              default: false
            availability_zone:
              title: "Availability Zone"
              type: string
              default: "us-east-1a"
        db:
          title: "Database Configuration"
          type: object
          properties:
            engine:
              title: "Engine"
              type: string
              default: "postgres"
            engine_version:
              title: "Engine Version"
              type: string
              default: "14.4"
            family:
              title: "Family"
              type: string
              default: "postgres14"
            name:
              title: "Database Name"
              type: string
              default: "postgres"
        storage:
          title: "Storage Configuration"
          type: object
          properties:
            type:
              title: "Storage Type"
              type: string
              default: "gp2"
            allocated:
              title: "Allocated Storage (GB)"
              type: integer
              default: 5
            max_allocated:
              title: "Max Allocated Storage (GB)"
              type: integer
              default: 100
            encrypted:
              title: "Encrypted"
              type: boolean
              default: true
        backup:
          title: "Backup Configuration"
          type: object
          properties:
            retention_period:
              title: "Retention Period (days)"
              type: integer
              default: 30
            window:
              title: "Backup Window"
              type: string
              default: "04:00-06:00"
        maintenance:
          title: "Maintenance Configuration"
          type: object
          properties:
            window:
              title: "Maintenance Window"
              type: string
              default: "tue:02:00-tue:04:00"
            auto_minor_version_upgrade:
              title: "Auto Minor Version Upgrade"
              type: boolean
              default: true
        credentials:
          title: "Database Credentials"
          type: object
          properties:
            username:
              title: "Username"
              type: string
              default: "postgres"
            password:
              title: "Password"
              type: string
              default: "password_secreto"
              
-if you replace the passwords, check the actual ones and adjust the settings as necessary for your environment.


## After training and creating your model, you can then reference it in the `app-config.yaml`:

```yaml
veecodeAssistantAI:
  openai:
    apiBaseUrl: https://api.openai.com/v1
    apiKey: ${OPENAI_API_KEY}
    assistantName: VeeCode Platform AI 
    model: gpt-4o 
    instructions: 'Você é um assistente especializado na plataforma VeeCode.' 
    timeout: 600 
    dataset:    
      model: ${MODELO_TREINADO}  # informando ele na chave dataset.model
      references:  # Abaixo vamos detalhar as referencias
        - id: Terraform Project             
          source: https://xxxxxxxxxxxxx
        - id: Springboot
          source: https://xxxxxxxxxxxxx
        - id: OpenApi
          source: https://xxxxxxxxxxxxx
   ```

## Referencias

The references that will further enrich your prompt in the hope of returning a template that is fairer to what is expected, should follow a very simple model:
- **id**: This refers to the name of the referenced stack, for example "EKS Provision";
**source**: Refers to a remote repository that will provide template code for the template to follow, so we can maintain a standard according to your needs at development time.

[See an example of a reference template here.See an example of a reference template here](https://gitlab.vertigo-devops.com/vertigobr/ia/autoskaff/-/tree/main/reference)

## Routes

| Method | Path                                        | Endpoint                                               |
|--------|---------------------------------------------|--------------------------------------------------------|
| POST    | /submit-repo                     | backendBaseUrl/api/veecode-assistant-ai/submit-repo                               |
| POST    | /chat-analyze-repo              | backendBaseUrl/api/veecode-assistant-ai/chat-analyze-repo  |
| DELETE    | /chat-analyze-repo                    | backendBaseUrl/api/veecode-assistant-ai/chat-analyze-repo        |
| POST    | /upload-template                     | backendBaseUrl/api/veecode-assistant-ai/upload-template                               |
| POST    | /chat-template              | backendBaseUrl/api/veecode-assistant-ai/chat-template  |
| DELETE    | /chat-template                   | backendBaseUrl/api/veecode-assistant-ai/chat-template        |

---


## Permissions

**See 👉**[VeeCode Assistant AI Common](https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/veecode-assistant-ai-common/README.md)


This plugin provides the following permissions:

- `veecodeAssistantAIReadPermission` 👉 Permission to make the plugin visible and access it.
- `veecodeAssistantAIScaffolderReadPermission` 👉 Permission to make the template generation feature visible.
- `veecodeAssistantAIAnalyzerReadPermission` 👉 Permission to make the local repository analysis feature visible.


> 🚨 View Backstage docs to learn how to set up your instance of Backstage to use these permissions.
