import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import { useKongServiceManagerContext } from '../../context';
import { ServiceInfoResponse } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import AboutService from './aboutService/AboutService';
import { TabbedLayout } from '@backstage/core-components';


export const ServicePage = () => {

  const { getServiceDetails } = useKongServiceManagerContext();
  // const {  } = useAboutStyles();
  
  const { error, loading, value:serviceDetails } = useAsync(async (): Promise<ServiceInfoResponse | null> => {
    const data = await getServiceDetails();
    return data
  }, []);


 return (
  <TabbedLayout>
  <TabbedLayout.Route path="/" title="About">
      <AboutService
        loading={loading}
        error={error}
        serviceDetails={serviceDetails}
      />
  </TabbedLayout.Route>
  <TabbedLayout.Route path="/some-other-path" title="plugins">
    <div>tabbed-test-content-2</div>
  </TabbedLayout.Route>
</TabbedLayout>

 );
}
