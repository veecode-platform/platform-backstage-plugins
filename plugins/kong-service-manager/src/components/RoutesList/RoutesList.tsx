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
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [refresh, setRefresh] = React.useState(false);
  const [route, setRoute] = React.useState<any>();

  const { getRoutesList } = useKongServiceManagerContext();
  const { content } = useRoutesListStyles();

  const fetchRoutes = async (): Promise<RoutesResponse[] | null> => {
    const data = await getRoutesList();
    return data;
  }

  const { loading, error, value: allRoutes } = useAsync(fetchRoutes, [refresh]);

  const handleToggleModal = (route: any) => {
    setRoute(route);
    setShowModal(!showModal);
  }

  if(error) return <EmptyStateComponent/>;

  return (
    <ErrorBoundary>
      <BoxComponent
        title="All Routes"
        button={
          <Button variant="contained" color="primary" onClick={() => handleToggleModal({})}>
            Create
          </Button>}
      >
        <Box className={content}>
          <TableComponent
            isLoading={loading}
            dataProps={allRoutes??[]}
            handleEditModal={handleToggleModal}
            refreshList={() => setRefresh(prev => !prev)}
          /> 
        </Box>
      </BoxComponent>
      {showModal && 
        <ModalComponent
          show={showModal}
          handleCloseModal={() => handleToggleModal({})}
          refreshList={() => setRefresh(prev => !prev)}
          route={route}
        />
      }
    </ErrorBoundary>
  );
}
