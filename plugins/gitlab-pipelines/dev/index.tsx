import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { gitlabPipelinesPlugin, } from '../src/plugin';
import { GitlabPipelinesList } from '../src/components/GitlabPipelinesList';

createDevApp()
  .registerPlugin(gitlabPipelinesPlugin)
  .addPage({
    element: <GitlabPipelinesList/>,
    title: 'Root Page',
    path: '/gitlab-pipelines'
  })
  .render();
