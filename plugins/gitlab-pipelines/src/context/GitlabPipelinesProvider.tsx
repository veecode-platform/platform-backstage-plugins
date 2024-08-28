import React from 'react';
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { GitlabPipelinesContext } from './GitlabPipelinesContext';
import { Job, JobVariablesAttributes, ListJobsResponse, Pipeline, VariablesParams } from '../utils/types';
import { gitlabPipelinesApiRef } from '../api';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotations } from '../hooks';
import { Entity } from '@backstage/catalog-model';
import { addJobs, addLatestPipeline, addPipelines, initialJobsAnnotationState, initialJobsState, initialJobParamsState, initialLatestPipelineState, initialPipelinesState, initialVariableParamsState, JobsAnnotationReducer, JobsReducer, JobParamsReducer, LatestPipelineReducer, PipelinesReducer, VariablesParamsReducer } from './state';

interface GitlabPipelinesProviderProps {
  children: React.ReactNode;
}

export const GitlabPipelinesProvider: React.FC<GitlabPipelinesProviderProps> = ({ children }) => {

  const [branch, setBranch] = React.useState<string>('');  
  const [pipelineListState, dispatchPipelines] = React.useReducer(PipelinesReducer,initialPipelinesState);
  const [latestPipelineState, dispachLatestPipeline] = React.useReducer(LatestPipelineReducer,initialLatestPipelineState);
  const [jobsListState, dispatchJobList] = React.useReducer(JobsReducer,initialJobsState)
  const [jobsByAnnotation, dispatchJobsByAnnotation] = React.useReducer(JobsAnnotationReducer,initialJobsAnnotationState);
  const [triggerToken, setTriggerToken] = React.useState<string>('');
  const [variablesParams, dispatchVariablesParams] = React.useReducer(VariablesParamsReducer,initialVariableParamsState);
  const [jobParams, dispatchJobParams] = React.useReducer(JobParamsReducer,initialJobParamsState);
  const { entity } = useEntity();
  const { projectName,hostname,jobsAnnotations } = useEntityAnnotations(entity as Entity);
  const api = useApi(gitlabPipelinesApiRef);
  const errorApi = useApi(errorApiRef);

  const setBranchState = (branchName: string) => {
    setBranch(branchName);
  }

  const setTriggerTokenState = (token: string) => {
    setTriggerToken(token)
  }

  const listAllPipelines = async() => {
    try{
      const pipelines = await api.listProjectPipelines(projectName, branch!);
      if(pipelines.length > 0){
        const newPipelineListState = await Promise.all(pipelines.map(async (p) => {
          return {
            id: p.id,
            projectId: p.project_id,
            sha: p.sha,
            ref: p.ref,
            status: p.status,
            source: p.source,
            createdAt: p.created_at,
            updatedAt: p.updated_at, 
            webUrl: p.web_url,
            name: p.name 
          };
        }));
        dispatchPipelines(addPipelines(newPipelineListState));
        return newPipelineListState;
      }
      return null;
    }catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const latestPipeline = async()=>{
    try{
      const pipeline = await api.getLatestPipeline(projectName, branch!);
      if(pipeline.id){
        const pipelineData : Pipeline = {
          id: pipeline.id,
          projectId: pipeline.project_id,
          sha: pipeline.sha,
          ref: pipeline.ref,
          status: pipeline.status,
          source: pipeline.source,
          createdAt: pipeline.created_at,
          updatedAt: pipeline.updated_at, 
          webUrl: pipeline.web_url,
          name: pipeline.name 
        };
        dispachLatestPipeline(addLatestPipeline(pipelineData));
        return pipelineData;
      }
      return null;
    }
    catch(e:any){
      errorApi.post(e);
      return null
    }
  }

  const runNewPipeline = async(variables: VariablesParams[]) => {
    try{
      const response = await api.runNewPipeline(projectName, branch!, variables);
      if(response.status === "created"){
        dispachLatestPipeline(addLatestPipeline(
          {
            id: response.id,
            projectId: response.project_id,
            sha: response.sha,
            ref: response.ref,
            status: response.status,
            source: response.source,
            createdAt: response.created_at,
            updatedAt: response.updated_at, 
            webUrl: response.web_url,
            name: response.name 
          }
        ));
        listAllPipelines();
      };
    }
    catch(e:any){
      errorApi.post(e);
    }
  }

  const runPipelineWithTrigger = async(triggerTokenValue: string)=>{
    try{
      const response = await api.runNewPipelineWithTrigger(projectName, triggerTokenValue, branch!);
      if(response.status === "created"){
        dispachLatestPipeline(addLatestPipeline({
          id: response.id,
          projectId: response.project_id,
          sha: response.sha,
          ref: response.ref,
          status: response.status,
          source: response.source,
          createdAt: response.created_at,
          updatedAt: response.updated_at, 
          webUrl: response.web_url,
          name: response.name 
        }));
        listAllPipelines();
      }
    }
    catch(e:any){
      errorApi.post(e);
    }
  }

  const retryPipeline = async()=>{
    try{
      const response = await api.retryPipelineJobs(projectName, latestPipelineState?.id as number, branch!);
      if(response.id){
        dispachLatestPipeline(addLatestPipeline({
          id: response.id,
          projectId: response.project_id,
          sha: response.sha,
          ref: response.ref,
          status: response.status,
          source: response.source,
          createdAt: response.created_at,
          updatedAt: response.updated_at, 
          webUrl: response.web_url,
          name: response.name 
        }));
        listAllPipelines();
      }
    }
    catch(e:any){
      errorApi.post(e);
    }
  }

  const cancelPipeline = async()=>{
    try{
      const response = await api.cancelPipelineJobs(projectName, Number(latestPipelineState?.id), branch!);
      if(response.id){
        dispachLatestPipeline(addLatestPipeline({
          id: response.id,
          projectId: response.project_id,
          sha: response.sha,
          ref: response.ref,
          status: response.status,
          source: response.source,
          createdAt: response.created_at,
          updatedAt: response.updated_at, 
          webUrl: response.web_url,
          name: response.name 
        }));
        listAllPipelines();
      }
    }
    catch(e:any){
      errorApi.post(e);
    }
  }

  const allJobs = async(pipelineId: number)=>{
    try{
      const response = await api.listPipelineJobs(projectName, pipelineId, branch!);
      if(response.length > 0){
        const JobsList : Job[] = [];
        response.filter((j:ListJobsResponse)=>{
          if (j.allow_failure) {
            JobsList.push({
              id: j.id as number,
              status: j.status,
              stage: j.stage,
              name: j.name,
              ref: j.ref,
              tag: j.tag,
              pipeline: j.pipeline,
              web_url: j.web_url,
              artifacts: j.artifacts,
              runner: j.runner,
            });
          }
        });
        dispatchJobList(addJobs(JobsList));
        return JobsList;
      }
      return null
    }
    catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const getSingleJob = async(jobId: number) => {
    try{
      const response = await api.getSingleJob(projectName, jobId, branch!);
      if(response.id){
        const job = {
          id: response.id,
          status: response.status,
          stage: response.stage,
          name: response.name,
          ref: response.ref,
          tag: response.tag,
          pipeline: response.pipeline,
          web_url: response.web_url,
          artifacts: response.artifacts,
          runner: response.runner
        };

        return job
      }
      return null;
    }
    catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const runJob = async (jobId: number, params: JobVariablesAttributes[]) => {
    try{
      const response = await api.runJob(projectName, jobId, params, branch!);
      if(response.id){
        const job = {
          id: response.id,
          status: response.status,
          stage: response.stage,
          name: response.name,
          ref: response.ref,
          tag: response.tag,
          pipeline: response.pipeline,
          web_url: response.web_url,
          artifacts: response.artifacts,
          runner: response.runner
        };
        return job
      }
      return null;
    }
    catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const cancelJob = async(id: number)=>{
    try{
      const response = await api.cancelJob(projectName, id, branch!);
      if(response.id){
        const job = {
          id: response.id,
          status: response.status,
          stage: response.stage,
          name: response.name,
          ref: response.ref,
          tag: response.tag,
          pipeline: response.pipeline,
          web_url: response.web_url,
          artifacts: response.artifacts,
          runner: response.runner
        };
        return job
      }
      return null;
    }
    catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const retryJob = async(id: number)=>{
    try{
      const response = await api.retryJob(projectName, id, branch!);
      if(response.id){
        const job = {
          id: response.id,
          status: response.status,
          stage: response.stage,
          name: response.name,
          ref: response.ref,
          tag: response.tag,
          pipeline: response.pipeline,
          web_url: response.web_url,
          artifacts: response.artifacts,
          runner: response.runner
        };
        return job
      }
      return null;
    }
    catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  return (
    <GitlabPipelinesContext.Provider
      value={{
        branch,
        jobsAnnotations,
        projectName,
        hostname,
        entity,
        setBranchState,
        listAllPipelines,
        pipelineListState,
        dispatchPipelines,
        latestPipeline,
        latestPipelineState,
        dispachLatestPipeline,
        triggerToken,
        setTriggerTokenState,
        variablesParams,
        dispatchVariablesParams,
        runNewPipeline,
        runPipelineWithTrigger,
        retryPipeline,
        cancelPipeline,
        allJobs,
        jobsListState,
        jobsByAnnotation,
        dispatchJobsByAnnotation,
        dispatchJobList,
        getSingleJob,
        jobParams,
        dispatchJobParams,
        runJob,
        cancelJob,
        retryJob
      }}>
      {children}
    </GitlabPipelinesContext.Provider>
  );
};


export const useGitlabPipelinesContext = () => React.useContext(GitlabPipelinesContext);