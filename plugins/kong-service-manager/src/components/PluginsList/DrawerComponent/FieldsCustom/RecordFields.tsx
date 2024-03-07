/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useStyles } from './styles';
import { Accordion, Box, Button, FormLabel, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { SelectComponent } from './SelectComponent';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { IncrementalFields } from './IncrementalFields';

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
  
  export const RecordFields = ({name, defaultValues,recordFields,setConfig}:RecordFieldsProps) => {
    const { box, newField,labelAndField, heading, input,label,addField,defaultField,accordion,accordionSummary,accordionContent, accordionItem} = useStyles();
    const [inputFields, setInputFields] = useState<NewMetric[]>([]);
    const [recordFieldsState, setRecordFieldsState] = useState<recordFieldsProps|null>(null);
   //  const [fieldsState, setFieldsState] = useState<any>();
 
    const handleChangeInput = (
      // event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
      // index: number
      ) => {
      const values = [...inputFields];
      // values = event.target.value;
      setInputFields(values);
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
    };

    // eslint-disable-next-line no-console
    // console.log("RECORD FIELDS", recordFields)
    // // eslint-disable-next-line no-console
    // console.log("DEFAULT VALUES", defaultValues)

    useEffect(()=>{
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
    },[recordFields]);

    useEffect(()=>{
      // eslint-disable-next-line no-console
      console.log(defaultValues)
    },[defaultValues])
  
    return (
      <Box className={box}>
        <FormLabel className={label}>config.{name}</FormLabel>

        {defaultValues &&
          defaultValues.map((item, index) => (
            <div key={index} className={defaultField}>
              <Accordion className={accordion}>
                <AccordionSummary
                  expandIcon={<AddIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className={accordionSummary}
                >
                  <Typography className={heading}>{item.name}</Typography>
                </AccordionSummary>
                <AccordionDetails className={accordionContent}>
                  {item.name && (
                    <div className={accordionItem}>
                      <p className={label}>Name</p>
                      <select>
                        <option>{item.name}</option>
                        {recordFieldsState?.name.map(i => (
                          <option key={i}>{i}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {item.stat_type && (
                    <div className={accordionItem}>
                      <p>Stat Type</p>
                      <select>
                        <option>{item.stat_type}</option>
                        {recordFieldsState?.stat_type.map(i => (
                          <option key={i}>{i}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {item.sample_rate && (
                    <div className={accordionItem}>
                      <p>Sample Rate</p>
                      <input type="number" defaultValue={item.sample_rate} />
                    </div>
                  )}

                  {item.consumer_identifier && (
                    <div className={accordionItem}>
                      <p>Consumer Identifier</p>
                      <select>
                        <option>{item.consumer_identifier}</option>
                        {recordFieldsState?.consumer_identifier.map(i => (
                          <option key={i}>{i}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {item.tags && (
                    <IncrementalFields
                      required={false}
                      name="Tags"
                      items={item.tags}
                      setConfig={setConfig}
                    />
                  )}
                </AccordionDetails>
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