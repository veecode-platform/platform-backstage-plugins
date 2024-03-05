/* eslint-disable @backstage/no-undeclared-imports */
import { Box, Chip, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { BoxComponent, EmptyStateComponent } from '../shared';
import { KongServiceManagerContext } from '../context';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotation } from '../../hooks';
import useAsync from 'react-use/lib/useAsync';
import { CopyTextButton } from '@backstage/core-components';
import { LabelField } from './Fields';
import dayjs from 'dayjs';
import { SkeletonComponent } from './SkeletonComponent';


export const useStyles = makeStyles(theme=>({
  listComponent:{
    background: theme.palette.background.default,
    height: '100%',
    minHeight: '65vh',
    margin:'.5rem',

  },
  listItemWrapper:{
    width: '100%',
    '&:nth-child(even)':{
      background: theme.palette.background.paper
    }
  },
  listItem:{
    width: '100%',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'flex-start',
  },
  itemValue: {
    width: '70%',
  }
}));

export const AboutPage = () => {

  const { listComponent, listItemWrapper, listItem, itemValue } = useStyles();
  const { getServiceDetails, serviceDetails } = useContext(KongServiceManagerContext);
  const { entity } = useEntity();
  const { serviceName, kongInstance } = useEntityAnnotation(entity);
  const [ isLoading, setLoading] = useState<boolean>(false);

  const getDetails = async () => {
    await getServiceDetails(serviceName as string,kongInstance as string);
  };

  const { error } = useAsync(async (): Promise<void> => {
    setLoading(true)
    getDetails();
    setTimeout(()=> setLoading(false), 1500);
  }, []);

  if(error) return <EmptyStateComponent/>

  if(isLoading) return (
    <BoxComponent title="Configuration">
      <List className={listComponent}>
        <SkeletonComponent />
      </List>{' '}
    </BoxComponent>
  );

 return (
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
 );
}
