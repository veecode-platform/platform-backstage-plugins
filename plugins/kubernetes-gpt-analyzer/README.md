# kubernetes-gpt-analyzer ✨

The Kubernetes GPT Analyzer plug-in offers an AI approach to your Kubernetes component.

The plug-in offers a dynamic approach, in conjunction with the `@backstage/plugin-kubernetes` and `k8s-operator`:

- Application error analysis.
- Listing of errors and their respective solutions, as well as AI suggestions for resolving them.
- Analysis checking, using a timer that can be configured.
  
<br>

### Our community 

> 💬  **Join Us**
>
> Join our community to resolve questions about our **Plugins**. We look forward to welcoming you! <br>
>
>    [Go to Community  🚀](https://github.com/orgs/veecode-platform/discussions)

<br>

### Getting Started:



Before installing the plugin, there are some prerequisites to ensure its functionality:

- Configure the kubernetes plugin and its dependencies , :heavy_check_mark: [How to configure the kubernetes plugin :page_with_curl:](https://backstage.io/docs/features/kubernetes/) .
- Have an OpenIA Api Token, :heavy_check_mark: [Here's how to get an Open IA API KEY :page_with_curl:](https://openai.com/index/openai-api/) .
- Configuring k8s-operator, :heavy_check_mark: [How to configure k8s-operator with OpenIA :page_with_curl:](https://github.com/k8sgpt-ai/k8sgpt-operator/) .
<br>


### Installation

If you are using yarn 3.x:

```bash
yarn workspace app add @veecode-platform/backstage-plugin-kubernetes-gpt-analyzer
```

If you are using other versions:

```bash
yarn add --cwd packages/app @veecode-platform/backstage-plugin-kubernetes-gpt-analyzer
```


---


### Backstage Configuration

Be aware that the ClusterRole used as described at https://backstage.io/docs/features/kubernetes/configuration#role-based-access-control also needs these permissions to read the k8sgpt results:

```yaml
- apiGroups:
  - core.k8sgpt.ai
  resources:
  - results
  verbs:
  - get
  - list
```

---

### UI 🎨

In the Ui we have 2 approaches, the `KubernetesGptAnalyzerCard`, which has a more minimalist look, just showing the number of errors if the AI finds them in its analysis and a button leading to the `KubernetesGptAnalyzerPage` component, which in turn is the main component, where in addition to notifying the number of errors found (if any), it also addresses the errors found and the possibility of analyzing the errors individually, resulting in an analysis with possible solutions.
Let's take them one at a time, starting with `KubernetesGptAnalyzerCard`:


#### Kubernetes Gpt Analyzer Card

As previously mentioned, the card component is only intended to notify you of errors and has a button that takes you to the main component.
To add this card to your **EntityPage**:

```diff
// packages > app > src > components > catalog > EntityPage.tsx

... other imports
+  import {
+   isKubernetesAvailable,  // if you've already imported isKubernetesAvailable from the @backstage/plugin-kubernetes plugin, you don't need to import it again
+   KubernetesGptAnalyzerCard
+  } from '@veecode-platform/backstage-plugin-kubernetes-gpt-analyzer'; 

...

const overviewContent = (
...
+           <Grid item md={7} sm={12}>
+             <KubernetesGptAnalyzerCard />
+            </Grid>
)

```

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/d1579577-fbcd-4f5b-9689-bcc2c648bd89)
<br>


#### Kubernetes Gpt Analyzer Page

The main component of the plugin, it shows the number of errors (if any) and the cards with the errors and their respective analyses.
To configure:

```diff
// packages > app > src > components > catalog > EntityPage.tsx

... other imports
+  import {
+   isKubernetesAvailable,  // if you've already imported isKubernetesAvailable from the @backstage/plugin-kubernetes plugin, you don't need to import it again
+   KubernetesGptAnalyzerPage
+  } from '@veecode-platform/backstage-plugin-kubernetes-gpt-analyzer'; 

// On the entity page you want to add
...
+     <EntityLayout.Route if={isKubernetesAvailable} path="/kubernetes-gpt-analyzer" title="Kubernetes GPT">
+      <KubernetesGptAnalyzerPage />
+    </EntityLayout.Route>
...

```

> ℹ️ Don't change the component's route path to a custom one, it should always be `path="/kubernetes-gpt-analyzer"`.

**Screens**:

- **When there are errors**:
  
![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/b06c1851-96f2-4990-bd7a-8902339b0b1d)

- Analyzing the error:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/1349d500-a66e-4daf-8816-5cd3de56b8fc)

-When there is no proper configuration:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/b5cb8d71-7c3a-4870-8326-357b5d4066a1)

-When there is no error:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/2f346a55-33ad-4852-8c6a-ccbb80cb1f3e)

---

### Request interval ⏱️

By default, we have determined that analysis requests will be `1000000` ms, or 16.67 minutes. However, if you need an analysis with shorter or longer intervals, both on the Kubernetes Gpt Analyzer Card and on the **Kubernetes Gpt Analyzer Page**, just pass the props **intervalMs** which expects a number:

See:

```diff
// Kubernetes Gpt Analyzer Page

   <EntityLayout.Route if={isKubernetesAvailable} path="/kubernetes-gpt-analyzer" title="Kubernetes GPT">
-   <KubernetesGptAnalyzerPage />
+   <KubernetesGptAnalyzerPage intervalsMs={15000} />
   </EntityLayout.Route>

// Kubernetes Gpt Analyzer Card

   <Grid item md={7} sm={12}>
-     <KubernetesGptAnalyzerCard />
+    <KubernetesGptAnalyzerCard intervalsMs={15000} />
   </Grid>
...
```

> ℹ️ Remember that a shorter interval time can increase the consumption of your KEY API.
