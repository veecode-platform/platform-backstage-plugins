import React, { useEffect } from 'react';
import {  useState } from "react";
import { GithubWorkflowsContext } from './GithubWorkflowsContext';


export const GithubWorkflowsProvider: React.FC = ({ children }) => {
  const [branch, setBranch] = useState<string|null>(localStorage.getItem('branch-selected')??null);

  useEffect(()=>{
    if(branch){
      localStorage.setItem('branch-selected',branch)
    }
  },[branch]);

  useEffect(()=>{
    if(!branch){
      setBranch(localStorage.getItem('branch-selected'))
    }
  },[])

  const setBranchState = (branch: string) => {
      setBranch(branch);
      localStorage.setItem('branch-selected',branch)
  }

  return (
    <GithubWorkflowsContext.Provider value={{ branch, setBranchState }}>
      {children}
    </GithubWorkflowsContext.Provider>
  );
};
