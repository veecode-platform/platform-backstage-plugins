import React, { useState } from 'react';
import {Grid,makeStyles,Card,CardHeader,IconButton,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Progress, TabbedLayout } from '@backstage/core-components';
import { useLocation, useNavigate } from 'react-router-dom';
import useAsync from 'react-use/lib/useAsync';
import { Header, Page, Link } from '@backstage/core-components';
import { IService } from '../utils/interfaces';
import EditIcon from '@material-ui/icons/Edit';
import CachedIcon from '@material-ui/icons/Cached';
import DeleteIcon from '@material-ui/icons/Delete';
import { DefaultDetailsComponent } from './DefaultDetailsComponent';
import { SecurityTypeEnum } from '../utils/enum';
import { createAxiosInstance } from '../../../api/Api';
import { useApi, alertApiRef, configApiRef, identityApiRef } from '@backstage/core-plugin-api';

// makestyles
const useStyles = makeStyles({
  gridItemCard: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 10px)',
    marginBottom: '10px',
  },
  fullHeightCard: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  gridItemCardContent: {
    flex: 1,
  },
  fullHeightCardContent: {
    flex: 1,
  },
});

type Services = {
  service: IService | undefined;
  axiosInstance: any;
};

const Details = ({ service, axiosInstance }: Services) => {
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const classes = useStyles();
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const Refresh = () => {
    window.location.reload();
  };

  const deleteServiceHandler = async () =>{
    const response = await axiosInstance.delete(`/services/${service?.id}`)
    if(response)navigate('/services');
  }


  const serviceData = {
    id: service?.id ?? '...',
    name: service?.name ?? '...',
    active: service?.active ?? true,
    description: service?.description ?? '...',
    kongServiceName: service?.kongServiceName ?? '...',
    kongServicesId: service?.kongServiceId ?? '...',
    rateLimiting: service?.rateLimiting ?? '...',
    securityType: service?.securityType ?? SecurityTypeEnum.none,
    createdAt: service?.createdAt ?? '...',
    updatedAt: service?.updatedAt ?? '...',
  };

  return (
    <Page themeId="tool">
      <Header title={service?.name}> </Header>
      <TabbedLayout>
        <TabbedLayout.Route path="/" title="OVERVIEW">
          <Card className={classes.gridItemCard}>
            <Grid
              style={{ marginBottom: '2vw'}}
              item
              lg={12}
            >
              <CardHeader
                title="Details"
                id="overview"
                style={{ padding: '2em'}}
                action={
                  <>
                    <IconButton
                      component={Link}
                      aria-label="Edit"
                      title="Edit"
                      to={`/services/edit-service?id=${service?.id}`}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      aria-label="Refresh"
                      title="Refresh"
                      onClick={Refresh}
                    >
                      <CachedIcon />
                    </IconButton>

                    <IconButton
                      aria-label="Delete"
                      title="Delete this service"
                      onClick={handleOpenDialog}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <ConfirmDeleteDialog show={showDialog} handleClose={handleCloseDialog} handleSubmit={deleteServiceHandler}/>
                  </>
                }
              />
              <Grid container direction="column" spacing={6}>
                <DefaultDetailsComponent
                  metadata={serviceData}
                  back="/services"
                  partners={service?.partnersId}
                />
              </Grid>
            </Grid>
          </Card>
        </TabbedLayout.Route>
      </TabbedLayout>
    </Page>
  );
};

export const DetailsComponent = () => {
  const location = useLocation();
  const id = location.search.split('?id=')[1];
  const alert = useApi(alertApiRef)
  const config = useApi(configApiRef)
  const identity = useApi(identityApiRef)
  const axiosInstance = createAxiosInstance({config, alert, identity})

  const { value, loading, error } = useAsync(async (): Promise<IService> => {
    const {data} = await axiosInstance.get(`/services/${id}`)
    const partnersList = await axiosInstance.get(`/services/${id}/partners`)
    return {
      ...data.service,
      partnersId: partnersList.data.partners
    }
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return <Details service={value} axiosInstance={axiosInstance} />;
};

type dialogProps = {
  show: boolean;
  handleClose: any;
  handleSubmit: any;
}

const ConfirmDeleteDialog = ({show, handleClose, handleSubmit}: dialogProps) =>{
  return (
    <Dialog
    open={show}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Are you sure to delete this service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`This action cannot be undone`}        
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus >
          Cancel
        </Button>
        <Button onClick={handleSubmit}  style={{color:"#ED4337"}} >
          Delete
        </Button>
      </DialogActions>
  </Dialog>
)}
