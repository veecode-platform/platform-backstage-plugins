import React, { useEffect } from 'react';
import { useState } from "react";
import { GithubWorkflowsContext } from './GithubWorkflowsContext';
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { githubWorkflowsApiRef } from '../../api';
import { useEntityAnnotations } from '../../hooks/useEntityAnnotations';
import { entityMock } from '../../mocks/component';
import { WorkflowResultsProps } from '../../utils/types';


export const GithubWorkflowsProvider: React.FC = ({ children }) => {

  const [branch, setBranch] = useState<string | null>(localStorage.getItem('branch-selected') ?? null);
  const [workflowsState, setWorkflowsState] = useState<WorkflowResultsProps[] | null>(null);
  const { projectName, workflows } = useEntityAnnotations(entityMock);
  const api = useApi(githubWorkflowsApiRef);
  const errorApi = useApi(errorApiRef);

  useEffect(() => {
    listAllWorkflows();
  }, []);

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

  const listAllWorkflows = async () => {
    try {
      const workflows = await api.listWorkflows(projectName);
      if (workflows) {
        const newWorkflowsState = await Promise.all(workflows.map(async (w) => {
          const data = await latestWorkFlow(w.id, projectName);
          return {
            id: w.id,
            name: w.name,
            status: data?.status as string,
            conclusion: data?.conclusion as string,
            lastRunId: data?.runId as number,
            source: w.html_url as string,
            path: w.path as string
          };
        }));
        setWorkflowsState(newWorkflowsState);
        localStorage.setItem('all-workflows', JSON.stringify(newWorkflowsState));
        return newWorkflowsState;
      }
      else return null;
    } catch (e:any) {
      errorApi.post(e);
      return null
     }
  };

  const latestWorkFlow = async (workFlowId: number, projectSlug: string) => {
    try {
      const data = await api.getLatestWorkflowRun(workFlowId.toString(), projectSlug);
      if (data) {
        return {
          runId: data.id,
          status: data.status,
          conclusion: data.conclusion
        }
      }
      return null
    }
    catch (e:any) {
      errorApi.post(e);
      return null
     }
  };

  const workflowByAnnotation = async () => {
    try {
      const workflowsList = await listAllWorkflows();
      const workFlowsResult: WorkflowResultsProps[] = [];
      if (workflowsList) {
        workflows.forEach(workflow => {
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
        projectName,
        workflows,
        branch,
        setBranchState,
        workflowsState,
        latestWorkFlow,
        workflowByAnnotation,
        getWorkflowRunById,
        handleStartWorkflowRun,
        handleStopWorkflowRun
      }}>
      {children}
    </GithubWorkflowsContext.Provider>
  );
};
