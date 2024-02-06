import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import {
  servicesRootRouteRef,
  servicesDetailsRouteRef,
  createServicesRouteRef,
  partnersRootRouteRef,
  partnersDetailsRouteRef,
  createPartnerRouteRef,
  editPartnerRouteRef,
  applicationRouteRef,
  applicationDetailsRouteRef,
  newApplicationRouteRef,
  editApplicationRouteRef,
} from './routes';

export const applicationPlugin = createPlugin({
  id: 'application',
  routes: {
    servicesRoot: servicesRootRouteRef,
    servicesdetails: servicesDetailsRouteRef,
    servicesCreate: createServicesRouteRef,
    partnersRoot: partnersRootRouteRef,
    partnersDetails: partnersDetailsRouteRef,
    partnersCreate: createPartnerRouteRef,
    partnersEdit: editPartnerRouteRef,
    devApplicationRoot: applicationRouteRef,
    devApplicationDetails: applicationDetailsRouteRef,
    devApplicationCreate: newApplicationRouteRef,
    devApplicationEdit: editApplicationRouteRef,
  },
});

export const ServicesPage = applicationPlugin.provide(
  createRoutableExtension({
    name: 'ServicesPage',
    component: () =>
      import('./components/services/ServicesPageComponent').then(
        m => m.ServicesPageComponent,
      ),
    mountPoint: servicesRootRouteRef,
  }),
);

export const PartnersPage = applicationPlugin.provide(
  createRoutableExtension({
    name: 'PartnersPage',
    component: () =>
      import('./components/partners/PartnersPageComponent').then(
        m => m.PartnersPageComponent,
      ),
    mountPoint: partnersRootRouteRef,
  }),
);

export const ApplicationPage = applicationPlugin.provide(
  createRoutableExtension({
    name: 'ApplicationPage',
    component: () =>
      import('./components/devApplication/HomepageComponent').then(
        m => m.HomePageComponent,
      ),
    mountPoint: applicationRouteRef,
  }),
);

