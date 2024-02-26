import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Progress, ResponseErrorPanel } from '@backstage/core-components';
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { kongServiceManagerApiRef } from '../../api';
import useAsync from 'react-use/lib/useAsync';



const useStyles = makeStyles({
  avatar: {
    height: 32,
    width: 32,
    borderRadius: '50%',
  },
});

export const TesteApi = () => {
  const classes = useStyles();

  return (
    <div></div>
  );
};

export const ExampleFetchComponent = () => {
  const api = useApi(kongServiceManagerApiRef);

  const { value, loading, error } = useAsync(async (): Promise<any> => {
    const teste = await api.getRoutesFromService("default.viacep-1.viacep-service-1.80")
    console.log("here: ", teste)
    return value;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return <div/>;
};
