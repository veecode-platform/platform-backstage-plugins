import React from 'react';
import { Grid, makeStyles, Card, CardHeader, IconButton} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useLocation } from 'react-router-dom';
import useAsync from 'react-use/lib/useAsync';
import { /*Link,*/ Progress, TabbedLayout } from '@backstage/core-components';
import {
  Header,
  Page,
} from '@backstage/core-components';
import { IPartner } from '../interfaces';
// import { DefaultDetailsComponent } from '../../shared';
import { TabedParterDetails } from './TabedPartnerDetails';
//import EditIcon from '@material-ui/icons/Edit';
import CachedIcon from '@material-ui/icons/Cached';
import { createAxiosInstance } from '../../../api/Api';
import { useApi, alertApiRef, configApiRef, identityApiRef } from '@backstage/core-plugin-api';

type PartnerProps = {
  partner: IPartner | undefined;
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


const Details = ({ partner }: PartnerProps) => {

  const classes = useStyles();

  const Refresh = () => {
    window.location.reload()
  }

  const PartnerData = {
    id: partner?.id ?? '...',
    name: partner?.name ?? '...',
    active: partner?.active ?? true,
    email: partner?.email ?? '...',
    createdAt: partner?.createdAt ?? '...',
    updatedAt : partner?.updatedAt ?? '...'
  }

  return (
    <Page themeId="tool" >
    <Header title={partner?.name}> </Header>
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
                  {/*<IconButton
                    component={Link}
                    aria-label="Edit"
                    title="Edit Partner"
                    to={`/partners/edit-partner?id=${partner?.id}`}
                  >
                    <EditIcon />
              </IconButton>*/}

                  <IconButton
                    aria-label="Refresh"
                    title="Schedule entity refresh"
                    onClick={Refresh}
                  >
                    <CachedIcon />
                  </IconButton>
                </>
              }
            />
            <Grid container direction='column' spacing={6}>
              {/* <DefaultDetailsComponent metadata={PartnerData} back="/partners" /> */}
              <TabedParterDetails metadata={PartnerData} back="/partners"/>
            </Grid>

          </Grid>
        </Card>
      </TabbedLayout.Route>
    </TabbedLayout>
  </Page>
  );

}


export const DetailsComponent = () => {
  const alert = useApi(alertApiRef)
  const config = useApi(configApiRef)
  const identity = useApi(identityApiRef)
  const axiosInstance = createAxiosInstance({config, alert, identity})
  const location = useLocation();
  const id = location.search.split("?id=")[1];

  const { value, loading, error } = useAsync(async (): Promise<IPartner> => {
    const {data} = await axiosInstance.get(`/partners/${id}`)
    return data.partners;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return <Details partner={value}/>
  
}