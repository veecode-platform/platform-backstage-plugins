import React from 'react';
import { Box, Button, Checkbox, CircularProgress, Drawer, FormControl, FormControlLabel, IconButton, TextField, Typography } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { PluginFieldsResponse } from '../../../utils/types';
import { EmptyStateComponent } from '../../shared';
import { Progress } from '@backstage/core-components';
import { useDrawerStyles } from './styles';
import { IncrementalFields, RecordFields } from './FieldsCustom';
import { useKongServiceManagerContext } from '../../../context';
import { addFields, FieldsReducer, initialFieldsState } from './state';



export const DrawerComponent = () => {

  const [ isLoading, setLoading] = React.useState<boolean>(false);
  const [processingData, setProcessingData] = React.useState<boolean>(false);
  const [ fieldsState, fieldsDispatch ] = React.useReducer(FieldsReducer, initialFieldsState);
  const {paper, header,titleBar,pluginIcon, icon, content,form, input,checkbox, secondaryAction, spinner} = useDrawerStyles();
  const { handleToggleDrawer, openDrawer, enablePlugin, editPlugin, getPluginFields ,selectedPlugin, allAssociatedPlugins, setConfigState, configState} = useKongServiceManagerContext();

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
    if (selectedPlugin && allAssociatedPlugins && configState) {
      setProcessingData(true);
      const config = {
        config: configState,
        name: selectedPlugin.slug
      } 
      await enablePlugin(config);
      setProcessingData(false)  
      handleToggleDrawer();
    }
  };

  const handleEditAction = async () => { 
    if (selectedPlugin && selectedPlugin.id && allAssociatedPlugins && configState) {
      setProcessingData(true);
      const id = selectedPlugin.id;
      const config = {
        config: configState,
        name: selectedPlugin.slug
      } 
      await editPlugin(id,config);
      setProcessingData(false)  
      handleToggleDrawer();
    }
  }

  const handlePluginFields = async (pluginName: string) => {
    const fields = await getPluginFields(pluginName);
    
    if (fields) {
      let fieldsData: PluginFieldsResponse[] = [];
    
      if (selectedPlugin?.associated && allAssociatedPlugins) {
        allAssociatedPlugins.forEach((plugin) => {
          if (plugin.name === selectedPlugin.slug) {
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
      else fieldsData = fields;
      
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
   if(selectedPlugin) {
    handlePluginFields(selectedPlugin.slug as string);
  }
   setLoading(true);
   setTimeout(()=>{
    setLoading(false)
   },1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedPlugin]);

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
            src={selectedPlugin?.image}
            alt={selectedPlugin?.description}
            className={pluginIcon}
          />
          <Typography variant="h5">{selectedPlugin?.name} Plugin</Typography>
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
          {selectedPlugin && selectedPlugin.associated ? (
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
