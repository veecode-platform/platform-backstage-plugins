import { createRouteRef, createSubRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'veecode-assistant-ai',
});

export const aiOptionsRef = createSubRouteRef({
  id: 'ai-options',
  parent: rootRouteRef,
  path: '/ai-options'
})

export const aiChatRef = createSubRouteRef({
  id: 'ai-chat',
  parent: rootRouteRef,
  path: '/ai-chat'
})
