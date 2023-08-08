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

type ModalComponentProps = {
  open: boolean,
  handleModal: () => void,
  parameters: WorkflowDispatchParameters[]
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

export const ModalComponent = ({open, handleModal, parameters}:ModalComponentProps) => {

  const [stateCheckbox, setStateCheckbox ] = useState<boolean>(false);
  const [valueOption, setValueOption] = useState<string|null>(null);
  const [ inputWorkflow, setInputWorkflow ] = useState<object>({})
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

  const handleChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    if(event){
      setInputWorkflow({...inputWorkflow, [event.target.name!]: event.target.value})
    }
  };

  const handleStateCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value){
    setStateCheckbox(event.target.checked);
    setInputWorkflow({ ...inputWorkflow, [event.target.name]: stateCheckbox });
    }
  };

  const handleSetInputs = () => {
    setInputs(inputWorkflow)
    handleModal();
  }

  return (
      <Dialog open={open} onClose={handleModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Workflows Parameters</DialogTitle>
        <DialogContent className={classes.modal}>
          <DialogContentText>
          Fill in the fields according to the values ​​set in the project workflow.
          </DialogContentText>
          {
            parameters.map(p => (
              <div key={p.name }>
              {p.type === "string" && (
                <TextField
                  autoFocus
                  margin="dense"
                  id={p.name}
                  name={p.name}
                  value={p.default}
                  required={p.required}
                  label={p.description}
                  type="string"
                  fullWidth
                  onChange={handleChange}
              />
              )}
              {p.type === "number" && (
                <TextField
                  autoFocus
                  margin="dense"
                  id={p.name}
                  name={p.name}
                  defaultValue={p.default}
                  required={p.required}
                  label={p.description}
                  type="number"
                  fullWidth  
                  onChange={handleChange}  
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
                      required={p.required}
                      name={p.name}
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
                        required={p.required}
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
          <Button onClick={handleSetInputs} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
  );
}
