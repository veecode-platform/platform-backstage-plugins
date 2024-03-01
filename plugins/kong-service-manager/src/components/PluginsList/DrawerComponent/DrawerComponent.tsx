/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @backstage/no-undeclared-imports */
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Checkbox, Drawer, FormControl, FormControlLabel, IconButton, TextField, Typography, makeStyles } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { KongServiceManagerContext } from '../../context';
import { CreatePlugin } from '../../../utils/types';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotation } from '../../../hooks';
import { EmptyStateComponent } from '../../shared';
import { Progress } from '@backstage/core-components';


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
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      padding: theme.spacing(2),
    },
    form:{
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    input:{
      width: '100%',
      margin: '.5rem 0'
    },
    checkbox:{
      width: '100%',
      margin: '.5rem'
    },
    secondaryAction: {
      marginLeft: theme.spacing(2.5),
    },
  }));


export const DrawerComponent = () => {

  const {paper, header,titleBar,pluginIcon, icon, content,form, input,checkbox, secondaryAction} = useStyles();
  const { entity } = useEntity();
  const { serviceName, kongInstance } = useEntityAnnotation(entity);
  const { handleToggleDrawer, openDrawer, enablePlugin, disablePlugin, getPluginFields ,selectedPlugin} = useContext(KongServiceManagerContext);
  const [fieldsComponents, setFieldsComponents ] = useState<any[]|[]>([]);
  const [ isLoading, setLoading] = useState<boolean>(false);

  const handleEnablePlugin = async ( config: CreatePlugin ) => {  // to do
    await enablePlugin(serviceName as string, config, kongInstance as string);
  };

  const handleDisablePlugin = async ( ) => {
    if(selectedPlugin) await disablePlugin(serviceName as string, selectedPlugin.slug as string, kongInstance as string);
  };

  const handlePluginFields = async (pluginName: string, proxyPath: string) => {
    const fields = await getPluginFields(pluginName, proxyPath);
    // eslint-disable-next-line no-console
    console.log(fields)
    if(fields) setFieldsComponents(fields!);
  };

  useEffect(()=>{
   if(selectedPlugin) handlePluginFields(selectedPlugin.slug as string, kongInstance as string);
   setLoading(true);
   setTimeout(()=>{
    setLoading(false)
   },1500)
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
        {
          isLoading ? <Progress/> : (
            <>
            {
              fieldsComponents.length >=1 ? (  
                <FormControl component="form" noValidate autoComplete="off" className={form}>
                  <>
                    {fieldsComponents.map(field => {
                      switch (field.type) {
                        case 'string':
                          return (<TextField id={field.name} required={field.required} key={field.name} label={field.name} variant="outlined" className={input} defaultValue={field.defaultValue ?? ''}/>)
                        case 'number':
                            return (<TextField id={field.name} required={field.required} key={field.name} label={field.name} variant="outlined" className={input} defaultValue={field.defaultValue ?? ''}/>)
                        case 'boolean':
                          return (<FormControlLabel value="end" key={field.name} labelPlacement="end" label={field.name} control={<Checkbox color="primary" required={field.required} />} className={checkbox}/>)
                        default:
                          return <></>;
                      }
                    })}
                  </>
                </FormControl>
            
                )
                :
                <EmptyStateComponent/>
            }
            </>
          )
        }
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
