import React from 'react';
import { Table, TableColumn, Progress } from '@backstage/core-components';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import useAsync from 'react-use/lib/useAsync';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { ICredentials } from '../utils/interfaces';
import { createAxiosInstance } from '../../../../../api/Api';
import { useApi, alertApiRef, configApiRef, identityApiRef } from '@backstage/core-plugin-api'; 

type DenseTableProps = {
  applicationId: string,
  credentials: ICredentials[];
  axiosInstance: any;
  refresh: any;
  setRefresh: any;
};

export const DenseTable = ({applicationId, credentials, axiosInstance, refresh, setRefresh} : DenseTableProps) => {

  const columns: TableColumn[] = [
    // { title: 'Id', field: 'id', width: '1fr' },
    { title: 'Client ID', field: 'clientId', width: '1fr' },
    { title: 'Client secret', field: 'clientSecret', width: '1fr'},
    { title: 'Type', field: 'type', width: '1fr'},
    { title: 'Actions', field: 'actions', width: '1fr' },
  ];

  const removeCredential = async (applicationID: string, credentialID: string, credentialType: string) => {
    const response = await axiosInstance.delete(`/applications/${applicationID}/credentials?idCredential=${credentialID}&type=${credentialType}`)
    if(response) setRefresh(!refresh)
  };

  const data = credentials.map(item => {
   return {
      id: item.id,
      type: item.type,
      clientSecret: item.clientSecret || item.key,
      clientId: item.clientId,
      actions: (
        <Button
          variant="outlined"
          onClick={() => removeCredential(applicationId,item.id, item.type)}
          component={RouterLink}
          to=""
          style={{ border: 'none' }}
        >
          {' '}
          <DeleteOutlineIcon />{' '}
        </Button>
      ),
    };
  });

  return (
    <>
      <Table
        title={`All Credentials (${credentials.length})`}
        options={{ search: true, paging: true }}
        columns={columns}
        data={data}
        style={{ width: '100%', border: 'none' }}
      />
    </>
  );
};

export const FetchListComponent = ({ idApplication, refresh, setRefresh }: { idApplication: string, refresh: any, setRefresh: any }) => {
  const alert = useApi(alertApiRef)
  const config = useApi(configApiRef)
  const identity = useApi(identityApiRef)
  const axiosInstance = createAxiosInstance({config, alert, identity})
  // list Credentias
  const { value, loading, error } = useAsync(async (): Promise<
    ICredentials[]
  > => {
    const response =  await axiosInstance.get(`/applications/${idApplication}/credentials`)
    return response.data.credentials;
  }, [refresh]);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return <DenseTable applicationId={idApplication} credentials={value || []} axiosInstance={axiosInstance} refresh={refresh} setRefresh={setRefresh} />;
};
