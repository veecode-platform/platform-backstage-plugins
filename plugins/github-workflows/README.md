# Plugin GithubWorkflows Frontend
<br>
O plugin de GithubWorkflows é uma alternativa para disparos manuais de workflows do github por dentro de seu componente backstage.

No plugin temos duas abordagens distintas para agregar o seu componente:

- Os workflows sob demanda, aos quais são setados via annotations no `catalog-info.yaml` de seu projeto.
- E a listagem completa dos workflows que seu projeto disponibiliza.
<br>

### Primeiros passos:
<br>

Antes de instalarmos o plugin, temos alguns pré requisitos para que ele funcione de fato:

- Ter um projeto backstage instalado localmente.  ✅  <a href="https://backstage.io/docs/getting-started/create-an-app"> Crie um backstage app</a>
- Ter configurado o catálogo e a integração com o github. ✅  <a href="https://backstage.io/docs/integrations/">Configure a integração</a>
- Ter configurado a auth com o github.   ✅  <a href="https://backstage.io/docs/auth/">Configure a autenticação</a>
- Ter configurado o plugin de github actions default.  ✅  <a href="https://github.com/backstage/backstage/tree/master/plugins/github-actions">Configure o plugin github actions</a>
<br>

### Instalação
<br>

`````bash
cd packages/app
yarn add @veecode-platform/github-workflows
`````
<br>

### Configuração

Dividiremos a configuração em 3 etapas:

1- Configuração do proxy.

No arquivo `app-config.yaml`

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

> :information_source: Lembre-se de setar a variável ${GITHUB_TOKEN_SECRET} com o token personal do github

<br>

2- Para conseguirmos disparar os workflows diretamente do nosso componente, é importante adicionarmos ao nosso worflow, no github, a step ` workflow_dispatch:`, deste modo:

```diff
# Workflow Example

name: Deploy Next.js site to Pages

on:
  push:
    branches: ["master"]
+ workflow_dispatch:

 ....
```

Mesmo que não seja passado nada para essa chave, ela precisa estar presente no nosso arquivo, para que consigamos disparar os eventos via componente backstage



>
>
>#####  Parâmetros
>
>:information_source: Há possibilidades de setar parâmetros no workflow também e eles são entendidos pelo plugin, de modo que só viabiliza as ações se os mesmos forem enviados antes.
>
>

<br>

3- Precisamos de um annotation principal, que como default todos os componentes backstage já utilizam, trata-se do `github.com/project-slug` onde fica setado o nome do seu projeto.

Como pré requisito principal, devemos ter esse annotation declarado no `catalog-info.yaml` do componente que irá receber a funcionalidade.

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


![image1](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/4615b16a-b7e6-47e8-b109-d2444922f8ba)


<br>
O componente lista basicamente todos os workflows que o repositório possue. 

Em seu header, destacamos o select que filtra todas as branchs disponíveis no projeto e o botão de refresh para atualizar o estado dos workflows.

A tabela é separada por nome do workflow, estado, ação e link para o repositório.

Em alguns casos para dispararmos a action, ele pede parâmetros, se assim for configurado em seu workflow, e ao invés do botão da ação, acionamos um modal para que sejam setados os parâmetros solicitados:

<br>

![image2](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/06390934-c04e-4059-bf01-551a467a294a)

<br>


Ao acionarmos um evento no workflow, o status é atualizado e no final a conclusão também é retornada, através do refresh da tabela.
<br>

![image3](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/9b92c472-45de-4e64-9618-b96cc8a574c3)

<br>

Encorajamos aos usuários em criar uma nova tab em seu catálogo com o nome de **"Workflows"** e mantenham a tab "**CI-CD**" com o componente default do backstage, pois nas sessões posteriores explicaremos a integração entre os dois plugins.



**Exemplo de adição da nova tab em uma serviceEntityPage**
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
    
+   <EntityLayout.Route path="/ci-cd" title="CI/CD">
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

![image7](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/4982030a-2db8-4fcb-adbf-65d98b0e2f40)


<br>

![image8](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/4051b0d1-a51a-40ae-9924-081d283e3662)


<br>

O funcionamento das actions é semelhante também, ao clicar no botão de action, ele atualiza o status de acordo com o resposta do github:

<br>

![image9](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/f9f9e2ad-70ff-468e-b45c-7d5e1f2dc60d)


<br>


### Integração com o plugin de github actions

Para uma experiência maior, destacamos o uso do plugin default do github actions que o backstage já disponibiliza, onde nele se lista todos os runs executadas do repositório, e nele também estão presentes todos os logs de cada ação.

Com o próprio instalado corretamente e disponível na tab **CI-CD**, conseguimos fazer a integração dos disparos das actions com seus logs e todo o histórico deles:

<br>


![image10](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/3aec7a92-0fdb-4058-9f04-1b8cdb712966)



