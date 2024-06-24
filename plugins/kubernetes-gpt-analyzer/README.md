# kubernetes-gpt-analyzer

The Kubernetes GPT Analyzer plug-in offers an AI approach to your Kubernetes component.

The plug-in offers a dynamic approach, in conjunction with the `@backstage/plugin-kubernetes` and `k8s-operator`:

- Application error analysis.
- Listing of errors and their respective solutions, as well as AI suggestions for resolving them.
- Interaction with AI chat.
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


### UI


