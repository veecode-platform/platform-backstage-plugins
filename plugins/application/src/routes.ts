import { createRouteRef, createSubRouteRef } from '@backstage/core-plugin-api';


// services routes
export const servicesRootRouteRef = createRouteRef({
  id: 'services',
});

export const servicesDetailsRouteRef = createSubRouteRef({
  id: 'service-details',
  parent: servicesRootRouteRef,
  path: '/service-details'
});

export const createServicesRouteRef = createSubRouteRef({
  id: 'services-create',
  parent: servicesRootRouteRef,
  path: '/create-service'
});
export const editServicesRouteRef = createSubRouteRef({
  id: 'services-edit',
  parent: servicesRootRouteRef,
  path: '/edit-service'
});

// partners routes
export const partnersRootRouteRef = createRouteRef({
  id: 'partners',
});

export const partnersDetailsRouteRef = createSubRouteRef({
  id: 'partner-details',
  parent: partnersRootRouteRef,
  path: '/partner-details'
});

export const createPartnerRouteRef = createSubRouteRef({
  id: 'partners-create',
  parent: partnersRootRouteRef,
  path: '/create-partner'
});
export const editPartnerRouteRef = createSubRouteRef({
  id: 'partners-edit',
  parent: partnersRootRouteRef,
  path: '/edit-partner'
});

// dev-application routes
export const applicationRouteRef = createRouteRef({
  id: 'application',
});

export const applicationDetailsRouteRef = createSubRouteRef({
  id: 'application-details',
  parent: applicationRouteRef,
  path: '/details'
});

export const newApplicationRouteRef = createSubRouteRef({
  id: 'application-new',
  parent: applicationRouteRef,
  path: '/new-application'
});

export const editApplicationRouteRef = createSubRouteRef({
  id: 'application-edit',
  parent: applicationRouteRef,
  path: '/edit-application'
});