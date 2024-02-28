/* eslint-disable @backstage/no-undeclared-imports */
import React, { useContext } from 'react'
import { BoxComponent, EmptyStateComponent } from '../shared'
import { Box } from '@material-ui/core'
import { PluginsCards } from './PluginsCards';
import { KongServiceManagerContext } from '../context';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotation } from '../../hooks';
import useAsync from 'react-use/lib/useAsync';
import { Progress } from '@backstage/core-components';

export const PluginsList = () => {

  const { listAllPluginsEnabled, allPluginsEnabled } = useContext(KongServiceManagerContext);
  const { entity } = useEntity();
  const { kongInstance } = useEntityAnnotation(entity);

  const getPluginsEnabled = async () => {
    await listAllPluginsEnabled(kongInstance as string);
  };

  const { loading, error } = useAsync(async (): Promise<void> => {
    getPluginsEnabled();
  }, []);

  if (loading) return <Progress />;

  if(error) return <EmptyStateComponent/>;

  return (
    <BoxComponent title="Kong Plugins">
      <Box>
        <PluginsCards allPluginsEnabled={allPluginsEnabled} />
      </Box>
    </BoxComponent>
  );
}
