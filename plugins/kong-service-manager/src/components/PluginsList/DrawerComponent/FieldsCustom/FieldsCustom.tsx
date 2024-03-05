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
  emptyField:{
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
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

interface IncrementalFieldsProps {
  name: string,
  required: boolean,
  items: string[]|[],
}

export const IncrementalFields = ({name, required, items}:IncrementalFieldsProps) => {
  const { box, field, input,emptyField } = useStyles();
  const [inputFields, setInputFields] = useState<string[]>(items.length > 0 ? items : ['']);

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
      {inputFields.length === 0 ? (
        <Box className={emptyField}>
           <p>Add {name}</p>
           <IconButton onClick={() => handleAddFields()}>
                <AddIcon />
            </IconButton>
        </Box>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
};