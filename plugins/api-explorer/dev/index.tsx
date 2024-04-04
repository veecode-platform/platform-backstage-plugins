import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { apiExplorerPlugin, ApiExplorerPage } from '../src/plugin';

createDevApp()
  .registerPlugin(apiExplorerPlugin)
  .addPage({
    element: <ApiExplorerPage />,
    title: 'Root Page',
    path: '/api-explorer'
  })
  .render();
