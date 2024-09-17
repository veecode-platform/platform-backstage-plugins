import React from 'react'
import { BoxComponent } from '../../shared'
import { useParams } from 'react-router-dom'
import { useSpecPluginsListStyles } from './styles';
import { Box, Typography } from '@material-ui/core';
import { PluginsTable } from './pluginsTable';


export const SpecPluginsList = () => {
 
  const { specName } = useParams();
  const { root, content,titleBar } = useSpecPluginsListStyles();

  return (
    <BoxComponent title={specName as string} noSelectInstance goBack>
       <div className={root}>
         <Box className={content}>
           <div className={titleBar}>
            <Typography variant="h6">Plugins associated to service</Typography>
           </div>
            <PluginsTable />
         </Box>
       </div>
    </BoxComponent>
  )
}
