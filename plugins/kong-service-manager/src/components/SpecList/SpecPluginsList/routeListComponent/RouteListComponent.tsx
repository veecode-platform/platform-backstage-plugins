/* eslint-disable no-restricted-syntax */

import React from 'react';
import { RouteResponse } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import { useKongServiceManagerContext } from '../../../../context';
import { RouteListComponentProps } from './types';
import useAsync from 'react-use/esm/useAsync';
import { WrapperComponent } from '../wrapperComponent';
import { PluginsTableComponent } from '../pluginsTableComponent';
import RouteListTable from './routeListTable/RouteListTable';
import {
  initialRouteDetailsState,
  removeRouteDetails,
  RouteDetailsReducer,
} from './state';
import { transformPath } from '../../../../utils/helpers/transformPath';
import { EmptyState } from '@backstage/core-components';
import { useRouteListComponentStyles } from './style';
import { MethodLabel } from '../../../../components/shared';

const RouteListComponent: React.FC<RouteListComponentProps> = props => {
  const [routeDetailsState, routeDetailsDispatch] = React.useReducer(
    RouteDetailsReducer,
    initialRouteDetailsState,
  );
  const { getRoutesList } = useKongServiceManagerContext();
  const { root } = useRouteListComponentStyles();
  const { specname } = props;

  const resetRouteIdValue = () => routeDetailsDispatch(removeRouteDetails());

  const {
    value: routes,
    loading,
    error,
  } = useAsync(async () => {
    const response = await getRoutesList();
    // eslint-disable-next-line no-console
    console.log('AQUI RENDERIZA >>>', response);
    if (response) return response as RouteResponse[];
    return [];
  }, []);

  if (error)
    return (
      <WrapperComponent title="Route List">
        <div className={root}>
          <EmptyState
            missing="data"
            title="No routes to show"
            description={error ? error.message : ''}
          />
        </div>
      </WrapperComponent>
    );

  return (
    <>
      {routeDetailsState ? (
        <WrapperComponent
          title={
            <>
              Plugins associated to path{' '}
              <strong>{transformPath(routeDetailsState.path)}</strong>{' '}
              <span>
                <MethodLabel variant={routeDetailsState.method} />
              </span>{' '}
            </>
          }
          buttonBack
          handleBack={resetRouteIdValue}
        >
          <PluginsTableComponent
            specName={specname}
            route={routeDetailsState}
          />
        </WrapperComponent>
      ) : (
        <WrapperComponent title="Route List">
          <RouteListTable
            routes={routes ?? []}
            loading={loading}
            setRouteDetails={routeDetailsDispatch}
          />
        </WrapperComponent>
      )}
    </>
  );
};

export default React.memo(RouteListComponent);
