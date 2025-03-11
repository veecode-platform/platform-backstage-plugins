import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { githubWorkflowsPlugin, GithubWorkflowsContent } from '../src/plugin';

createDevApp()
  .registerPlugin(githubWorkflowsPlugin)
  .addPage({
    element: <GithubWorkflowsContent />,
    title: 'Root Page',
    path: '/github-workflows'
  })
  .render();
