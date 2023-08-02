import React, { useEffect } from 'react';
import { useState } from "react";
import { GithubWorkflowsContext } from './GithubWorkflowsContext';
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { githubWorkflowsApiRef } from '../../api';
import { WorkflowResultsProps } from '../../utils/types';


export const GithubWorkflowsProvider: React.FC = ({ children }) => {

  const [branch, setBranch] = useState<string | null>(localStorage.getItem('branch-selected') ?? null);
  const [workflowsState, setWorkflowsState] = useState<WorkflowResultsProps[] | null>(null);
  const api = useApi(githubWorkflowsApiRef);
  const errorApi = useApi(errorApiRef);

  useEffect(() => {
    if (!branch) setBranch(localStorage.getItem('branch-selected'));
    if (!workflowsState) {
      const workflowsStorage = localStorage.getItem('all-workflows');
      if (workflowsStorage) setWorkflowsState(JSON.parse(workflowsStorage));
    }
  }, []);

  const setBranchState = (branch: string) => {
    setBranch(branch);
    localStorage.setItem('branch-selected', branch);
  }

  const listAllWorkflows = async (projectName: string) => {
    try {
      const workflows = await api.listWorkflowsRefactor(projectName, branch!);
      if(workflows){
        const newWorkflowsState = await Promise.all(workflows.map(async (w) => {
          return {
            id: w.workflow.id,
            name: w.workflow.name,
            status: w.latestRun.status,
            conclusion: w.latestRun.conclusion,
            lastRunId: w.latestRun.id,
            source: w.workflow.url,
            path: w.workflow.path
          };
        }));
        setWorkflowsState(newWorkflowsState);
        localStorage.setItem('all-workflows', JSON.stringify(newWorkflowsState));
        return newWorkflowsState;
      }
      else return null;
    } catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const workflowByAnnotation = async (projectName: string, annotations: string[]) => {
    try {
      const workflowsList = await listAllWorkflows(projectName);
      const workFlowsResult: WorkflowResultsProps[] = [];
      if (workflowsList) {
        annotations.forEach(workflow => {
          workflowsList.filter((w: WorkflowResultsProps) => {
            if (w.path?.includes(workflow)) {
              workFlowsResult.push({
                id: w.id,
                name: w.name,
                lastRunId: w.lastRunId,
                status: w.status,
                conclusion: w.conclusion,
                source: w.source,
                path: w.path
              })
            };
            return workFlowsResult
          })
        })
      }
      return workFlowsResult
    }
    catch (e:any) {
      errorApi.post(e);
      return null
     }
  }

  const getWorkflowRunById = async (runId: string, projectSlug: string) => {
    try {
      const response = api.getWorkflowRunById(runId.toString(), projectSlug);
      return response
    }
    catch (e:any) {
      errorApi.post(e);
      return null
     }
  }

  const handleStartWorkflowRun = async (workFlowId: number, projectSlug: string, branch: string) => {
    try {
      await api.startWorkflowRun(workFlowId.toString(), projectSlug, branch);
    }
    catch (e:any) {
      console.log(e)
      errorApi.post(e);
     }
  };

  const handleStopWorkflowRun = async (runId: number, projectSlug: string) => {
    try {
      await api.stopWorkflowRun(runId.toString(), projectSlug);
    }
    catch (e:any) {
      errorApi.post(e)
     }
  }

  return (
    <GithubWorkflowsContext.Provider
      value={{
        listAllWorkflows,
        branch,
        setBranchState,
        workflowsState,
        setWorkflowsState,
        workflowByAnnotation,
        getWorkflowRunById,
        handleStartWorkflowRun,
        handleStopWorkflowRun
      }}>
      {children}
    </GithubWorkflowsContext.Provider>
  );
};
