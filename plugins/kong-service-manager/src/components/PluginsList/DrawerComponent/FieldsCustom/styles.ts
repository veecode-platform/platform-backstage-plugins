import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
    },
    box: {
      margin: theme.spacing(2),
      width: '100%',
    },
    field: {
      display: 'flex',
      justifyContent: 'space-between',
      minWidth: '100%',
      marginBottom: '1rem',
    },
    emptyField:{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    },
    input: {
      minWidth: '90%',
    },
  }));