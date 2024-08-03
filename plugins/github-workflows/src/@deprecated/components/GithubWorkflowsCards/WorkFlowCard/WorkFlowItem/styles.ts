import { makeStyles } from "@material-ui/core";

export const useWorkflowItemStyles = makeStyles(theme => ({
    workflow: {
      padding: '.8rem 3rem',
      background: 'transparent',
      border: `1px solid ${theme.palette.border}`,
      borderRadius: '30px',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      color: theme.palette.text.primary,
      minWidth: '235px',
      minHeight: '56px'
    },
    name:{
      cursor: 'pointer'
    },
    clickable: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '.7rem'
    }
  }));