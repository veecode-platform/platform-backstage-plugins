import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    paper: {
      width: '50%',
      justifyContent: 'space-between',
      padding: theme.spacing(2.5),
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleBar:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '2rem'
    },
    pluginIcon:{
      width: '50px',
      borderRadius: '3px'
    },
    icon: {
      fontSize: 20
    },
    content: {
      height: '85%',
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      padding: theme.spacing(2),
      marginTop: '1rem'
    },
    form:{
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    input:{
      width: '100%',
      margin: '.5rem 0'
    },
    checkbox:{
      width: '100%',
      margin: '.5rem',
      fontSize: '1.2rem',
    },
    secondaryAction: {
      marginLeft: theme.spacing(2.5),
    },
  }));