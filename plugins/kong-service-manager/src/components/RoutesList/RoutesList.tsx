/* eslint-disable @backstage/no-undeclared-imports */
import React, { useContext } from 'react'
import { BoxComponent, EmptyStateComponent } from '../shared'
import { Box, makeStyles } from '@material-ui/core';
import { KongServiceManagerContext } from '../context';
import useAsync from 'react-use/lib/useAsync';
import { Progress } from '@backstage/core-components';
import { TableComponent } from './TableComponent';
import ErrorBoundary from '../ErrorBoundary/ErrorBondary';

const useStyles = makeStyles(theme=>({
  content:{
    background: theme.palette.background.paper,
    height: '100%',
    minHeight: '65vh',
    margin:'.5rem',
  },
}))

export const RoutesList = () => {

  const { getRoutesList, allRoutes } = useContext(KongServiceManagerContext);
  const { content } = useStyles();

  const getRoutes = async () => {
    await getRoutesList();
  };

  const { loading, error } = useAsync(async (): Promise<void> => {
    getRoutes();
  }, []);

  if (loading) return <Progress />;

  if(error) return <EmptyStateComponent/>;

  return (
    <ErrorBoundary>
      <BoxComponent title="All Routes">
        <Box className={content}>
          {allRoutes ? <TableComponent dataProps={allRoutes} /> : <Progress/>}
        </Box>
      </BoxComponent>
    </ErrorBoundary>
  );
}
