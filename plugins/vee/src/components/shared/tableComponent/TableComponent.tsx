import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import type { TableComponentProps } from './types';
import { useTableComponentStyles } from './styles';
import { EmptyStateComponent } from '../emptyStateComponent/EmptyStateComponent';
import { CodeSnippet, Table, TableColumn, WarningPanel } from '@backstage/core-components';
import { Typography } from '@material-ui/core';
import { MdDelete, MdEdit } from 'react-icons/md';
import  Chip from '@mui/material/Chip';

export const TableComponent = <T extends Record<string, any> & { id: string | number }>(
  props: TableComponentProps<T>,
) => {
  const { title, loading, error, data, actions, onEdit, onDelete } = props;
  const { tableWrapper } = useTableComponentStyles();

  const columns: TableColumn<T>[] = React.useMemo(() => {
    if (!data || data.length === 0) return [];
  
    const keys = Object.keys(data[0]);
  
    return keys.map((column: string): TableColumn<T> => ({
      title: column.charAt(0).toUpperCase() + column.slice(1),
      field: column,
      highlight: column === 'name' || column === 'type',
      render: (rowData: T) => {
        const value = rowData[column];
  
        if (Array.isArray(value)) {
          return (
            <>
              {value.map((item: any, index: number) => (
                <Chip
                  key={index}
                  label={item}
                  size="small"
                  variant="outlined"
                  style={{ margin: '2px' }}
                />
              ))}
            </>
          );
        }
        return String(value);
      },
    }));
  }, [data]);
  

  if (error) {
    return (
      <div>
        <WarningPanel severity="error" title={title}>
          <CodeSnippet language="text" text={error.toString()} />
        </WarningPanel>
      </div>
    );
  }

  if (!data || data.length === 0)
    return (
      <EmptyStateComponent title="No data" message="No data to be rendered..." />
    );

  const actionsColumns = actions
    ? [
        (rowData: T) => ({
          icon: () => (
            <>
              <MdEdit size={20} />
              <Typography variant="srOnly">Edit</Typography>
            </>
          ),
          disable: !onEdit,
          tooltip: 'Edit',
          onClick: () => onEdit?.(rowData.id as string),
        }),
        (rowData: T) => ({
          icon: () => (
            <>
              <MdDelete size={20} />
              <Typography variant="srOnly">Delete</Typography>
            </>
          ),
          disable: !onDelete,
          tooltip: 'Delete',
          onClick: () => onDelete?.(rowData.id as string),
        }),
      ]
    : [];

  return (
    <TableContainer component={Paper} className={tableWrapper}>
      <Table
        options={{
          paging: true,
          padding: 'dense',
          actionsColumnIndex: -1,
        }}
        isLoading={loading}
        emptyContent="No data"
        data={data}
        columns={columns}
        title={title}
        actions={actionsColumns}
      />
    </TableContainer>
  );
};
