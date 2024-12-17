import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { AssistantAIContent, veecodeAssistantAiPlugin } from '../src/plugin';

createDevApp()
  .registerPlugin(veecodeAssistantAiPlugin)
  .addPage({
    element: <AssistantAIContent />,
    title: 'Root Page',
    path: '/veecode-assistant-ai',
  })
  .render();
