import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { applicationPlugin, ServicesPage} from '../src/plugin';

createDevApp()
  .registerPlugin(applicationPlugin)
  .addPage({
    element: <ServicesPage />,
    title: 'Root Page',
    path: '/services'
  })
  .render();