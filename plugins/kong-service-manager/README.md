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
  instances:   // below this key, you can add as many instances as you need.
    - id: kongInstance1 // Define a simple label, it will also be referenced in the catalog-info of the component that will use this resource.
      host: ${KONG_HOST} 
      workspace: ${KONG_WORKSPACE} // If you don't have a specific workspace, set it to “default”
      token: ${KONG_ACCESS_TOKEN}
```

**2- Annotations**

 The Plugin recognizes 2 annotations for its operation, the first being **`kong-manager/service-name`**, which will identify the service that will be used as a parameter. In this annotation, you can enter the name of the service or its id, preferably the name. It is also important to note that each `catalog-info.yaml` can only receive one service.
The other annotation will be **`kong-manager/instance`**, which will receive the instances on which kong will make the calls, it can receive more than one item, properly separated by commas and without spaces. It is important to note that the instances must be configured in `app-config.yaml`, as described in the previous section; if they have not been configured correctly, the calls will not be answered.

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
+ import { KongServiceManagerPage, isKongServiceManagerAvailable } from '@veecode-platform/plugin-kong-service-manager';

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
+      <KongServiceManagerPage/>
+    </EntityLayout.Route>

  </EntityLayout>
);

...

```

> ℹ️ We've used the `ServiceEntityPage` component for the example, but it can be replicated for any of the existing types in the `EntityPage`.

Now that the plugin is properly configured, let's take a look at the screens it offers:

### 👉 About Page:

![About](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/e1f2aedc-644b-448b-adbc-ceba6d646c87)

Here we've highlighted all the information about the service referenced in the component, note that in the top right corner we have a combobox where we can navigate between the available kong instances:

![Select Instance](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/2cb10361-8e04-4c47-b36e-55faa4791abf)

<br>

### 👉 All Routes:
- List of all routes for your Kong instance; ✅
- Create / Removing and Editing a route at your Service; ✅
- Filtering by the routes created in the service; ✅

On this screen, we list all the routes that the service has:

![image](https://github.com/user-attachments/assets/35611ac3-9153-417c-925f-cae53e1ad12e)

Also noteworthy is the behavior of the `tags` field, which expands when triggered:

![tags](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/c3f74551-38ee-401d-80f4-c3de8ba52b66)

In the actions column, you can edit a route or delete it.
You can also create new routes with the “create” button:

![image](https://github.com/user-attachments/assets/b591e35c-7159-4cbf-8ceb-a530c93bebae)

![image](https://github.com/user-attachments/assets/c1c60310-c70b-4569-a871-3324a90a4acb)

<br>

### 👉 All Plugins:

Finally, we have the list of plugins:

- List of all plugins eligible for your Kong instance;  ✅
- Installing / Removing and Editing a plugin at your Service; ✅
- Plugin search field; ✅
- Filtering by the plugins installed in the service; ✅


#### Listing of all plugins:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/4c47f308-157e-45ee-874c-ef89c556efc9)

#### Installing a plugin

For the example, we'll use the **rate limiting** plugin:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/aaa55c9b-6471-4c9e-ab4e-2ab1888c18ba)

When you install it, it will appear on the `Associated Plugins` tab:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/f33f0c97-69d8-4de4-8995-a6584b71a696)

From then on, the plugin will already be configured in your service:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/0a4f68c3-cb68-4106-9991-427b40f4ec0b)



---

💡 See more about Kong:

> **Kong Docs**:  <https://docs.konghq.com/>

