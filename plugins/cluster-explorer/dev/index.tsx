import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { ClusterExplorerPlugin, ClusterOverviewPage } from '../src/plugin';

createDevApp()
  .registerPlugin(ClusterExplorerPlugin)
  .addPage({
    element: <ClusterOverviewPage />,
    title: 'Root Page',
    path: '/cluster-overview'
  })
  .render();
