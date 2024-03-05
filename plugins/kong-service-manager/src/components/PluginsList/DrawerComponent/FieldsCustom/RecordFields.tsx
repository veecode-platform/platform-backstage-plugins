import React, { useState } from 'react'
import { useStyles } from './styles';
import { Box, FormLabel, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

interface RecordFieldsProps {
    name: string,
    required: boolean,
    defaultValues: any[]|[],
    recordFields: any[]|[]
  }
  
  export const RecordFields = ({name, required, defaultValues,recordFields}:RecordFieldsProps) => {
    const { box, field, input,label } = useStyles();
    const [inputFields, setInputFields] = useState<string[]>(['']);
  
    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
      const values = [...inputFields];
      values[index] = event.target.value;
      setInputFields(values);
    };
  
    const handleAddFields = () => setInputFields([...inputFields, '']);
  
    const handleRemoveFields = (index: number) => {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    };

    // eslint-disable-next-line no-console
    console.log(recordFields)
  
    return (
      <Box className={box}>
        <FormLabel className={label}>config.{name}</FormLabel>
            {inputFields.map((inputField, index) => (
              <div key={index} className={field}>
                <TextField
                  name={name}
                  label={name}
                  variant="outlined"
                  value={inputField}
                  onChange={event => handleChangeInput(event, index)}
                  className={input}
                  required={required}
                  key={index}
                />
                {inputFields.length > 1 && (
                  <IconButton onClick={() => handleRemoveFields(index)}>
                    <RemoveIcon />
                  </IconButton>
                )}
                <IconButton onClick={() => handleAddFields()}>
                  <AddIcon />
                </IconButton>
              </div>
            ))}

      </Box>
    );
  };