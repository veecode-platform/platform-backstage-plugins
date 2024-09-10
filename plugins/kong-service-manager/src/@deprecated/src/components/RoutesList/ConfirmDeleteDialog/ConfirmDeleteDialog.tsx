import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React from "react";

type dialogProps = {
  show: boolean;
  handleClose: any;
  handleSubmit: any;
}

export const ConfirmDeleteDialog = ({show, handleClose, handleSubmit}: dialogProps) => {
    return (
      <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure to delete this route??"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`This action cannot be undone`}        
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={handleSubmit} style={{color:"#ED4337"}} >
            Delete
          </Button>
        </DialogActions>
    </Dialog>
  )}