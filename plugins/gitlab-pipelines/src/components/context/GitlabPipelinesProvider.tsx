import React from 'react';
import { useState } from "react";
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { gitlabPipelinesApiRef } from '../../api';
import { GitlabPipelinesContext } from './GitlabPipelinesContext';


export const GitlabPipelinesProvider: React.FC = ({ children }) => {

  const [branch, setBranch] = useState<string | null>(null);
  const api = useApi(gitlabPipelinesApiRef);
  const errorApi = useApi(errorApiRef);

  const setBranchState = (branch: string) => {
    setBranch(branch);
  }

  return (
    <GitlabPipelinesContext.Provider
      value={{
        branch,
        setBranchState,
      }}>
      {children}
    </GitlabPipelinesContext.Provider>
  );
};
