import React from "react";
import type { Meta } from "@storybook/react";
import { TableComponent, TableComponentProps } from "./TableComponent";
import { mockData, MockDataProps } from "./mockData";
import { Box } from "@mui/material";
import { ApiProvider, ApiFactoryRegistry } from '@backstage/core-app-api';
import { storybookApis } from '../../utils/mock/storybook.mockApis';
import { ApiResolver } from '@backstage/core-app-api';

const registry = new ApiFactoryRegistry();
for (const factory of storybookApis) {
  registry.register('default', factory);
}
const apiHolder = new ApiResolver(registry);


export default {
    title: 'Components/TableComponent',
    component: TableComponent,
    args: {
        title: 'Table Title Example',
        loading: false,
        error: null,
        data: mockData,
        onEdit: () => {},
        onDelete: () => {}
    },
    argsTypes:{
        title: { control: 'text'},
        loading: { control: 'boolean'},
        error: { control: 'text'},
        data: { control: {}},
        actions: { control: 'boolean'},
        onEdit: { control: {}},
        onDelete: { control: {}}
    },
    decorators: [
        (Storys) => {
            return (
              <ApiProvider apis={apiHolder}>
                <Box sx={{ maxWidth: '80vw' }}>{Storys()}</Box>
              </ApiProvider>
            );
        }
    ]
} as Meta<TableComponentProps<MockDataProps>>;

export const Default = (args:TableComponentProps<MockDataProps>) => (
    <TableComponent
      title={args.title}
      loading={args.loading}
      error={args.error}
      data={args.data}
      actions
      onDelete={args.onDelete}
      onEdit={args.onEdit}
    />
)