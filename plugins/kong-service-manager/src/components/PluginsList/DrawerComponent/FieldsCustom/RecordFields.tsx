/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useStyles } from './styles';
import { Accordion, AccordionActions, Box, Button, FormControl, FormLabel, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { IncrementalFields } from './IncrementalFields';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import { transformToSelectOptions } from '../../../../utils/common/transformToSelectOptions';
import {SelectComponent } from '../../../shared'

interface RecordFieldsProps {
    name: string,
    required: boolean,
    defaultValues: any[]|[],
    recordFields: any[]|[],
    setConfig: React.Dispatch<any>
  }
interface recordFieldsProps {
  name: string[],
  stat_type: string[],
  tags?: string[],
  sample_rate?: number,
  consumer_identifier: string[]
}

interface MetricsStateType {
  metrics: any[]
}
  
  export const RecordFields = ({name, defaultValues,recordFields,setConfig}:RecordFieldsProps) => {
    const { box, newField,labelAndField, heading, input, addField,defaultField,field,accordion,accordionSummary,accordionContent, combobox, label,tags, buttonsGroup} = useStyles();
    const [inputFields, setInputFields] = useState<any[]>([]);
    const [recordFieldsState, setRecordFieldsState] = useState<recordFieldsProps|null>(null);
    const [metricsState, setMetricsState] = useState<MetricsStateType|null>(null);
    const [newMetric, setNewMetric] = useState<any>({});
    const [tagsState, setTagsState] = useState<string[]>([]);
 
    const handleAddFields = () => setInputFields([...inputFields, {
      name: "New Metric",
      stat_type: "none",
      sample_rate: 0,
      custom_identifier: "test"
    }]);
  
    const handleRemoveFields = (index: number) => {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
      setNewMetric({})
    };

    const submitDataToConfig = (index: number) => {
      if (newMetric) {
        setMetricsState((prevMetricsState) => {
          const updatedMetrics = { metrics: [...(prevMetricsState?.metrics || [])] };
          updatedMetrics.metrics.push(newMetric);
          handleRemoveFields(index);
          return updatedMetrics;
        });
        setNewMetric({});
      }
    };

    const handleAddMetric = (key: string, value: string | number | string[]) => {
      if (value !== "") {
        setNewMetric((prevMetric: any) => ({
          ...prevMetric,
          [key]: value,
        }));
      }
    };

    const handleEditMetrics = (key: string, value: string | number | string[], index: number) => {
      if (metricsState && metricsState.metrics[index]) {
        const updatedMetrics = [...metricsState.metrics];
        updatedMetrics[index] = { ...updatedMetrics[index], [key]: value };
  
        setMetricsState((prevMetricsState) => ({
          ...prevMetricsState,
          metrics: updatedMetrics,
        }));
      }
    };

    const handleDeleteMetrics = (index:number) => {
      if(metricsState){
        setMetricsState((prevMetricsState) => {
          const updatedMetrics = prevMetricsState!.metrics.filter(
            (_, i) => i !== index
          );
          return {
            ...prevMetricsState,
            metrics: updatedMetrics,
          };
        });
      }
     
    }

    useEffect(()=>{
      if(recordFields){
        recordFields.map(r => {
          switch (r.name) {
            case 'name':
              setRecordFieldsState((prevConfigState : any) => {
                const updatedState = {
                  ...prevConfigState,
                  [r.name]: r.arrayOptions,
                };
                return updatedState;
               });
              break;
            case 'stat_type':
              setRecordFieldsState((prevConfigState : any) => {
                const updatedState = {
                  ...prevConfigState,
                  [r.name]: r.arrayOptions,
                };
                return updatedState;
               });
              break;
            case 'consumer_identifier':
              setRecordFieldsState((prevConfigState : any) => {
                const updatedState = {
                  ...prevConfigState,
                  [r.name]: r.arrayOptions,
                };
                return updatedState;
               });
              break;
            default:
              return ;
          }
         
        })
      }
    },[recordFields]);

    useEffect(()=>{
      setMetricsState(null);
      if(defaultValues){
        const metrics : MetricsStateType = { metrics: []};
        metrics.metrics.push(...defaultValues);
        setMetricsState(metrics);
      }
    },[defaultValues]);

    useEffect(()=>{
     if(metricsState){
      setConfig((prevConfigState : any) => {
        const updatedConfigState = {
          ...prevConfigState,
          metrics: metricsState.metrics,
        };
        return updatedConfigState;
      });
     }
    },[metricsState]);
 

    return (
      <Box className={box}>
        <FormLabel className={label}>config.{name}</FormLabel>

        {metricsState &&
          metricsState.metrics.map((item, index) => (
            <div key={index} className={defaultField}>
              <Accordion className={accordion}>
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className={accordionSummary}
                >
                  <Typography className={heading}>
                    {(metricsState &&
                      metricsState.metrics[index] &&
                      metricsState.metrics[index].name) ??
                      item.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={accordionContent}>
                  {item.name && (
                      <div className={combobox}>
                        <SelectComponent
                          onChange={event => { handleEditMetrics('name', event as string, index as number)}}
                          label="Name"
                          selected={
                            (metricsState &&
                              metricsState.metrics[index] &&
                              metricsState.metrics[index].name) ??
                            item.name }
                          items={
                            recordFieldsState
                              ? transformToSelectOptions(recordFieldsState.name)
                              : []
                          }
                        />
                      </div>
                    )}
                  {item.stat_type && (
                      <div className={combobox}>
                      <SelectComponent
                        onChange={event => { handleEditMetrics('stat_type', event as string, index as number)}}
                        label="Stat Type"
                        selected={
                          (metricsState &&
                            metricsState.metrics[index] &&
                            metricsState.metrics[index].stat_type) ??
                            item.stat_type }
                        items={
                          recordFieldsState
                            ? transformToSelectOptions(recordFieldsState.stat_type)
                            : []
                        }
                      />
                      </div>
                    )}

                  {item.sample_rate && (
                    <FormControl className={combobox}>
                      <FormLabel
                        id={`textField-label-${item.sample_rate}`}
                        className={label}
                      >
                        Sample Rate
                      </FormLabel>
                      <TextField
                        name={item.name}
                        label=""
                        variant="outlined"
                        value={
                          (metricsState &&
                            metricsState.metrics[index] &&
                            metricsState.metrics[index].sample_rate) ??
                          item.sample_rate
                        }
                        onChange={event => {
                          handleEditMetrics(
                            'sample_rate',
                            event.target.value as string,
                            index as number,
                          );
                        }}
                        className={input}
                        required={item.required}
                        type="number"
                        id={`textField-label-${item.sample_rate}`}
                      />
                    </FormControl>
                  )}

                  {item.consumer_identifier && (
                    <div className={combobox}>
                      <SelectComponent
                        onChange={event => { handleEditMetrics('consumer_identifier', event as string, index as number)}}
                        label="Consumer Identifier"
                        selected={
                          (metricsState &&
                            metricsState.metrics[index] &&
                            metricsState.metrics[index].consumer_identifier) ??
                            item.consumer_identifier }
                        items={
                          recordFieldsState
                            ? transformToSelectOptions(recordFieldsState.consumer_identifier)
                            : []
                        }
                      />
                    </div>
                  )}

                  {item.tags && (
                    <div className={tags}>
                      <IncrementalFields
                        required={false}
                        name="tags"
                        isMetrics
                        items={item.tags}
                        id={index}
                        state={tagsState}
                        handleChange={handleEditMetrics}
                        setState={setTagsState}
                      />
                    </div>
                  )}
                </AccordionDetails>
                <AccordionActions>
                  <Button
                    variant="outlined"
                    color="secondary"
                    title="Delete Metric"
                    onClick={() => handleDeleteMetrics(index)}
                  >
                    Delete Metric
                  </Button>
                </AccordionActions>
              </Accordion>
            </div>
          ))}

        {inputFields.map((inputField, index) => (
          <div key={index} className={newField}>
            <div className={labelAndField}>
              <span>{inputField.name}</span>
              {recordFields.map(r => {
                if (
                  r.name === 'name' ||
                  r.name === 'stat_type' ||
                  r.name === 'consumer_identifier'
                ) {
                  return (
                    <SelectComponent
                      onChange={event =>
                        handleAddMetric(r.name as string, event as string)
                      }
                      selected={newMetric[r.name] ?? r.arrayOptions[0]}
                      placeholder="Select the option"
                      label={r.name}
                      items={transformToSelectOptions(r.arrayOptions)}
                      key={r.name}
                    />
                  );
                }
                if (r.name === 'tags') {
                  return (
                    <div className={tags}>
                      <IncrementalFields
                        required={r.required}
                        name="tags"
                        isMetrics
                        items={r.arrayOptions ?? []}
                        state={tagsState}
                        handleChange={handleAddMetric}
                        setState={setTagsState}
                      />
                    </div>
                  );
                }
                return (
                  <FormControl className={field} key={r.name}>
                    <FormLabel
                      id={`textField-label-${r.name}`}
                      className={label}
                    >
                      {r.name}
                    </FormLabel>
                    <TextField
                      name={r.name}
                      label=""
                      variant="outlined"
                      value={newMetric[r.name]}
                      defaultValue={r.defaultValue ? r.defaultValue : ''}
                      key={r.name}
                      onChange={event =>
                        handleAddMetric(
                          r.name as string,
                          event.target.value as string,
                        )
                      }
                      className={input}
                      required={r.required}
                      id={`textField-label-${r.name}`}
                      type={r.type}
                    />
                  </FormControl>
                );
              })}
            </div>
            {inputFields.length >= 1 && (
              <div className={buttonsGroup}>
                <IconButton
                  onClick={() => submitDataToConfig(index)}
                  title="Save Metric"
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleRemoveFields(index)}
                  title="Decline"
                >
                  <ClearIcon />
                </IconButton>
              </div>
            )}
          </div>
        ))}

        <Button
          className={addField}
          disabled={inputFields.length >= 1}
          onClick={() => handleAddFields()}
        >
          <AddIcon /> New Item
        </Button>
      </Box>
    );
  };