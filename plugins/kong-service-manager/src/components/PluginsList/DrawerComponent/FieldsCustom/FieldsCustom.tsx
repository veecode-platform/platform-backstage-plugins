/* eslint-disable no-console */
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  box: {
    margin: theme.spacing(2),
    width: '100%',
  },
  field: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '100%',
    marginBottom: '1rem',
  },
  input: {
    minWidth: '90%',
  },
}));

export const SubFields = (fields:any) => {

    const { formControl } = useStyles();

    const [age, setAge] = React.useState('');

    const handleChange = (event:any) => {
      setAge(event.target.value);
    };

    // eslint-disable-next-line no-console
    console.log(fields.fields)

    return (
        <FormControl variant="outlined" className={formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="Age"
        >
        {
            fields.fields.map((f:any) => (
                <MenuItem value={10}>{f.name ?? ''}</MenuItem> 
                // TO DO
            ))
        }
        </Select>
      </FormControl>
    )
  }


export const IncrementalFields = () => {
  const { box, field, input } = useStyles();
  const [inputFields, setInputFields] = useState<string[]>(['teste']);

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

  return (
    <Box className={box}>
      {inputFields.map((inputField, index) => (
        <div key={index} className={field}>
          <TextField
            name="key"
            label="Input variable key"
            variant="outlined"
            value={inputField}
            onChange={(event) => handleChangeInput(event, index)} // Adicionando o índice como argumento
            className={input}
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