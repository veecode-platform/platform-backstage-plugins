/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { WorkflowDispatchParameters } from '../../utils/types';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, makeStyles } from '@material-ui/core';
import { GithubWorkflowsContext } from '../context';
import { validateString } from '../../utils/validators';

type ModalComponentProps = {
  open: boolean,
  handleModal: () => void,
  parameters: WorkflowDispatchParameters[],
  handleStartWorkflow?: () => Promise<void>
}

const useStyles = makeStyles((theme) => ({
  modal: {
    padding: '4rem',
    borderTop: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1rem'
  },
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  footer:{
    paddingBottom: '1rem'
  }
}));

export const ModalComponent = ({open, handleModal, parameters, handleStartWorkflow }:ModalComponentProps) => {

  const [stateCheckbox, setStateCheckbox ] = useState<boolean>(false);
  const [valueOption, setValueOption] = useState<string|null>(null);
  const [ inputWorkflow, setInputWorkflow ] = useState<object>({});
  const [errorsState, setErrorsState] = useState<Record<string, boolean>>({});
  const classes = useStyles();
  const { setInputs } = useContext(GithubWorkflowsContext);

  useEffect(() => {
    const data: any = {};
    parameters.forEach(p => {
      data[p.name] = p.default;
    });
    setInputWorkflow(data);
  }, []);
  
  const handleChangeSelect = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
   setValueOption(event.target.value as string);
   if(event){
     setInputWorkflow({...inputWorkflow, [event.target.name!]: event.target.value})
   }
  };

  const handleChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>, required: boolean, type: string | number | boolean) : void => {    
    if(required){
      if(type === "string" && validateString(event.target.value as string)){
        setErrorsState({...errorsState, [event.target.name!] : true });
        return
      }
      if(event.target.value === "") {
         setErrorsState({...errorsState, [event.target.name!] : true });
         return
      }
   }
    if(event){
      setInputWorkflow({...inputWorkflow, [event.target.name!]: event.target.value});
      setErrorsState({...errorsState, [event.target.name!] : false });
    }
    return;
  };

  const handleStateCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value){
    setStateCheckbox(event.target.checked);
    setInputWorkflow({ ...inputWorkflow, [event.target.name]: stateCheckbox });
    }
  };

  const touchedField = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>, required: boolean) => {
    if (required && event.target.value === "") setErrorsState({ ...errorsState, [event.target.name!]: true })
    return;
  }
  
  const handleSetInputs = () => {
    setInputs(inputWorkflow);
    handleModal();
    if(!!handleStartWorkflow) handleStartWorkflow();
  }

  return (
      <Dialog open={open} onClose={handleModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Workflows Parameters</DialogTitle>
        <DialogContent className={classes.modal}>
          <DialogContentText>
          Fill in the fields according to the values set in the project workflow.
          </DialogContentText>
          {
            parameters.map(p => (
              <div key={p.name }>
              {p.type === "string" && (
                <TextField
                  margin="dense"
                  id={p.name}
                  name={p.name}
                  defaultValue={p.default}
                  required={p.required as boolean}
                  label={p.description}
                  type="string"
                  fullWidth
                  onBlur={(event) => touchedField(event, p.required)}
                  onChange={(event) => handleChange(event, p.required, p.type)}  
                  error={errorsState[p.name]}
                    helperText={
                      errorsState[p.name]
                        ? 'use at least 3 characters'
                        : null
                    }
              />
              )}
              {p.type === "number" && (
                <TextField
                  margin="dense"
                  id={p.name}
                  name={p.name}
                  defaultValue={p.default}
                  required={p.required as boolean}
                  label={p.description}
                  onBlur={(event) => touchedField(event, p.required)}
                  type="number"
                  fullWidth  
                  onChange={(event) => handleChange(event, p.required, p.type)}  
              />
              )}
              {p.type === "choice" && (
                  <FormControl variant="outlined" className={classes.formControl} >
                    <InputLabel id={p.name}>{p.description}</InputLabel>
                    <Select
                      labelId={p.name}
                      id="select-outlined"
                      value={valueOption ?? p.default}
                      onChange={handleChangeSelect}
                      label={p.description}
                      required={p.required as boolean}
                      name={p.name}
                      onBlur={(event) => touchedField(event, p.required)}
                    >
                      {p.options?.map(o => (
                        <MenuItem value={o} key={o}>
                          <em>{o}</em>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              )}
                {p.type === "boolean" && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={p.default as boolean}
                        value={stateCheckbox}
                        onChange={handleStateCheckbox}
                        name={p.name}
                        color="primary"
                        required={p.required as boolean}
                      />
                    }
                  label={p.description}
                />
                )}
              </div>
            ))
          }
        </DialogContent>
        <DialogActions className={classes.footer}>
          <Button onClick={handleModal} color="primary">
            Cancel
          </Button>
          <Button 
            disabled={Object.values(errorsState).some((error) => error)}
            onClick={handleSetInputs}
            color="primary"
            >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
  );
}
