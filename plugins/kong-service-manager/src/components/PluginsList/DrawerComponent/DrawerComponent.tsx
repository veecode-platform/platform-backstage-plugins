import React from 'react';
import { Box, Button, Checkbox, CircularProgress, Drawer, FormControl, FormControlLabel, IconButton, TextField, Typography } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { EmptyStateComponent } from '../../shared';
import { Progress } from '@backstage/core-components';
import { useDrawerStyles } from './styles';
import { IncrementalFields, RecordFields } from './FieldsCustom';
import { useKongServiceManagerContext } from '../../../context';
import { addFields, FieldsReducer, initialFieldsState } from './state';
import { PluginFieldsResponse } from '@veecode-platform/backstage-plugin-kong-service-manager-common';


export const DrawerComponent = () => {

  const [ isLoading, setLoading] = React.useState<boolean>(false);
  const [processingData, setProcessingData] = React.useState<boolean>(false);
  const [ fieldsState, fieldsDispatch ] = React.useReducer(FieldsReducer, initialFieldsState);
  const {paper, header,titleBar,pluginIcon, icon, content,form, input,checkbox, secondaryAction, spinner} = useDrawerStyles();
  const { handleToggleDrawer, openDrawer ,selectedPluginState, allAssociatedPluginsState, allAssociatedRoutePluginsState, setConfigState, configState, enablePlugin, isRoute, enablePluginToRoute, editPlugin, editPluginFromRoute, getPluginFields } = useKongServiceManagerContext();

  const handleChangeInput = (key: string, value: string | boolean | string[] | number) => {
    if(value!==""){
      setConfigState((prevConfigState : any) => {
        const updatedConfigState = {
          ...prevConfigState,
          [key]: value,
        };
        return updatedConfigState;
      });
    }
  };


  const handleEnablePlugin = async () => {
    if (selectedPluginState && allAssociatedPluginsState && configState) {
      setProcessingData(true);
      const config = {
        config: configState,
        name: selectedPluginState.slug
      } 
      if(isRoute) await enablePluginToRoute(config);
      else await enablePlugin(config);
      setProcessingData(false)  
      handleToggleDrawer();
    }
  };

  const handleEditAction = async () => { 
    if (selectedPluginState && selectedPluginState.id && configState) {
      setProcessingData(true);
      const id = selectedPluginState.id;
      const config = {
        config: configState,
        name: selectedPluginState.slug
      } 
      if(isRoute) await editPluginFromRoute(id,config)
      else await editPlugin(id,config);
      setProcessingData(false)  
      handleToggleDrawer();
    }
  }

  const handlePluginFields = async (pluginName: string) => {
    const fields = await getPluginFields(pluginName);
    
    if (fields) {
      let fieldsData: PluginFieldsResponse[] = [];


      if(isRoute){
        if(selectedPluginState?.associated && allAssociatedRoutePluginsState) {
          allAssociatedRoutePluginsState.forEach((plugin) => {
            if (plugin.name === selectedPluginState.slug) {
              const config = plugin.config;
              const updateFields: PluginFieldsResponse[] = [];          
              fields.forEach((field) => {    
                if (config[field.name] !== null) {
                  updateFields.push({
                    ...field,
                    defaultValue: config[field.name],
                  });
                }
              });
              fieldsData = fieldsData.concat(updateFields);
            }
          });
        }
      }

      if (selectedPluginState?.associated && allAssociatedPluginsState) {
        allAssociatedPluginsState.forEach((plugin) => {
          if (plugin.name === selectedPluginState.slug) {
            const config = plugin.config;
            const updateFields: PluginFieldsResponse[] = [];          
            fields.forEach((field) => {    
              if (config[field.name] !== null) {
                updateFields.push({
                  ...field,
                  defaultValue: config[field.name],
                });
              }
            });
            fieldsData = fieldsData.concat(updateFields);
          }
        });
      }
     
      // else fieldsData = fields;
      
      let updatedConfigState = { ...configState };
      
      fieldsData.forEach((f) => {
        if (f.defaultValue !== undefined) {
          updatedConfigState = {
            ...updatedConfigState,
            [f.name]: f.defaultValue,
          };
        }
      });
  
      setConfigState(updatedConfigState);
      fieldsDispatch(addFields(fieldsData));
    }
  };

  React.useEffect(()=>{
   if(selectedPluginState) {
    handlePluginFields(selectedPluginState.slug as string);
  }
   setLoading(true);
   setTimeout(()=>{
    setLoading(false)
   },1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedPluginState]);

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
          <img
            src={selectedPluginState?.image}
            alt={selectedPluginState?.description}
            className={pluginIcon}
          />
          <Typography variant="h5">{selectedPluginState?.name} Plugin</Typography>
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
        {isLoading ? (
          <Progress />
        ) : (
          <>
            {fieldsState.length >= 1 ? (
              <FormControl
                component="form"
                noValidate
                autoComplete="off"
                className={form}
              >
                  {fieldsState.map((field,index) => {
                    switch (field.type) {
                      case 'string':
                        return (
                          <TextField
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            required={field.required}
                            key={index}
                            label={`config.${field.name}`}
                            variant="outlined"
                            className={input}
                            defaultValue={field.defaultValue}
                            onChange={event =>
                              handleChangeInput(
                                field.name,
                                event?.target.value as string,
                              )
                            }
                          />
                        );
                      case 'number':
                        return (
                          <TextField
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            required={field.required}
                            key={index}
                            label={`config.${field.name}`}
                            variant="outlined"
                            className={input}
                            defaultValue={field.defaultValue}
                            onChange={event =>
                              handleChangeInput(
                                field.name,
                                Number(event?.target.value),
                              )
                            }
                          />
                        );
                      case 'boolean':
                        return (
                          <FormControlLabel
                            key={index}
                            labelPlacement="end"
                            label={`config.${field.name}`}
                            control={
                              <Checkbox
                                color="primary"
                                required={field.required}
                                name={field.name}
                                defaultChecked={field.defaultValue as boolean}
                                onChange={e =>
                                  handleChangeInput(
                                    field.name,
                                    e.target.checked as boolean,
                                  )
                                }
                              />
                            }
                            className={checkbox}
                          />
                        );
                      case 'array':
                        if (field.arrayType === 'string')
                          return (
                            <IncrementalFields
                              key={index}
                              name={field.name}
                              required={field.required}
                              items={
                                (field.defaultValue
                                  ? field.defaultValue
                                  : field.defaultValues)??[]
                              }
                              setState={setConfigState}
                            />
                          );
                        if (field.arrayType === 'record')
                          return (
                            <RecordFields
                              inputName={field.name}
                              required={field.required}
                              defaultValues={field.defaultValue}
                              recordFields={field.recordFields}
                              key={index}
                              setConfig={setConfigState}
                            />
                          );
                        return <></>;
                      default:
                        return <></>;
                    }
                  })}
              </FormControl>
            ) : <EmptyStateComponent /> }
          </>
        )}
      </Box>
      <div>
        <>
          {selectedPluginState && selectedPluginState.associated ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditAction}
              disabled={processingData}
            >
              {processingData ? (
                <>
                  Saving...
                  <CircularProgress className={spinner} size={20} />
                </>
              ) : (
                <>Save Changes</>
              )}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEnablePlugin}
              disabled={processingData}
            >
              {processingData ? (
                <>
                  Installing...
                  <CircularProgress className={spinner} size={20} />
                </>
              ) : (
                <>Install Plugin</>
              )}
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
