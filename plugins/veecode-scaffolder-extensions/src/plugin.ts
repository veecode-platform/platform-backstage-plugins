/* eslint-disable @backstage/no-undeclared-imports */
import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import { RepoUrlPlatform, RepoUrlPlatformSchema } from './components/RepoUrlPlatform/RepoUrlPlatform';
import { ResourcePicker, ResourcePickerSchema } from './components/ResourcePicker/ResourcePicker';


export const RepoUrlPlatformExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'RepoUrlPlatform',
    component: RepoUrlPlatform,
    schema: RepoUrlPlatformSchema
  }),
);

export const ResourcePickerExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'ResourcePicker',
    component: ResourcePicker,
    schema: ResourcePickerSchema
  }),
);