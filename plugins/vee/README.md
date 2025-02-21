# Vee

### Our community

> 💬  **Join Us**
>
> Join our community to resolve questions about our **Plugins**. We look forward to welcoming you! <br>
>
>    [Go to Community  🚀](https://github.com/orgs/veecode-platform/discussions)

<br><br>

## 🚀 Getting started: 

Before installing the plugin, there are some prerequisites to ensure its functionality:

- Have a locally installed Backstage project, :heavy_check_mark: [How to create a Backstage app :page_with_curl:](https://backstage.io/docs/getting-started/create-an-app) .
- Have the `Vee Backend`  plugin installed on your Backstage, see how to install [here](https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/vee-backend/README.md).
- Have git in the docker image that will be uploaded to your environment. 

<br>

If you are using yarn 3.x:

```bash
yarn workspace app add @veecode-platform/backstage-plugin-vee
```

If you are using other versions:

```bash
yarn add --cwd packages/app @veecode-platform/backstage-plugin-vee  
```

## Configuration ⚙️

**1- Add `Vee` key in AppConfig**

In the `app-config.yaml` file, add the configuration:
> ℹ️ As instructed in the documentation for the backend plugin.

```yaml
vee:
  openai:
    apiBaseUrl: https://api.openai.com/v1
    apiKey: ${OPENAI_API_KEY}
    model: gpt-4o #The desired model, for best results use gpt-4o >
```

**2- Annotations**

The plug-in recognizes 1 annotations for its operation, the **`vee/engine`**,but at the moment this annotation is not mandatory, because the assistant is only able to receive the `openAI` engine in this first version, so whether or not you enter the annotation won't be necessary.
In any case, informing the annotation would make the `catalog-info.yaml` look like this:

```diff
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: "Component A"
  description: "An example"
  annotations:
    github.com/project-slug: test/ComponentA
    backstage.io/techdocs-ref: dir:.
+   vee/engine: openAI
   
spec:
  type: service
  lifecycle: prod
  owner: "devops"
```

---

## UI 💻

In the design of the plugin, the assistant fits into the **overview** of the entities, but if in your development there is a **overview** for each type of kind, apply those that you think best suit our proposal.
In this example we'll add to the overview of all the entities:


```diff
... 
+ import { AssistantAIContent } from '@veecode-platform/backstage-plugin-vee';

...

const overviewContent = (
  <Grid container spacing={3} alignItems="stretch">
    {entityWarningContent}
    <Grid item md={6}>
      <EntityAboutCard variant="gridItem" />
    </Grid>
    <Grid item md={6} xs={12}>
      <EntityCatalogGraphCard variant="gridItem" height={400} />
    </Grid>
    <Grid item md={4} xs={12}>
      <EntityLinksCard />
    </Grid>
+    <AssistantAIContent/>
  </Grid>
);

...

```


### 👉 Overview

The assistant's icon will remain fixed on the entity's screen:



![ft1](https://github.com/user-attachments/assets/b2beb350-bcfc-400e-8a46-3bcb0dcab50e)




When triggered, the service receives the location of the entity, and from there, with the code from the repository, a context is created for the AI:



![Ft2](https://github.com/user-attachments/assets/aa79ec52-bce1-4c46-951f-3435715a38d1)



At this stage, we have iteration options in which the assistant will propose improvements or analyses:



![ft3](https://github.com/user-attachments/assets/b42b3b53-3280-4a75-a94a-2266a46e0bad)



So this detailed analysis and the pull-request proposal:



![ft4](https://github.com/user-attachments/assets/3e24c326-9225-4971-9aae-aa93ec9b412e)



If the changes are pertinent, the pullrquest is created, the new branch will have all the suggested changes and additions, and the diff analysis can be done both in your git provider and in your IDE:


![ft5](https://github.com/user-attachments/assets/b05274f6-d4cf-492d-adde-4dd3104bdf85)


