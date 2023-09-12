import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { gitlabPipelinesPlugin, GitlabPipelinesOverview } from '../src/plugin';

createDevApp()
  .registerPlugin(gitlabPipelinesPlugin)
  .addPage({
    element: <GitlabPipelinesOverview />,
    title: 'Root Page',
    path: '/gitlab-pipelines'
  })
  .render();
