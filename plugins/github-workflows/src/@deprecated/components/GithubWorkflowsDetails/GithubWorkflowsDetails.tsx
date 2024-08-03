/* eslint-disable @backstage/no-undeclared-imports */
import React, { useState } from 'react'
import { GithubWorkflowsProvider, useGithuWorkflowsContext } from '../../context';
import { useRouteRefParams } from '@backstage/core-plugin-api';
import { buildRouteRef } from '../../../routes';
import { useEntityAnnotations } from '../../hooks';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import useAsync from 'react-use/lib/useAsync';
import { Progress, ResponseErrorPanel } from '@backstage/core-components';
import { useWorkflowDetailsStyles } from './styles';
import { Button, Grid, Tooltip } from '@material-ui/core';
import { WorkflowDetails } from './WorklowDetails';
import { Job, WorkflowRun } from '../../../utils/types';
import {JobsComponent} from './JobsComponent/JobsComponent';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { useNavigate } from 'react-router-dom'

const GithubWorkflowsDetails = () => {
  
  const { id } = useRouteRefParams(buildRouteRef);
  const { entity } = useEntity();
  const { projectName,hostname } = useEntityAnnotations(entity as Entity);
  const { getWorkflowById,listJobsForWorkflowRun } = useGithuWorkflowsContext();
  const [workflowRun,setWorkflowRun] = useState<WorkflowRun|null>(null);
  const [jobsRun, setJobsRun] = useState<Job[]|[]>([]);
  const { root,container,footer } = useWorkflowDetailsStyles();
  const navigate = useNavigate();

  const { loading, error } = useAsync(async (): Promise<void> => {
    const workflowPromise = await getWorkflowById(hostname, projectName, Number(id));
    const jobsPromise = await listJobsForWorkflowRun(hostname,projectName,Number(id));
    const [workflow, jobs] = await Promise.all([workflowPromise, jobsPromise]);
    setWorkflowRun(workflow);
    setJobsRun(jobs);
  }, []);

  const handleBackNavigation = () => {
    navigate(-1)
  }

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
               />
               <JobsComponent 
                 path={workflowRun?.path!}
                 event={workflowRun?.event!}
                 jobs={jobsRun}
                 />   
               <div className={footer}>
                <Tooltip title="Back" arrow placement='top-start'>
                  <Button variant="outlined" onClick={handleBackNavigation}>
                    <KeyboardReturnIcon/> 
                  </Button>
                </Tooltip> 
               </div>           
            </Grid>
        </div>
    </GithubWorkflowsProvider>
  )
}

export default GithubWorkflowsDetails