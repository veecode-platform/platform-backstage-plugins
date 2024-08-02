/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @backstage/no-undeclared-imports */
import React, { Suspense, useEffect } from 'react';
import { Select, SelectedItems } from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { useEntityAnnotation } from '../../hooks';
import { transformToSelectOptions } from '../../utils/helpers/transformToSelectOptions';
import { Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useKongServiceManagerContext } from '../../context';

export const SelectInstance = () => {

  const { entity } = useEntity();
  const { kongInstances } = useEntityAnnotation(entity as Entity);
  const { instance, setInstanceState } = useKongServiceManagerContext();

  const handleSelectChange = (event: SelectedItems) => {
    const selectedValue = event;
    setInstanceState(selectedValue as string); 
  };

  useEffect(()=>{
    if(kongInstances) setInstanceState(kongInstances[0])
  },[])

  return (
    <Suspense fallback={<Skeleton variant="rect" width={210} height={118} animation="wave" />}>
      <Tooltip title="Select the Kong Instance" placement="left">
        <div>
          <Select
            onChange={handleSelectChange}
            label=""
            selected={instance !== "" ? instance : (kongInstances && kongInstances[0])}
            items={ kongInstances ? transformToSelectOptions(kongInstances as string[]) : []}
          />
        </div>
      </Tooltip>
    </Suspense>
  );
};