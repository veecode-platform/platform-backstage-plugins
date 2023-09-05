# Github Workflows Plugin
<br>
The GithubWorkflows plugin provides an alternative for manually triggering GitHub workflows from within your Backstage component.

The plugin offers two distinct approaches to integrate with your component:

- On-demand workflows, which are configured via annotations in your project's `catalog-info.yaml`.
- A complete listing of the workflows available in your project.
<br>

### Getting Started:
<br>

Before installing the plugin, there are some prerequisites to ensure its functionality:

- Have a locally installed Backstage project, :heavy_check_mark: [How to create a Backstage app :page_with_curl:](https://backstage.io/docs/getting-started/create-an-app) .
- Set up the catalog and integrate with GitHub, :heavy_check_mark: [How to configure the integration :page_with_curl:](https://backstage.io/docs/integrations/) .
- Configure GitHub authentication, :heavy_check_mark: [How to configure authentication :page_with_curl:](https://backstage.io/docs/auth/) .
- Configure the default GitHub Actions plugin, :heavy_check_mark: [Documentation of the Github actions plugin :page_with_curl:](https://github.com/backstage/backstage/tree/master/plugins/github-actions) .
<br>

### Installation
<br>

`````bash
yarn add --cwd packages/app @veecode-platform/backstage-plugin-github-workflows
`````
<br>

### Configuration

We'll divide the configuration into three steps:

1- Proxy Configuration.

In the app-config.yaml file:

```yaml
proxy:
  '/github-workflows':
    target: https://api.github.com/repos
    allowedHeaders: ['Authorization', 'X-GitHub-Api-Version']
    headers: 
      Authorization: Bearer ${GITHUB_TOKEN_SECRET}
      Accept: application/vnd.github+json
      X-GitHub-Api-Version: "2022-11-28"
```

> :information_source: Remember to set the ${GITHUB_TOKEN_SECRET} variable with your GitHub personal token.

<br>

2- To trigger workflows directly from our component, it's important to add the ` workflow_dispatch:` step in our GitHub workflow, like this:

```diff
# Workflow Example

name: Deploy Next.js site to Pages

on:
  push:
    branches: ["master"]
+ workflow_dispatch:

 ....
```

Even if no parameters are passed to this key, it must be present in the file to enable event triggering through the Backstage component.

>
>
>#####  Parameters
>
>:information_source: It's possible to set parameters in the workflow as well, and the plugin understands them. Actions will only be triggered if the required parameters are sent.
>
>

<br>

3- We need a primary annotation, commonly used by all Backstage components,`github.com/project-slug`, where the project name is set.

As a main prerequisite, this annotation must be declared in the `catalog-info.yaml`of the component that will receive this functionality.

```diff
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: "Example Component"
  description: "An example Backstage Components"
  links:
    - title: Website
      url: http://backstage.io
    - title: Documentation
      url: https://backstage.io/docs
    - title: Storybook
      url: https://backstage.io/storybook
    - title: Discord Chat
      url: https://discord.com/invite/EBHEGzX
  annotations:
+    github.com/project-slug: example/ExampleComponent
    backstage.io/techdocs-ref: dir:.
   
spec:
  type: website
  lifecycle: experimental
  owner: default
```

<br>
<hr/>
<br>

### Workflows List
<br>


![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/6c82c7c7-b7e3-4bde-853f-c161e71dbb9e)




<br>

The component essentially lists all the workflows available in the repository.
In its header, we highlight the select that filters all available branches in the project and the refresh button to update the workflow states.

The table is divided by workflow name, status, action, and link to the repository.

In some cases, to trigger an action, it may require parameters, as configured in your workflow. Instead of an action button, a modal is displayed to set the requested parameters:

<br>

![image2](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/06390934-c04e-4059-bf01-551a467a294a)

<br>

When an event is triggered in the workflow, the status is updated, and the conclusion is returned after refreshing the table.

<br>

![image3](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/9b92c472-45de-4e64-9618-b96cc8a574c3)

<br>

We encourage users to create a new tab in their catalog named "Workflows" and keep the "CI-CD" tab with the default Backstage component. In the following sections, we'll explain the integration between the two plugins.


**Example of adding the new tab to a serviceEntityPage**
`packages/app/src/components/catalog/EntityPage.tsx`



```diff
+ import { GithubWorkflowsList } from '@veecode-platform/backstage-plugin-github-workflows'

const serviceEntityPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/ci-cd" title="CI/CD">
      {cicdContent}
    </EntityLayout.Route>
    
+   <EntityLayout.Route path="/workflows" title="Workflows">
+       <EntitySwitch>
+    	<EntitySwitch.Case if={isGithubActionsAvailable}>
+      		<GithubWorkflowsList/>
+    	</EntitySwitch.Case>
+    	<EntitySwitch.Case>
+      	<EmptyState
+        title="No CI/CD available for this entity"
+        missing="info"
+        description="You need to add an annotation to your component if you want to enable CI/CD for it. You can read more about 
+        annotations in Backstage by clicking the button below."
+        action={
+          <Button
+            variant="contained"
+            color="primary"
+            href="https://backstage.io/docs/features/software-catalog/well-known-annotations"
+          >
+            Read more
+          </Button>
+        }
+      />
+    		</EntitySwitch.Case>
+  		</EntitySwitch>
+    </EntityLayout.Route>

    <EntityLayout.Route path="/api" title="API">
      <Grid container spacing={3} alignItems="stretch">
        <Grid item md={6}>
          <EntityProvidedApisCard />
        </Grid>
        <Grid item md={6}>
          <EntityConsumedApisCard />
        </Grid>
      </Grid>
    </EntityLayout.Route>

    <EntityLayout.Route path="/dependencies" title="Dependencies">
      <Grid container spacing={3} alignItems="stretch">
        <Grid item md={6}>
          <EntityDependsOnComponentsCard variant="gridItem" />
        </Grid>
        <Grid item md={6}>
          <EntityDependsOnResourcesCard variant="gridItem" />
        </Grid>
      </Grid>
    </EntityLayout.Route>

    <EntityLayout.Route path="/docs" title="Docs">
      {techdocsContent}
    </EntityLayout.Route>
  </EntityLayout>
);

```
<br>
<hr/>
<br>


### Workflow Cards

For this component, we need to add a special annotation, `github.com/workflows`, like this:



```diff
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: "Example Component"
  description: "An example Backstage Components"
  links:
    - title: Website
      url: http://backstage.io
    - title: Documentation
      url: https://backstage.io/docs
    - title: Storybook
      url: https://backstage.io/storybook
    - title: Discord Chat
      url: https://discord.com/invite/EBHEGzX
  annotations:
    github.com/project-slug: example/ExampleComponent
    backstage.io/techdocs-ref: dir:.
+   github.com/workflows: fileName.yaml
   
spec:
  type: website
  lifecycle: experimental
  owner: default
```



The composition of the **annotation** works like this:
<br>

<img src="https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/0158be50-8034-4cd0-a304-7b4233578cc0" style="width: 400px; margin: 2rem 0" />

<br>

:information_source:  It's important to note that you can add multiple **workflow paths**, separated by commas, like this:

```yaml
github.com/workflows: filePath.yml,filePath2.yml,filePath3.yml,
```


The functionality is identical to the workflow listing component, with the main difference being that only the workflows passed via annotation are listed, instead of all the workflows in the repository.


<br>

![image5](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/39ff37fa-6ca6-4a8e-9f23-499353801b53)


<br>


As an indication, we use the cards directly in the component overview, like this:

`packages/app/src/components/catalog/EntityPage.tsx`

```diff
+ import { isGithubWorkflowsAvailable, GithubWorkflowsCard } from '@veecode-platform/backstage-plugin-github-workflows'

....

const overviewContent = (
  <Grid container spacing={3} alignItems="stretch">
    {entityWarningContent}
    <Grid item md={6}>
      <EntityAboutCard variant="gridItem" />
    </Grid>
    <Grid item md={6} xs={12}>
      <EntityCatalogGraphCard variant="gridItem" height={400} />
    </Grid>

+    <EntitySwitch>
+      <EntitySwitch.Case if={isGithubWorkflowsAvailable}>
+        <Grid item lg={8} xs={12}>
+            <GithubWorkflowsCard />
+        </Grid>
+      </EntitySwitch.Case>
+    </EntitySwitch>
    
    <Grid item md={4} xs={12}>
      <EntityLinksCard />
    </Grid>
    <Grid item md={8} xs={12}>
      <EntityHasSubcomponentsCard variant="gridItem" />
    </Grid> 
  </Grid>
);
```

It works like this:

<br>

![image6](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/34593129-68bc-44a0-aee7-b1d8c7d12743)


<br>

In its header we have the select of the repository branches and a refresh button.

In its body, the workflows that were added via annotation, and each card has its status, workflow name as label and the action button.

As with the Workflow list, there are cases of workflows that trigger parameters before releasing their actions, and the card has the same behavior as the Workflow list, it triggers a modal so that the inputs are set:

<br>

![Captura de tela de 2023-08-14 10-30-03](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/83d16247-3b7a-4939-9736-af9ff6a89ae7)


<br>

![image8](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/4051b0d1-a51a-40ae-9924-081d283e3662)


<br>

The functioning of the actions is also similar, when you click on the action button, it updates the status according to the github response:

<br>

![image9](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/f9f9e2ad-70ff-468e-b45c-7d5e1f2dc60d)


<br>


### Integration with github actions plugin

For a greater experience, we highlight the use of the default github actions plugin that backstage already provides, where it lists all the runs executed in the repository, and in it are also present all the logs of each action.

In the Workflows List component, integration occurs by clicking on the Logs column:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/81419190-f31b-4b03-bf8c-6d8d037ddfa2)

In the Card component, the integration occurs by clicking under the component label:

![image (1)](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/2e502435-2cfd-44ad-b400-3100a6675544)


With it correctly installed and available in the **CI-CD** tab, we were able to integrate the triggers of the actions with their logs and all their history:

<br>


![image10](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/3aec7a92-0fdb-4058-9f04-1b8cdb712966)



