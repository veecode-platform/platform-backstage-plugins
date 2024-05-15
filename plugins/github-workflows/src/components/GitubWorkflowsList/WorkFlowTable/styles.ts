import { makeStyles } from "@material-ui/core";

export const useWorkflowTableStyles = makeStyles(theme => ({
    title:{
      paddingLeft: '2rem',
      fontSize: '1.5rem',
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      width: '40px',
      },
    options:{
      position: 'absolute',
      top: '0%',
      right: '5%',
      background: 'transparent',
      borderRadius: '30px',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.border,
    },
    action: {
      width: '90%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '.8rem'
    },
    source: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem'
    },
    clickable:{
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
    },
  }));