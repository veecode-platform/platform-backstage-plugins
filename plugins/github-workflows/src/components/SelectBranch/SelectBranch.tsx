import React, { useContext, useEffect, useState } from 'react';
import { Select, SelectedItems } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { githubWorkflowsApiRef } from '../../api';
import { GithubWorkflowsContext } from '../context/GithubWorkflowsContext';
import { useEntityAnnotations } from '../../hooks/useEntityAnnotations';
import { Branches } from '../../utils/types';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';


type OptionsProps = {
  label: string;
  value: string;
};

export const SelectBranch = () => {
  

  const { branch, setBranchState } = useContext(GithubWorkflowsContext);
  const api = useApi(githubWorkflowsApiRef);
  const { entity } = useEntity();
  const { projectName } = useEntityAnnotations(entity as Entity);
  const [branches, setBranches] = useState<Branches[]>([]);
  const [options, setOptions] = useState<OptionsProps[]>([]);

  useEffect(() => {
    const getBranches = async () => {
      const data = await api.listBranchesFromRepo(projectName);
      if (data) {
        setBranches(data as Branches[]);
      }
    };
    getBranches();
  }, [api, projectName, setBranches]);

  useEffect(() => {
    if (branches) {
      const newOptions = branches.map((item) => {
        return {
          label: item.name,
          value: item.name,
        };
      });
      setOptions(newOptions);
    }
  }, [branches]);

  const handleSelectChange = (event: SelectedItems) => {
    const selectedValue = event;
    setBranchState(selectedValue as string); 
  };

  return (
    <Select
      onChange={handleSelectChange}
      placeholder="Select the branch"
      label=""
      selected={branch!}
      items={options}
    />
  );
};
