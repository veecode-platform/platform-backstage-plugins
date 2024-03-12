/* eslint-disable @backstage/no-undeclared-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Select, SelectedItems } from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { KongServiceManagerContext } from '../context';
import { useEntityAnnotation } from '../../hooks';
import { transformToSelectOptions } from '../../utils/common/transformToSelectOptions';
import { Tooltip } from '@material-ui/core';


type OptionsProps = {
  label: string;
  value: string;
};

export const SelectInstance = () => {

  const { entity } = useEntity();
  const { kongInstances } = useEntityAnnotation(entity as Entity);
  const [instances, setInstances] = useState<string[]>([]);
  const [options, setOptions] = useState<OptionsProps[]>([]);
  const [instanceDefault, setInstanceDefault ] = useState<string>(kongInstances ? kongInstances[0] : '');
  const { instance, setInstanceState } = useContext(KongServiceManagerContext);
   
  useEffect(() => {
       if(kongInstances){
        setInstances(kongInstances);
        setInstanceDefault(kongInstances[0] as string);
       }
  }, []);

  useEffect(() => {
    setInstanceState(instanceDefault);
  }, [instanceDefault]);

  useEffect(() => {
    if (instances) {
      const newOptions = transformToSelectOptions(instances)
      setOptions(newOptions);
    }
  }, [instances]);

  const handleSelectChange = (event: SelectedItems) => {
    const selectedValue = event;
    setInstanceState(selectedValue as string); 
  };

  return (
    <Tooltip title="Select the Kong Instance" placement="top">
      <div>
        <Select
          onChange={handleSelectChange}
          label=""
          selected={instance ? instance : instanceDefault}
          items={options}
        />
      </div>
    </Tooltip>
  );
};