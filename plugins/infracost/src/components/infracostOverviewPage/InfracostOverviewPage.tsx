import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { useInfracostOverviewWrapperStyles } from './styles';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotations, useInfracostProjects } from '../../hooks';
import { PluginNotConfigured } from '../shared';
import { truncateMessage } from '../../utils/helpers/truncateMessage';
import { InfracostDashboard } from './infracostDashboard';
import { InfracostOverviewWrapperProps } from './types';


const InfracostOverviewWrapper : React.FC<InfracostOverviewWrapperProps> = ({children}) => {

  const {container,titleBar,content} = useInfracostOverviewWrapperStyles();

  return(
    <Paper className={container}>
    <Box className={titleBar}>
      <Typography variant="h6">Infracost Estimate</Typography>
    </Box>
    <div className={content}>
     {children}
    </div>
  </Paper>
  )
}


export const InfracostOverviewPage = () => {

  const { entity } = useEntity();
  const { projectName } = useEntityAnnotations(entity);
  const {estimate, error,loading } = useInfracostProjects(projectName as string);
  
  if(error) return <PluginNotConfigured message={truncateMessage(error?.stack as string)}/>

  if(loading) return <h1>Loading</h1>  // to do

  return (
      <InfracostOverviewWrapper>
        <InfracostDashboard estimate={estimate!}/>
      </InfracostOverviewWrapper>
  
  );
}
