import React from 'react';
import { Box, Container, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { useTextFieldStyles } from './style';
import { InputFieldProps, TextFieldProps } from './types';
import { addVariables } from '../../../context/state';


const TextFieldComponent : React.FC<TextFieldProps> = (props) => {
    
    const [inputFields, setInputFields] = React.useState<InputFieldProps[]>([{ key: '', value: '' }]);
    const classes = useTextFieldStyles();
    const { setVariables, setError, errors } = props;

    const handleChangeInput = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const values = [...inputFields];
        if (event.target.name === "key") {
          values[index].key = event.target.value;
          setError({ ...errors, [`key_${index}`]: event.target.value === "" });
        } else {
          values[index].value = event.target.value;
          setError({ ...errors, [`value_${index}`]: event.target.value === "" });
        }
        setInputFields(values);
        setVariables(addVariables(values));
      };

    const handleAddFields = () => {
        setInputFields([...inputFields, { key: '', value: '' }])
    }

    const handleRemoveFields = (index: number) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values)
    }

    const touchedField = (index: number, event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        if (event.target.value === "") {
          const values = [...inputFields];
          if (event.target.name === "key") {
            values[index].key = event.target.value;
            setError({ ...errors, [`key_${index}`]: true });
          } else {
            values[index].value = event.target.value;
            setError({ ...errors, [`value_${index}`]: true });
          }
        }
      };

    return (
        <Container>
            <Box className={classes.root}>
                {inputFields.map((inputField, index) => (
                    <div key={index} className={classes.field}>
                        <TextField
                            name="key"
                            label="Input variable key"
                            variant="filled"
                            value={inputField.key}
                            onChange={event => handleChangeInput(index, event)}
                            onBlur={event => touchedField(index, event)}
                            placeholder='Insert the Variable Name'
                            className={classes.input}
                            error={errors[`key_${index}`]}
                            helperText={
                                errors[`key_${index}`]
                                    ? 'use at least 3 characters'
                                    : null
                            }

                        />
                        <TextField
                            name="value"
                            label="Input variable value"
                            variant="filled"
                            value={inputField.value}
                            onChange={event => handleChangeInput(index, event)}
                            onBlur={event => touchedField(index, event)}
                            placeholder='Insert the Variable value'
                            className={classes.input}
                            error={errors[`value_${index}`]}
                            helperText={
                                errors[`value_${index}`]
                                    ? 'use at least 3 characters'
                                    : null
                            }
                        />
                        {inputFields.length > 1 && (
                            <IconButton
                                onClick={() => handleRemoveFields(index)}
                            >
                                <RemoveIcon />
                            </IconButton>
                        )}
                        <IconButton
                            onClick={() => handleAddFields()}
                        >
                            <AddIcon />
                        </IconButton>
                    </div>
                ))}
            </Box>
        </Container>
    )
}

export default TextFieldComponent