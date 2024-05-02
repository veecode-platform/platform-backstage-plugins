import React, { useContext, useState } from 'react'
import { GithubWorkflowsContext, GithubWorkflowsProvider } from '../context';
import { useRouteRefParams } from '@backstage/core-plugin-api';
import { buildRouteRef } from '../../routes';
import { useEntityAnnotations } from '../../hooks';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import useAsync from 'react-use/lib/useAsync';
import { Progress, ResponseErrorPanel } from '@backstage/core-components';
import { useStyles } from './styles';
import { Grid } from '@material-ui/core';
import { WorkflowDetails } from './WorklowDetails';
import { Job, WorkflowRun } from '../../utils/types';
import {JobsComponent} from './JobsComponent/JobsComponent';

// links
// https://docs.github.com/en/rest/actions/workflow-jobs?apiVersion=2022-11-28
// https://github.dev/backstage/community-plugins/blob/main/workspaces/github-actions/plugins/github-actions/src/components/WorkflowRunDetails/WorkflowRunDetails.tsx
// https://github.com/ValberJunior/api-node-teste/actions/runs/8896179220

const GithubWorkflowsDetails = () => {
  
  const { id } = useRouteRefParams(buildRouteRef);
  const { entity } = useEntity();
  const { projectName } = useEntityAnnotations(entity as Entity);
  const { getWorkflowById,listJobsForWorkflowRun } = useContext(GithubWorkflowsContext);
  const [workflowRun,setWorkflowRun] = useState<WorkflowRun|null>(null);
  const [jobsRun, setJobsRun] = useState<Job[]|[]>([]);
  const { root,container } = useStyles();

  const { loading, error } = useAsync(async (): Promise<void> => {
    const workflowPromise = await getWorkflowById(Number(id), projectName);
    const jobsPromise = await listJobsForWorkflowRun(projectName,Number(id));
    const [workflow, jobs] = await Promise.all([workflowPromise, jobsPromise]);
    setWorkflowRun(workflow);
    setJobsRun(jobs);
  }, []);

  if(loading){
    return <Progress />
  }

  if (error) {
    return <ResponseErrorPanel error={error} />;
  }


  return (
    <GithubWorkflowsProvider>
        <div className={root}>
          <Grid container className={container} direction='column'>
              <WorkflowDetails
                runStartedAt={workflowRun!.run_started_at}
                updatedAt={workflowRun!.updated_at}
                status={workflowRun!.status}
                conclusion={workflowRun!.conclusion}
                avatar={workflowRun!.actor!.avatar_url}
                author={workflowRun!.actor!.login}
                branch={workflowRun!.head_branch}
                headCommit={workflowRun!.head_sha!}
                repo={workflowRun!.repository!.full_name}
                artifacts={workflowRun!.artifacts_url!}
               />
               <JobsComponent 
                 path={workflowRun?.path!}
                 event={workflowRun?.event!}
                 jobs={jobsRun}
                 />               
            </Grid>
        </div>
    </GithubWorkflowsProvider>
  )
}

export default GithubWorkflowsDetails