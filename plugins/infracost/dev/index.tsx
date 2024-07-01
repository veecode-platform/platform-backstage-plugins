import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { infracostPlugin, InfracostOverviewPage } from '../src/plugin';

createDevApp()
  .registerPlugin(infracostPlugin)
  .addPage({
    element: <InfracostOverviewPage />,
    title: 'Root Page',
    path: '/infracost',
  })
  .render();
