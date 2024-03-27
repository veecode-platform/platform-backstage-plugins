import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { veecodeScaffolderExtensionsPlugin, VeecodeScaffolderExtensionsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(veecodeScaffolderExtensionsPlugin)
  .addPage({
    element: <VeecodeScaffolderExtensionsPage />,
    title: 'Root Page',
    path: '/veecode-scaffolder-extensions'
  })
  .render();
