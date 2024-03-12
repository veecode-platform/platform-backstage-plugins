/* eslint-disable @backstage/no-undeclared-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Select, SelectedItems } from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { Tooltip } from '@material-ui/core';
import { KongServiceManagerContext } from '../context';
import { useEntityAnnotation } from '../../hooks';


type OptionsProps = {
  label: string;
  value: string;
};

export const SelectInstance = () => {
  
  const [instances, setInstances] = useState<string[]>([]);
  const [options, setOptions] = useState<OptionsProps[]>([]);
  const [instanceDefault, setInstanceDefault ] = useState<string>('');
  const { instance, setInstanceState } = useContext(KongServiceManagerContext);
  const { entity } = useEntity();
  const { kongInstances } = useEntityAnnotation(entity as Entity);

  useEffect(() => {
       if(kongInstances){
        setInstances(kongInstances);
          setInstanceDefault(kongInstances[0] as string)
       }
  }, [kongInstances, setInstances]);

  useEffect(()=>{
    setInstanceState(instanceDefault)
  },[instanceDefault])

  useEffect(() => {
    if (instances) {
      const newOptions = instances.map((item) => {
        return {
          label: item,
          value: item,
        };
      });
      setOptions(newOptions);
    }
  }, [instances]);

  const handleSelectChange = (event: SelectedItems) => {
    const selectedValue = event;
    setInstanceState(selectedValue as string); 
  };

  return (
    <Tooltip title="Select the branch" placement="top">
      <Select
        onChange={handleSelectChange}
        label=""
        selected={instance ?? instanceDefault}
        items={options}
      />
    </Tooltip>
  );
};