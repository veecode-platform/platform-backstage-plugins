import React from 'react';
import Alert from '@material-ui/lab/Alert';
import useAsync from 'react-use/lib/useAsync';
import { Table, TableColumn, Progress} from '@backstage/core-components';
import AxiosInstance from '../../../api/Api';
import { IService } from '../../services/utils/interfaces';
import { useApi, identityApiRef } from '@backstage/core-plugin-api';
import { useAppConfig } from '../../../hooks/useAppConfig';


type ServiceListProps = {
  services: IService[];
  partnerId: string[];
}


const ServicesList = ({services}:ServiceListProps) =>{

    const columns: TableColumn[] = [
        { title: 'Id', field: 'id', width:'1fr' },
        { title: 'Name', field: 'name', width: '1fr' },

      ];
      // defaultGroupOrder: 1, organiza por grupos
    
      const data = services.map(service => {
        return {
            name: service.name,
            id: service.id,

        };
      });
    
      return (       
        <>
        <Table
          title={`Services (${services.length})`}
          options={{ search: true, paging: false }}
          columns={columns}
          data={data}
        />
        </>
      );    
}

export const PartnerServiceListTable = ({partnerId}:any) => {
    const user = useApi(identityApiRef);
    const BackendBaseUrl = useAppConfig().BackendBaseUrl;

    const { value, loading, error } = useAsync(async (): Promise<IService[]> => {
        const userIdentityToken = await user.getCredentials()
        const {data} = await AxiosInstance.get(`${BackendBaseUrl}/partners/${partnerId}/services`, {headers:{ Authorization: `Bearer ${userIdentityToken.token}`}})
        return data.services;
    }, []);
  
    if (loading) {
      return <Progress />;
    } else if (error) {
      return <Alert severity="error">{error.message}</Alert>;
    }
    return <ServicesList services={value || []} partnerId={partnerId}/>;
  };