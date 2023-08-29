import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { gitlabPipelinesPlugin, GitlabPipelinesPage } from '../src/plugin';

createDevApp()
  .registerPlugin(gitlabPipelinesPlugin)
  .addPage({
    element: <GitlabPipelinesPage />,
    title: 'Root Page',
    path: '/gitlab-pipelines'
  })
  .render();
