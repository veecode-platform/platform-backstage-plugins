import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { aiChatPlugin, AiChatPage } from '../src/plugin';

createDevApp()
  .registerPlugin(aiChatPlugin)
  .addPage({
    element: <AiChatPage />,
    title: 'Root Page',
    path: '/ai-chat',
  })
  .render();
