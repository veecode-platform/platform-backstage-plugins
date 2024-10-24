import React from 'react'
import { BoxComponent, EmptyStateComponent } from '../shared'
import { Box, Button } from '@material-ui/core';
import useAsync from 'react-use/lib/useAsync';
import { TableComponent } from './TableComponent';
import ErrorBoundary from '../ErrorBoundary/ErrorBondary';
import { useKongServiceManagerContext } from '../../context';
import { useRoutesListStyles } from './styles';
import { ModalComponent } from './ModalComponent/ModalComponent';
import { kongCreateRoutePermission, RouteResponse } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import { usePermission } from '@backstage/plugin-permission-react';

export const RoutesList = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [refresh, setRefresh] = React.useState(false);
  const [route, setRoute] = React.useState<any>();
  const { loading: loadingCreateRoutePermission, allowed: canAddRoute } = usePermission({
    permission: kongCreateRoutePermission,
  });

  const { getRoutesList } = useKongServiceManagerContext();
  const { content, button } = useRoutesListStyles();

  const fetchRoutes = async (): Promise<RouteResponse[]> => {
    const data = await getRoutesList() as RouteResponse[];
    return data;
  }

  const { loading, error, value: allRoutes } = useAsync(fetchRoutes, [refresh]);

  const handleToggleModal = (routeValue: RouteResponse | {}) => {
    setRoute(routeValue);
    setShowModal(!showModal);
  }

  if(error) return <EmptyStateComponent/>;

  return (
    <ErrorBoundary>
      <BoxComponent
        title="All Routes"
        button={
          <>
          {!loadingCreateRoutePermission && (
            <Button 
               variant="contained" 
               disabled={!canAddRoute}
               color="primary" 
               className={button} 
               onClick={() => handleToggleModal({})}>
            Create
          </Button>)
          }
          </>
          }
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
