import React, { ReactNode, useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { 
  // Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, 
    makeStyles } from '@material-ui/core';
import { GitlabPipelinesContext } from '../context/GitlabPipelinesContext';
import { validateString } from '../../utils/validators';

type ModalComponentProps = {
  open: boolean,
  modalType: "Pipeline" | "Job",
  title: string,
  subtitle: ReactNode,
  handleModal: () => void,
  handleStartPipeline?: () => Promise<void>
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
    padding: '0 1.5rem 1.8rem 0'
  }
}));

export const ModalComponent = ({open, title, subtitle, handleModal, handleStartPipeline, modalType }:ModalComponentProps) => {

  const [errorsState, setErrorsState] = useState<Record<string, boolean>>({});
  const classes = useStyles();
  const { triggerToken, setTriggerTokenState } = useContext(GitlabPipelinesContext);
  
//   const handleChangeSelect = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
//    setValueOption(event.target.value as string);
//    if(event){
//      setInputWorkflow({...inputWorkflow, [event.target.name!]: event.target.value})
//    }
//   };

const handleChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>, required: boolean, type: string | number | boolean) => {    
    if(required){
      if(type === "string" && validateString(event.target.value as string)){
        return setErrorsState({...errorsState, [event.target.name!] : true });
      }
      if(event.target.value === "") return setErrorsState({...errorsState, [event.target.name!] : true });
   }
    if(event){
     if(modalType === "Pipeline"){
        setTriggerTokenState(event.target.value as string);
        setErrorsState({...errorsState, [event.target.name!] : false });
     }
    }
  };


  const touchedField = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>, required: boolean) => {
    if (required && event.target.value === "") setErrorsState({ ...errorsState, [event.target.name!]: true })
    return;
  }
  
  const handleSetInputs = () => {
    handleModal();
    if(!!handleStartPipeline) handleStartPipeline();
  }

  return (
      <Dialog open={open} onClose={handleModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent className={classes.modal}>
          <DialogContentText>
          {subtitle}
          </DialogContentText>
          <>
          {modalType === "Pipeline" && (
             <TextField
             autoFocus
             margin="dense"
             id="triggerToken"
             name="triggerToken"
             defaultValue={triggerToken ?? ''}
             required
             label="Insert the trigger pipeline token"
             type="string"
             fullWidth
             onBlur={(event) => touchedField(event, true)}
             onChange={(event) => handleChange(event, true, 'string')}  
             error={errorsState['triggerToken']}
               helperText={
                 errorsState['triggerToken']
                   ? 'use at least 3 characters'
                   : null
               }
         />
          )}
          </>
        </DialogContent>
        <DialogActions className={classes.footer}>
          <Button onClick={handleModal} color="primary">
            Cancel
          </Button>
          <Button 
            disabled={Object.values(errorsState).some((error) => error)}
            onClick={handleSetInputs}
            color="primary"
            variant="contained"
            >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
  );
}
