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
    model: gpt-4o #The desired model, for best results use gpt-4o
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

<br>

---

<br>

## Template generation 🎨

Vee also has a template generation feature.
To do this, follow these configuration steps:Vee also has a template generation feature.
To do this, follow these configuration steps:

```diff
vee:
  openai:
    apiBaseUrl: https://api.openai.com/v1
    apiKey: ${OPENAI_API_KEY}
    model: gpt-4o #The desired model, for best results use gpt-4o
+  templateGeneration:
+      model: ${CUSTOM_MODEL} <- This model needs to be trained to generate qualified templates.
+      catalog: ${TEMPLATE_CATALOG_URL}
```

Now let's take a tour of the UI and its features:

#### Menu
The first step to enhancing your backstage with Vee is to add the side menu:<br>

![menu-lateral](https://github.com/user-attachments/assets/aa74a639-736a-4d3c-af38-81d20b3f98df)

To do this, we need to change the following component in your `packages > app`:

```diff
...imports
+ import { AssistantAIMenu } from '@veecode-platform/backstage-plugin-vee';

.... 
export const Root = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage>
    <Sidebar>
      <SidebarLogo />
      <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
        <SidebarSearchModal />
      </SidebarGroup>
      <SidebarDivider />
      <SidebarGroup label="Menu" icon={<MenuIcon />}>
        {/* Global nav, not org-specific */}
        <SidebarItem icon={HomeIcon} to="catalog" text="Home" />
        <SidebarItem icon={ExtensionIcon} to="api-docs" text="APIs" />
        <SidebarItem icon={ExtensionIcon} to="cluster-explorer" text="Cluster" />
        <SidebarItem icon={LockIcon} to="vault-explorer" text="Vault"/>
        <SidebarItem icon={LibraryBooks} to="docs" text="Docs" />
        <SidebarItem icon={CreateComponentIcon} to="create" text="Create..." />
+        <AssistantAIMenu/>
        {/* End global nav */}
        <SidebarDivider />
        <SidebarScrollWrapper>
          <SidebarItem icon={MapIcon} to="tech-radar" text="Tech Radar" />
        </SidebarScrollWrapper>
      </SidebarGroup>
      <SidebarSpace />
      <SidebarDivider />
      <SidebarGroup
        label="Settings"
        icon={<UserSettingsSignInAvatar />}
        to="/settings"
      >
        <SidebarSettings />
      </SidebarGroup>
    </Sidebar>
    {children}
  </SidebarPage>
);

```

After that, we have access to the initial dashboard:<br><br>
![vee-home](https://github.com/user-attachments/assets/3802ffa6-9178-4f1f-ab3f-cef99152221e)

Select the "Scaffolder AI" option and then select the stack that will serve as the basis for the new template:<br><br>
![generate-template-select-stack](https://github.com/user-attachments/assets/2a61fdb1-51cb-4a29-803c-c9a2c400194c)

Each stack has its own list of predefined plugins:<br><br>
![generate-template-seelect-plugin](https://github.com/user-attachments/assets/7065dbc8-e9f9-4ae3-aebd-08ea0d720303)

Then we name the new template:<br><br>
![generate-plugin-add-templatename](https://github.com/user-attachments/assets/bb77621d-6b2c-4689-8ec6-874c897bd1d5)

And we're waiting for the AI to generate:<br><br>
![generate-template-animation](https://github.com/user-attachments/assets/8e823b10-af24-4f90-bf2a-d9603ced4ec5)

The output is presented with the options of downloading the zipped folder or submitting a pullRequest to the template catalog:<br><br>
![template-output](https://github.com/user-attachments/assets/66323a4d-8ccb-4dc5-a434-dd97bded7419)

<br><br>

### 🥇 Admin panel
You may be wondering how to manage all the information so that the user can carry out the flow, and that's why we've created the settings menu, which theoretically won't be exposed to all users, it's permissioned, below we'll show you the necessary permissions...<br>
![vee-settings](https://github.com/user-attachments/assets/fc224332-c5ce-4d97-8554-bcd565aa746c)

#### 🛰️ Stacks<br><br>
![stack-manager-list](https://github.com/user-attachments/assets/849a7a67-8e1f-4e4b-b846-a8bc740cd7f4)
The Stacks are the basis for generating the template.<br>
![create-stack](https://github.com/user-attachments/assets/95d5c01b-1328-46ea-b4f5-258f1e992767)
When you create a stack, you need to give it
- A name for it.<br>
- The url of the base repository <bt>
- Plugins that the template will use** (You need to register the plugins first, in the plugins section we'll explain more)<br><br>

The **name** is free, you can identify your stack by the language or framework or tool it refers to, example "**Aws Ec2**".<br>
The **url** is the url of a repository that will serve as a base, that is, the repository that follows the entire standard and that you want to be replicated in new projects.When you create a stack, you need to give it
- A name for it.

- The url of the base repository 
- Plugins that the template will use** (You need to register the plugins first, in the plugins section we'll explain more)



The **name** is free, you can identify your stack by the language or framework or tool it refers to, example "**Aws Ec2**".

The **url** is the url of a repository that will serve as a base, that is, the repository that follows the entire standard and that you want to be replicated in new projects.

<br>

#### 🎲 Plugins <br><br>
The plugins serve the stacks, so it is important that they are registered first.<br>
Basically they need their identification name and the documentation url for each one, this information will be entered at the prompt taken to the AI engine.The plugins serve the stacks, so it is important that they are registered first.

Basically they need their identification name and the documentation url for each one, this information will be entered at the prompt taken to the AI engine.<br>
![pluginlist-manager](https://github.com/user-attachments/assets/55b4efe7-cd8a-4fc5-bc8b-bb7b1974ef95)

![create-plugin](https://github.com/user-attachments/assets/be481ebf-0a43-4b15-aec3-bfe377196ace)

<br>

#### ✔️ Fixed Options<br><br>
This menu is for configuring the options set in the code analysis wizard. For each type of entity, we can set options with customized prompts that will enrich the final prompt:<br>
![create-fixed-options](https://github.com/user-attachments/assets/b66a0626-4bbc-4168-98d8-20c6baac3af4)
![create-fixed-optionsw](https://github.com/user-attachments/assets/2ce75264-9c14-498d-9a29-0d5677b024c0)
![create-fixed-options3](https://github.com/user-attachments/assets/fd2f1f47-27bf-4cdd-aa02-59dd40a8e564)

<br>

---

<br>

### 🤖 Training your AI model<br><br>
To ensure that the results follow the expected pattern, we need to train with the model used.<br>
Here's how ➡️ [click](https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/vee/training-your-model/README.md).

<br>

---

<br>

### 🔐 Permissions
The permissions for the first version are broader, less granular and follow the following patternPermissions
The permissions for the first version are broader, less granular and follow the following pattern:

| Permission                               | Description                                              |
|------------------------------------------|----------------------------------------------------------|
| `veeReadPermission`                      | Permission to read the Vee plugin                        |
| `veeAnalyzerReadPermission`              | Permission for the plugin to analyze code                |
| `veeAnalyzerSaveChangesInRepoPermission` | Permission to save changes to the repository via pull request |
| `veeAccessSettingsPanelPermission`       | Permission to access settings                            |
| `veeGenerateTemplatePermission`          | Access to the template generation menu                   |
| `veeSaveTemplatePermission`              | Permission to save templates                             |
| `veeManageStacksPermission`              | Manage stacks (create, edit, delete)                     |
| `veeManagePluginsPermission`             | Manage plugins (create, edit, delete)                    |
| `veeManageFixedOptions`                  | Manage fixed options (create, edit, delete)              |

<br><br>

##### 💡 To find out more about permissions [here](https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/vee-common/README.md)
