/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { GithubWorkflowsContext } from './GithubWorkflowsContext';
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { githubWorkflowsApiRef } from '../api';
import { Job, WorkflowResultsProps } from '../utils/types';
import { sortWorflowsByName } from '../utils/helpers';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { useEntityAnnotations } from '../hooks';
import { addWorkflows, initialWorkflowsState, WorkflowsReducer } from './state';
import { initialInputsParamsState, InputsParamsReducer } from './state/inputParamsState/reducer';
import { addInputsParams } from './state/inputParamsState/actions';

interface GithubWorkflowsProviderProps {
  children: React.ReactNode;
}


export const GithubWorkflowsProvider: React.FC<GithubWorkflowsProviderProps> = ({ children }) => {
  
  const [branch, setBranch] = React.useState<string>('');
  const [allWorkflowsState, dispatchWorkflows] = React.useReducer(WorkflowsReducer, initialWorkflowsState);
  const [ inputsParamsState, dispatchInputsParams ] = React.useReducer(InputsParamsReducer,initialInputsParamsState);
  const { entity } = useEntity();
  const { projectName,hostname } = useEntityAnnotations(entity as Entity);
  const api = useApi(githubWorkflowsApiRef);
  const errorApi = useApi(errorApiRef);
  
  const setInputParams = (inputsParams: object) => {
    dispatchInputsParams(addInputsParams(inputsParams))
  }

  const setWorkflowsState = (workflowsParams: WorkflowResultsProps[]) => {
    dispatchWorkflows(addWorkflows(workflowsParams))
  }
  
  const setBranchState = React.useCallback((branchState: string) => setBranch(branchState),[branch])

  const listAllWorkflows = async (filter: string[] = []) => {
    try {
      const workflows = await api.listWorkflows(hostname,projectName, branch, filter);
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
        dispatchWorkflows(addWorkflows(ordelyWorkflows));
        return ordelyWorkflows;
      }
      return [];
    } catch(e:any){
      errorApi.post(e);
      return [];
    }
  }

  const getWorkflowById = async (id:number) => {
    try{
      const data = await api.getWorkflowRunById(hostname,projectName,id);
      const workflow = {
        id: data.id as number,
        name: data.name as string,
        head_branch: data.head_branch as string,
        event: data.event as string,
        status: data.status as string,
        conclusion: data.conclusion as string,
        run_started_at: data.run_started_at as string,
        created_at: data.created_at as string,
        updated_at: data.updated_at as string,
        actor: data.actor,
        path: data.path as string,
        artifacts_url: data.artifacts_url as string,
        head_sha: data.head_sha as string,
        repository: data.repository
      };
      return workflow;
    }catch(e:any){
      errorApi.post(e);
      return null
    }
  }

  const listJobsForWorkflowRun = async (id: number) => {
    try{
      const data = await api.listJobsForWorkflowRun(hostname,projectName,id);
      return data.jobs as Job[];
    }catch(e:any){
      errorApi.post(e);
      return []

    }
  }

  const handleStartWorkflowRun = async ( workFlowId: number, ) => { 
    try {
      const response = await api.startWorkflowRun(hostname, projectName, workFlowId,branch, inputsParamsState as any);
      if(response === 204) return true;
      return false
    }
    catch (e:any) {
      errorApi.post(e);
      return false
     }
  };

  const handleStopWorkflowRun = async (runId: number) => {
    try {
      await api.stopWorkflowRun(hostname,projectName,runId);
    }
    catch (e:any) {
      errorApi.post(e)
     }
  }

  const downloadJobLogs = async (jobId:number) => {
    try{
      const response = await api.downloadJobLogsForWorkflowRun(hostname,projectName,jobId);
      if(response) return response;
      return null
      } 
    catch (e:any) {
      errorApi.post(e);
      return null
     }
  }

  const listAllEnvironments = async()=>{
    try{
      const response = await api.getEnvironmentsList(hostname,projectName);
      if(response) return response;
      return null
    }catch(e:any){
      errorApi.post(e);
      return null
    }
  }


  return (
    <GithubWorkflowsContext.Provider
      value={{
        listAllWorkflows,
        listJobsForWorkflowRun,
        branch,
        setBranchState,
        inputsParamsState,
        setInputParams,
        getWorkflowById,
        allWorkflowsState,
        setWorkflowsState,
        handleStartWorkflowRun,
        handleStopWorkflowRun,
        downloadJobLogs,
        listAllEnvironments
      }}>
      {children}
    </GithubWorkflowsContext.Provider>
  );
};

export const useGithuWorkflowsContext = () => React.useContext(GithubWorkflowsContext)