/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @backstage/no-undeclared-imports */
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Checkbox, Drawer, FormControl, FormControlLabel, IconButton, TextField, Typography } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { KongServiceManagerContext } from '../../context';
import { CreatePlugin } from '../../../utils/types';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotation } from '../../../hooks';
import { EmptyStateComponent } from '../../shared';
import { Progress } from '@backstage/core-components';
// import { SubFields } from './FieldsCustom';
import { useStyles } from './styles';
import { IncrementalFields } from './FieldsCustom';



export const DrawerComponent = () => {

  const {paper, header,titleBar,pluginIcon, icon, content,form, input,checkbox, secondaryAction} = useStyles();
  const { entity } = useEntity();
  const { serviceName, kongInstance } = useEntityAnnotation(entity);
  const { handleToggleDrawer, openDrawer, enablePlugin, editPlugin, getPluginFields ,selectedPlugin} = useContext(KongServiceManagerContext);
  const [fieldsComponents, setFieldsComponents ] = useState<any[]|[]>([]);
  const [ isLoading, setLoading] = useState<boolean>(false);

  const handleEnablePlugin = async ( config: CreatePlugin ) => {  // to do
    await enablePlugin(serviceName as string, config, kongInstance as string);
    handleToggleDrawer();
  };

  const handleEditAction = async (config: CreatePlugin) => { // to do
    await editPlugin(serviceName as string, config, kongInstance as string);
    handleToggleDrawer();
  }

  const handlePluginFields = async (pluginName: string, proxyPath: string) => {
    const fields = await getPluginFields(pluginName, proxyPath);
    // eslint-disable-next-line no-console
    console.log(fields)
    if(fields) setFieldsComponents(fields);
  };

  useEffect(()=>{
   if(selectedPlugin) handlePluginFields(selectedPlugin.slug as string, kongInstance as string);
   setLoading(true);
   setTimeout(()=>{
    setLoading(false)
   },1000)
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
                          return <TextField id={field.name} required={field.required} key={field.name} label={field.name} variant="outlined" className={input} defaultValue={field.defaultValue ?? ''}/>;
                        case 'number':
                            return <TextField id={field.name} required={field.required} key={field.name} label={field.name} variant="outlined" className={input} defaultValue={field.defaultValue ?? ''}/>;
                        case 'boolean':
                          return <FormControlLabel value="end" key={field.name} labelPlacement="end" label={field.name} control={<Checkbox color="primary" required={field.required} defaultChecked={field.defaultValue}/>} className={checkbox}/>;
                        case 'array':
                          if(field.arrayType === 'string') return <IncrementalFields/>;
                          return <h2>Type Record</h2>;
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
              onClick={() => handleEditAction}
            >
              Save Changes
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
