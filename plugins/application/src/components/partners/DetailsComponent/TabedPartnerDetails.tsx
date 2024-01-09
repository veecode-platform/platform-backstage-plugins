import React, { PropsWithChildren, /*useState*/ } from 'react';
import { Grid, Button } from '@material-ui/core';
import {
  CardTab,
  StructuredMetadataTable,
  TabbedCard,
} from '@backstage/core-components';
import { Link as RouterLink } from 'react-router-dom';
import { PartnerServiceListTable } from './PartnerServicesTable';
import { PartnerApplicationListTable } from './PartnerApplicationListTable';

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
    metadata: any;
    back: string;
    // partners: string | any;
    remove?: string;
};

export const TabedParterDetails = ({
  metadata,
  // partners,
  back,
  remove,
}: Props) => {
  /* const [show, setShow] = useState<boolean>(false);
  const [status] = useState<string>('');
  const [messageStatus] = useState<string>('');

  const handleClose = (reason: string) => {
    if (reason === 'clickaway') return;
    setShow(false);
  };*/

  return (
    <Wrapper>
      <div style={cardContentStyle}>
        <Wrapper>
          <TabbedCard>
            <CardTab label="About">
              <StructuredMetadataTable
               metadata={metadata}
               dense={false}
                />
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{ padding: '3em 0'}}
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
                <PartnerServiceListTable partnerId={metadata.id} />
            </CardTab>
            <CardTab label="Applications">
                <PartnerApplicationListTable partnerId={metadata.name}/>
            </CardTab>
          </TabbedCard>
        </Wrapper>
      </div>
    </Wrapper>
  );
};
