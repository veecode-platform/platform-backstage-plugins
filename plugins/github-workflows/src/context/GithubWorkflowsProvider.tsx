import React from 'react';
import { GithubWorkflowsContext } from './GithubWorkflowsContext';
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { githubWorkflowsApiRef } from '../api';
import { Job } from '../utils/types';
import { sortWorflowsByName } from '../utils/helpers';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { useEntityAnnotations } from '../hooks';
import { addWorkflows, initialWorkflowsState, WorkflowsReducer } from './state';
import { initialInputsParamsState, InputsParamsReducer } from './state/inputParamsState/reducer';
import { addInputsParams, removeInputsParams } from './state/inputParamsState/actions';
import { workflowFilter } from '../utils/helpers/filters';

interface GithubWorkflowsProviderProps {
  children: React.ReactNode;
}


export const GithubWorkflowsProvider: React.FC<GithubWorkflowsProviderProps> = ({ children }) => {
  
  const [cardsView, setCardsView] = React.useState<boolean>(false);
  const [branch, setBranch] = React.useState<string>('');
  const [allWorkflowsState, dispatchWorkflows] = React.useReducer(WorkflowsReducer, initialWorkflowsState);
  const [ inputsParamsState, dispatchInputsParams ] = React.useReducer(InputsParamsReducer,initialInputsParamsState);
  const { entity } = useEntity();
  const { projectName,hostname,workflowsByAnnotation } = useEntityAnnotations(entity as Entity);
  const api = useApi(githubWorkflowsApiRef);
  const errorApi = useApi(errorApiRef);
  
  const setInputParams = (inputsParams: object) => {
    dispatchInputsParams(addInputsParams(inputsParams))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setBranchState = React.useCallback((branchState: string) => setBranch(branchState),[branch])

  const resetInputs = () => {
    dispatchInputsParams(removeInputsParams())
  }

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

  const handleStartWorkflowRun = async ( workFlowId: number) => { 
    try {
      const inputs = Object.keys(inputsParamsState).length > 0 ? inputsParamsState : {}
      const response = await api.startWorkflowRun(hostname, projectName, workFlowId,branch, inputs);
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

  React.useEffect(()=>{
    if(branch && workflowsByAnnotation){
      resetInputs();
      const filters = workflowFilter(workflowsByAnnotation)
      const updateData = async ()=> {
       const data = await listAllWorkflows(cardsView ? filters : []);
         dispatchWorkflows(addWorkflows(data))
        }
      updateData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[branch])

  return (
    <GithubWorkflowsContext.Provider
      value={{
        cardsView,
        setCardsView,
        entity,
        projectName,
        hostname,
        workflowsByAnnotation,
        branch,
        setBranchState,
        inputsParamsState,
        setInputParams,
        allWorkflowsState,
        dispatchWorkflows,
        listAllWorkflows,
        listJobsForWorkflowRun,
        getWorkflowById,
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