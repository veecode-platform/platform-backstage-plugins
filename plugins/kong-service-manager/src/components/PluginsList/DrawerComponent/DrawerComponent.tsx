/* eslint-disable @backstage/no-undeclared-imports */
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Drawer, IconButton, Typography, makeStyles } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { KongServiceManagerContext } from '../../context';
import { CreatePlugin } from '../../../utils/types';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotation } from '../../../hooks';
import { EmptyStateComponent } from '../../shared';


const useStyles = makeStyles(theme => ({
    paper: {
      width: '50%',
      justifyContent: 'space-between',
      padding: theme.spacing(2.5),
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleBar:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '2rem'
    },
    pluginIcon:{
      width: '50px',
      borderRadius: '3px'
    },
    icon: {
      fontSize: 20
    },
    content: {
      height: '85%',
      backgroundColor: theme.palette.background.default,
      overflow: 'auto',
      padding: theme.spacing(2),
    },
    secondaryAction: {
      marginLeft: theme.spacing(2.5),
    },
  }));


export const DrawerComponent = () => {

  const {paper, header,titleBar,pluginIcon, icon, content, secondaryAction} = useStyles();
  const { entity } = useEntity();
  const { serviceName, kongInstance } = useEntityAnnotation(entity);
  const { handleToggleDrawer, openDrawer, enablePlugin, disablePlugin, getPluginFields ,selectedPlugin} = useContext(KongServiceManagerContext);
  const [fieldsComponents, setFieldsComponents ] = useState<any[]|[]>([])

  const handleEnablePlugin = async ( config: CreatePlugin ) => {  // to do
    await enablePlugin(serviceName as string, config, kongInstance as string);
  };

  const handleDisablePlugin = async ( ) => {
    if(selectedPlugin) await disablePlugin(serviceName as string, selectedPlugin.slug as string, kongInstance as string);
  };

  const handlePluginFields = async (pluginName: string, proxyPath: string) => {
    const fields = await getPluginFields(pluginName, proxyPath);
    if(fields) setFieldsComponents(fields!);
  };

  useEffect(()=>{
   if(selectedPlugin) handlePluginFields(selectedPlugin.slug as string, kongInstance as string)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedPlugin])
    

  return (
    <Drawer
      classes={{
        paper: paper,
      }}
      anchor="right"
      open={openDrawer}
      onClose={handleToggleDrawer}
    >
      <div className={header}>
        <div className={titleBar}>
          <img src={selectedPlugin?.image} alt={selectedPlugin?.description} className={pluginIcon}/>
          <Typography variant="h5">
            {selectedPlugin?.name} Plugin
          </Typography>
        </div>
        <IconButton
          key="dismiss"
          title="Close the drawer"
          onClick={handleToggleDrawer}
          color="inherit"
        >
          <Close className={icon} />
        </IconButton>
      </div>
      <Box className={content}>
        {fieldsComponents.length >=1 ? <h1>Hello world</h1>:<EmptyStateComponent/>}
      </Box>
      <div>
        <>
          {selectedPlugin && selectedPlugin.associated ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDisablePlugin}
            >
              Remove Plugin
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEnablePlugin}
            >
              Install Plugin
            </Button>
          )}
        </>
        <Button
          className={secondaryAction}
          variant="outlined"
          color="primary"
          onClick={handleToggleDrawer}
        >
          Cancel
        </Button>
      </div>
    </Drawer>
  );
};
