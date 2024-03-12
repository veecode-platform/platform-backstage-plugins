/* eslint-disable @backstage/no-undeclared-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useContext } from 'react';
import { Select, SelectedItems } from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { KongServiceManagerContext } from '../context';
import { useEntityAnnotation } from '../../hooks';
import { transformToSelectOptions } from '../../utils/common/transformToSelectOptions';
import { Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export const SelectInstance = () => {

  const { entity } = useEntity();
  const { kongInstances } = useEntityAnnotation(entity as Entity);
  const { instance, setInstanceState } = useContext(KongServiceManagerContext);

  const handleSelectChange = (event: SelectedItems) => {
    const selectedValue = event;
    setInstanceState(selectedValue as string); 
  };

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