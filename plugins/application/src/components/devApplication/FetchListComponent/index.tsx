import React from 'react';
import { Table, TableColumn, Progress} from '@backstage/core-components';
import { Link as RouterLink} from 'react-router-dom';
import { Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { IApplication } from '../interfaces';
import More from '@material-ui/icons/MoreHorizOutlined';

type DenseTableProps = {
  applications: IApplication[];
  total: number;
};

export const DenseTable = ({ applications, total }: DenseTableProps) => {

  const columns: TableColumn[] = [
    { title: 'Name', field: 'name', width:'1fr' },
    {title: "Created By", field:"creator",width:'1fr'},
    { title: "Created At", field: "created",width:'1fr'},
    { title: 'Details', field: 'details',width:'1fr' },
  ];

  const data = applications.map(application => {
    return {
      name: application.name,
      creator: application.creator,
      created: application.createdAt,
      details: <Button variant='outlined' component={RouterLink} to={`/applications/details?id=${application.id}`}> <More/> </Button>
    };
  });

  return (
    <Table
    title={`All Applications (${total})`}
      options={{ search: true, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

type FecthProps = {
  total: number;
  loading: boolean;
  error: Error | undefined;
  data: IApplication[];
};

export const FetchListComponent = ({total, loading, error, data}: FecthProps) => {
  
  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return <DenseTable applications={data || []} total={total} />;
};