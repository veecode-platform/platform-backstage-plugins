import React from 'react';
import { Box, Chip, List, ListItem, ListItemText } from '@material-ui/core';
import { useAboutRouteStyles } from './styles';
import { CopyTextButton } from '@backstage/core-components';
import dayjs from 'dayjs';
import { AboutRouteProps } from './types';
import ErrorBoundary from '../../ErrorBoundary/ErrorBondary';
import { BoxComponent, EmptyStateComponent,LabelField,SkeletonComponent } from '../../shared';

const AboutRoute : React.FC<AboutRouteProps> = (props) => {

  const { error, loading, routeDetails } = props;
  const { listComponent, listItemWrapper,listItem,itemValue} = useAboutRouteStyles();

  React.useEffect(()=>{
    // eslint-disable-next-line no-console
    console.log("ROTA >>>", routeDetails)
  },[routeDetails])

    if(error) return <EmptyStateComponent/>

    if(loading) return (
      <BoxComponent title="Route Details">
        <List className={listComponent}>
          <SkeletonComponent 
            options={["Id", "Last Update","Created", "Protocols","Hosts", "Paths", "Redirect Status", "Service Id", "Tags"]}
          />
        </List>
      </BoxComponent>
    );
  

  return (
   <ErrorBoundary>
    <BoxComponent title={routeDetails!.name}>
      <List className={listComponent}>
        {
          routeDetails ? (
            <>
              {/* ID */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="ID"/>
                  <ListItemText className={itemValue}>
                  {routeDetails.id}
                  <CopyTextButton
                    text={routeDetails.id}
                    tooltipText="Copy ID"
                    tooltipDelay={3000}/>
                </ListItemText>
                </Box>
              </ListItem>            
              {/* LAST UPDATE */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Last updated"/>
                <ListItemText className={itemValue} title={dayjs.unix(routeDetails.updated_at).format('MM/DD/YYYY')}>
                    {`Updated ${dayjs().diff(dayjs.unix(routeDetails.updated_at), 'day')} days ago`}
                </ListItemText>
                </Box>
              </ListItem>
              {/* CREATED */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Created"/>
                <ListItemText className={itemValue} title={`Created ${dayjs().diff(dayjs.unix(routeDetails.created_at), 'day')} days ago`}>
                  {dayjs.unix(routeDetails.created_at).format('MM/DD/YYYY')}
                </ListItemText>
                </Box>
              </ListItem>
              {/* PROTOCOLS */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Protocols"/>
                <ListItemText className={itemValue}>
                  {
                    routeDetails.protocols.map(protocol => (
                      <p key={protocol}>{protocol}</p>
                    ))
                  }
                </ListItemText>
                </Box>
              </ListItem>
              {/* HOSTS */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Hosts"/>
                <ListItemText className={itemValue}>
                <ListItemText className={itemValue}>
                  {
                    routeDetails.hosts.map(host => (
                      <p key={host}>{host}</p>
                    ))
                  }
                </ListItemText>
                </ListItemText>
                </Box>
              </ListItem>
              {/* PATHS */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Paths"/>
                <ListItemText className={itemValue}>
                  {
                    routeDetails.paths.map(path => (
                      <p key={path}>{path}</p>
                    ))
                  }
                </ListItemText>
                </Box>
              </ListItem>
              {/* REDIRECT STATUS */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Redirect Status Code"/>
                <ListItemText className={itemValue}>
                  {routeDetails.https_redirect_status_code}
                </ListItemText>
                </Box>
              </ListItem>
              {/* SERVICE ID */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Service Id"/>
                <ListItemText className={itemValue}>
                  {routeDetails.service_id}
                </ListItemText>
                </Box>
              </ListItem>
              {/* TAGS */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Tags"/>
                <ListItemText className={itemValue}>
                  {routeDetails.tags.map(t=>(
                    <Chip label={t} key={t}/>
                  ))}
                </ListItemText>
                </Box>
              </ListItem>
            </>
              ) : (
                <ListItem>
                  <ListItemText>No records to display</ListItemText>
                </ListItem>
              )
          }
      </List>
    </BoxComponent>
   </ErrorBoundary>
  )
}

export default AboutRoute
