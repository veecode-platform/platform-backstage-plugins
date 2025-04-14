import React from "react";
import type { Meta } from "@storybook/react";
import { TableComponent, TableComponentProps } from "./TableComponent";
import { ApiProvider, ApiFactoryRegistry } from '@backstage/core-app-api';
import { apis } from './apis';
import { ApiResolver } from '@backstage/core-app-api';

interface DataFakeItem {
    id: string,
    name: string,
    description: string
}

const registry = new ApiFactoryRegistry();
for (const apiFactory of apis) {
  registry.register('default', apiFactory);
}
const apiHolder = new ApiResolver(registry);

const dataFake : DataFakeItem[] = [
    {id: '00000000001', name: 'Item1', description: 'Description Item 1'},
    {id: '00000000002', name: 'Item2', description: 'Description Item 2'},
    {id: '00000000003', name: 'Item3', description: 'Description Item 3'},
    {id: '00000000004', name: 'Item4', description: 'Description Item 4'},
    {id: '00000000005', name: 'Item5', description: 'Description Item 5'}
]


export default {
    title: 'Components/TableComponent',
    component: TableComponent,
    args: {
        title: 'Table Name',
        data: dataFake,
        actions: true,
        onEdit: () => {},
        onDelete: ()=>{}
    },
    argsType: {
        title: { control: 'text' },
        data: {control: 'object'}
    },
    decorators: [
        (Story) => (
          <ApiProvider apis={apiHolder}>
           {Story()}
          </ApiProvider>
        ),
      ]
} as Meta<TableComponentProps<DataFakeItem>>;

export const Default = ({title,data,onEdit,onDelete}:TableComponentProps<DataFakeItem>) => (
    <TableComponent
     title={title}
     data={data}
     actions
     onEdit={onEdit}
     onDelete={onDelete}
    />
)