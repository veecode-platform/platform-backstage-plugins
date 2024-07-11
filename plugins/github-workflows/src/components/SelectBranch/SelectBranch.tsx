/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import { Select, SelectedItems } from '@backstage/core-components';
import { useApi, errorApiRef, } from '@backstage/core-plugin-api';
import { useEntityAnnotations } from '../../hooks/useEntityAnnotations';
import { Branch } from '../../utils/types';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { OptionsProps } from './type';
import { useGithuWorkflowsContext } from '../../context';
import { githubWorkflowsApiRef } from '../../api';

const SelectBranch = () => {
  
  const [branches, setBranches] = useState<Branch[]>([]);
  const [options, setOptions] = useState<OptionsProps[]>([]);
  const [branchDefault, setBranchDefault ] = useState<string>('');
  const { branch, setBranchState } = useGithuWorkflowsContext();
  const api = useApi(githubWorkflowsApiRef);
  const errorApi = useApi(errorApiRef);
  const { entity } = useEntity();
  const { projectName,hostname } = useEntityAnnotations(entity as Entity);

  const getBranches = async () => {
    try{
      const branchesData = await api.listBranchesFromRepo(hostname,projectName);
      const branchDefaultData = await api.getBranchDefaultFromRepo(hostname, projectName)

      if (branchesData) {
        setBranches(branchesData as Branch[]);
        setBranchDefault(branchDefaultData)
      }
    }
    catch(e:any){
      errorApi.post(e);
    }
  };

  const handleSelectChange = (event: SelectedItems) => {
    const selectedValue = event;
    setBranchState(selectedValue as string); 
  };

  useEffect(() => {
    getBranches();
  }, [api, projectName, setBranches]);

  useEffect(()=>{
    setBranchState(branchDefault)
  },[branchDefault])

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

  return (
      <div title="Select the branch">
        <Select
          onChange={handleSelectChange}
          label=""
          selected={branch ?? branchDefault}
          items={options}
        />
      </div>
  );
};


export default memo(SelectBranch)