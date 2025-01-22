import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { zoraOssPlugin, ZoraOssPage } from '../src/plugin';

createDevApp()
  .registerPlugin(zoraOssPlugin)
  .addPage({
    element: <ZoraOssPage />,
    title: 'Root Page',
    path: '/zora-oss',
  })
  .render();
