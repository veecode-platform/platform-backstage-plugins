# Gitlab-pipelines Plugin

The Gitlab-pipelines plugin integrates GitlabCi with its backstage component.
It offers two approaches:
- Execute / Cancel a new pipeline, listing the status of the latest pipelines in your project.
- It offers a list of pipeline executions related to variables, which helps you run individual jobs or groups of jobs.
<br>


### Our community

> 💬  **Join Us**
>
> Join our community to resolve questions about our **Plugins**. We look forward to welcoming you! <br>
>
>    [Go to Community  🚀](https://github.com/orgs/veecode-platform/discussions)

<br><br>


## 🚀 Getting started: 

Prerequisites:
  - Have a Backstage project locally installed, [✔️ How to create a Backstage app 📃](https://backstage.io/docs/getting-started/create-an-app/) .
  - Set up the catalog and integrate with Gitlab, [✔️ How to set up integration 📃](https://backstage.io/docs/integrations/gitlab/locations) .
  - Configure Gitlab authentication ✔️.
  
##  💻 Installing
<br/>

If you are using yarn 3.x:
```bash
yarn workspace app add @veecode-platform/backstage-plugin-gitlab-pipelines
```
If you are using other versions:
```bash
yarn add --cwd packages/app @veecode-platform/backstage-plugin-gitlab-pipelines
```

<br>

## ⚙️ Settings

The following steps must be followed to ensure that the plugin works correctly.

<br>

1- **Gitlab integration**:

> Configure gitlab integration, see how [Add Gitlab Integration 📃](https://backstage.io/docs/integrations/gitlab/locations).

<br/>

2- **Gitlab auth provider**:

> Make sure you have an gitlab auth provider in your devportal. See how [Add Gitlab Auth Provider 📃](https://backstage.io/docs/auth/gitlab/provider).

<br>

3- **Proxy Config** :

Still in `app-config.yaml`...

```yaml
proxy:
  endpoints:
    '/gitlab/api':
      target: https://gitlab.com/api/v4  #or https://gitlab.company.com/api/v4 (According to the version of your instance)
      credentials: dangerously-allow-unauthenticated      
      allowedHeaders: ['Authorization', 'Content-Type']
      headers:
        Accept: application/json 
        Content-Type: application/json
```

> ℹ️ If your gitlab is **self-hosted**, the information must be according to your instance, also respecting the version of the Api used and in the `integration key` the `apiBaseUrl` property is **mandatory**, as well as the `target` of the `proxy` call must contain it.

<br>



4- Setting up your GitlabCi

To trigger the pipeline, either completely or by individual jobs, we have chosen to instantiate a new pipeline so that everything is always in the latest build version, rather than adding manual jobs that would invoke states from pipelines that have already been run.
We therefore need to pay attention to how we configure our `.gitlab_ci.yml`;

See this example:

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

build-job:       # Example of standard job for my application
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

start-job:           # Job example for a specific behavior*
  stage: start
  script:
    - echo "start job..."
  rules:
    - if: $START_JOB == "true"
 
stop-job:       # Job example for a specific behavior*
  stage: stop
  script:
    - echo "stop job..."
  rules:
    - if: $STOP_JOB == "true"
```


In the example above, we can highlight two types of jobs: those that are default and are part of the CI-CD cycle, and those that are jobs that have specific behaviors for a task.

For default jobs, we'll create a standard variable and in all jobs of this type, we'll add the condition that this variable is "true" so that they all run.

For specific jobs, we will define variables for each one, according to their needs, not forgetting to add the condition that this variable is true so that the job is executed.
<br><br>


5- To ensure that the plugin components are rendered, we need to check that the `catalog-info.yaml` of the backstage component has the following annotation: `gitlab.com/project-slug`:

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




### Pipelines List



![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/25bfdbe4-a93c-4b6e-a642-4219842ec4bf)



The component lists the last pipelines that were executed in the project. In its header we can define the branch, run a new pipeline and also update the table with the refresh button.

The table is divided by "Pipeline ID", which contains the ids of the respective pipelines, followed by their status, the url of the Gitlab interface and the elapsed time of their execution.

When we click on the "run pipeline" button, we'll trigger a modal where we'll insert the jobs variable we set previously. For example, we'll set all the "DEFAULT_JOBS" to run:
<br><br>

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/7a53861a-f4e3-4664-81e9-39cb603c4ec1)




Then the jobs in which the variable has been set will be executed in chronological order.



![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/c0af4532-c7ae-4433-ae02-83c55ef82504)




As you can see:



 
![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/7dffe0fc-2ace-4bca-bf00-e4f5b3909a5d)




To add it to our component, let's edit the `EntityPage` in the path: `packages/app/src/components/catalog/EntityPage.tsx`:



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


With these changes we are now able to use the **Pipelines List** component.




* * *



<h3>Gitlab Jobs</h3>

Gitlab Jobs, on the other hand, is a component in which we filter out the jobs we've separated, as in the previous example, which have specific behaviors and aren't part of the standard pipeline flow.

In order for them to be added to our backstage component, we need a special annotation, `gitlab.com/jobs`.
We follow a different syntax to set the value of this annotation, see:

  

![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/83e93a07-4dbb-451c-9a49-ef8808ece3ad)



 
That way:


```diff
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: "Test"
  description: "gitlab test"
  annotations:
    gitlab.com/project-slug: repo/test
    backstage.io/techdocs-ref: dir:.
+    gitlab.com/jobs: 'Deploy:DEFAULT_JOB,Start:START_JOB,Stop:STOP_JOB'

spec:
  type: service
  lifecycle: experimental
  owner: admin
```

In the way mentioned above, the card component that will be generated will receive the defined label, take on the variable related to it and the card's tooltip will by default be the same as the content of the label assigned to it. But there is also a custom way of adding this annotation, giving the option of also customizing the tooltip message which can help with the usability of this component, see:

```diff
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: "Test"
  description: "gitlab test"
  annotations:
    gitlab.com/project-slug: repo/test
    backstage.io/techdocs-ref: dir:.
-    gitlab.com/jobs: 'Deploy:DEFAULT_JOB,Start:START_JOB,Stop:STOP_JOB'
+    gitlab.com/jobs: |
+      [
+         {
+            "label":"Deploy",
+            "var":"DEPLOY_JOB",
+            "tooltip":"Deploy application"
+          },
+          {
+            "label":"Start",
+            "var":"START_JOB",
+            "tooltip":"Start the instance"
+         },
+          {
+            "label":"Stop",
+            "var":"STOP_JOB",
+            "tooltip":"Stop the instance"
+          }
+      ]

spec:
  type: service
  lifecycle: experimental
  owner: admin
```
Both forms work with the plugin, the second being a customized form that opens up the possibility of including instructions for use in the tooltip, which enriches the UX.




To add it to our backstage component, we need to go back to `packages/app/src/components/catalog/EntityPage.tsx` and add the following code:



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




We will then have listed all the jobs added to our component's annotation, where the button's Label will be the title of the button component, and the variable will be responsible for triggering the action of each button under the hood:




![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/cfcee1e1-3f72-4f8d-9cf3-2208f0cd4d9d)



No need to enter the variable again, just click on run the desired job;



![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/0d6a9243-5b23-4209-a808-cd3efc70d6c4)



And in your gitlab only the job will run in a new pipeline execution:



![image](https://github.com/veecode-platform/platform-backstage-plugins/assets/84424883/f44615b2-c0dd-4b0e-83e3-7f791193d552)


