# VeeCode Scaffolder Extensions

## Intro 💡

The plugin **Veecode Scaffolder Extensions** is an extension of the plugin `@backstage/plugin-scaffolder`, it offers two new customized fields to be used in your backstage application:

- RepoUrlSelector
- ResourcePicker

## Pre-requisites📄

- Backstage version: "1.23.4"
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
+   github:
+     - host: github.com
+       token: ${GITHUB_TOKEN_SECRET}
+   gitlab:
+    - host: gitlab.com
+      token: ${GITLAB_TOKEN_SECRET}
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

