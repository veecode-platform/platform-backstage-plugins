import React from 'react'
import { useStyles } from './styles';
import { Accordion, AccordionActions, Box, Button, FormControl, FormLabel, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { IncrementalFields } from '../incrementalFields/IncrementalFields';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import { transformToSelectOptions } from '../../../../../utils/helpers/transformToSelectOptions';
import {SelectComponent } from '../../../../shared'
import { RecordFieldsProps, RecordStateType } from './types';
import { addInputFields, addItem, addRecordState, initialInputFieldsState, initialNewItemState, initialRecordFieldState, initialRecordState, InputFieldsReducer, NewItemReducer, RecordFieldReducer, RecordReducer, removeItem, removeRecordState, updateRecordFieldState } from './state';


  export const RecordFields : React.FC<RecordFieldsProps> = (props) => {

    const [inputFieldsState, inputFieldsDispatch] = React.useReducer(InputFieldsReducer, initialInputFieldsState);
    const [recordFieldsState, recordFieldsDispatch] = React.useReducer(RecordFieldReducer, initialRecordFieldState)
    const [recordState, recordStateDispatch] = React.useReducer(RecordReducer, initialRecordState);
    const [ newItemState, newItemDispatch ] = React.useReducer(NewItemReducer, initialNewItemState);
    const [tagsState, setTagsState] = React.useState<string[]>([]);
    const {inputName, defaultValues,recordFields,setConfig} = props;
    const { box, newField,labelAndField, heading, input, addField,defaultField,field,accordion,accordionSummary,accordionContent, combobox, label,tags, buttonsGroup} = useStyles();


    const handleAddFields = () => {
      const newFields = [...inputFieldsState, { name: "New Item"}];
      inputFieldsDispatch(addInputFields(newFields))
    }
  
    const handleRemoveFields = (index: number) => {
      const values = [...inputFieldsState];
      values.splice(index, 1);
      inputFieldsDispatch(addInputFields(values));
      newItemDispatch(removeItem());
    };

    const submitDataToConfig = (key: string, index: number) => {
      if (newItemState) {
        const updatedItems = { [key]: [...(recordState?.[key] || [])] }; 
        updatedItems[key].push(newItemState);
        recordStateDispatch(addRecordState(updatedItems as RecordStateType));
        handleRemoveFields(index);
        newItemDispatch(removeItem());
      }
    };

    const handleAddItem = (key: string, value: string | number | string[]) => {
      if (value !== "") {
        const newItemData = {...newItemState,  [key]: value,}
        newItemDispatch(addItem(newItemData))
      }
    };

    const handleEditItems = ( key: string, value: string | number | string[], index: number) => {
      if (recordState && recordState[inputName][index]) {
        const updatedItems = [...recordState[inputName]];
        updatedItems[index] = { ...updatedItems[index], [key]: value };
        recordStateDispatch(addRecordState({...recordState, [inputName]: updatedItems }));
      }
    };

    const handleDeleteItems = (index:number) => {
      if(recordState){
        const updateItem = recordState[inputName].filter(
          (_, i) => i !== index
        );
        recordStateDispatch(addRecordState({...recordState, [inputName]: updateItem }));
      }
     
    }

    React.useEffect(() => {
      if (recordFields) {
        recordFields.forEach(r => {
          switch (r.name) {
            case 'name':
            case 'stat_type':
            case 'consumer_identifier':
            case 'value': {
              const value = r.arrayOptions !== undefined ? r.arrayOptions : [];
              recordFieldsDispatch(updateRecordFieldState(r.name, value));
              break;
            }
            default:
              return;
          }
        });
      }
    }, [recordFields]);

    React.useEffect(() => {
      if (defaultValues && defaultValues !== undefined) {
        const recordData: RecordStateType = { [inputName]: [...defaultValues] };
        recordStateDispatch(addRecordState(recordData));
      }
      else recordStateDispatch(removeRecordState())
    }, [defaultValues, inputName]);

    React.useEffect(()=>{
     if(recordState){
      setConfig((prevConfigState : any) => {
        const updatedConfigState = {
          ...prevConfigState,
          [inputName]: recordState[inputName],
        };
        return updatedConfigState;
      });
     }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[recordState]);

    return (
      <Box className={box}>
        <FormLabel className={label}>config.{inputName}</FormLabel>

        {recordState &&
          recordState[inputName].map((item, index) => (
            <div key={index} className={defaultField}>
              <Accordion className={accordion}>
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className={accordionSummary}
                >
                  <Typography className={heading}>
                    {(recordState &&
                      recordState[inputName][index] &&
                      recordState[inputName][index].name) ??
                      item.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={accordionContent}>
                  {item.name && (
                      <>
                     { recordFieldsState && recordFieldsState.name && recordFieldsState.name.length > 0 ? 
                        (<div className={combobox}>
                          <SelectComponent
                            onChange={event => { handleEditItems('name', event as string, index as number)}}
                            label="Name"
                            selected={
                              (recordState &&
                                recordState[inputName][index] &&
                                recordState[inputName][index].name) ??
                              item.name }
                            items={
                              recordFieldsState
                                ? transformToSelectOptions(recordFieldsState.name)
                                : []
                            }
                          />
                        </div>):(
                            <FormControl className={combobox}>
                             <FormLabel
                               id={`textField-label-${item.name}`}
                               className={label}
                             >
                               Name
                             </FormLabel>
                             <TextField
                               name={item.name}
                               label=""
                               variant="outlined"
                               value={
                                 (recordState &&
                                   recordState[inputName][index] &&
                                   recordState[inputName][index].name) ??
                                 item.name
                               }
                               onChange={event => {
                                 handleEditItems(
                                   'name',
                                    event.target.value,
                                   index as number,
                                 );
                               }}
                               className={input}
                               required={item.required}
                               type={item.type}
                               id={`textField-label-${item.name}`}
                             />
                           </FormControl>
                        )
                        }
                      </>
                    )}
                  {item.stat_type && (
                      <div className={combobox}>
                      <SelectComponent
                        onChange={event => { handleEditItems('stat_type', event as string, index as number)}}
                        label="Stat Type"
                        selected={
                          (recordState &&
                            recordState[inputName][index] &&
                            recordState[inputName][index].stat_type) ??
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
                          (recordState &&
                            recordState[inputName][index] &&
                            recordState[inputName][index].sample_rate) ??
                          item.sample_rate
                        }
                        onChange={event => {
                          handleEditItems(
                            'sample_rate',
                            Number(event.target.value),
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

                {item.value && (
                    <FormControl className={combobox}>
                      <FormLabel
                        id={`textField-label-${item.value}`}
                        className={label}
                      >
                        Value
                      </FormLabel>
                      <TextField
                        name={item.value}
                        label=""
                        variant="outlined"
                        value={
                          (recordState &&
                            recordState[inputName][index] &&
                            recordState[inputName][index].value) ??
                          item.value
                        }
                        onChange={event => {
                          handleEditItems(
                            'value',
                            event.target.value,
                            index as number,
                          );
                        }}
                        className={input}
                        required={item.required}
                        type={item.type}
                        id={`textField-label-${item.value}`}
                      />
                    </FormControl>
                  )}

                  {item.consumer_identifier && (
                    <div className={combobox}>
                      <SelectComponent
                        onChange={event => { handleEditItems('consumer_identifier', event as string, index as number)}}
                        label="Consumer Identifier"
                        selected={
                          (recordState &&
                            recordState[inputName][index] &&
                            recordState[inputName][index].consumer_identifier) ??
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
                        handleChange={handleEditItems}
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
                    onClick={() => handleDeleteItems(index)}
                  >
                    Delete Metric
                  </Button>
                </AccordionActions>
              </Accordion>
            </div>
          ))}

        {inputFieldsState.map((inputField, index) => (
          <div key={index} className={newField}>
            <div className={labelAndField}>
              <span>{inputField.name}</span>
              {recordFields.map((r,_index) => {
                if (
                  r.name === 'name' ||
                  r.name === 'stat_type' ||
                  r.name === 'consumer_identifier'
                ) {
                  return (
                    <>
                      {
                        r.name.arrayOptions ? 
                          ( <SelectComponent
                            onChange={event =>
                              handleAddItem(r.name as string, event as string)
                            }
                            selected={newItemState![r.name] ?? r.arrayOptions[0]}
                            placeholder="Select the option"
                            label={r.name}
                            items={transformToSelectOptions(r.arrayOptions)}
                            key={_index}
                          /> ) :
                          ( <FormControl className={field} key={_index}>
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
                                value={newItemState![r.name]}
                                defaultValue={r.defaultValue !== undefined ? r.defaultValue : ''}
                                key={r.name}
                                onChange={event =>
                                  handleAddItem(
                                    r.name as string,
                                    event.target.value,
                                  )
                                }
                                className={input}
                                required={r.required}
                                id={`textField-label-${r.name}`}
                                type={r.type}
                              />
                            </FormControl>)
                      }
                    </>
                  );
                }
                if (r.name === 'tags') {
                  return (
                    <div className={tags} key={_index}>
                      <IncrementalFields
                        required={r.required}
                        name="tags"
                        isMetrics
                        items={r.arrayOptions ?? []}
                        state={tagsState}
                        handleChange={handleAddItem}
                        setState={setTagsState}
                      />
                    </div>
                  );
                }
                return (
                  <FormControl className={field} key={_index}>
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
                      value={newItemState![r.name]}
                      defaultValue={r.defaultValue !== undefined ? r.defaultValue : ''}
                      key={r.name}
                      onChange={event =>
                        handleAddItem(
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
            {inputFieldsState.length >= 1 && (
              <div className={buttonsGroup}>
                <IconButton
                  onClick={() => submitDataToConfig(inputName,index)}
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
          disabled={inputFieldsState.length >= 1}
          onClick={() => handleAddFields()}
        >
          <AddIcon /> New Item
        </Button>
      </Box>
    );
  };