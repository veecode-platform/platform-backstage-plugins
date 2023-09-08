import React, { useContext, useEffect, useState } from 'react';
import { Select, SelectedItems } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { Branch, ListBranchResponse } from '../../utils/types';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { gitlabPipelinesApiRef } from '../../api';
import { GitlabPipelinesContext } from '../context/GitlabPipelinesContext';
import { useEntityAnnotations } from '../../hooks/useEntityAnnotations';
// import { entityMock } from '../../mocks/component';


type OptionsProps = {
  label: string;
  value: string;
};

export const SelectBranch = () => {
  
  const [branches, setBranches] = useState<Branch[]>([]);
  const [options, setOptions] = useState<OptionsProps[]>([]);
  const [branchDefault, setBranchDefault ] = useState<string>('');
  const { branch, setBranchState } = useContext(GitlabPipelinesContext);
  const api = useApi(gitlabPipelinesApiRef);
  const { entity } = useEntity();
  const { projectName } = useEntityAnnotations(entity as Entity);

  useEffect(() => {
    const getBranches = async () => {
      const data = await api.listBranchesFromRepo(projectName);
      if (data) {
        const branchesFilter : Branch[] = [];
        data.map((item : ListBranchResponse) => branchesFilter.push({
            name: item.name,
            default: item.default,
            web_url: item.web_url,
            protected: item.protected
        }));
        setBranches([...branchesFilter]);
        branchesFilter.filter((item : Branch)=> item.default && setBranchDefault(item.name));
      }
    };
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

  const handleSelectChange = (event: SelectedItems) => {
    const selectedValue = event;
    setBranchState(selectedValue as string); 
  };

  return (
        <Select
          onChange={handleSelectChange}
          label=""
          selected={branch ?? branchDefault}
          items={options}
        />
  );
};
