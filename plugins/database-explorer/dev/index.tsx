import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { databaseExplorerPlugin, DatabaseExplorerPage } from '../src/plugin';

createDevApp()
  .registerPlugin(databaseExplorerPlugin)
  .addPage({
    element: <DatabaseExplorerPage />,
    title: 'Root Page',
    path: '/database-explorer'
  })
  .render();
