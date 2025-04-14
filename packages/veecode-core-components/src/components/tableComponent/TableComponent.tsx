import React from "react";
import { themeVariables } from "../../utils/constants/themeVariables";
import { makeStyles } from "@mui/styles";
import { Chip, Paper, TableContainer, Typography } from "@mui/material";
import { Table, TableColumn, WarningPanel } from "@backstage/core-components";
import { CodeSnippet } from "../codeSnippet/CodeSnippet";
import { EmptyStateComponent } from "../emptyStateComponent/EmptyStateComponent";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export interface TableComponentProps<T> {
    title: string;
    loading?: boolean;
    error?: Error | string | undefined | null;
    data: T[];
    actions?: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
  }

  export const useTableComponentStyles = makeStyles({
      tableWrapper:{
          marginTop: '-1rem',
          maxHeight: '90%',
          overflowY: "auto",
          '& .MuiToolbar-root':{
              backgroundColor: themeVariables.colors.darkGrey
          },
          '& .MuiTable-root': {
              backgroundColor: themeVariables.background.main,
              color: themeVariables.colors.white,
            },
            '& .MuiTableCell-head': {
              backgroundColor: themeVariables.background.dark, 
              border: `2px solid ${themeVariables.background.dark}`,
              fontWeight: 'bold',
            },
            '& .MuiTableRow-root:nth-of-type(odd)': {
              backgroundColor: themeVariables.colors.darkGrey,
            },
            '& .MuiTableRow-root:hover': {
              backgroundColor:  themeVariables.background.secondary, 
            },
      },
      actionButton: {
          margin: 'auto .5rem',
          transition: 'all .5s ease-in-out'
      },
      deleteAction: {
          transition: 'all .5s ease-in-out',
          '&:hover':{
              color: themeVariables.colors.red,
              transition: 'all .5s ease-in'
          }
      },
      editAction: {
          transition: 'all .5s ease-in-out',
          '&:hover':{
              opacity: '0.6',
              transition: 'all .5s ease-in'
          }
      }
  })

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
            <CodeSnippet language="text" code={error.toString()} />
          </WarningPanel>
        </div>
      );
    }
  
    if (!data || data.length === 0)
      return (
        <EmptyStateComponent.Root>
          <EmptyStateComponent.Title>No data</EmptyStateComponent.Title>
          <EmptyStateComponent.Message>No data to be rendered...</EmptyStateComponent.Message>
        </EmptyStateComponent.Root>
      );
  
    const actionsColumns = actions
      ? [
          (rowData: T) => ({
            icon: () => (
              <>
                <EditIcon />
                <Typography>Edit</Typography>
              </>
            ),
            disable: !onEdit,
            tooltip: 'Edit',
            onClick: () => onEdit?.(rowData.id as string),
          }),
          (rowData: T) => ({
            icon: () => (
              <>
                <DeleteOutlineIcon />
                <Typography>Delete</Typography>
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
  