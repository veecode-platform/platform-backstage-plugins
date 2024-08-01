import React from 'react';
import { Select, SelectedItems } from '@backstage/core-components';
import { useApi, errorApiRef, } from '@backstage/core-plugin-api';
import { useEntityAnnotations } from '../../hooks/useEntityAnnotations';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { useGithuWorkflowsContext } from '../../context';
import { githubWorkflowsApiRef } from '../../api';
import { addBranches, branchesReducer, initialBranchesState } from './state';
import { Branch } from '../../utils/types';
import { initialOptionsState, optionsReducer } from './state/options/reducer';
import { addOptions } from './state/options/actions';

const SelectBranch = () => {
  
  const [branchesState, dispatchBranches ] = React.useReducer(branchesReducer,initialBranchesState);
  const [optionsState, dispatchOptions] = React.useReducer(optionsReducer, initialOptionsState);
  const [branchDefault, setBranchDefault ] = React.useState<string>('');
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
        dispatchBranches(addBranches(branchesData as Branch[]));
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

  React.useEffect(() => {
    getBranches();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectName, entity]);

  React.useEffect(()=>{
    setBranchState(branchDefault)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[branchDefault])

  React.useEffect(() => {
    if (branchesState) {
      const newOptions = branchesState.map((item) => {
        return {
          label: item.name,
          value: item.name,
        };
      });
      dispatchOptions(addOptions(newOptions));
    }
  }, [branchesState]);

  return (
      <div title="Select the branch">
        <Select
          onChange={handleSelectChange}
          label=""
          selected={branch ?? branchDefault}
          items={optionsState}
        />
      </div>
  );
};


export default React.memo(SelectBranch)