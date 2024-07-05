# VeeCode Scaffolder Extensions

## Intro 💡

The plugin **Veecode Scaffolder Extensions** is an extension of the plugin `@backstage/plugin-scaffolder`, it offers two new customized fields to be used in your backstage application:

- RepoUrlSelector
- ResourcePicker

## Pre-requisites📄

- Backstage version: "^1.23.4"
- @backstage/plugin-scaffolder": "^1.18.0",
- @backstage/plugin-scaffolder-react": "^1.8.3",


## Installation 🔧


If you are using yarn 3.x:

```bash
yarn workspace app add @veecode-platform/veecode-scaffolder-extensions
```

If you are using other versions:

```bash
yarn add --cwd packages/app @veecode-platform/veecode-scaffolder-extensions
```


## Getting started

### RepoUrlSelector

To configure RepoUrlSelector, we need to make a few settings first:

1-In the file `app-config.yaml` we need to add the key *scaffolder** and the information about the provider, like this:
```diff
...
+ scaffolder:
+   providers:
+     github:
+       - host: github.com
+         token: ${GITHUB_TOKEN_SECRET}
+     gitlab:
+       - host: gitlab.com
+         token: ${GITLAB_TOKEN_SECRET}
```

<br/>

> ⚠️ So far, the plugin only offers repository discovery for Github and Gitlab. For the other providers, this first step isn't necessary, as it will automatically take over the existing pattern in the `RepoUrlPicker` field.

<br/>

2- In the file `Packages > app > App.tsx` , we should make a small change:
```diff
...
+ import { ScaffolderFieldExtensions } from '@backstage/plugin-scaffolder-react';
+ import { RepoUrlSelectorExtension} from '@veecode-platform/veecode-scaffolder-extensions';

...

const routes = (
  <FlatRoutes>
   ...

-  <Route path="/create" element={<ScaffolderPage />}>
+    <Route path="/create" element={<ScaffolderPage />}>
+      <ScaffolderFieldExtensions>
+          <RepoUrlSelectorExtension/>
+      </ScaffolderFieldExtensions>
+    </Route>
  ...

  </FlatRoutes>
);

...
```

To make the **scaffolder** key information in `app-config.yaml` visible and accessible, we need to make a few changes:
In the `packages.json` present in `packages>app>package.json`, add the following code:

```diff
{
  "name": "app",
  "version": "0.0.0",
  "private": true,
  "bundled": true,
  "backstage": {
    "role": "frontend"
  },
...
+  "configSchema": "config.d.ts"
}
```

Then create a file called `config.d.ts` at the same level as `package.json`:

```ts
export interface Config {
  /**
  * Configuration for scaffolder towards various external repository provider systems
  * @visibility frontend
  */
  scaffolder?: {
    /**
    * @visibility frontend
    */
    providers:{
      /** Integration configuration for GitHub */
        github?: Array<{
          /**
           * The hostname of the given GitHub instance
           * @visibility frontend
           */
          host: string;
          /**
           * Token used to authenticate requests.
           * @visibility frontend
           */
          token?: string;
        }>;

        /** Integration configuration for Gitlab */
        gitlab?: Array<{
          /**
           * The hostname of the given Gitlab instance
           * @visibility frontend
           */
          host: string;
          /**
           * Token used to authenticate requests.
           * @visibility frontend
           */
          token?: string;
        }>;
      };
    }
}

```

You can now use the field in your templates.

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/ffdd052f-6a94-4a17-8dde-f1ce00b0421d)


Add the field to your template file like this:

```yaml
    - title: Choose a location
      required:
        - repoUrl
      properties:
        repoUrl:
          title: Repository Location
          type: string
          description: Choose a location to create the Express Project
          reuseName:  # optional ->  If you want to reuse the name of the component as the name of your repository, just enter the key of the parameter where the name of the component is, for example: componentId
          ui:field: RepoUrlSelector
          ui:options:
            allowedHosts:
              - github.com
```

In the case of `github` or `gitlab`, you can omit the `allowedHosts`, the scaffolder will consult if there is the provider configured in the `app-config.yaml` and it will automatically pull in the host and the orgs belonging to it.

```diff
    - title: Choose a location
      required:
        - repoUrl
      properties:
        repoUrl:
          title: Repository Location
          type: string
          description: Choose a location to create the Express Project
          ui:field: RepoUrlSelector
          ui:options:
-            allowedHosts:
-              - github.com
```


---


### ResourcePicker

In the context of using the `ResourcePicker` component, the environment is used to reuse information that will be useful when creating new entities for the catalog.


We have developed customizable components to provide scaffolder with the ability to analyze environment key information of our type.


With it we can approach the reuse of this information in the creation of entities via templates.

Example of the `catalog-info.yaml` of an entity:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Environment
metadata:
  name: "test_environment"
  environment:
    domain: your.domain
    hostedZoneId: xxxxxxxxxxxxxxx
    vpc_id: vpc-xxxxxxxxxxxxxxx
    vpc_name: xxxxxxxxxxx
    certManagerEmail: xxx@xxx.com
    certManagerIssuerType: staging
  annotations:
    github.com/project-slug: xxxxxxxxxxxxxxxxxx
    backstage.io/techdocs-ref: dir:.
spec:
  type: service
  lifecycle: development
  owner: "group:default/admin"
```

Example of using `ResourcePicker` in a template:

    - title: Enviroment Settings
      properties:
        environmentResource:
          title: Select the enviromnet from our catalog
          type: object
          ui:field: ResourcePicker
          ui:options:
            catalogFilter:
              kind: [Environment]
              #type: 'service' <- example ...  It is optional, it expects a string to filter a specific type of the kind selected above, if it has it.
            

In this case, we will list in the catalog all our entities that have the type `Environment` , and behind the scenes we will scan the metadata.environment key of the chosen entity, and thus parse the information as values to serve the skeleton of our template.

> ℹ️ We've used the custom kind `Environment` as an example, but the field can be used with any kind, as long as its `catalog-info.yaml` the selected component has a key "metadata.environment" and within it the values to be used, following the key-value order.


example:

```yaml
...
  steps:
    - id: template
      name: Fetch Skeleton + Template
      action: fetch:template
      input:
        url: ./skeleton      
        values:
          vpc: ${{ parameters.environmentResource.vpc_id }}
          domain: ${{ parameters.environmentResource.domain }}
...
```

ℹ️ Remember to validate that the selected entity has this property, otherwise the values will be empty.

The example above shows the properties of a custom kind called environment, which can be installed in your application using our [VeeCode Platform Common plugin ⭐](https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/veecode-platform-common/README.md).

--- 

### UploadFilePicker

This custom field is used to upload files to our templates, it receives a file and transforms it into `base64` to be dealt with later.

> ℹ️ At the moment the only formats accepted are **JSON** and **YAML**.

We encourage you to use a custom action to handle the output of this field, we even have a custom action plugin to handle the output of this component and create a file within the skeleton of your template. [scaffolder-backend-module-veecode-extensions plugin ⭐](https://github.com/veecode-platform/platform-backstage-plugins/tree/master/plugins/scaffolder-backend-module-veecode-extensions).

**Example of use**

```yaml
 ...your template

    - title: Upload a file
      properties:
        UploadFilePicker:
          #title: -> optional
          #description: -> optional
          type: string
          ui:field: UploadFilePicker
          ui:options:
            format: yaml  #or json
          ui:backstage:
            review:
              show: false

...
```

This is what the rendering of the field will look like:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/dd61a165-ceb9-4fd0-9fa5-a3219db6a5cc)

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/fad17dfb-b196-44b2-af1c-d2de25663c87)

As previously mentioned, the output of this field will be a `base64`. To handle this output and create a new file within our skeleton, we'll use a custom action present in the plugin **@scaffolder-backend-module-veecode-extension**, call `Create File`:

```yaml
# Steps
  steps:
    - id: createFile
      name: Create File
      action: veecode-platform:extensions:createFile
      input:
        path: ./${{ parameters.componentId }}.yaml  # file name + ".extension"
        content: ${{ parameters.UploadFilePicker }}  # referring to the field that was uploaded
        format: yaml     # format
```
---

### OptionsPicker

The **OptionPicker** is a customized field with the purpose of retrieving the context of the template that was typed in and iterating over it. One of its prerequisites is that it always knows the context before it, i.e. all the parameters typed before it, the other prerequisite is that it expects in its **key** filter a data type object, and in its second filter it expects a **property** which must be an array of strings. With this, we can assemble a data selector taking advantage of some previously passed parameter and enriching the construction options of your project.<br>
In the example below we use the **resourcePicker** field which always returns an object, the **Environment** filter will return an array of entities that have the Environment kind and are in the Backstage catalog. Note that immediately afterwards, we add a new step to fill in the template, entitled"**Define Subnet**, in `ui:field` we set the **OptionsPicker** field, below in `ui:options `, we pass which **key** of the template we are retrieving from the context, see that we retrieve the **environmentResource** key, i.e. we retrieve the object that was selected in this step, and in **property** we define which property of this object we want to scan.<br>

> **Obs**: This selected kind has a property called subnets, and its value is a string array

```diff
    - title: Resource Reuse
      properties:
        environmentResources:
         type: object
         ui:field: ResourcePicker
         ui:options:
           catalogFilter:
             kind: [Environment]

+    - title: Define Subnet
+      properties:
+        subnets:
+         title: Select the subnets            // set a title for the section
+         description: Select the subnets from Environment   // I set a personalized description
+         type: string
+         ui:field: OptionsPicker            
+         ui:options:
+           key: environmentResources       // here we choose the parameter key
+           property: subnets               // the property that belongs to my parameter.
```

At the end of this step, we'll be able to select an object, and in the next step we'll be able to select an option from the previously selected object, in other words we'll be using the context in scaffolder time to enrich our creation process.<br>

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/63b03d5b-2e0a-4c0c-a0c9-47b43d439221)


