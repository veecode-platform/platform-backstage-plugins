import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { githubWorkflowsPlugin, GithubWorkflowsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(githubWorkflowsPlugin)
  .addPage({
    element: <GithubWorkflowsPage />,
    title: 'Root Page',
    path: '/github-workflows'
  })
  .render();
