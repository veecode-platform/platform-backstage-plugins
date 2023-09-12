# Gitlab-pipelines Plugin

O Plugin Gitlab-pipelines integra o GitlabCi com seu componente backstage.
Ele oferece duas abordagens:
- Executar / Cancelar uma nova pipeline, listando o estado das últimas pipelines do seu projeto.
- Oferece uma lista com execuções de pipelines relacionadas com variáveis, o que auxilia na execução de jobs individuais ou em grupos.

Começando:

Pré-requisitos:
  - Ter um projeto Backstage instalado localmente, <a href="https://backstage.io/docs/getting-started/create-an-app/" target="_blank">✔️ Como criar um aplicativo Backstage 📃 </a>.
  - Configure o catálogo e integre com Gitlab, <a href="https://backstage.io/docs/integrations/gitlab/locations" target="_blank">✔️ Como configurar a integração 📃</a> .

**Instalação**

```bash
yarn add --cwd packages/app @veecode-platform/backstage-plugin-gitlab-pipelines
```
<br>

**Configuração**

As etapas a seguir devem ser seguidas para garantir o funcionamento do plugin de forma correta.

1- Configuração de proxy
No arquivo `app-config.yaml`:
```yaml
proxy:

  '/gitlab-pipelines':
    target: https://gitlab.com/api/v4
    allowedHeaders: ['PRIVATE-TOKEN']
    headers:
      PRIVATE-TOKEN: ${GITLAB_TOKEN_SECRET}
      Accept: application/json 
```
> ℹ️ Remember to set the ${GITLAB_TOKEN_SECRET} variable with your Gitlab personal token.

<br>

2- Configurando seu GitlabCi

Para acionarmos a pipeline, seja completamente ou por jobs individuais, optamos por sempre instanciarmos uma nova pipeline para que tudo esteja sempre na última versão de build, ao invés de adicionarmos jobs manuais que invocariam estados de pipelines já rodados.
Deste modo precisamos ficar atentos a como configurar nosso `.gitlab_ci.yml`;

Veja esse exemplo:

```yaml
# List of stages for jobs, and their order of execution
stages:         
  - build
  - deploy
  - start
  - stop

variables:
  DEFAULT_JOB: 'false'
  START_JOB: 'false'
  STOP_JOB: 'false'

build-job:       # Exemplo de job padrão para minha aplicação
  stage: build
  script:
    - echo "Compiling the code..."
    - echo "Compile complete."
  rules:
    - if: $DEFAULT_JOB == "true"

deploy-job:      # This job runs in the deploy stage.
  stage: deploy  # It only runs when *both* jobs in the test stage complete successfully.
  environment: production
  script:
    - echo "Deploying application..."
    - echo "Application successfully deployed."
  rules:
    - if: $DEFAULT_JOB == "true"

start-job:           # Exemplo de job para um comportamento específico*
  stage: start
  script:
    - echo "start job..."
  rules:
    - if: $START_JOB == "true"
 
stop-job:       # Exemplo de job para um comportamento específico*
  stage: stop
  script:
    - echo "stop job..."
  rules:
    - if: $STOP_JOB == "true"
```

No exemplo acima podemos destacar dois tipos de jobs, os que são default e fazem parte do ciclo do CI-CD, e os que são jobs que tem comportamentos específicos para uma tarefa.
Para os Jobs default, criaremos uma variável padrão e em todos jobs desse tipo, adicionaremos a condição dessa variável ser "true" para que executem todos eles.

Já para os Jobs específicos, definiremos variáveis para cada um, de acordo com a sua necessidade, não se esquecendo de adicionar a condição dessa variável ser true para que o job seja executado.


3- Para garantir que os componentes do plugin sejam renderizados, precisamos revisar se no `catalog-info.yaml` do componente backstage, tenha a seguinte annotation: `gitlab.com/project-slug`:

```diff
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: "Test"
  description: "gitlab test"
  annotations:
+    gitlab.com/project-slug: repo/test
    backstage.io/techdocs-ref: dir:.

spec:
  type: service
  lifecycle: experimental
  owner: admin
```

<hr>
<br>

<h3>Pipelines List</h3>

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/25bfdbe4-a93c-4b6e-a642-4219842ec4bf)

O componente lista os últimos 20 pipelines que foram executados no projeto. Em seu cabeçalho conseguimos definir a branch, conseguimos rodar uma nova pipeline e também atualizar a tabela com o botão refresh.
A tabela é dividida por "Pipeline ID", onde se encontram os ids das respectivas pipelines, seguido de seu status, url da interface do Gitlab e o tempo decorrido de sua execução.
Ao clicarmos no botão de "rodar pipeline", acionaremos um modal onde inserimos a variável dos jobs que setamos anteriormente. Como por exemplo, definiremos que todos os "DEFAULT_JOBS" rodem:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/7a53861a-f4e3-4664-81e9-39cb603c4ec1)

Logo os jobs em que a variável foi setada, serão executados seguindo sua ordem cronológica.

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/c0af4532-c7ae-4433-ae02-83c55ef82504)

Como podemos ver:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/7dffe0fc-2ace-4bca-bf00-e4f5b3909a5d)

Para adicionarmos a nosso componente, vamos seguir editar a `EntityPage` que fica no caminho: `packages/app/src/components/catalog/EntityPage.tsx`:

```diff
...
+ import { GitlabPipelineList, isGitlabAvailable } from '@veecode-platform/backstage-plugin-gitlab-pipelines';

...

const cicdContent = (
  <EntitySwitch>
+    <EntitySwitch.Case if={isGitlabAvailable}>
+      <GitlabPipelineList/>
+    </EntitySwitch.Case>
  </EntitySwitch>
);

...
```
Com essas alterações já estaremos aptos para usar o componente **Pipelines List**.

<br>
<hr>
<br>

<h3>Gitlab Jobs</h3>

Já o Gitlab Jobs é um componente em que filtramos os jobs que separamos, como no exemplo anterior, aos quais tem comportamentos específicos e não fazem parte do fluxo padrão da pipeline.

Para que eles sejam adicionados ao nosso componente backstage, necessitamos de uma annotation em especial, a `gitlab.com/jobs`.
Seguimos uma sintaxe diferente para setarmos o valor dessa annotation, veja:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/43cbf376-e2d6-4c5a-b009-664910c6fc0a)

Dessa forma:

```diff
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: "Test"
  description: "gitlab test"
  annotations:
    gitlab.com/project-slug: repo/test
    backstage.io/techdocs-ref: dir:.
+    gitlab.com/jobs: 'Deploy:NORMAL_JOB,Start:START_JOB,Stop:STOP_JOB'

spec:
  type: service
  lifecycle: experimental
  owner: admin
```
Para adicionarmos em nosso componente backstage, precisamos voltar ao `packages/app/src/components/catalog/EntityPage.tsx` e adicionarmos o seguinte código:

```diff
...
 import {
  GitlabPipelineList,
  isGitlabAvailable,
+ isGitlabJobsAvailable,
+ GitlabJobs
  } from '@veecode-platform/backstage-plugin-gitlab-pipelines';

...

const overviewContent = (
  <Grid container spacing={3} alignItems="stretch">
    {entityWarningContent}
    <Grid item md={6}>
      <EntityAboutCard variant="gridItem" />
    </Grid>
    <Grid item md={6} xs={12}>
      <EntityCatalogGraphCard variant="gridItem" height={400} />
    </Grid>

+    <EntitySwitch>
+      <EntitySwitch.Case if={isGitlabJobsAvailable}>
+        <Grid item lg={8} xs={12}>
+           <GitlabJobs />
+       </Grid>
+      </EntitySwitch.Case>
+    </EntitySwitch>
    
    
    <Grid item md={4} xs={12}>
      <EntityLinksCard />
    </Grid>
  </Grid>
);

...
```
E então, teremos listados todos os jobs adicionados no annotation de nosso componente, onde o Label do botão será o título do componente button, e a variável ficará responsável por acionar a ação de cada botão por debaixo dos panos:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/cfcee1e1-3f72-4f8d-9cf3-2208f0cd4d9d)

Sem a necessidade de informar a variável novamente, só bastará clicar em rodar o job desejado;

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/0d6a9243-5b23-4209-a808-cd3efc70d6c4)

E em seu gitlab apenas o job rodará em uma nova execução de pipeline:

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/f44615b2-c0dd-4b0e-83e3-7f791193d552)



