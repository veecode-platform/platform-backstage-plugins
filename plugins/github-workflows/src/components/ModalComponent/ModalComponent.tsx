import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { WorkflowDispatchParameters } from '../../utils/types';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, makeStyles } from '@material-ui/core';

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
  const [valueOption, setValueOption] = useState('');
  const classes = useStyles();
  
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValueOption(event.target.value as string);
  };

  const handleStateCheckbox = () => {
    setStateCheckbox(!stateCheckbox);
  };

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
                  defaultValue={p.default}
                  required={p.required}
                  label={p.description}
                  type="string"
                  fullWidth
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
              />
              )}
              {p.type === "choice" && (
                  <FormControl variant="outlined" className={classes.formControl} >
                    <InputLabel id={p.name}>{p.description}</InputLabel>
                    <Select
                      labelId={p.name}
                      id="select-outlined"
                      value={p.default ?? valueOption}
                      onChange={handleChange}
                      label={p.description}
                      required={p.required}
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
                      checked={stateCheckbox}
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
          <Button onClick={handleModal} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
  );
}
