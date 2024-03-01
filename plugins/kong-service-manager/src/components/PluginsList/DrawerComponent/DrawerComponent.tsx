/* eslint-disable @backstage/no-undeclared-imports */
import React, { useContext, useEffect } from 'react';
import { Button, Drawer, IconButton, Typography, makeStyles } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { KongServiceManagerContext } from '../../context';
import { CreatePlugin } from '../../../utils/types';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotation } from '../../../hooks';


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
    icon: {
      fontSize: 20,
    },
    content: {
      height: '80%',
      backgroundColor: '#EEEEEE',
    },
    secondaryAction: {
      marginLeft: theme.spacing(2.5),
    },
  }));


export const DrawerComponent = () => {

  const {paper, header, icon, content, secondaryAction} = useStyles();
  const { entity } = useEntity();
  const { serviceName, kongInstance } = useEntityAnnotation(entity);
  const { handleToggleDrawer, openDrawer, enablePlugin, disablePlugin, getPluginFields ,selectedPlugin} = useContext(KongServiceManagerContext);

  const handleEnablePlugin = async ( serviceIdOrName: string, config: CreatePlugin, proxyPath: string ) => {
    await enablePlugin(serviceIdOrName, config, proxyPath);
  };

  const handleDisablePlugin = async ( serviceIdOrName: string, pluginId: string, proxyPath: string ) => {
    await disablePlugin(serviceIdOrName, pluginId, proxyPath);
  };

  const handlePluginFields = async (pluginName: string, proxyPath: string) => {
    const fields = await getPluginFields(pluginName, proxyPath);
    // eslint-disable-next-line no-console
    console.log(fields)
    return fields;
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
          <Typography variant="h5">{selectedPlugin?.name}</Typography>
          <IconButton
            key="dismiss"
            title="Close the drawer"
            onClick={handleToggleDrawer}
            color="inherit"
          >
            <Close className={icon} />
          </IconButton>
        </div>
        <div className={content} />
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleToggleDrawer}
          >
            Primary Action
          </Button>
          <Button
            className={secondaryAction}
            variant="outlined"
            color="primary"
            onClick={handleToggleDrawer}
          >
            Secondary Action
          </Button>
        </div>
      </Drawer>
  );
};
