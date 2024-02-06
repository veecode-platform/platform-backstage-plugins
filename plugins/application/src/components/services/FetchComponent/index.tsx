import React from 'react';
import { Table, TableColumn, Progress} from '@backstage/core-components';
import { Link as RouterLink} from 'react-router-dom';
import { Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { IService } from '../utils/interfaces';
import More from '@material-ui/icons/MoreHorizOutlined';

type DenseTableProps = {
  services: IService[];
  total: number;
};

export const DenseTable = ({ services, total }: DenseTableProps) => {

  const columns: TableColumn[] = [
    { title: 'Name', field: 'name',width:'1fr' },
    { title: 'Kong', field: 'kong',width:'1fr' },
    { title: "Created At", field: "created",width:'1fr'},
    { title: 'Details', field: 'details',width:'1fr'},
  ];

  const data = services.map(service => {
    return {
      name: service.name,
      kong: service.kongServiceName,
      created: service.createdAt,
      details: <Button variant='outlined' component={RouterLink} to={`/services/service-details?id=${service.id}`}><More/></Button>
    };
  });

  return (
    <Table
      title={`All Services (${total})`}
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
  data: IService[];
};

export const FetchComponent = ({loading, error, data, total}:FecthProps) => {

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return <DenseTable services={data} total={total} />;
};