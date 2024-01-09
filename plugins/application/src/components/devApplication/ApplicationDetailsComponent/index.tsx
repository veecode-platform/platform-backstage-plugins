import React, { useState } from 'react';
import { Grid, makeStyles, Card, CardHeader, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Link, Progress, TabbedLayout } from '@backstage/core-components';
import { useLocation, useNavigate } from 'react-router-dom';
import useAsync from 'react-use/lib/useAsync';
import {
  Header,
  Page,
} from '@backstage/core-components';
import  EditIcon from '@material-ui/icons/Edit';
import { IApplication } from '../interfaces';
import CachedIcon from '@material-ui/icons/Cached';
import DeleteIcon from '@material-ui/icons/Delete';
import { DetailsComponent } from './DetailsComponent';
import { createAxiosInstance } from '../../../api/Api';
import { useApi, alertApiRef, configApiRef, identityApiRef } from '@backstage/core-plugin-api'; 

type Application = {
  application: IApplication | undefined;
  axiosInstance: any;
}

// makestyles
const useStyles = makeStyles({
  gridItemCard: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 10px)', // for pages without content header
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

const Details = ({ application, axiosInstance }: Application) => {
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const classes = useStyles();

  const Refresh = () => {
    window.location.reload()
  }

  const ApplicationData = {
    id: application?.id ?? '...',
    name: application?.name ?? '...',
    creator: application?.creator ?? '...',
    active: application?.active ?? true,
    createdAt: application?.createdAt ?? '...',
    updatedAt: application?.updatedAt ?? '...'
  }

  const deleteApplicationHandler = async () =>{
    await axiosInstance.delete(`/applications/${application?.id}`)
    navigate('/applications');

  }

  return (
    <Page themeId="tool" >
      <Header title={application?.name}> </Header>
      <TabbedLayout>
        <TabbedLayout.Route path="/" title="OVERVIEW">
          <Card className={classes.gridItemCard} >
            <Grid style={{ marginBottom: "2vw" }} item lg={12} >
              <CardHeader
                title="Details"
                id="overview"
                style={{ padding: "2em" }}
                action={
                  <>
                    <IconButton
                      component={Link}
                      aria-label="Edit"
                      title="Edit Metadata"
                      to={`/applications/edit-application?id=${application?.id}`}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      aria-label="Refresh"
                      title="Schedule entity refresh"
                      onClick={Refresh}
                    >
                      <CachedIcon />
                    </IconButton>

                    <IconButton
                      aria-label="Delete"
                      title="Delete this application"
                       onClick={handleOpenDialog}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <ConfirmDeleteDialog show={showDialog} handleClose={handleCloseDialog} handleSubmit={deleteApplicationHandler}/>

                  </>
                }
              />
              <Grid container direction='column' spacing={6}>
                <DetailsComponent metadata={ApplicationData} back="/applications" />
              </Grid>
            </Grid>
          </Card>
        </TabbedLayout.Route>
      </TabbedLayout>
    </Page>
  );

}


export const ApplicationDetailsComponent = () => {
  const alert = useApi(alertApiRef)
  const config = useApi(configApiRef)
  const identity = useApi(identityApiRef)
  const axiosInstance = createAxiosInstance({config, alert, identity})
  const location = useLocation();
  const id = location.search.split("?id=")[1];

  const { value, loading, error } = useAsync(async (): Promise<IApplication> => {
    const response = await axiosInstance.get(`/applications/${id}`)
    return response.data.application;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return <Details application={value} axiosInstance={axiosInstance} />
}

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
      <DialogTitle id="alert-dialog-title">{"Are you sure to delete this application?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`This action cannot be undone`}        
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button onClick={handleSubmit} style={{color:"#ED4337"}} >
          Delete
        </Button>
      </DialogActions>
  </Dialog>
)}
