# Environment Explorer Plugin



The environment plugin has two approaches:

- A list of the environments available in your catalog

- The environment overview with all its data and its relationships within the catalog.


  

⚠️ It is important to note that the `Environment` is a **Kind** customized by the **VeeCode Platform** and therefore requires the installation of the `veecode-platform-common` plugin in order to work.

To install the `veecode-platform-common` plugin click [here](https://github.com/veecode-platform/platform-backstage-plugins/tree/master/plugins/veecode-platform-common).

Okay, bearing in mind that you already have a properly configured environment, let's start our installation.



## Get started 🚀

```bash
cd packages/app
yarn add @veecode-platform/plugin-environment-explorer
```

Now, in the file `packages > app > src > App.tsx`:

```diff
...
+ import { EnvironmentExplorerPage } from '@veecode-platform/plugin-environment-explorer';

...

const routes = (
<FlatRoutes>
+ <Route path="/environments-explorer" element={<EnvironmentExplorerPage />}/>
</FlatRoutes>
)
...
```
To add a menu to your sidebar, just follow these steps:
`packages > app > src > components > Root > Root.tsx `

```diff
...
+ import LanguageIcon from '@material-ui/icons/Language';

...

export const Root = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage>
    <Sidebar>
      <SidebarLogo />
      <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
        <SidebarSearchModal />
      </SidebarGroup>
      <SidebarDivider />
      <SidebarGroup label="Menu" icon={<MenuIcon />}>
        <SidebarItem icon={HomeIcon} to="catalog" text="Home" />
        <SidebarItem icon={ExtensionIcon} to="api-docs" text="APIs" />
        <SidebarItem icon={ExtensionIcon} to="cluster-explorer" text="Cluster" />
        <SidebarItem icon={LibraryBooks} to="docs" text="Docs" />
+        <SidebarItem icon={LanguageIcon} to="environments-explorer"/>
        <SidebarItem icon={CreateComponentIcon} to="create" text="Create..." />
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
Or you can create a "Resources" menu and add "Environment" as a submenu:

```diff
...

+ import BusinessIcon from '@material-ui/icons/Business';
+ import LanguageIcon from '@material-ui/icons/Language';

...

export const Root = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage>
    <Sidebar>
      <SidebarLogo />
      <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
        <SidebarSearchModal />
      </SidebarGroup>
      <SidebarDivider />
      <SidebarGroup label="Menu" icon={<MenuIcon />}>
        <SidebarItem icon={HomeIcon} to="catalog" text="Home" />
        <SidebarItem icon={ExtensionIcon} to="api-docs" text="APIs" />
        <SidebarItem icon={ExtensionIcon} to="cluster-explorer" text="Cluster" />
        <SidebarItem icon={LibraryBooks} to="docs" text="Docs" />
+          <SidebarItem icon={BusinessIcon} text="Resources">
+            <SidebarSubmenu title="">
+              <SidebarDivider />
+              <SidebarSubmenuItem
+                title="Environments"
+                to="environments-explorer"
+                icon={LanguageIcon}
+              />
+
+            </SidebarSubmenu>
+          </SidebarItem>
        <SidebarItem icon={CreateComponentIcon} to="create" text="Create..." />
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

And that's the view:

By clicking on the icon in the side menu:

- Environments List:

![image1](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/757663d8-d99a-4678-84bb-93ac334f459e)

- Overview do Environment:

![image2](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/43e70a26-d844-4777-b9d2-aa4d50fcdc3e)


It's worth noting that each environment is a yaml file belonging to the application catalog.
In other words, you need to configure the catalog discovery in your `App-config.yaml`:

1- First of all, we need to allow the new **Kind** in `app-config.yaml`:

```yaml
catalog:
  rules:
    - allow: [Component, API, Location, Cluster, Template, Environment]
  providers: 
    github:
      providerId: # the provider ID can be any camelCase string
        organization: ${ GITHUB_ORGANIZATION }
        catalogPath: /catalog-info.yaml # string
        filters:
          branch: ${ GITHUB_CATALOG_BRANCH } # string
          repository: devportal-catalog # Regex
          validateLocationsExist: true
        schedule:        
          frequency: 
            minutes: ${GITHUB_CATALOG_PROVIDER_REFRESH_FREQUENCY}
          timeout: 
            minutes: ${GITHUB_CATALOG_PROVIDER_TIMEOUT}
```

Or we can register it manually:

![image3](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/70b1854f-d14a-47e0-a8f8-24a4967ff006)

Throwing the url of where the environment's yaml is:

![Captura de tela de 2024-01-04 11-45-57](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/4faf5c59-74aa-40b2-a5b5-b4c8fdaa46c7)


This file should have the following structure:

```yaml
apiVersion: veecode.backstage.io/v1alpha1 #or backstage.io/v1alpha1
kind: Environment
metadata:
  name: "name_environment"
  environment:
    domain: xxxxx
    hostedZoneId: xxxxx
    vpc_id: xxxx
    vpc_name:: xxxxx
    certManagerEmail: xxxxx
    certManagerIssuerType: xxxxx
  annotations:
    github.com/project-slug: xxxxxxx
    backstage.io/techdocs-ref: dir:.
spec:
  type: service
  lifecycle: development
  owner: "group:default/infra"
```

The file can have any name, as long as it follows this structure.
Below the **metadata** key, we have the **environment** key and in this example we have some properties, but they are not mandatory, you can add the properties you think are necessary, we have developed the overview of this kind dynamically, so that it serves the information according to the properties that this key has.


<hr>






## How to use Enviroment

In the context we envisioned for the project, the environment is used to reuse information that will be useful when creating new entities for our catalog.

We have developed customizable components to provide the scaffolder with the possibility of parsing information from the **environment** key of our **Kind**.

This is our **ResourcePicker**, which is exclusive to our **core**;

With it we can approach the reuse of this information in the creation of entities via template.

Example:

```yaml
    - title: Enviroment Settings
      properties:
        reuseResource:
          title: Select the enviromnet from our catalog
          type: string
          ui:field: ResourcePicker
          ui:options:
            catalogFilter:
              kind: [Environment]
```

In this case, we will list all our entities in the catalog that have the **Environment** kind, and under the hood we will scan the `metadata.enviromnet` key of the chosen entity, and thus parse the information as **values** to serve the **skeleton** of our template, using the **parseJSON** function, also present in our core.

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
          vpc: ${{ parameters.reuseResource | parseJSON | pick('vpc_id') }}
          domain: ${{ parameters.reuseResource | parseJSON | pick('domain') }}

...
```

The use of 'pick' helps to select the property you want to use, from the return of the **parseJSON function**, remember to validate that the selected entity has this property, otherwise the values will be empty.





