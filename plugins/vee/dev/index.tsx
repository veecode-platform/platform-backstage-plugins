import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { AssistantAIContent, veePlugin } from '../src/plugin';

createDevApp()
  .registerPlugin(veePlugin)
  .addPage({
    element: <AssistantAIContent />,
    title: 'Root Page',
    path: '/vee',
  })
  .render();
