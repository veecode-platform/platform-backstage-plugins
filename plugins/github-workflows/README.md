# GithubWorkflows Frontend Plugin
<br>
The GithubWorkflows plugin provides an alternative for manually triggering GitHub workflows from within your Backstage component.

The plugin offers two distinct approaches to integrate with your component:

- On-demand workflows, which are configured via annotations in your project's `catalog-info.yaml`.
- A complete listing of the workflows available in your project.
<br>

### Getting Started:
<br>

Before installing the plugin, there are some prerequisites to ensure its functionality:

- Have a locally installed Backstage project, or [Create a Backstage app](https://backstage.io/docs/getting-started/create-an-app) .
- Set up the catalog and integrate with GitHub, or [Configure integration](https://backstage.io/docs/integrations/) .
- Configure GitHub authentication, or [Configure authentication](https://backstage.io/docs/auth/) .
- Configure the default GitHub Actions plugin, or [Configure GitHub Actions plugin](https://github.com/backstage/backstage/tree/master/plugins/github-actions) .
<br>

### Installation
<br>

`````bash
cd packages/app
yarn add @veecode-platform/github-workflows
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
+ import { GithubWorkflowsList } from '@veecode-platform/plugin-github-workflows'

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

Para esse componente, precisamos adicionar uma annotation especial, a `github.com/workflows`, deste modo:



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



A composição do **annotation** funciona assim:
<br>

<img src="https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/0158be50-8034-4cd0-a304-7b4233578cc0" style="width: 400px; margin: 2rem 0" />

<br>

:information_source: importante dizer que conseguimos adicionar mais de um **workflow path** separados por vírgula, deste modo:

```yaml
github.com/workflows: filePath.yml,filePath2.yml,filePath3.yml,
```



A funcionalidade vai ser idêntica ao compontente de listagem de workflows, com a principal diferença sendo que ao invés de listar todos os workflows do repositório, serão listados apenas os workflows passados via annotation.

<br><br>

![image5](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/39ff37fa-6ca6-4a8e-9f23-499353801b53)


<br><br>


Como indicação, utilizamos os cards diretamente no overview do component, desta forma:

`packages/app/src/components/catalog/EntityPage.tsx`

```diff
+ import { isGithubWorkflowsAvailable, GithubWorkflowsCard } from '@veecode-platform/plugin-github-workflows'

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

Ele funciona da seguinte forma:

<br>

![image6](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/34593129-68bc-44a0-aee7-b1d8c7d12743)


<br>

Em seu header temos o select das branchs do repositório e um botão de refresh.

Em seu corpo, os workflows que foram adicionados via annotation, e cada card possui seu status, nome do workflow como label e o botão de action.

Assim como no Workflow list, existem os casos de workflows que acionam parâmetros antes de liberar suas actions, e o card tem o mesmo comportamento do Workflow list, ele aciona um modal para que sejam setados os inputs:

<br>

![Captura de tela de 2023-08-14 10-30-03](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/83d16247-3b7a-4939-9736-af9ff6a89ae7)


<br>

![image8](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/4051b0d1-a51a-40ae-9924-081d283e3662)


<br>

O funcionamento das actions é semelhante também, ao clicar no botão de action, ele atualiza o status de acordo com o resposta do github:

<br>

![image9](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/f9f9e2ad-70ff-468e-b45c-7d5e1f2dc60d)


<br>


### Integração com o plugin de github actions

Para uma experiência maior, destacamos o uso do plugin default do github actions que o backstage já disponibiliza, onde nele se lista todos os runs executadas do repositório, e nele também estão presentes todos os logs de cada ação.

No componente Workflows List, a integração ocorre ao clicarmos na coluna de Logs:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/81419190-f31b-4b03-bf8c-6d8d037ddfa2)

Já no componente Card, a integração ocorre ao clicar sob a label do componente:

![image (1)](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/2e502435-2cfd-44ad-b400-3100a6675544)


Com o próprio instalado corretamente e disponível na tab **CI-CD**, conseguimos fazer a integração dos disparos das actions com seus logs e todo o histórico deles:

<br>


![image10](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/3aec7a92-0fdb-4058-9f04-1b8cdb712966)



