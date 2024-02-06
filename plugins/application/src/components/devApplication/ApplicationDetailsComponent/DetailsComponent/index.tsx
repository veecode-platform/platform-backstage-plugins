import React, { PropsWithChildren, useState} from 'react';
import { Grid, Button } from '@material-ui/core';
import {
  CardTab,
  StructuredMetadataTable,
  TabbedCard,
} from '@backstage/core-components';
import { Link as RouterLink } from 'react-router-dom';
import { Credentials } from '../credentials';
import { CredentialTypeEnum } from '../credentials/utils/enums';
import { FetchServicesFromApplicationListComponent } from '../services';
import { createAxiosInstance } from '../../../../api/Api';
import { useApi, alertApiRef, configApiRef, identityApiRef } from '@backstage/core-plugin-api'; 

const cardContentStyle = { heightX: 'auto', width: '100%', marginLeft: '2%' };

const Wrapper = ({ children }: PropsWithChildren<{}>) => (
  <Grid
    container
    spacing={4}
    style={{
      width: '100%',
      marginTop: '.5em',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <Grid item lg={12}>
      {children}
    </Grid>
  </Grid>
);

type Props = {
  metadata: any[] | any;
  back: string;
  remove?: string;
};

export default {
  title: 'Layout/Tabbed Card',
  component: TabbedCard,
  decorators: [
    (storyFn: () => JSX.Element) => (
      <Grid container spacing={4}>
        <Grid item>{storyFn()}</Grid>
      </Grid>
    ),
  ],
};

export const DetailsComponent = ({ metadata, back, remove }: Props) => {
  const alert = useApi(alertApiRef)
  const config = useApi(configApiRef)
  const identity = useApi(identityApiRef)
  const axiosInstance = createAxiosInstance({config, alert, identity})
  const applicationId = metadata ? metadata.id : ''
  const [refresh, setRefresh] = useState(false)

  // generate Credentials
  const generateCredential = async (ID: string, type: string) => { 
    const response = await axiosInstance.post(`/applications/${ID}/credentials`, {type})
     if(response) setRefresh(!refresh)

  };

  return (
    <Wrapper>
      <div style={cardContentStyle}>
        <Wrapper>
          <TabbedCard>
            <CardTab label="About">
              <StructuredMetadataTable metadata={metadata} dense={false} />
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{ padding: '3em 0' }}
              >
                <Grid item>
                  <Button
                    component={RouterLink}
                    to={back}
                    variant="contained"
                    size="large"
                  >
                    Cancel
                  </Button>
                </Grid>
                {remove && (
                  <Grid item>
                    <Button
                      component={RouterLink}
                      to={remove}
                      variant="contained"
                      size="large"
                    >
                      Remove
                    </Button>
                  </Grid>
                )}
              </Grid>
            </CardTab>
            <CardTab label="Services">
              <FetchServicesFromApplicationListComponent applicationId={applicationId}/>            
            </CardTab>
            <CardTab label="Credentials">
              <Credentials idApplication={applicationId} refresh={refresh} setRefresh={setRefresh} />
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{ padding: '3em 0' }}
              >
                <Grid item>
                  <Button
                    onClick={() => generateCredential(applicationId, CredentialTypeEnum.oAuth2)}
                    style={{ margin: "5px", background: "#20a082", color: "#fff" }} variant='contained' size='large'
                  >
                    New Credential OAuth2
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => generateCredential(applicationId, CredentialTypeEnum.keyAuth)}
                    style={{ margin: "5px", background: "#20a082", color: "#fff" }} variant='contained' size='large'
                  >
                    New Credential Key Auth
                  </Button>
                </Grid>
              </Grid>
            </CardTab>
          </TabbedCard>
        </Wrapper>
      </div>
    </Wrapper>
  );
};
