import { Box, Container, TextField, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { VariablesParams } from '../../../utils/types';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
        }
    },
    field: {
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: '100%',
        marginBottom: '1rem',
    },
    input: {
        minWidth: '45%',
    }
}))

type InputFieldProps = {
    key: string,
    value: string
}


type TextFieldProps = {
    setVariables: React.Dispatch<React.SetStateAction<VariablesParams[] | null>>,
    setError: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    errors: Record<string, boolean>
}

const TextFieldComponent = ({ setVariables, setError, errors }: TextFieldProps) => {

    const classes = useStyles();
    const [inputFields, setInputFields] = useState<InputFieldProps[]>([{ key: '', value: '' }]);

    const handleChangeInput = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const values = [...inputFields];
        if (event.target.name === "key") {
            values[index].key = event.target.value;
            event.target.value === "" ? setError({ ...errors, [`key_${index}`]: true }) : setError({ ...errors, [`key_${index}`]: false })
        }
        else {
            values[index].value = event.target.value;
            event.target.value === "" ? setError({ ...errors, [`value_${index}`]: true }) : setError({ ...errors, [`value_${index}`]: false })
        }
        setInputFields(values);
        setVariables(values);
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
        if (event.target.value === ""){
            const values = [...inputFields];
            if (event.target.name === "key") {
                values[index].key = event.target.value;
                event.target.value === "" ? setError({ ...errors, [`key_${index}`]: true }) : setError({ ...errors, [`key_${index}`]: false })
            }
            else {
                values[index].value = event.target.value;
                event.target.value === "" ? setError({ ...errors, [`value_${index}`]: true }) : setError({ ...errors, [`value_${index}`]: false })
            }
        }
        return;
      }

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