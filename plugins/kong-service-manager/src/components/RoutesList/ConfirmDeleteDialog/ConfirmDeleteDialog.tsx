import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { DialogProps } from "./types";

export const ConfirmDeleteDialog : React.FC<DialogProps> = (props) => {

   const {show, handleClose, handleSubmit} = props;

    return (
      <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure to delete this route??</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone        
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} style={{color:"#ED4337"}} >
            Delete
          </Button>
        </DialogActions>
    </Dialog>
  )}