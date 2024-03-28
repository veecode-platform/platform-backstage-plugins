# VeeCode Scaffolder Extensions

## Intro 💡

The plugin **Veecode Scaffolder Extensions** is an extension of the plugin `@backstage/plugin-scaffolder`, it offers two new customized fields to be used in your backstage application:

- RepoUrlSelector
- ResourcePicker

## Pré Requisitos 📄

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

