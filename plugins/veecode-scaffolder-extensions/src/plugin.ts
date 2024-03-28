/* eslint-disable @backstage/no-undeclared-imports */
import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import { RepoUrlSelector, RepoUrlSelectorSchema } from './components/RepoUrlSelector/RepoUrlSelector';
import { ResourcePicker, ResourcePickerSchema } from './components/ResourcePicker/ResourcePicker';


export const RepoUrlSelectorExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'RepoUrlSelector',
    component: RepoUrlSelector,
    schema: RepoUrlSelectorSchema
  }),
);

export const ResourcePickerExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'ResourcePicker',
    component: ResourcePicker,
    schema: ResourcePickerSchema
  }),
);