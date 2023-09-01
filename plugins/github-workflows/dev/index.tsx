import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { githubWorkflowsPlugin, GithubWorkflowsCard } from '../src/plugin';

createDevApp()
  .registerPlugin(githubWorkflowsPlugin)
  .addPage({
    element: <GithubWorkflowsCard />,
    title: 'Root Page',
    path: '/github-workflows'
  })
  .render();
