import React, { useState } from 'react'
import { useStyles } from './styles';
import { Box, Button, FormLabel, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { SelectComponent } from './SelectComponent';

interface RecordFieldsProps {
    name: string,
    required: boolean,
    defaultValues: any[]|[],
    recordFields: any[]|[]
  }

interface NewMetric {
   name: string,
   stat_type: string,
   sample_rate: number,
   custom_identifier: string
}
  
  export const RecordFields = ({name, required, defaultValues,recordFields}:RecordFieldsProps) => {
    const { box, newField,labelAndField, input,label,addField,defaultField } = useStyles();
    const [inputFields, setInputFields] = useState<NewMetric[]>([]);
 
    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
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
    console.log("RECORD FIELDS", recordFields)
    // eslint-disable-next-line no-console
    console.log("DEFAULT VALUES", defaultValues)
  
    return (
      <Box className={box}>
        <FormLabel className={label}>config.{name}</FormLabel>

        {
          defaultValues && (
            defaultValues.map(item => (
              <div className={defaultField}>
                {item.name}
                <IconButton>
                  <AddIcon />
                </IconButton>
              </div>
            ))
          )
        }

        {inputFields.map((inputField, index) => (
              <div key={index} className={newField}>
                <div className={labelAndField}>
                  <span>{inputField.name}</span>
                  {
                    recordFields.map(r => {
                      if(r.name === "name" || r.name === "stat_type"){
                        return <SelectComponent label={r.name} items={r.arrayOptions} key={r.name} />
                      }
                      return(
                        <TextField
                          name={r.name}
                          label={r.name}
                          variant="outlined"
                          value={r.name}
                          onChange={event => handleChangeInput(event, index)}
                          className={input}
                          required={r.required}
                          type={r.type}
                        />
                      )
                    })
                  }
                  
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