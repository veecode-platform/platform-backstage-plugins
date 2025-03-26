# Vee Common


This plugin provides typing and permissions for the  [Vee](https://platform.vee.codes/plugin/vee/)  & [Vee Backend](https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/vee-backend/README.md).


### Our community

> 💬  **Join Us**
>
> Join our community to resolve questions about our **Plugins**. We look forward to welcoming you! <br>
>
>    [Go to Community  🚀](https://github.com/orgs/veecode-platform/discussions)

<br><br>

## 🚀 Getting started: 

<br>

If you are using yarn 3.x:

```bash
yarn workspace app add @veecode-platform/backstage-plugin-vee-common

#or

yarn workspace backend add @veecode-platform/backstage-plugin-vee-common
```

If you are using other versions:

```bash
yarn add --cwd packages/app @veecode-platform/backstage-plugin-vee-common

# or

yarn add --cwd packages/backend @veecode-platform/backstage-plugin-vee-common

```

### 🔐 Permissions<br> 
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



> 🚨 View Backstage docs to learn how to set up your instance of Backstage to use these permissions.
