import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import { RouteResponse } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import { CardTab, TabbedCard } from '@backstage/core-components';
import { useServicePageStyles } from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import AboutRoute from './aboutRoute/AboutRoute';
import { ButtonComponent } from '../../components/shared';
import PluginsList from '../PluginsList/PluginsList';
import { useKongServiceManagerContext } from '../../context';


const RoutePage = () => {

  const { routeNameOrId } = useParams();
  const navigate = useNavigate();
  const { getRoute, listAllEnabledRoutePlugins, listAssociatedRoutePlugins , allAssociatedRoutePluginsState, associatedRoutePluginsName} = useKongServiceManagerContext();
  const { root, cardTabstyle, backButton } = useServicePageStyles();

  const { error, loading, value:routeDetails } = useAsync(async (): Promise<RouteResponse | null> => {
    if(routeNameOrId){
      const data = await getRoute(routeNameOrId);
      return data
    }
    return null
  }, [routeNameOrId]);

  const backToRoutesList = () => navigate(-1);

 return (
  <div className={root}>
    <ButtonComponent classes={backButton} handleClick={backToRoutesList}>
      Back to Routes
    </ButtonComponent>
    <TabbedCard title=''>
      <CardTab label="About" className={cardTabstyle}>
        <AboutRoute
          loading={loading}
          error={error}
          routeDetails={routeDetails}
          />
      </CardTab>
      <CardTab label="Plugins" className={cardTabstyle}>
        <PluginsList
          listAllPlugins={listAllEnabledRoutePlugins}
          listAssociatedPlugins={listAssociatedRoutePlugins}
          associatedPluginsState={allAssociatedRoutePluginsState}
          associatedPluginsName={associatedRoutePluginsName}
        />
      </CardTab>
  </TabbedCard>
  </div>

 );
}


export default React.memo(RoutePage);