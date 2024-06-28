# Infracost Plugin

## Intro 💡

The **Infracost** plugin provides a graphic representation of the application's cost estimate in its respective provider. <br>
The Plugin offers a generalized approach with all the resources used and also presents a more detailed approach with the cost components that each resource has.<br>
In this documentation we will cover how to correctly configure the plugin, how to create the job in your pipeline/workflow to generate the estimate and be consumed by the plugin and how to correctly reference the annotation that the UI component expects to render the content on your entityPage.


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
- Have a Backstage with a properly configured Postgres database, if you haven't already, see how to set it up [here](https://backstage.io/docs/tutorials/switching-sqlite-postgres/).
- Have the `Infracost-backend` plugin installed on your Backstage, see how to install [here].(https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/infracost-backend/README.md).
<br>

### Installation

If you are using yarn 3.x:

```bash
yarn workspace app add @veecode-platform/backstage-plugin-infracost
```

If you are using other versions:

```bash
yarn add --cwd packages/app @veecode-platform/backstage-plugin-infracost
```



### Configuration

