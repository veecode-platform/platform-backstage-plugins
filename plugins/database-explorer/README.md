# Database Explorer Plugin

The Database plugin has two approaches:

- A list of the Databases available in your catalog

- The Database overview with all its data and relationships within the catalog.


⚠️ It is important to note that the `Database` is a **Kind** customized by the **VeeCode Platform** and therefore it requires the installation of the `veecode-platform-common` plugin in order to work.

To install the `veecode-platform-common` plugin click [here](https://github.com/veecode-platform/platform-backstage-plugins/tree/master/plugins/veecode-platform-common).

Okay, given that you already have a properly configured environment, let's start our installation.

## Get Started

```bash
cd packages/app
yarn add @veecode-platform/plugin-database-explorer
```
Now, in the file `packages > app > src > App.tsx`:

```diff
...
+ import { DatabaseExplorerPage } from '@veecode-platform/plugin-database-explorer';

...

const routes = (
<FlatRoutes>
+ <Route path="/database-explorer" element={<DatabaseExplorerPage/>}/>
</FlatRoutes>
)
...
```
To add a menu to your sidebar, just follow these steps:
`packages > app > src > components > Root > Root.tsx `

In the example, we've added an external icon, using the lib `react-icons`.

```bash
cd packages/app
yarn add react-icons
```

```diff

...
+ import { ImDatabase } from "react-icons/im";

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
+        <SidebarItem icon={ImDatabase} to="database-explorer" text="Databases" />
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
Or you can create a "Resources" menu and add "Databases" as a submenu:

```diff
...

+ import BusinessIcon from '@material-ui/icons/Business';
+ import { ImDatabase } from "react-icons/im";

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
+                title="Databases"
+                to="database-explorer"
+                icon={ImDatabase}
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

- Database Listing:

![Database](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/cacb7485-03b3-4709-bd12-75fbbb9f6bf8)


- Database Overview:

![image2](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/29e31bf6-56cc-4cb1-ac1d-832cf051f471)

It's worth noting that each Database is a yaml file belonging to the application catalog.
In other words, you need to configure the catalog discovery in your `App-config.yaml`:

1- First of all, we need to allow the new **Kind** in the `app-config.yaml`:

```yaml
catalog:
  rules:
    - allow: [Component, API, Location, Cluster, Template, Database]
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

Registering components manually:

![image3](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/24983be9-692c-4869-8857-d6b0c1478648)

Playing the url of where the yaml of the Database is:

![Captura de tela de 2024-01-04 11-45-57](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/5388e3ad-bb66-4497-8141-e749af90c455)

This file should have the following structure:

```yaml
apiVersion: veecode.backstage.io/v1alpha1 #or backstage.io/v1alpha1
kind: Database
metadata:
  name: "name_database"
  environment:
    type: "No-Sql"
    dns: xxxxxxx
spec:
  type: service
  lifecycle: development
  owner: "group:default/infra"
```

The file can have any name, as long as it follows this structure.
Below the **metadata** key, we have the **environment** key and in this example we have some properties, but they are not mandatory, you can add the properties you think are necessary, we have developed the overview of this kind dynamically, so that it serves the information according to the properties that this key has.

> The `metadata.name` key cannot contain spaces, separate words using "-", "_" or using camelCase.

<hr>

## How to reuse the resources of the Database entity

In the context we envisioned for the project, the Database is used to reuse information that will be useful when creating new entities for our catalog.

We have developed customizable components to provide the scaffolder with the possibility of parsing information from the **environment** key of our **Kind**.

This is our **ResourcePicker**, [➡️ here's how to install it.](https://github.com/veecode-platform/platform-backstage-plugins/tree/master/plugins/veecode-scaffolder-extensions)

With it we can approach the reuse of this information when creating entities via a template.

Example:

```yaml
    - title: Database Settings
      properties:
        dataBaseResource:
          title: Select the Database from our catalog
          type: object
          ui:field: ResourcePicker
          ui:options:
            catalogFilter:
              kind: [Database]
```
In this case, we will list all our entities in the catalog that have the **Database** kind, and under the hood we will scan the `metadata.enviromnet` key of the chosen entity, and thus parse the information as **values** to serve the **skeleton** of our template.

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
          dns: ${{ parameters.dataBaseResource.dns }}

...
```

ℹ️ Remember to validate that the selected entity has this property, otherwise the values will be empty.
