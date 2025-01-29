import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import { useKongServiceManagerContext } from '../../context';
import { ServiceInfoResponse } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import AboutService from './aboutService/AboutService';
import { CardTab, TabbedCard } from '@backstage/core-components';
import  PluginsList  from '../PluginsList/PluginsList';
import { useServicePageStyles } from './styles';


const ServicePage = () => {

  const { getServiceDetails, listAllEnabledPlugins ,listAssociatedPlugins, allAssociatedPluginsState, pluginsPerCategoryState} = useKongServiceManagerContext();
  const { cardTabstyle } = useServicePageStyles();

  const { error, loading, value:serviceDetails } = useAsync(async (): Promise<ServiceInfoResponse | null> => {
    const data = await getServiceDetails();
    return data
  }, []);


 return (
  <TabbedCard title=''>
    <CardTab label="About" className={cardTabstyle}>
        <AboutService
          loading={loading}
          error={error}
          serviceDetails={serviceDetails}
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

 );
}


export default React.memo(ServicePage);