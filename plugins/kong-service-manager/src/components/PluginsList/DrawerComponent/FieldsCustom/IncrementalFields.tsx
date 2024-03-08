import React, { useState } from 'react'
import { useStyles } from './styles';
import { Box, Button, FormLabel, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

interface IncrementalFieldsProps {
    name: string,
    required: boolean,
    items: string[]|[],
    setConfig: React.Dispatch<any>
  }
  
  export const IncrementalFields = ({name, required, items, setConfig}:IncrementalFieldsProps) => {
  
    const { box, field, input,label, addField } = useStyles();
    const [inputFields, setInputFields] = useState<string[]>(items);
  
    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
      if(event.target.value !== ""){
      const values = [...inputFields];
      values[index] = event.target.value;
      setConfig((prevConfigState : any) => {
        const updatedConfigState = {
          ...prevConfigState,
          [event.target.name]: values,
        };
        return updatedConfigState;
      });
      setInputFields(values);
    }
    };
  
    const handleAddFields = () => setInputFields([...inputFields, '']);
  
    const handleRemoveFields = (index: number) => {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    };

    return (
      <Box className={box}>
        <FormLabel className={label}>{name}</FormLabel>
            {inputFields.map((inputField, index) => (
              <div key={index} className={field}>
                <TextField
                  name={name}
                  label=""
                  variant="outlined"
                  value={inputField}
                  onChange={event => handleChangeInput(event, index)}
                  className={input}
                  required={required}
                  key={index}
                />
                {inputFields.length >= 1 && (
                  <IconButton onClick={() => handleRemoveFields(index)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
            ))}
  

        <Button className={addField} onClick={() => handleAddFields()}>
          <AddIcon />{" "}
          Add
        </Button>
      </Box>
    );
  };