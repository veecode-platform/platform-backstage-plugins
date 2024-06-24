import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { infracostPlugin, InfracostPage } from '../src/plugin';

createDevApp()
  .registerPlugin(infracostPlugin)
  .addPage({
    element: <InfracostPage />,
    title: 'Root Page',
    path: '/infracost',
  })
  .render();
