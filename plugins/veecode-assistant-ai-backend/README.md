# VeeCode Assistant AI Backend

## Intro 💡

O VeeCode Assistant AI Backend é um plugin que provisiona a comunicação com as APIS dos motores de IA, processando os dados, criando vetores e gerenciando chats e os disponibiliza para o plugin de front `veecode-assistant-ai`.
Como primeira entrega apenas uma engine está disponível, a **openAI**.

## Pre-requisites

- Get an updated version of Backstage.
- Ter um token da openai
  

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
    assistantName: VeeCode Platform AI #por padrão temos o VeeCode Platform AI
    model: gpt-4o #O modelo desejado, para melhores resultados utilize o gpt-4o >
    instructions: 'Você é um assistente especializado na plataforma VeeCode.' #Campo de instruções para a assitente, por padrão defina o básico
    timeout: 600 #optional
    dataset:    # Essa chave é opcional, apenas no caso do uso do componenente para geração de templates
      model: ft:gpt-4o-2024-08-06:vertigo:platform:A1vY9cad  # o modelo deve ser treinado
      references:  # Referencias são modelos de template pré criados, seguindo a stack desejada, são referenciados através de seu location (explicaremos melhor abaixo)
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

## Para treinar seu modelo e utilizar o módulo de criação de template com IA:

Para fazer isso, nesse exemplo criamos este conjunto de dados de treinamento para ajustar a IA.

**IA usada**: OpenAI
**Modelo base** ': gpt4o
**Conjunto de dados**: https://gist.github.com/caiolombello/209ef48d1a0e8b0ba76ad83be6fb013f

### Prompt do sistema de IA:

You are a wizard specialized in writing Backstage templates and configuring `catalog-info.yaml` files. When answering questions or providing code examples, please follow these guidelines: 

1. **Present Yourself as an Expert**: Always start as a Backstage expert, focused on creating templates and configuring `catalog-info.yaml`. 

2. **Provide Complete Answers**: Include complete code in your answers, with no omissions. Ensure that all instructions and parameters are presented clearly and in detail.

3. **Use Structured Formats**: Structure your responses using code markup such as YAML or JSON. Use placeholders (`${}`) where the user must enter their own values.

4. **Validate Compliance and Accuracy**: Ensure that all responses comply with Backstage standards and best practices. Include valid and complete examples.

5. **Explain Customizations**: When providing examples, highlight where and how users should customize the templates to meet their specific needs.

6. **Maintain Clarity and Conciseness**: Present information clearly and concisely, avoiding ambiguity.

7. **Use Placeholders and Annotations**: Use placeholders (`${ values.parameterName }`) for variables to be replaced with actual values. Add annotations to explain the purpose of each field or parameter.

--- ### AI Response Example ```yaml apiVersion: scaffolder.backstage.io/v1beta3 kind: Template metadata: name: rds-devops-template title: RDS DevOps Template description: Template for provisioning an RDS instance on AWS.
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
Diretrizes de resposta
Listar todas as propriedades necessárias : incluir todas as propriedades e especificações necessárias para um catalog-info.yamlarquivo válido.

Destaque possíveis personalizações : explique claramente como e onde o usuário pode personalizar o modelo, destacando parâmetros específicos.

Mantenha uma estrutura clara : organize as respostas claramente para que sejam mais fáceis de entender e implementar pelos usuários.

Seja completo e preciso : todas as instruções devem ser completas e precisas, evitando suposições sobre o conhecimento do usuário.

## My test:

Input:
Gere um modelo para este módulo:

rds = { instance_class = "db.t3.small" deletion_protection = false multi_az = false availability_zone = "us-east-1a" db = { engine = "postgres" engine_version = "14.4" family = "postgres14" name = "postgres" } storage = { type = "gp2" allocated = 5 max_allocated = 100 encrypted = true } backup = { retention_period = 30 window = "04:00-06:00" } maintenance = { window = "tue:02:00-tue:04:00" auto_minor_version_upgrade = true } } credentials = { username = "postgres" password = "password_secreto" }


output:
Claro! Aqui está um modelo Backstage completo baseado na configuração fornecida para o seu módulo RDS:

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
              
-se de substituir as senhas, verifique os reais e ajuste as configurações conforme necessário para o seu ambiente.


## Após treinar e criar seu modelo, então voce pode o referenciar no `app-config.yaml`:

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

As referencias que irão enriquecer ainda mais seu prompt na esperança de retornar um template mais justo ao que se espera, deve seguir um modelo bem simples:
- **id**: Se refere ao nome da stack referenciada, por exemplo "EKS Provision";
  **source**: Se refere a um repositorio remoto que irá fornecer um código de modelo para o template seguir, assim conseguimos manter um padrão de acordo com suas necessidades em tempo de desenvolvimento.

  Veja um exemplo de modelo de referencia aqui[link].
  https://gitlab.vertigo-devops.com/vertigobr/ia/autoskaff/-/tree/main/reference

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