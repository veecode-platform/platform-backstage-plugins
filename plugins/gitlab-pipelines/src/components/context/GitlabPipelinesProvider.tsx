import React from 'react';
import { useState } from "react";
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { gitlabPipelinesApiRef } from '../../api';
import { GitlabPipelinesContext } from './GitlabPipelinesContext';
import { Job, JobsVariablesAttributes, ListJobsResponse, Pipeline } from '../../utils/types';


export const GitlabPipelinesProvider: React.FC = ({ children }) => {

  const [branch, setBranch] = useState<string>('');
  const [pipelineListState, setPipelineListState] = useState<Pipeline[]|null>(null);
  const [ latestPipelineState, setLatestPipelineState ] = useState<Pipeline|null>(null);
  const [jobsListState, setJobsListState] = useState<Job[]|null>(null);
  const [triggerToken, setTriggerToken] = useState<string>('');
  const [jobParams, setJobParams] = useState<JobsVariablesAttributes|null>(null);
  const api = useApi(gitlabPipelinesApiRef);
  const errorApi = useApi(errorApiRef);

  const setBranchState = (branch: string) => {
    setBranch(branch);
  }

  const setTriggerTokenState = (token: string) => {
    setTriggerToken(token)
  }

  const listAllPipelines = async(ProjectName: string ) => {
    try{
      const pipelines = await api.listProjectPipelines(ProjectName, branch!);
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
        setPipelineListState(newPipelineListState);
        return newPipelineListState;
      }
      else return null;
    }catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const latestPipeline = async(projecName: string )=>{
    try{
      const pipeline = await api.getLatestPipeline(projecName, branch!);
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
        setLatestPipelineState(pipelineData);
        return pipelineData;
      }
      else return null;
    }
    catch(e:any){
      errorApi.post(e);
      return null
    }
  }

  const runNewPipeline = async(projectName: string) => {
    try{
      const response = await api.runNewPipeline(projectName, branch!);
      if(response.status === "created"){
        setLatestPipelineState({
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
        });
        listAllPipelines(projectName);
      };
    }
    catch(e:any){
      errorApi.post(e);
    }
  }

  const runPipelineWithTrigger = async(projectName: string, triggerToken: string)=>{
    try{
      const response = await api.runNewPipelineWithTrigger(projectName, triggerToken, branch!);
      if(response.status === "created"){
        setLatestPipelineState({
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
        });
        listAllPipelines(projectName);
      }
    }
    catch(e:any){
      errorApi.post(e);
    }
  }

  const retryPipeline = async(projectName: string)=>{
    try{
      const response = await api.retryPipelineJobs(projectName, latestPipelineState?.id as number, branch!);
      if(response.id){
        setLatestPipelineState({
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
        });
        listAllPipelines(projectName);
      }
    }
    catch(e:any){
      errorApi.post(e);
    }
  }

  const cancelPipeline = async(projectName: string)=>{
    try{
      const response = await api.cancelPipelineJobs(projectName, Number(latestPipelineState?.id), branch!);
      if(response.id){
        setLatestPipelineState({
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
        });
        listAllPipelines(projectName);
      }
    }
    catch(e:any){
      errorApi.post(e);
    }
  }

  const allJobs = async(projectName: string, pipelineId: number)=>{
    try{
      const response = await api.listPipelineJobs(projectName, pipelineId, branch!);
      if(response.length > 0){
        const JobsList : Job[] = [];
        response.filter((j:ListJobsResponse)=>{
          j.allow_failure && JobsList.push({
            id: j.id as number,
            status: j.status,
            stage: j.stage,
            name: j.name,
            ref: j.ref,
            tag: j.tag,
            pipeline: j.pipeline,
            web_url: j.web_url,
            artifacts: j.artifacts,
            runner: j.runner
          })
        });
        setJobsListState(JobsList);
        return JobsList;
      }
      else return null
    }
    catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const getSingleJob = async(projectName: string, jobId: number) => {
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
      else return null;
    }
    catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const runJob = async (projectName: string, jobId: number, params: JobsVariablesAttributes[]) => {
    console.log(projectName, jobId, params)
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
      else return null;
    }
    catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const cancelJob = async(projectName: string, id: number)=>{
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
      else return null;
    }
    catch(e:any){
      errorApi.post(e);
      return null;
    }
  }

  const retryJob = async(projectName: string, id: number)=>{
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
      else return null;
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
        setBranchState,
        listAllPipelines,
        pipelineListState,
        setPipelineListState,
        latestPipeline,
        latestPipelineState,
        triggerToken,
        setTriggerTokenState,
        runNewPipeline,
        runPipelineWithTrigger,
        retryPipeline,
        cancelPipeline,
        allJobs,
        jobsListState,
        setJobsListState,
        getSingleJob,
        jobParams,
        setJobParams,
        runJob,
        cancelJob,
        retryJob
      }}>
      {children}
    </GitlabPipelinesContext.Provider>
  );
};
