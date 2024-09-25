import React from 'react';
import { Box, Chip, List, ListItem, ListItemText } from '@material-ui/core';
import { BoxComponent, EmptyStateComponent } from '../shared';
import useAsync from 'react-use/lib/useAsync';
import { CopyTextButton } from '@backstage/core-components';
import { LabelField } from './Fields';
import dayjs from 'dayjs';
import { SkeletonComponent } from './SkeletonComponent';
import ErrorBoundary from '../ErrorBoundary/ErrorBondary';
import { useKongServiceManagerContext } from '../../context';
import { useAboutStyles } from './styles';
import { ServiceInfoResponse } from '@veecode-platform/backstage-plugin-kong-service-manager-common';


export const AboutPage = () => {

  const { getServiceDetails } = useKongServiceManagerContext();
  const { listComponent, listItemWrapper, listItem, itemValue } = useAboutStyles();
  
  const { error, loading, value:serviceDetails } = useAsync(async (): Promise<ServiceInfoResponse | null> => {
    const data = await getServiceDetails();
    return data
  }, []);

  if(error) return <EmptyStateComponent/>

  if(loading) return (
    <BoxComponent title="Configuration">
      <List className={listComponent}>
        <SkeletonComponent />
      </List>
    </BoxComponent>
  );

 return (
  <ErrorBoundary>
    <BoxComponent title="Configuration">
      <List className={listComponent}>
        {
          serviceDetails ? (
            <>
              {/* ID */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="ID"/>
                  <ListItemText className={itemValue}>
                  {serviceDetails.id}
                  <CopyTextButton
                    text={serviceDetails.id}
                    tooltipText="Copy ID"
                    tooltipDelay={3000}/>
                </ListItemText>
                </Box>
              </ListItem>
              {/* NAME */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Name"/>
                <ListItemText className={itemValue}>
                  {serviceDetails.name}
                </ListItemText>
                </Box>
              </ListItem>
              {/* ENABLED */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Enabled"/>
                <ListItemText className={itemValue}>
                  {serviceDetails.enabled ? '✅ Enabled' : '❌ Disabled'}
                </ListItemText>
                </Box>
              </ListItem>
              {/* LAST UPDATE */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Last updated"/>
                <ListItemText className={itemValue} title={dayjs.unix(serviceDetails.updated_at).format('MM/DD/YYYY')}>
                    {`Updated ${dayjs().diff(dayjs.unix(serviceDetails.updated_at), 'day')} days ago`}
                </ListItemText>
                </Box>
              </ListItem>
              {/* CREATED */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Created"/>
                <ListItemText className={itemValue} title={`Created ${dayjs().diff(dayjs.unix(serviceDetails.created_at), 'day')} days ago`}>
                  {dayjs.unix(serviceDetails.created_at).format('MM/DD/YYYY')}
                </ListItemText>
                </Box>
              </ListItem>
              {/* PROTOCOL */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Protocol"/>
                <ListItemText className={itemValue}>
                  {serviceDetails.protocol}
                </ListItemText>
                </Box>
              </ListItem>
              {/* HOST */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Host"/>
                <ListItemText className={itemValue}>
                  {serviceDetails.host}
                </ListItemText>
                </Box>
              </ListItem>
              {/* PATH */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Path"/>
                <ListItemText className={itemValue}>
                  {serviceDetails.path}
                </ListItemText>
                </Box>
              </ListItem>
              {/* PORT */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Port"/>
                <ListItemText className={itemValue}>
                  {serviceDetails.port}
                </ListItemText>
                </Box>
              </ListItem>
              {/* TAGS */}
              <ListItem className={listItemWrapper}>
                <Box className={listItem}>
                  <LabelField title="Tags"/>
                <ListItemText className={itemValue}>
                  {serviceDetails.tags.map(t=>(
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
 );
}
