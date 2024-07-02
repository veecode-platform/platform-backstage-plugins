# Infracost Plugin

## Intro 💡

The **Infracost** plugin provides a graphic representation of the application's cost estimate in its respective provider. <br>
The Plugin offers a generalized approach with all the resources used and also presents a more detailed approach with the cost components that each resource has.<br>
In this documentation we will cover how to correctly configure the plugin, how to create the job in your pipeline/workflow to generate the estimate and be consumed by the plugin and how to correctly reference the annotation that the UI component expects to render the content on your entityPage.
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

- Have a locally installed Backstage project, :heavy_check_mark: [How to create a Backstage app :page_with_curl:](https://backstage.io/docs/getting-started/create-an-app) .
- Have a Backstage with a properly configured Postgres database, if you haven't already, see how to set it up [here](https://backstage.io/docs/tutorials/switching-sqlite-postgres/).
- Have the `Infracost-backend`  plugin installed on your Backstage, see how to install [here](https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/infracost-backend/README.md).
- The project's infrastructure must be provided via terraform.
- Have an Infracost API KEY. Here's how to generate one [here](https://www.infracost.io/docs/#2-get-api-key).
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

<br>

### Configuration

Bearing in mind that the `infracost-backend` plugin is already configured and the kind `Infracost` is already available in your backstage, the next step is to generate the file **infracost-base.json** and relate it to the main project and the kind infracost.


We can generate an estimate for any component in the catalog, as long as this estimate is referenced with the same name and the same repository as the main component, and the estimate file must have the name **infracost-base.json** and be at the same level as the estimate file, which should have the kind **Infracost**.

The illustration shows a case where the component **Cluster-ec2** has in its repository a main entity of kind **Cluster** and an entity of kind **Infracost** with the `infracost-base.json` referenced at the same level.

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/365663b3-1556-478c-ad66-e62ba3a713d8)


The organization of folders is up to you, but let's assume that this rule is adopted:

```yaml
.
├── .content
│   ├── cluster.yaml
│   ├── infracost.yaml
│   └── infracost-base.json
└── catalog-info.yaml

```

The catalog-info.yaml is a **location** that will retrieve all the other entities present in the repository as long as they are referenced in it:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Location
metadata:
  name: cluster-ec2-location
  description: Importing components
spec:
  targets:
    - ./.content/cluster.yaml
    - ./.content/infracost.yaml
```
This way, when it is registered in the Backstage, the location will scan both the Cluster entity and the Infracost entity.

> ℹ️Remember that the Cluster is an example and can be used for any other kind.

Both `cluster.yaml` and `infracost.yaml` should have the same name, and the entity **Infracost** should have this content:

```yaml
apiVersion: veecode.backstage.io/v1alpha1
kind: Infracost
metadata:
  name: "cluster-ec2"
  annotations:
    backstage.io/techdocs-ref: dir:.
spec:
  type: FinOps
  lifecycle: experimental
  owner: "group:default/admin"  # your group 
  estimate:
   $text: ./infracost-base.json
```

Note that the estimate refers to the infracost-base.json file, even if it hasn't been generated yet, it's best to have it referenced as above.


> **Obs** In terms of organizing the folder structure, it's up to you if you want to create a folder just for infracost files, such as `.infracost`, just reference them in the correct way in the **catalog-info.yaml**.


The main component, on the other hand, needs to have the **annotation: infracost/project**, with the name of the project:

```diff
apiVersion: veecode.backstage.io/v1alpha1
kind: Cluster
metadata:
  name: "cluster-ec2"
  annotations:
    github.com/project-slug: test/cluster-ec2
    backstage.io/techdocs-ref: dir:.
+    infracost/project: cluster-ec2
spec:
  type: ec2
  lifecycle: experimental
  owner: "group:default/admin"
```
<br>

### Generating the contents of the file `infracost-base.json`:

An important step to note is that the project needs to be provisioned by **Terraform**, it will be via **Terraform** that the provider will be defined and the necessary secrets will be generated.


Taking into account that the **infracost.yaml** files are already created within the repository of the main component, and the `catalog-info.yaml` already follows the kind model **Location**, in your project's repository, create a new workflow to run the estimate of the **Infracost** and commit the file **infracost-base.json** in your repository:

> ℹ️ This example is based on github, if your git provider is not github, feel free to adapt this job, note that it is very simple and open to adaptation.

`.github > workflows > infracost.estimate.yml`

```yaml
name: infracost-estimate

on:
  push:
    branches:
      - "*"
      - "*/*"
      - "**"
  workflow_dispatch: 
env:
  PATH_INFRACOST: ./.content

jobs:
  infracost:
    name: Infracost
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write

    steps:
      - uses: hashicorp/setup-terraform@v2
      - name: Setup Infracost
        uses: infracost/actions/setup@v2
        with:
          api-key: ${{ secrets.INFRACOST_API_KEY }}
          path: |
            .terraform/**
            .terraform.lock.hcl
            plan_cache.json
          key: terraform-lock-${{ steps.extract_branch.outputs.branch }}

      - name: Checkout base branch
        uses: actions/checkout@v3
        with:
          ref: '${{ github.event.pull_request.base.ref }}'
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}
      - name: Terraform Init
        id: init
        run: |
             terraform init
             terraform plan -no-color -out plan_cache.json 
      # Generate Infracost JSON file as the baseline.
      - name: Generate Infracost cost estimate baseline
        run: |
          infracost breakdown --show-skipped --path plan_cache.json

      - name: Generate Infracost cost estimate Json
        run: |
          infracost breakdown --path plan_cache.json --format json --out-file ${{ env.PATH_INFRACOST }}/infracost-base.json

      - name: Publish generated artifacts
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          file_pattern: "${{ env.PATH_INFRACOST }}/infracost-base.json"
          commit_user_name: ${{ secrets.gh_username }}
          commit_user_email: ${{ secrets.gh_email }}
          commit_author: ${{ secrets.gh_username }}<${{ secrets.gh_email }}>
          commit_message: "Publish infracost estimate"
          push_options: '--force'

```
<br>

> ℹ️ Note that Infracost's **Path** is set to "./.content" because we are giving the example so that it is generated in the ` folder.content`, but if the approach adopted is different, then the folder reference in the **catalog-info.yaml** of kind Location, and in the variable **INFRACOST_PATH** of the workflow.

> ℹ️ Another important observation is that in the example we used terraform with aws as the provider, but nothing prevents other providers from being used. Just be aware of the changes to the workflow that this will entail.

This process can also be done manually, as long as the command `terraform plain` has been used before, we can use cli to generate the file **infracost-base.json** like this:
```bash
// Do it at the same level as the Infracost entity
infracost breakdown --path plan_cache_cli.json --format json --out-file infracost-base.json
```

<br>

### Considerations

With the entities in the repository, following the rules stated above, and with the file **infracost-base.json** generated. Simply register the location of the `catalog-info.yaml` in the Backstage, and the backend processor will save the data in the database.
Next, we'll look at the UI components to get the most out of the Infracost plugin.

<br>
---
<br>

## UI 🎨

To start, we need to go to our `EntityPage.tsx` and add the tab **Infracost** to the page of the entity you prefer, in the example we'll add it to a clusterPage:

```diff
... other imports
+ import { InfracostOverviewPage, isInfracostAvailable } from '@veecode-platform/backstage-plugin-infracost';
...
const clusterPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <ClusterOverviewPage />
    </EntityLayout.Route>

  ...

+   <EntityLayout.Route if={isInfracostAvailable} path="/infracost" title="Infracost">
+      <InfracostOverviewPage/>
+   </EntityLayout.Route>
...
  </EntityLayout>
);
```
This way your component, if it has the estimate correctly configured, will have a view of the data coming from Infracost, with an estimate of the costs of the infrastructure, according to your provider:

![infracost](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/75a32bdc-e752-4e30-a86b-a65e4b5ce057)




 
