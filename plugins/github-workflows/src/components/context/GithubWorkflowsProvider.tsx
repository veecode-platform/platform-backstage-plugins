import React, { ReactNode } from 'react';
import { useState } from "react";
import { GithubWorkflowsContext } from './GithubWorkflowsContext';
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { githubWorkflowsApiRef } from '../../api';
import { WorkflowResultsProps } from '../../utils/types';
import { sortWorflowsByName } from '../../utils/common';

interface GithubWorkflowsProviderProps {
  children: ReactNode;
}


export const GithubWorkflowsProvider: React.FC<GithubWorkflowsProviderProps> = ({ children }) => {

  const [branch, setBranch] = useState<string | null>(null);
  const [workflowsState, setWorkflowsState] = useState<WorkflowResultsProps[] | null>(null);
  const [ inputsWorkflowsParams, setInputsWorkflowsParams ] = useState<object|null>(null);
  const [workflowsByAnnotationsState, setWorkflowsByAnnotationsState] = useState<WorkflowResultsProps[] | null>(null);
  const api = useApi(githubWorkflowsApiRef);
  const errorApi = useApi(errorApiRef);

  const setBranchState = (branchState: string) => {
    setBranch(branchState);
  }

  const setInputs = (inputs: object) => {
    setInputsWorkflowsParams(inputs);
  }

  const listAllWorkflows = async (projectName: string, filter: string[] = []) => {
    try {
      const workflows = await api.listWorkflows(projectName, branch!, filter);
      if(workflows){
        const newWorkflowsState = await Promise.all(workflows.map(async (w) => {
          return {
            id: w.workflow.id,
            name: w.workflow.name,
            status: w.latestRun.status,
            conclusion: w.latestRun.conclusion,
            lastRunId: w.latestRun.id,
            source: w.workflow.url,
            path: w.workflow.path,
            parameters: w.parameters
          };
        }));
        const ordelyWorkflows = sortWorflowsByName(newWorkflowsState)
        setWorkflowsState(ordelyWorkflows);
        return ordelyWorkflows;
      }
      return [];
    } catch(e:any){
      errorApi.post(e);
      return [];
    }
  }

  const handleStartWorkflowRun = async (workFlowId: number, projectSlug: string) => { 
    try {
      const response = await api.startWorkflowRun(workFlowId.toString(), projectSlug, branch!, inputsWorkflowsParams ?? {});
      if(response) return response;
      return null
    }
    catch (e:any) {
      errorApi.post(e);
      return null
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
        setInputs,
        inputsWorkflowsParams,
        workflowsState,
        setWorkflowsState,
        workflowsByAnnotationsState,
        setWorkflowsByAnnotationsState,
        handleStartWorkflowRun,
        handleStopWorkflowRun
      }}>
      {children}
    </GithubWorkflowsContext.Provider>
  );
};
