import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { vaultExplorerPlugin, VaultExplorerPage } from '../src/plugin';

createDevApp()
  .registerPlugin(vaultExplorerPlugin)
  .addPage({
    element: <VaultExplorerPage />,
    title: 'Root Page',
    path: '/vault-explorer'
  })
  .render();
