import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { environmentExplorerPlugin, EnvironmentExplorerPage } from '../src/plugin';

createDevApp()
  .registerPlugin(environmentExplorerPlugin)
  .addPage({
    element: <EnvironmentExplorerPage />,
    title: 'Root Page',
    path: '/environment-explorer'
  })
  .render();
