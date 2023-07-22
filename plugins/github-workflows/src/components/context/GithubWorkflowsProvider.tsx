import React, { useEffect } from 'react';
import {  useState } from "react";
import { GithubWorkflowsContext } from './GithubWorkflowsContext';
import { useApi } from '@backstage/core-plugin-api';
import { githubWorkflowsApiRef } from '../../api';
import { useEntityAnnotations } from '../../hooks/useEntityAnnotations';
import { entityMock } from '../../mocks/component';
import { WorkflowResultsProps } from '../../utils/types';


export const GithubWorkflowsProvider: React.FC = ({ children }) => {

  const [branch, setBranch] = useState<string|null>(localStorage.getItem('branch-selected')??null);
  const [ workflowsState, setWorkflowsState] = useState<WorkflowResultsProps[]|null>(null);
  const { projectName } = useEntityAnnotations(entityMock);
  const api = useApi(githubWorkflowsApiRef);

  useEffect(()=>{
    if(branch){
      localStorage.setItem('branch-selected',branch)
    }
  },[branch]);

  useEffect(()=>{
    if(!branch){
      setBranch(localStorage.getItem('branch-selected'))
    }
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workflows = await api.listWorkflows(projectName);
        if (workflows) {
          const newWorkflowsState = await Promise.all(workflows.map(async (w) => {
            const data = await handleLatestWorkFlow(w.id, projectName);
            return {
              id: w.id,
              name: w.name,
              status: data?.status as string,
              conclusion: data?.conclusion as string,
              source: w.html_url as string,
            };
          }));
          setWorkflowsState(newWorkflowsState);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const setBranchState = (branch: string) => {
    setBranch(branch);
  }

  const handleLatestWorkFlow = async (workFlowId:number, projectSlug: string) => {
     try{
      const data = await api.getLatestWorkflowRun(workFlowId.toString(),projectSlug);
          if(data){
            return {
              status: data.status,
              conclusion: data.conclusion
            }
          }
          return null
      }
     catch(error){
        console.error("Error:", error);
       throw error;
     }
  }

  const handleStartWorkflowRun = async (workFlowId: number, projectSlug: string, branch: string) => {
     try{
      const response = api.startWorkflowRun(workFlowId.toString(), projectSlug, branch);
      return response
     }
     catch(error){
      console.error("Error:", error);
      throw error;
     }
  };

  const handleStopWorkflowRun = (runId: string, projectSlug: string) => {
    try{
      const response = api.stopWorkflowRun(runId, projectSlug);
      return response
     }
     catch(error){
      console.error("Error:", error);
      throw error;
     }
  }

  return (
    <GithubWorkflowsContext.Provider value={{ branch, setBranchState, workflowsState, handleLatestWorkFlow, handleStartWorkflowRun, handleStopWorkflowRun}}>
      {children}
    </GithubWorkflowsContext.Provider>
  );
};
