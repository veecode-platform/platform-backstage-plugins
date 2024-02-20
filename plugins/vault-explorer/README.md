# Vault Explorer Plugin

The Vault plugin has two approaches:

- A list of the **Password Vaults** available in your catalog

- The **Password Vault overview** with all its data and relationships within the catalog.


⚠️ It is important to note that the `Vault` is a **Kind** customized by the **VeeCode Platform** and therefore it requires the installation of the `veecode-platform-common` plugin in order to work.

To install the `veecode-platform-common` plugin click [here](https://github.com/veecode-platform/platform-backstage-plugins/tree/master/plugins/veecode-platform-common).

Okay, given that you already have a properly configured environment, let's start our installation.

## Get Started

```bash
cd packages/app
yarn add @veecode-platform/plugin-vault-explorer
```
Now, in the file `packages > app > src > App.tsx`:

```diff
...
+ import { VaultExplorerPage } from '@veecode-platform/plugin-vault-explorer';

...

const routes = (
<FlatRoutes>
+ <Route path="/vault-explorer" element={<VaultExplorerPage/>}/>
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
+ import { CiVault } from "react-icons/ci";

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
+        <SidebarItem icon={CiVault} to="vault-explorer" text="Vault" />
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
Or you can create a "Resources" menu and add "Vault" as a submenu:

```diff
...

+ import BusinessIcon from '@material-ui/icons/Business';
+ import { CiVault } from "react-icons/ci";

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
+                title="Vault"
+                to="vault-explorer"
+                icon={CiVault}
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

- Vault Listing:

![Database](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/cacb7485-03b3-4709-bd12-75fbbb9f6bf8)


- Vault Overview:

![image2](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/29e31bf6-56cc-4cb1-ac1d-832cf051f471)

It's worth noting that each Vault is a yaml file belonging to the application catalog.
In other words, you need to configure the catalog discovery in your `App-config.yaml`:

1- First of all, we need to allow the new **Kind** in the `app-config.yaml`:

```yaml
catalog:
  rules:
    - allow: [Component, API, Location, Cluster, Template, Vault]
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

![image3](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/24983be9-692c-4869-8857-d6b0c1478648)

Playing the url of where the yaml of the Vault is:

![Captura de tela de 2024-01-04 11-45-57](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/5388e3ad-bb66-4497-8141-e749af90c455)

This file should have the following structure:

```yaml
apiVersion: veecode.backstage.io/v1alpha1 #or backstage.io/v1alpha1
kind: Vault
metadata:
  name: "Password_vault"
  environment:
    path: "/generals"
spec:
  type: service
  lifecycle: development
  owner: "group:default/devsecops"
```

The file can have any name, as long as it follows this structure.
Below the **metadata** key, we have the **environment** key and in this example we have some properties, but they are not mandatory, you can add the properties you think are necessary, we have developed the overview of this kind dynamically, so that it serves the information according to the properties that this key has.


<hr>

## How to reuse the resources of the Vault entity

In the context we envisioned for the project, the Vault is used to reuse information that will be useful when creating new entities for our catalog.

We have developed customizable components to provide the scaffolder with the possibility of parsing information from the **environment** key of our **Kind**.

This is our **ResourcePicker**, which is exclusive to our **core**;

With it we can approach the reuse of this information when creating entities via a template.

Example:

```yaml
    - title: Password Vault Settings
      properties:
        reuseResource:
          title: Select the Password Vault from our catalog
          type: string
          ui:field: ResourcePicker
          ui:options:
            catalogFilter:
              kind: [Vault]
```
In this case, we will list all our entities in the catalog that have the **Vault** kind, and under the hood we will scan the `metadata.enviromnet` key of the chosen entity, and thus parse the information as **values** to serve the **skeleton** of our template, using the **parseJSON** function, also present in our core.

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
          dns: ${{ parameters.reuseResource | parseJSON | pick('path') }}

...
```

The use of 'pick' helps to select the property you want to use, from the return of the parseJSON function, remember to validate that the selected entity has this property, otherwise the values will be empty.
