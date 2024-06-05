/* eslint-disable @backstage/no-undeclared-imports */
import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import { RepoUrlSelector, RepoUrlSelectorSchema } from './components/RepoUrlSelector/RepoUrlSelector';
import { ResourcePicker, ResourcePickerSchema } from './components/ResourcePicker/ResourcePicker';
import { UploadFilePicker,UploadFilePickerSchema } from './components/UploadFilePicker/UploadFIlePicker';
import { OptionsPicker, OptionsPickerSchema } from './components/OptionsPicker';


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

export const UploadFilePickerExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'UploadFilePicker',
    component: UploadFilePicker,
    schema: UploadFilePickerSchema
  })
)

export const OptionsPickerExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'OptionsPicker',
    component: OptionsPicker,
    schema: OptionsPickerSchema
  }),
);