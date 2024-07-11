/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useCallback, useContext } from 'react';
import { useState } from "react";
import { GithubWorkflowsContext } from './GithubWorkflowsContext';
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { githubWorkflowsApiRef } from '../api';
import { Job, WorkflowResultsProps } from '../utils/types';
import { sortWorflowsByName } from '../utils/helpers';

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
  
  const setBranchState = useCallback((branchState: string) => setBranch(branchState),[branch])

  const setInputs = (inputs: object) => {
    setInputsWorkflowsParams(inputs);
  }

  const listAllWorkflows = async (hostname:string, projectName: string, filter: string[] = []) => {
    try {
      const workflows = await api.listWorkflows(hostname,projectName, branch!, filter);
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

  const getWorkflowById = async (hostname:string,projectName:string,id:number) => {
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

  const listJobsForWorkflowRun = async (hostname:string, projectName:string, id: number) => {
    try{
      const data = await api.listJobsForWorkflowRun(hostname,projectName,id);
      return data.jobs as Job[];
    }catch(e:any){
      errorApi.post(e);
      return []

    }
  }

  const handleStartWorkflowRun = async (hostname:string,projectSlug: string, workFlowId: number, ) => { 
    try {
      const response = await api.startWorkflowRun(hostname, projectSlug, workFlowId,branch!, inputsWorkflowsParams as any);
      if(response) return response;
      return null
    }
    catch (e:any) {
      errorApi.post(e);
      return null
     }
  };

  const handleStopWorkflowRun = async (hostname:string,projectSlug: string,runId: number) => {
    try {
      await api.stopWorkflowRun(hostname,projectSlug,runId);
    }
    catch (e:any) {
      errorApi.post(e)
     }
  }

  const downloadJobLogs = async (hostname:string,projectSlug: string,jobId:number) => {
    try{
      const response = await api.downloadJobLogsForWorkflowRun(hostname,projectSlug,jobId);
      if(response) return response;
      return null
      } 
    catch (e:any) {
      errorApi.post(e);
      return null
     }
  }

  const listAllEnvironments = async(hostname:string,projectSlug:string)=>{
    try{
      const response = await api.getEnvironmentsList(hostname,projectSlug);
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
        setInputs,
        inputsWorkflowsParams,
        getWorkflowById,
        workflowsState,
        setWorkflowsState,
        workflowsByAnnotationsState,
        setWorkflowsByAnnotationsState,
        handleStartWorkflowRun,
        handleStopWorkflowRun,
        downloadJobLogs,
        listAllEnvironments
      }}>
      {children}
    </GithubWorkflowsContext.Provider>
  );
};

export const useGithuWorkflowsContext = () => useContext(GithubWorkflowsContext)