# Github Workflows Plugin


The GithubWorkflows plugin provides an alternative for manually triggering GitHub workflows from within your Backstage component.

The plugin offers two distinct approaches to integrate with your component:

- On-demand workflows, which are configured via annotations in your project's `catalog-info.yaml`.
- A complete listing of the workflows available in your project.



### Our community

> 💬  **Join Us**
>
> Join our community to resolve questions about our **Plugins**. We look forward to welcoming you! <br>
>
>    [Go to Community  🚀](https://github.com/orgs/veecode-platform/discussions)

<br>

### Getting Started:



Before installing the plugin, there are some prerequisites to ensure its functionality:

- Have a locally installed Backstage project, :heavy_check_mark: [How to create a Backstage app :page_with_curl:](https://backstage.io/docs/getting-started/create-an-app) .
- Set up the catalog and integrate with GitHub with a `Personal Access Token`  or `Github App` , :heavy_check_mark: [How to configure the integration :page_with_curl:](https://backstage.io/docs/integrations/) .
- Configure GitHub authentication, :heavy_check_mark: [How to configure authentication :page_with_curl:](https://backstage.io/docs/auth/) .
- Configure the default GitHub Actions plugin, :heavy_check_mark: [Documentation of the Github actions plugin :page_with_curl:](https://github.com/backstage/backstage/tree/master/plugins/github-actions) .
<br>

### Installation

If you are using yarn 3.x:

```bash
yarn workspace app add @veecode-platform/backstage-plugin-github-workflows
```

If you are using other versions:

```bash
yarn add --cwd packages/app @veecode-platform/backstage-plugin-github-workflows
```



### Configuration

We'll divide the configuration into three steps:

1- Configure the apiBaseUrl correctly in integrations, like this:

```diff
integrations:
   github:
     - host: github.com
+      apiBaseUrl: https://api.github.com/   // or according to your instance
       token: ${GITHUB_TOKEN_SECRET}
```

2- Add github auth provider:

> :information_source: Make sure you have an github auth provider in your devportal. See how [Add Github Auth Provider 📃](https://backstage.io/docs/auth/github/provider)

```yaml
auth:
  environment: development
  providers: 
    github:
      development:
        clientId: ${AUTH_GITHUB_CLIENT_ID}
        clientSecret: ${AUTH_GITHUB_CLIENT_SECRET}
```

3- To trigger workflows directly from our component, it's important to add the ` workflow_dispatch:` step in our GitHub workflow, like this:

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





4- We need a primary annotation, commonly used by all Backstage components,`github.com/project-slug`, where the project name is set.

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
+    github.com/project-slug: owner/repo
    backstage.io/techdocs-ref: dir:.
   
spec:
  type: website
  lifecycle: experimental
  owner: default
```



* * *

 

### Workflows Table View




![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/8e8e0e74-7a3e-4128-b7c6-ed9e90e28bb5)






The component essentially lists all the workflows available in the repository.
In its header, we highlight the select that filters all available branches in the project and the refresh button to update the workflow states.

The table is divided by workflow name, status, action, and link to the repository.

In some cases, to trigger an action, it may require parameters, as configured in your workflow. Instead of an action button, a modal is displayed to set the requested parameters:



![image2](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/06390934-c04e-4059-bf01-551a467a294a)



When an event is triggered in the workflow, the status is updated, and the conclusion is returned after refreshing the table.



![image3](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/9b92c472-45de-4e64-9618-b96cc8a574c3)



**Example of adding the new tab to a serviceEntityPage**
`packages/app/src/components/catalog/EntityPage.tsx`



```diff
+ import { GithubWorkflowsContent, isGithubAvailable } from '@veecode-platform/backstage-plugin-github-workflows'
...

+ const cicdContent = (
+  <EntitySwitch>
+    <EntitySwitch.Case if={isGithubActionsAvailable}>
+      <GithubWorkflowsContent/>
+    </EntitySwitch.Case>
+
+    <EntitySwitch.Case>
+      <EmptyState
+        title="No CI/CD available for this entity"
+        missing="info"
+        description="You need to add an annotation to your component if you want to enable CI/CD for it. You can read more
+        about annotations in Backstage by clicking the button below."
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
+    </EntitySwitch.Case>
+  </EntitySwitch>
+ );

...

```



* * *



### Workflow Cards View

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
    github.com/project-slug: owner/repo
    backstage.io/techdocs-ref: dir:.
+   github.com/workflows: fileName.yml
   
spec:
  type: website
  lifecycle: experimental
  owner: default
```

The composition of the **annotation** works like this:


![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/290fc11a-020f-449d-bdf7-a0829c452666)



:information_source:  It's important to note that you can add multiple **workflow paths**, separated by commas, like this:


```yaml
github.com/workflows: filePath.yml,filePath2.yml,filePath3.yml,
```


The functionality is identical to the workflow listing component, with the main difference being that only the workflows passed via annotation are listed, instead of all the workflows in the repository.





![image5](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/39ff37fa-6ca6-4a8e-9f23-499353801b53)


The above approach guarantees the rendering of a card with a button to trigger the workflow provided in the component overview. There is also the possibility of customizing the card's label and the tooltip message that appears when you hover the mouse over the card, adding it via annotation:

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
    github.com/project-slug: owner/repo
    backstage.io/techdocs-ref: dir:.
-   github.com/workflows: fileName.yml
+   github.com/workflows: |
+      [
+        {
+          "workflow": "fileName.yml",
+          "label": "Start",
+          "tooltip": "click here and start the workflow process"
+        }
+      ]
   
spec:
  type: website
  lifecycle: experimental
  owner: default
```


> ℹ️ This way we can add a personalized label to the card and also a more detailed message when hovering over the card. Remember that both approaches are valid and if no custom information is added, the default behavior is for the card label to be the name defined in the workflow header and the tooltip will also receive this name from the workflow.



<br>


To use the `cards view` variant, simply add the `cards` property to our `GithubWorkflowsContent` component:

`packages/app/src/components/catalog/EntityPage.tsx`


```diff
+ import { isGithubWorkflowsAvailable, GithubWorkflowsContent } from '@veecode-platform/backstage-plugin-github-workflows'

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
+            <GithubWorkflowsContent cards />
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
> ℹ️ It is important to note that for the **cards** variant, we can pass the filter of which workflows we want to view, through the annotation `github.com/workflows`, but if the annotation is not passed, all the workflows in the repository will be listed, as it will assume the default behavior followed by the default component.


It works like this:




![image6](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/34593129-68bc-44a0-aee7-b1d8c7d12743)





In its header we have the select of the repository branches and a refresh button.

In its body, the workflows that were added via annotation, and each card has its status, workflow name as label and the action button.

As with the Workflow list, there are cases of workflows that trigger parameters before releasing their actions, and the card has the same behavior as the Workflow list, it triggers a modal so that the inputs are set:




![Captura de tela de 2023-08-14 10-30-03](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/83d16247-3b7a-4939-9736-af9ff6a89ae7)





![image8](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/4051b0d1-a51a-40ae-9924-081d283e3662)





The functioning of the actions is also similar, when you click on the action button, it updates the status according to the github response:




![image9](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/f9f9e2ad-70ff-468e-b45c-7d5e1f2dc60d)






### Workflow Details & Logs

In the Workflows List component, clicking on the Logs column:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/3a74f198-f6d0-4552-9810-71ce1a8f6849)


In the Card component, clicking under the component label:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/a02b88f2-40fc-4281-a88f-44d903a57930)


The Details component is then rendered with information about the last time the workflow was run, it stores information about the author of the commit, the commit id with link to github, the status and duration of the workflow in total.

In addition, in the body of the page, it contains the name and filePath of the workflow and how it was executed, followed by the jobs:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/31363776-44bb-4e20-8bdf-766919677910)

In each Job we have the steps executed and at the end we have the log of that job, which can be rendered in the component itself or expanded to a new modal:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/87c83b09-300e-4103-90f2-5cc965ff593c)

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/f671c396-7215-44e7-bfd4-d51c684633e2)

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/aadd7f14-a76a-4d93-9f07-f64630a8f5b7)


 ℹ️ **For github profile avatars to render, add this url to be allowed in your `app-config.yaml`**
 

 ```diff
   csp:
    connect-src: ["'self'", 'http:', 'https:']
    script-src: ["'self'", "'unsafe-eval'"]
+   img-src: ["'self'", 'data:','https://avatars.githubusercontent.com/']
```
