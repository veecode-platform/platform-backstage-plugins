import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { veecodeAssistantAiPlugin, VeecodeAssistantAiPage } from '../src/plugin';

createDevApp()
  .registerPlugin(veecodeAssistantAiPlugin)
  .addPage({
    element: <VeecodeAssistantAiPage />,
    title: 'Root Page',
    path: '/veecode-assistant-ai',
  })
  .render();
