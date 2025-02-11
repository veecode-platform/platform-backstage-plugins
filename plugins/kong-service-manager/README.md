# Kong Service Manager Plugin 

The Kong Service Manager plugin offers the facility to manipulate your service from different Kong environments, in your component, detailing information about the service, listing the routes it has and also offering the possibility of manipulating plugins without leaving the backstage.

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
- Have the `Kong Service Manager Backend`  plugin installed on your Backstage, see how to install [here](https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/kong-service-manager-backend/README.md).

<br>

If you are using yarn 3.x:

```bash
yarn workspace app add @veecode-platform/plugin-kong-service-manager
```

If you are using other versions:

```bash
yarn add --cwd packages/app @veecode-platform/plugin-kong-service-manager
```

## Configuration ⚙️

**1- Add Kong key in AppConfig**

In the `app-config.yaml` file, add the configuration:
> ℹ️ As instructed in the documentation for the backend plugin.

```yaml
kong:
  instances:
    - id: kong-instance01
      apiBaseUrl: ${ KONG_HOST ]
      workspace: ${ KONG_WORKSPACE }  # optional "Only if your version is enterprise"
      auth:
        kongAdmin: ${ KONG_ADMIN_TOKEN } # optional if the instance is enterprise
        custom:  # optional if the kong is in community mode and depending on the authentication used
          header: ${ KONG_HEADER }  # Ex: Authorization or key-auth
          value: ${ KONG_AUTH } # Ex: Basic $your_token or how the token is added depending on the approach
```

**2- Annotations**

 The plug-in recognizes 3 annotations for its operation, the first being **`kong-manager/service-name`**, which will identify the service that will be used as a parameter. In this annotation, you can enter the name of the service or its id, preferably the name. It is also important to note that each `catalog-info.yaml` can only receive one service.
 
The other annotation will be **`kong-manager/instance`**, which will receive the instances on which kong will make calls, and can receive more than one item, properly separated by commas and without spaces. It is important to note that the instances must be configured in `app-config.yaml`, as described in the previous section; if they have not been configured correctly, the calls will not be answered.

And finally, the annotation **kong-manager/spec**, where the open-api file that will serve as the spec for the project will be listed, it should be in root and by convention can be called `openapi-swagger.yaml`. Remember that this annotation is optional if you want to list the kongs specs in the Backstage component and assign plugins already associated with the service to the related spec.


Here's an example:

```diff
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: "Component A"
  description: "An example"
  annotations:
    github.com/project-slug: test/ComponentA
    backstage.io/techdocs-ref: dir:.
+    kong-manager/service-name: nameservice_test_A01
+    kong-manager/instance: kongInstance1,kongInstance2
+    kong-manager/spec : openapi-swagger.yaml  #optional
   
spec:
  type: service
  lifecycle: prod
  owner: "devops"
```

---

## UI 💻

Taking into account that the settings are ok, we now need to adjust our `EntityPage.tsx` to render the plugin correctly.
To do this, we'll change the following file `packages > app > src > components > catalog > EntityPage.tsx`:

```diff
... 
+ import { KongServiceManagerContent, isKongServiceManagerAvailable } from '@veecode-platform/plugin-kong-service-manager';

...

const serviceEntityPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/ci-cd" title="CI/CD">
      {cicdContent}
    </EntityLayout.Route>

+    <EntityLayout.Route
+      if={isKongServiceManagerAvailable}
+      path="/kong-service-manager" title="Kong">
+      <KongServiceManagerContent/>
+    </EntityLayout.Route>

  </EntityLayout>
);

...

```

> ℹ️ We've used the `ServiceEntityPage` component for the example, but it can be replicated for any of the existing types in the `EntityPage`.

Now that the plugin is properly configured, let's take a look at the screens it offers:

### 👉 Service:

![Captura de tela de 2025-02-11 09-16-21](https://github.com/user-attachments/assets/06731ad4-9c7e-4413-84e6-e4026ab960f3)

Here we've highlighted all the information about the service referenced in the component, note that in the top right corner we have a combobox where we can navigate between the available kong instances:

![Select Instance](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/2cb10361-8e04-4c47-b36e-55faa4791abf)

In addition, we were able to add plugins to the service:

![Captura de tela de 2025-02-11 09-14-48](https://github.com/user-attachments/assets/277c5ade-56e7-4046-9877-10faafe85919)

#### Installing a plugin to Service

For the example, we'll use the **rate limiting** plugin:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/aaa55c9b-6471-4c9e-ab4e-2ab1888c18ba)

When you install it, it will appear on the `Associated Plugins` tab:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/f33f0c97-69d8-4de4-8995-a6584b71a696)

From then on, the plugin will already be configured in your service:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/0a4f68c3-cb68-4106-9991-427b40f4ec0b)


<br>

### 👉 All Routes:
- List of all routes for your Kong instance; ✅
- Create / Removing and Editing a route at your Service; ✅
- Filtering by the routes created in the service; ✅
- Apply plugins for specific rotes; ✅

On this screen, we list all the routes that the service has:

![Captura de tela de 2025-02-11 09-18-05](https://github.com/user-attachments/assets/4bd1989e-7034-4343-88fd-004d54d08ac2)

Also noteworthy is the behavior of the `tags` field, which expands when triggered:

![tags](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/c3f74551-38ee-401d-80f4-c3de8ba52b66)

In the actions column, you can edit a route or delete it.
You can also create new routes with the “create” button:

![image](https://github.com/user-attachments/assets/b591e35c-7159-4cbf-8ceb-a530c93bebae)

![image](https://github.com/user-attachments/assets/c1c60310-c70b-4569-a871-3324a90a4acb)

**Route Details**
Each route in the list has its own unique screen, where we can expand route details and also manipulate plugins:

![Captura de tela de 2025-02-11 09-21-25](https://github.com/user-attachments/assets/8ccbd034-aad4-4346-8a8d-43cfab57132b)

![image](https://github.com/user-attachments/assets/2357a5f7-20b1-4e56-aabf-9b44bca39820)


<br>


### 👉 Specs:

Finally

- List of all specs available  ✅
- The spec will list the plugins that are associated with the service ✅
- In the list of plugins, we can enable and remove them from the spec via a pull request to the repository ✅
- In addition to handling service plugins, we also list all the routes and apply the plugins associated with these routes directly to the spec's paths.

> ℹ️ To use the spec manipulation functionality, you'll need to configure the integration and authentication of the chosen git provider (**At this point Gitlab or Github**).
> See how to add authentication [here](https://backstage.io/docs/auth/) and integration by clicking [here](https://backstage.io/docs/integrations/)

<br>

![image](https://github.com/user-attachments/assets/11a66892-f11b-4964-a933-845a33aefe58)

![image](https://github.com/user-attachments/assets/6b7e9db7-86e6-40a2-88ce-594b48f911ca)

![image](https://github.com/user-attachments/assets/f5f6ec66-bf2d-4698-8f2f-f0b43b387b40)

![image](https://github.com/user-attachments/assets/6fc8eb9b-94c1-4fee-8b85-7d3336883718)

👉 **Applying to specific paths**

![Captura de tela de 2025-02-11 09-26-09](https://github.com/user-attachments/assets/202b3a45-92e3-412d-bdd9-83eed9379380)

![image](https://github.com/user-attachments/assets/df8be686-2b50-4075-afba-db9d494d3c5b)


---

## Permissions

**See 👉**[Kong Service Manager Common](https://github.com/veecode-platform/platform-backstage-plugins/blob/kong-feature-permission/plugins/kong-service-manager-common/README.md)

This plugin provides the following permissions:

- `kongServiceReadPermission` 👉 Allows service information to be read,
- `kongReadAvailablePluginsPermission` 👉 Allows you to read the plugins available for the service,
- `kongRoutesReadPermission` 👉 Allows you to read all service routes,
- `kongApplyPluginToServicePermission` 👉 Allows you to apply a plugin to the service,
- `kongUpdateServicePluginPermission` 👉 Allows you to edit a plugin already installed in the service,
- `kongDisableServicePluginPermission` 👉 Allows you to disable a service plugin,
- `kongRouteCreatePermission` 👉 Allows you to create a route for the service,
- `kongUpdateRoutePermission` 👉 Allows you to edit an existing route in the service,
- `kongRouteDeletePermission` 👉 Allows you to remove an existing route from the service,
- `kongApplyPluginToRoutePermission` 👉 Enable a plugin for a route,
- `kongUpdateRoutePluginPermission` 👉 Allows you to edit a plugin applied to a route,
- `kongDisableRoutePluginPermission` 👉 Allows you to remove a plugin from a route,
- `kongReadSpecsPermission` 👉 It allows you to read the specs of the source code, if they are properly pointed out,
- `kongUpdateSpecPermission` 👉 Allows project specs to be updated.
- `kongAIPluginsPermission` 👉 Allows you to manipulate Plugins from the AI category.
- `kongAuthPluginsPermission` 👉 Allows you to manipulate Plugins from the Authentication category.
- `kongSecurityPluginsPermission` 👉 Allows you to manipulate Plugins from the Security category.
- `kongTrafficPluginsPermission` 👉 Allows you to manipulate Plugins from the Traffic Control category.
- `kongServerlessPluginsPermission` 👉 Allows you to manipulate Plugins from the Serverless category.
- `kongTransformPluginsPermission` 👉 Allows you to manipulate Plugins from the Transformations category.
- `kongLoggingPluginsPermission` 👉 Allows you to manipulate Plugins from the Logging category.
- `kongAnalyticsPluginsPermission` 👉 Allows the manipulation of Plugins from the Analytics & Monitoring category.


> 🚨 View Backstage docs to learn how to set up your instance of Backstage to use these permissions.


---

💡 See more about Kong:

> **Kong Docs**:  <https://docs.konghq.com/>
