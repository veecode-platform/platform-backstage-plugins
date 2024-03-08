/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { useStyles } from './styles';
import { Accordion, AccordionActions, Box, Button, FormControl, FormLabel, IconButton, Select, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { SelectComponent } from './SelectComponent';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { IncrementalFields } from './IncrementalFields';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

interface RecordFieldsProps {
    name: string,
    required: boolean,
    defaultValues: any[]|[],
    recordFields: any[]|[],
    setConfig: React.Dispatch<any>
  }

interface NewMetric {
   name: string,
   stat_type: string,
   sample_rate: number,
   custom_identifier: string
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
    const { box, newField,labelAndField, heading, input,label,addField,defaultField,accordion,accordionSummary,accordionContent, combobox, select, labelSelect,tags} = useStyles();
    const [inputFields, setInputFields] = useState<NewMetric[]>([]);
    const [recordFieldsState, setRecordFieldsState] = useState<recordFieldsProps|null>(null);
    const [metricsState, setMetricsState] = useState<MetricsStateType|null>(null);
    const selectRefs = useRef<Array<RefObject<HTMLSelectElement | null>>>([]);
 

    const addToRefs = (ref: RefObject<HTMLSelectElement>) => {
      if (ref && !selectRefs.current.includes(ref)) {
        selectRefs.current.push(ref);
      }
    };

    const handleChangeInput = (
      // event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
      // index: number
      ) => {
      const values = [...inputFields];
      // values = event.target.value;
      setInputFields(values);
    };

    const handleMetricsState = (key: string, value: string) => {
      if(value!==""){
        setMetricsState((prevConfigState : any) => {
          const updatedConfigState = {
            ...prevConfigState,
            [key]: value,
          };
          return updatedConfigState;
        });
      }
    }

    const editMetrics = (key: string, value: string, index: number) => {
      if (metricsState && metricsState.metrics[index]) {
        const updatedMetrics = [...metricsState.metrics];
        updatedMetrics[index] = { ...updatedMetrics[index], [key]: value };
    
        setMetricsState((prevMetricsState) => ({
          ...prevMetricsState,
          metrics: updatedMetrics,
        }));
      }
    };;
  
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
    };


    console.log("RECORD FIELDS", recordFields)
    console.log("DEFAULT VALUES", defaultValues)

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
        metrics.metrics.push(defaultValues);
        setMetricsState(metrics);
      }
    },[defaultValues]);

    useEffect(()=>{
     if(metricsState){
      console.log("METRICS STATE",metricsState)
      setConfig((prevConfigState : any) => {
        const updatedConfigState = {
          ...prevConfigState,
          ...metricsState,
        };
        return updatedConfigState;
      });
     }
    },[metricsState]);
  
    return (
      <Box className={box}>
        <FormLabel className={label}>config.{name}</FormLabel>

        {defaultValues &&
          defaultValues.map((item, index) => (
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
                          editMetrics(
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
                          editMetrics(
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
                    <TextField
                      name={item.name}
                      label="Sample Rate"
                      variant="outlined"
                      value={
                        (metricsState &&
                          metricsState.metrics[index] &&
                          metricsState.metrics[index].sample_rate) ??
                        item.sample_rate
                      }
                      onChange={event => {
                        editMetrics(
                          'sample_rate',
                          event.target.value as string,
                          index as number,
                        );
                      }}
                      className={input}
                      required={item.required}
                      type="number"
                    />
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
                          editMetrics(
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
                  <Button variant="outlined" color="secondary" title="Delete Metric" onClick={() => {}}>
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
                if (r.name === 'name' || r.name === 'stat_type') {
                  return (
                    <SelectComponent
                      label={r.name}
                      items={r.arrayOptions}
                      key={r.name}
                    />
                  );
                }
                return (
                  <TextField
                    name={r.name}
                    label={r.name}
                    variant="outlined"
                    value={r.name}
                    key={r.name}
                    // onChange={event => handleChangeInput(event, index)}
                    onChange={handleChangeInput}
                    className={input}
                    required={r.required}
                    type={r.type}
                  />
                );
              })}
            </div>
            {inputFields.length >= 1 && (
              <IconButton onClick={() => handleRemoveFields(index)}>
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        ))}

        <Button className={addField} onClick={() => handleAddFields()}>
          <AddIcon /> New Item
        </Button>
      </Box>
    );
  };