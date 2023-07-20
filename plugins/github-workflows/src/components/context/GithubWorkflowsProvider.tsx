import React from 'react';
import {  useState } from "react";
import { Branches} from "../../utils/types";
import { GithubWorkflowsContext } from './GithubWorkflowsContext';


export const GithubWorkflowsProvider: React.FC = ({ children }) => {
  const [branches, setBranches] = useState<Branches[]>([]);

  return (
    <GithubWorkflowsContext.Provider value={{ branches, setBranches }}>
      {children}
    </GithubWorkflowsContext.Provider>
  );
};
