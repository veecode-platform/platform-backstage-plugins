import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
    },
    box: {
      margin: theme.spacing(2),
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column',
      gap:'1rem'
    },
    label:{
      color: theme.palette.text.primary
    },
    field: {
      display: 'flex',
      justifyContent: 'space-between',
      minWidth: '100%',
    },
    newField:{
      width: '100%',
      display: 'flex',
      justifyContent: 'justify-content',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      borderRadius: '8px',
      background: theme.palette.background.default
    },
    labelAndField:{
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1rem',
    },
    emptyField:{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    },
    defaultField:{
      width: '100%',
      fontSize: '1.2rem',
      padding: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: theme.palette.divider
    },
    addField:{
      width: 'auto',
      color: theme.palette.link,
      padding: '.5rem 1rem',
      border: `1px solid ${theme.palette.link}`,
      marginBottom: '1rem'
    },
    input: {
      minWidth: '95%',
    },
  }));