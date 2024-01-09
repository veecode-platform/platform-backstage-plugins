/* eslint-disable no-new */
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import useAsync from 'react-use/lib/useAsync';
import { Table, TableColumn, Progress} from '@backstage/core-components';
import AxiosInstance from '../../../api/Api';
import { IApplication } from '../../devApplication/interfaces';
import { useAppConfig } from '../../../hooks/useAppConfig';
import { identityApiRef, useApi } from '@backstage/core-plugin-api';


type ServiceListProps = {
  applications: IApplication[];
}


const ApplicationList = ({applications}:ServiceListProps) =>{
    const columns: TableColumn[] = [
        { title: 'Id', field: 'id', width:'1fr' },
        { title: 'Name', field: 'name', width: '1fr' },
      ];
    
      const data = applications.map(application => {
        return {
            name: application.name,
            id: application.id,
        };
      });
    
      return (       
        <>
        <Table
          title={`Applications (${applications.length})`}
          options={{ search: true, paging: false }}
          columns={columns}
          data={data}
        />
        </>
      );    
}

type partnerListProps = {
  partnerId: string;
}

export const PartnerApplicationListTable = ({partnerId}:partnerListProps) => {
  const BackendBaseUrl = useAppConfig().BackendBaseUrl;
  const user = useApi(identityApiRef);
    const { value, loading, error } = useAsync(async (): Promise<IApplication[]> => {
      const userIdentityToken = await user.getCredentials()
        const {data} = await AxiosInstance.get(`${BackendBaseUrl}/applications/partners/${partnerId}?limit=10&offset=0`,{headers:{ Authorization: `Bearer ${userIdentityToken.token}`}})
        return data.applications;
    }, []);
  
    if (loading) {
      return <Progress />;
    } else if (error) {
      return <Alert severity="error">{error.message}</Alert>;
    }
    return <ApplicationList applications={value || []} />; 
  };