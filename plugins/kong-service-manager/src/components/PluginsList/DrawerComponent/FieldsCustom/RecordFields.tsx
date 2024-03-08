/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { useStyles } from './styles';
import { Accordion, AccordionActions, Box, Button, FormControl, FormLabel, IconButton, Select, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { IncrementalFields } from './IncrementalFields';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';

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
    const { box, newField,labelAndField, heading, input,label,addField,defaultField,accordion,accordionSummary,accordionContent, combobox, select, labelSelect,tags, buttonsGroup} = useStyles();
    const [inputFields, setInputFields] = useState<any[]>([]);
    const [recordFieldsState, setRecordFieldsState] = useState<recordFieldsProps|null>(null);
    const [metricsState, setMetricsState] = useState<MetricsStateType|null>(null);
    const [newMetric, setNewMetric] = useState<any>({});
    const selectRefs = useRef<Array<RefObject<HTMLSelectElement | null>>>([]);
 

    const addToRefs = (ref: RefObject<HTMLSelectElement>) => {
      if (ref && !selectRefs.current.includes(ref)) {
        selectRefs.current.push(ref);
      }
    };

    const handleAddFields = () => setInputFields([...inputFields, {
      name: "New Metric",
      stat_type: "none",
      sample_rate: 0,
      custom_identifier: "teste xpto"
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
  
    // console.log("RECORD FIELDS", recordFields)
    // console.log("DEFAULT VALUES", defaultValues)

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
                    <FormControl className={combobox}>
                      <FormLabel
                        id={`select-label-${item.name}`}
                        className={labelSelect}
                      >
                        Name
                      </FormLabel>
                      <Select
                        variant="outlined"
                        className={select}
                        native
                        value={
                          (metricsState &&
                            metricsState.metrics[index] &&
                            metricsState.metrics[index].name) ??
                          item.name
                        }
                        ref={ref =>
                          addToRefs(ref as RefObject<HTMLSelectElement>)
                        }
                        onChange={event => {
                          handleEditMetrics(
                            'name',
                            event.target.value as string,
                            index as number,
                          );
                        }}
                        inputProps={{
                          name: name,
                          id: 'filled-age-native-simple',
                        }}
                        labelId={`select-label-${item.name}`}
                      >
                        {recordFieldsState?.name.map(i => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {item.stat_type && (
                    <FormControl className={combobox}>
                      <FormLabel
                        id={`select-label-${item.stat_type}`}
                        className={labelSelect}
                      >
                        Stat Type
                      </FormLabel>
                      <Select
                        variant="outlined"
                        className={select}
                        native
                        value={
                          (metricsState &&
                            metricsState.metrics[index] &&
                            metricsState.metrics[index].stat_type) ??
                          item.stat_type
                        }
                        ref={ref =>
                          addToRefs(ref as RefObject<HTMLSelectElement>)
                        }
                        onChange={event => {
                          handleEditMetrics(
                            'stat_type',
                            event.target.value as string,
                            index as number,
                          );
                        }}
                        inputProps={{
                          name: name,
                          id: 'filled-age-native-simple',
                        }}
                        labelId={`select-label-${item.stat_type}`}
                      >
                        {recordFieldsState?.stat_type.map(i => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {item.sample_rate && (
                    <FormControl className={combobox}>
                      <FormLabel
                          id={`textField-label-${item.sample_rate}`}
                          className={labelSelect}
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
                    <FormControl className={combobox}>
                      <FormLabel
                        id={`select-label-${item.name}`}
                        className={labelSelect}
                      >
                        Consumer Identifier
                      </FormLabel>
                      <Select
                        variant="outlined"
                        className={select}
                        native
                        value={
                          (metricsState &&
                            metricsState.metrics[index] &&
                            metricsState.metrics[index].consumer_identifier) ??
                          item.consumer_identifier
                        }
                        ref={ref =>
                          addToRefs(ref as RefObject<HTMLSelectElement>)
                        }
                        onChange={event => {
                          handleEditMetrics(
                            'consumer_identifier',
                            event.target.value as string,
                            index as number,
                          );
                        }}
                        inputProps={{
                          name: name,
                          id: 'filled-age-native-simple',
                        }}
                        labelId={`select-label-${item.name}`}
                      >
                        {recordFieldsState?.consumer_identifier.map(i => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {item.tags && (
                    <div className={tags}>
                      <IncrementalFields
                        required={false}
                        name="Tags"
                        items={item.tags}
                        setConfig={setConfig}
                        noLabel
                      />
                    </div>
                  )}
                </AccordionDetails>
                <AccordionActions>
                  <Button 
                   variant="outlined" 
                   color="secondary" 
                   title="Delete Metric" 
                   onClick={()=>handleDeleteMetrics(index)}>
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
                if (r.name === 'name' || r.name === 'stat_type' || r.name === 'consumer_identifier' ) {
                  return (
                    <FormControl className={combobox}>
                    <FormLabel
                      id={`select-label-${r.name}`}
                      className={labelSelect}
                    >
                      {r.name}
                    </FormLabel>
                    <Select
                      variant="outlined"
                      className={select}
                      native
                      value={newMetric[r.name] ?? ''}
                      ref={ref =>
                        addToRefs(ref as RefObject<HTMLSelectElement>)
                      }
                      onChange={(event)=>handleAddMetric(r.name as string, event.target.value as string)}
                      inputProps={{
                        name: r.name,
                        id: 'filled-age-native-simple',
                      }}
                      labelId={`select-label-${r.name}`}
                    >
                      {r.arrayOptions.map((i:string) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  );
                }
                if (r.name === 'tags') {
                  return(
                    <FormControl className={combobox}>
                    <FormLabel
                      id={`textField-label-${r.name}`}
                      className={labelSelect}
                    >
                      {r.name}
                    </FormLabel>
                    <IncrementalFields
                      required={r.required}
                      name="tags"
                      items={r.arrayOptions ?? []}
                      setConfig={setConfig}
                      noLabel
                    />
                    </FormControl>
                  )
                }
                return (
                  <FormControl className={combobox}>
                    <FormLabel
                      id={`textField-label-${r.name}`}
                      className={labelSelect}
                    >
                      {r.name}
                    </FormLabel>
                  <TextField
                    name={r.name}
                    label=""
                    variant="outlined"
                    value={newMetric[r.name] ?? ''}
                    key={r.name}
                    onChange={(event)=>handleAddMetric(r.name as string, event.target.value as string)}
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
                <IconButton onClick={()=>submitDataToConfig(index)} title="Save Metric">
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={() => handleRemoveFields(index)} title="Decline">
                  <ClearIcon />
                </IconButton>
              </div>
            )}
          </div>
        ))}

        <Button className={addField} disabled={inputFields.length >= 1} onClick={() => handleAddFields()}>
          <AddIcon /> New Item
        </Button>
      </Box>
    );
  };