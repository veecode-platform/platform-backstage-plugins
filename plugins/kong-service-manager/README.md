# Kong Service Manager Plugin 

The Kong Service Manager plugin offers the facility to manipulate your service from different Kong environments, in your component, detailing information about the service, listing the routes it has and also offering the possibility of manipulating plugins without leaving the backstage.


## Installation 🔧


If you are using yarn 3.x:

```bash
yarn workspace app add @veecode-platform/plugin-kong-service-manager
```

If you are using other versions:

```bash
yarn add --cwd packages/app @veecode-platform/plugin-kong-service-manager
```

## Configuration ⚙️

**1- Proxy**

In the `app-config.yaml` file, add the proxy configuration:

```yaml
proxy:
  endpoints:

   "/kong-manager/api":
        target: https://api.manager.apr.vee.codes/default
        allowedHeaders: ['Authorization', 'Content-Type']
        workspace: 'default'        # Set the workspace / optional
        headers: 
          Authorization: Basic ${KONG_ACCESS_TOKEN_}
          Accept: application/json
          Content-Type: 'application/json'

    "/kong-other-manager/api":          # In case of more than one instance
      target: https://api.manager.apr.vee.codes/default
      allowedHeaders: ['Authorization', 'Content-Type']
      workspace: 'default'        # Set the workspace / optional
      headers: 
        Authorization: Basic ${KONG_ACCESS_TOKEN_}
        Accept: application/json
        Content-Type: 'application/json'
```

**2- Additional settings**

  In this step, we need to expose some proxy information so that the plugin's api can handle requests consistently. To do this, we need to change 2 files in `packages > app`:
- At the end of the file `package.json`, add the following information:
 ```diff
{
 ....
  "files": [
    "dist",
 +   "config.d.ts"
  ],
 + "configSchema": "config.d.ts"
}
```
- After that, create a file called `config.d.ts` in the root of the `packages > app`. The content should display some information about the proxy, like this:
```ts
export interface Config {
  /**
  * @visibility frontend
  */
  proxy?: {
    /** @visibility frontend */
    endpoints?: {
      /** @visibility frontend */
      [key: string]:
        | string
        | {
             /** @visibility frontend */
              target: string;
             /** @visibility frontend */
              allowedHeaders?: string[];
             /** @visibility frontend */
              workspace?: string;
             /** @visibility frontend */
              headers?: {
                  /** @visibility secret */
                  Authorization?: string;
                  /** @visibility secret */
                  authorization?: string;
                  /** @visibility secret */
                  'X-Api-Key'?: string;
                  /** @visibility secret */
                  'x-api-key'?: string;
                  [key: string]: string | undefined;
                  };
          };
    };
  } 
}
```


**3- Annotations**

 The Plugin recognizes 2 annotations for its operation, the first being **`kong-manager/service-name`**, which will identify the service that will be used as a parameter. In this annotation you can enter the name of the service or its id, preferably the name. It's also worth noting that each `catalog-info.yaml` can only receive one service.
The other annotation will be **`kong-manager/instance`**, which will receive the instances in which the kong will make the calls, this one can receive more than one item, properly separated by commas and without spaces. It's important to note that the instances must be configured as endpoints in the `app-config.yaml`, as per the previous section, if they haven't been properly configured the calls won't be answered.

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
+    kong-manager/instance: /kong-manager/test,/kong-manager/test1
   
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

### 👉 All Routes:

On this screen, we list all the routes that the service has:

![All Routes](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/5e1cfcf2-4876-412c-83ee-921a28c5525a)

Also noteworthy is the behavior of the `tags` field, which expands when triggered:

![tags](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/c3f74551-38ee-401d-80f4-c3de8ba52b66)


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

