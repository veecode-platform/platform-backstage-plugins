/* eslint-disable @backstage/no-undeclared-imports */
import React from 'react'
import { BoxComponent, EmptyStateComponent } from '../shared'
import { Box, Button } from '@material-ui/core';
import useAsync from 'react-use/lib/useAsync';
import { TableComponent } from './TableComponent';
import ErrorBoundary from '../ErrorBoundary/ErrorBondary';
import { useKongServiceManagerContext } from '../../context';
import { RoutesResponse } from '../../utils/types';
import { useRoutesListStyles } from './styles';
import { ModalComponent } from './ModalComponent/ModalComponent';

export const RoutesList = () => {

  const { getRoutesList } = useKongServiceManagerContext();
  const { content } = useRoutesListStyles();

  const { loading, error, value: allRoutes } = useAsync(async (): Promise<RoutesResponse[]|null> => {
    const data = await getRoutesList();
    return data
  }, []);

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const handleToggleModal = ()=> setShowModal(!showModal);

  if(error) return <EmptyStateComponent/>;

  return (
    <ErrorBoundary>
      <BoxComponent
        title="All Routes"
        button={
          <Button variant="contained" color="primary" onClick={handleToggleModal}>
            Create
          </Button>}
      >
        <Box className={content}>
          <TableComponent isLoading={loading} dataProps={allRoutes??[]} /> 
        </Box>
      </BoxComponent>
      {showModal && 
        <ModalComponent
          show={showModal}
          handleCloseModal={handleToggleModal}
        />
      }
    </ErrorBoundary>
  );
}