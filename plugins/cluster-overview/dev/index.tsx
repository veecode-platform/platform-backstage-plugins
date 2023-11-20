import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { ClusterOverviewPlugin, ClusterOverviewPage } from '../src/plugin';

createDevApp()
  .registerPlugin(ClusterOverviewPlugin)
  .addPage({
    element: <ClusterOverviewPage />,
    title: 'Root Page',
    path: '/cluster-overview'
  })
  .render();
