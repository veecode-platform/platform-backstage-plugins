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
- Have the `Infracost-backend` plugin installed on your Backstage, see how to install [here].(https://github.com/veecode-platform/platform-backstage-plugins/blob/master/plugins/infracost-backend/README.md).
- A infra-estrutura do projeto precisa estar provisionada via terraform.
- Ter um Infracost API KEY. Veja como gerar um [aqui](https://www.infracost.io/docs/#2-get-api-key).
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

Levando em consideração que já existe o plugin de `infracost-backend` devidamento configurado e o kind `Infracost`já está disponível em seu backstage, a próxima etapa é gerar o arquivo **infracost-base.json** e relacioná-lo ao projeto principal e ao kind infracost.

Podemos gerar uma estimativa para qualquer componente do catálogo, desde que essa estimativa seja referenciada com o mesmo nome e mesmo repositório do componente principal, além disso o arquivo de estimativa tem que ter o nome de **infracost-base.json** e estar no mesmo nível do arquivo da estimativa, que deverá ter o kind **Infracost**.

Na ilustração temos um caso em que o componente **Cluster-ec2** tem em seu repositório uma entidade principal de kind **Cluster** e uma entidade de kind **Infracost** com o arquivo `infracost-base.json` referenciado no mesmo nível.

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/365663b3-1556-478c-ad66-e62ba3a713d8)


A organização de pastas fica a critério e necessidade desejada, mas suponhamos que essa regra seja adotada:

```yaml
.
├── .content
│   ├── cluster.yaml
│   ├── infracost.yaml
│   └── infracost-base.json
└── catalog-info.yaml

```

O catálog-info.yaml é um **location** que irá recuperar todas as outras entidades presentes no repositório desde que sejam referenciadas nele:

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
Desse modo, ao ser registrado no Backstage, o location irá varrer tanto a entidade de Cluster quanto a entidade de Infracost.

> ℹ️ Lembrando que o Cluster é de exemplo, podendo ser usado em qualquer outro kind.

Tanto `cluster.yaml` quanto o `infracost.yaml` deverão ter o mesmo nome, e a entidade **Infracost** deverá ter esse conteúdo:

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

Note que o estimate se refere ao arquivo infracost-base.json, mesmo que ainda nao esteja gerado, o ideal é já deixar ele referenciado da forma acima.

**Obs** A nível de organização da estrutura de pastas, fica a seu critério, se quiser criar uma pasta só para os arquivos infracost, como `.infracost`, basta referenciá-los da maneira correta no **catalog-info.yaml**.

Já o componente principal, precisa ter a **annotation: infracost/project**, com o nome do projeto:

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


### Gerando o conteúdo do arquivo `infracost-base.json`:

Uma etapa importante de ser destacada é que o projeto precisa ser provisionado pelo **Terraform**, será via **Terraform** que se definirá o provider e serão geradas as secrets necessárias.

Levando em consideração que os arquivos de **infracost.yaml** já está criado dentro do repositório do componente principal, e o `catalog-info.yaml` já segue o modelo de kind **Location**, no repositório de seu projeto, crie um novo workflow para rodar a estimativa do **Infracost** e commite o arquivo **infracost-base.json** no seu repositório:

> ℹ️ Esse exemplo é baseado no github, se seu git provider não é o github, sinta-se a vontade para adaptar esse job, note que ele é bem simples e está aberto a adaptações.

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

> ℹ️ Note que o **Path** do Infracost está definido como "./.content" por estarmos dando o exemplo para que seja gerado na pasta `.content`, mas se a abordagem adotadafor diferente, então deverá ser tanto alterada a referencia da pasta no **catalog-info.yaml** de kind Location, quanto na variável **INFRACOST_PATH** do workflow.

> ℹ️ Outra observação importante é que no exemplo usamos o terraform com o aws como provider, mas nada impede que sejam utilizadas outros providers. Só fique atento as alterações no workflow que isso implicará.

Esse processo também pode ser manual, desde que tenha sido feito o comando `terraform plain` antes, podemos usar a cli para gerar o arquivo **infracost-base.json** desta forma:
```bash
// Faça no mesmo nível da entidade Infracost
infracost breakdown --path plan_cache_cli.json --format json --out-file infracost-base.json
```

### Considerações

Com as entidades no repositório, seguindo as regras declaradas acima, e com o arquivo **infracost-base.json** gerado. Basta registrar o location do `catalog-info.yaml` no Backstage, e o processor do backend irá salvar os dados no banco de dados.
A seguir vamos abordar os componentes de UI, para extrairmos o máximo do plugin de Infracost.

---

## UI 🎨

Para começar, precisamos ir em nossa `EntityPage.tsx` e adicionar a tab **Infracost** na página da entidade que preferir, no exemplo vamos adicionar á uma clusterPage:

```diff
... outros imports
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
Dessa forma seu componente, se tiver a estimativa corretamente configurada, terá uma visão dos dados vindos do Infracost, com uma estimativa de custos da infra, de acordo com seu provider:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/96041972-f5c8-4657-8fe3-3dae6e578011)

[Gravação de tela de 02-07-2024 09:10:09.webm](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/281912c6-0055-4277-b27e-edfd477dbb7b)



 
