import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function AlertComponent({ open, close, message, status }: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={2000} onClose={close}>
        <Alert onClose={close} severity={status ?? 'success'}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
