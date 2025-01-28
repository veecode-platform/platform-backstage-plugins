import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import { useKongServiceManagerContext } from '../../context';
import { RouteResponse } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import { CardTab, TabbedCard } from '@backstage/core-components';
import  PluginsList  from '../PluginsList/PluginsList';
import { useServicePageStyles } from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import AboutRoute from './aboutRoute/AboutRoute';
import { ButtonComponent } from '../../components/shared';


export const RoutePage = () => {

  const { routeNameOrId } = useParams();
  const navigate = useNavigate();
  const { getRoute, listAllEnabledPlugins ,listAssociatedPlugins, allAssociatedPluginsState, pluginsPerCategoryState} = useKongServiceManagerContext();
  const { root, cardTabstyle, backButton } = useServicePageStyles();

  const { error, loading, value:routeDetails } = useAsync(async (): Promise<RouteResponse | null> => {
    const data = await getRoute(routeNameOrId!);
    return data
  }, [routeNameOrId]);

  const backToRoutesList = () => navigate(-1)


 return (
  <div className={root}>
    <ButtonComponent classes={backButton} handleClick={backToRoutesList}>
      Back To Routes
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
          listAllEnabledPlugins={listAllEnabledPlugins}
          listAssociatedPlugins={listAssociatedPlugins}
          allAssociatedPluginsState={allAssociatedPluginsState}
          pluginsPerCategoryState={pluginsPerCategoryState}
        />
      </CardTab>
  </TabbedCard>
  </div>

 );
}
