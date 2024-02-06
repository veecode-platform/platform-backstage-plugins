import React, {useEffect, useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {  Select } from '../../shared';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  Progress,
} from '@backstage/core-components';
import { ICreateApplication } from '../interfaces';
import { Alert } from '@material-ui/lab';
import useAsync from 'react-use/lib/useAsync';
import {IErrorStatus} from '../interfaces';
import { validateName } from '../../shared/commons/validate';
import { usePermission } from '@backstage/plugin-permission-react';
import { adminAccessPermission } from '@veecode-platform/plugin-application-common';
import { createAxiosInstance } from '../../../api/Api';
import { useApi, alertApiRef, configApiRef, identityApiRef } from '@backstage/core-plugin-api'; 

export const NewApplicationComponent = () => {
  const alert = useApi(alertApiRef)
  const config = useApi(configApiRef)
  const identity = useApi(identityApiRef)
  const axiosInstance = createAxiosInstance({config, alert, identity})
  const navigate = useNavigate();
  const { loading: loadingPermission, allowed: adminView } = usePermission({permission: adminAccessPermission});

  const [application, setApplication] = useState<ICreateApplication>({
    name: '',
    creator: "",
    active: true,
    servicesId: "",
  });
  const [errorField, setErrorField] = useState<IErrorStatus>({
    name: false
  });
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(!adminView){
      identity.getBackstageIdentity().then( res => {
        return setApplication({ ...application, creator: res.userEntityRef.split("/")[1] });
      }).catch(() => {
        return setApplication({ ...application, creator: "default"});
      })
  }
  
  }, []);

  const handleSubmit = async () => {  
    setLoading(true)        
    const applicationData = {
      application: {
        name: application.name,
        creator: application.creator,
        active: application.active,
        services: application.servicesId,
      },
    };
    const response = await axiosInstance.post(`/applications`, JSON.stringify(applicationData))
    setLoading(false)
    if(response) navigate('/applications');
  };
  return (
    <Page themeId="tool">
      <Header title="New Application"> </Header>
      <Content>
        <ContentHeader title="Create a new Application"> </ContentHeader>
        <Grid container direction="row" justifyContent="center">
          <Grid item sm={12} lg={6}>
            <InfoCard>
              <Grid
                container
                spacing={3}
                direction="column"
                justifyContent="center"
              >
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Application Name"
                    value={application.name ?? ''}
                    required
                    onBlur={ (e) => {if (e.target.value === "") setErrorField({ ...errorField, name: true }) }}
                    onChange={e => {
                      setApplication({ ...application, name: e.target.value });
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

                <Grid item xs={12}>
                  {(!loadingPermission && adminView) && 
                    <UsersList application={application} setApplication={setApplication} axiosInstance={axiosInstance}/>
                  }
                  {(!loadingPermission && !adminView) && 
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Creator"
                      value={application.creator}
                      required
                      InputProps={{
                        readOnly: true,
                      }}                  
                    />
                  }
                  
                </Grid>
                <Grid item lg={12}>
                  <FetchServicesList partner={application} setPartner={setApplication} axiosInstance={axiosInstance}/>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent="center" alignItems="center">
                    <Button
                      component={RouterLink}
                      to="/applications"
                      style={{ margin: '16px' }}
                      size="large"
                      color="primary"
                      variant="contained"
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{
                        margin: '16px',
                      }}
                      size="large"
                      type="submit"
                      variant="contained"
                      disabled={errorField.name || loading}
                      onClick={handleSubmit}
                    >
                      {loading ? "loading" : "create"}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </InfoCard>
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};

export const FetchServicesList = ({partner, setPartner, axiosInstance}: any) => { 
  const { value, loading, error } = useAsync(async (): Promise<any> => {
    const {data} = await axiosInstance.get("/services");
    return data.services
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return (
  <Select
    placeholder="Services"
    label="Services"
    items={value.map((item: any) => {
      return { ...{ label: item.name, value: item.id, key: item.id } };
      })}
    multiple
    onChange={e => {
    setPartner({ ...partner, servicesId: e });
    }}
  />)
};

export const FetchApplicationsList = ({partner, setPartner, axiosInstance}: any) => {
  const { value, loading, error } = useAsync(async (): Promise<any> => {
    const {data} = await axiosInstance.get(`/applications`);
    return data.applications;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return (
  <Select
    placeholder="Applications"
    label="Applications"
    items={value.map((item: any) => {
      return { ...{ label: item.name, value: item.id, key: item.id } };
      })}
    multiple
    onChange={e => {
    setPartner({ ...partner, applicationId: e });
    }}
  />)
};


const UsersList = ({application, setApplication, axiosInstance}: any) =>{
  const { value, loading, error } = useAsync(async (): Promise<any> => {
    const {data} = await axiosInstance.get(`/keycloak/users`);
    return data.users;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return (
    <Select
      placeholder="Creator"
      label="Creator"
      items={value.map((item: any) => {
        return { ...{ label: item.username, value: item.username } };
        })}
      onChange={e => { setApplication({...application, creator: e  }) }}
    />
  )

}
