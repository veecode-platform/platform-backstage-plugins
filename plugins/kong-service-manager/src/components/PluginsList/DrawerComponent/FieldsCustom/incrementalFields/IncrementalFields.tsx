import React from 'react'
import { Box, Button, FormLabel, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { IncrementalFieldsProps } from './type';
import { useIncrementalFieldStyles } from './styles';

  
  export const IncrementalFields : React.FC<IncrementalFieldsProps> = (props) => {
  
    const {name, required, items,isMetrics, setState,handleChange,id,state} = props;
    const { box, field, input,label, addField } = useIncrementalFieldStyles();
    const [inputFields, setInputFields] = React.useState<string[]>(items);
  
    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
      if(event.target.value !== ""){
      const values = [...inputFields];
      values[index] = event.target.value;
      if(isMetrics){
        setState(values);
      } 
      else {
        setState((prevConfigState : any) => {
          const updatedConfigState = {
            ...prevConfigState,
            [event.target.name]: values,
          };
          return updatedConfigState;
        });
      }
      if(!!handleChange){
        handleChange(name,state as string[],id as number)
      }
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