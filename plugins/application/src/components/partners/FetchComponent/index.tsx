import React from 'react';
import { Table, TableColumn, Progress} from '@backstage/core-components';
import { Link as RouterLink} from 'react-router-dom';
import { Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { IPartner } from '../interfaces';
import More from '@material-ui/icons/MoreHorizOutlined';

type DenseTableProps = {
  partners: IPartner[];
  total: number;
};

export const DenseTable = ({ partners, total }: DenseTableProps) => {

  const columns: TableColumn[] = [
    { title: 'Name', field: 'name', width:'1fr' },
    {title: 'Email', field: 'email', width:'1fr'},
    { title: "Created At", field: "created", width:'1fr'},
    { title: 'Details', field: 'details', width: '1fr' },
  ];

  const data = partners.map(partner => {
    return {
      name: partner.name,
      email: partner.email,
      created: partner.createdAt,
      details: <Button variant='outlined' component={RouterLink} to={`/partners/partner-details?id=${partner.id}`}><More/></Button>
    };
  });

  return (
    <Table
      title={`All partners (${total})`}
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
  data: IPartner[];
};

export const FetchComponent = ({data, error, loading, total}:FecthProps) => {

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return <DenseTable partners={data || []} total={total} />;
};