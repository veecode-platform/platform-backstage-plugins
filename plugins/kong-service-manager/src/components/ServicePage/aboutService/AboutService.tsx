import React from 'react';
import { Box, Chip, List, ListItem, ListItemText } from '@material-ui/core';
import { useAboutServiceStyles } from './styles';
import { CopyTextButton } from '@backstage/core-components';
import dayjs from 'dayjs';
import { AboutServiceProps } from './types';
import ErrorBoundary from '../../ErrorBoundary/ErrorBondary';
import { BoxComponent, EmptyStateComponent,SkeletonComponent,LabelField } from '../../shared';

const AboutService : React.FC<AboutServiceProps> = (props) => {

  const { error, loading, serviceDetails } = props;
  const { listComponent, listItemWrapper,listItem,itemValue} = useAboutServiceStyles();

    if(error) return <EmptyStateComponent/>

    if(loading) return (
      <BoxComponent title="Service Details">
        <List className={listComponent}>
          <SkeletonComponent
            options={["id", "Enabled", "Last Updated", "Created", "Protocol", "Host", "Path", "Port", "Tags"]}
           />
        </List>
      </BoxComponent>
    );
  

  return (
    <ErrorBoundary>
    <BoxComponent title={serviceDetails!.name}>
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
  )
}

export default AboutService
