import React, { useEffect, useState } from 'react';
import { Grid, Button, TextField} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {Progress} from '@backstage/core-components';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import useAsync from 'react-use/lib/useAsync';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
} from '@backstage/core-components';
import { IApplication, IErrorStatus } from '../interfaces';
import { validateName } from '../../shared/commons/validate';
import { FetchServicesList } from '../NewApplicationComponent';
import { createAxiosInstance } from '../../../api/Api';
import { useApi, alertApiRef, configApiRef, identityApiRef } from '@backstage/core-plugin-api'; 

type Application = {
  application: IApplication | undefined;
  axiosInstance: any;
}

const EditApplicationComponent = ({ application, axiosInstance }: Application) => {
  const navigate = useNavigate();
  const [app, setApp] = useState<IApplication | any>(application);
  const [errorField, setErrorField] = useState<IErrorStatus>({
    name: false
  });

  useEffect(()=>{
    setApp({
      name: application?.name,
      creator: application?.creator,
      servicesId: [],
    })
  },[application]);



  const handleSubmit = async () => {
    const applicationData = {
      application:{
        name: app.name,
        creator: app.creator,
        services: app.servicesId,
        active: true
      }
    }
    const response = await axiosInstance.patch(`/applications/${application?.id}`,JSON.stringify(applicationData) )
    if(response) navigate('/applications')
    
    return 
  }
  return (
    <Page themeId="tool">
    <Header title="Application"> </Header>
    <Content>
    <ContentHeader title='Edit Application'> </ContentHeader>
      <Grid container direction="row" justifyContent="center">
      <Grid item sm={12} lg={5}>
          <InfoCard>
            <Grid container spacing={3} direction='column' justifyContent="center">
                <Grid item xs={12} >
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Application Name"
                    value={app.name ?? ''}
                    required
                    onBlur={ (e) => {if (e.target.value === "") setErrorField({ ...errorField, name: true }) }}
                    onChange={(e) => {
                      setApp({ ...app, name: e.target.value });
                      if (validateName(e.target.value)) setErrorField({ ...errorField, name: true });
                      else setErrorField({ ...errorField, name: false });
                    }} 
                    error={errorField.name}
                    helperText={
                      errorField.name
                        ? 'Enter a name with at least 3 characters'
                        : null
                    }
                    />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Creator"
                    value={app.creator ?? ''}
                    required
                    disabled
                    onChange={(e) => {
                      setApp({ ...app, creator: e.target.value })
                    }} />
                </Grid>

                <Grid item lg={12}>
                  <FetchServicesList partner={app} setPartner={setApp} axiosInstance={axiosInstance}/>
                </Grid>
              <Grid item xs={12} >
                <Grid container justifyContent='center' alignItems='center'>
                  <Button component={RouterLink} to='/applications' style={{margin:"16px"}} size='large' variant='outlined'>Cancel</Button>
                  <Button style={{margin:"16px"}} size='large' color='primary' type='submit' variant='contained' disabled={errorField.name} onClick={handleSubmit}>Save</Button>
                </Grid>
              </Grid>
            </Grid>
          </InfoCard>
        </Grid>
        
      </Grid>
    </Content>
  </Page>
  );

}



export const EditComponent = () => {
  const location = useLocation();
  const id = location.search.split("?id=")[1];
  const alert = useApi(alertApiRef)
  const config = useApi(configApiRef)
  const identity = useApi(identityApiRef)
  const axiosInstance = createAxiosInstance({config, alert, identity})

  const { value, loading, error } = useAsync(async (): Promise<IApplication> => {

    const response = await axiosInstance.get(`/applications/${id}`)
    return response.data.application;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return <EditApplicationComponent application={value} axiosInstance={axiosInstance}/>
  
}