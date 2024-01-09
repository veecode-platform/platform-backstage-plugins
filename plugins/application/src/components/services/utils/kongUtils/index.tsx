import React from 'react';
import {Progress} from '@backstage/core-components';
import Alert from '@material-ui/lab/Alert';
import useAsync from "react-use/lib/useAsync";
import { IKongServices } from "../interfaces";
import { KongServicesListComponent } from "./kongServiceListComponent";
import AxiosInstance from '../../../../api/Api';
import { useAppConfig } from '../../../../hooks/useAppConfig';

export const FetchKongServices = ({valueName, setValue, selected, disabled}:any) => {
  const BackendBaseUrl = useAppConfig().BackendBaseUrl;
  const { value, loading, error } = useAsync(async (): Promise<IKongServices[]> => {
    const response = await AxiosInstance.get(`${BackendBaseUrl}/kong-extras/services`)
    return response.data.services;
  }, []);
  
  if (loading) {
    return <Progress /> 
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return <KongServicesListComponent services={value || []} value={valueName} setValue={setValue} selected={selected} disabled={disabled}/>
}
  