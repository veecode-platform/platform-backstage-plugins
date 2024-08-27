import { makeStyles } from "@material-ui/core";

export const useModalStyles = makeStyles((theme) => ({ 
    modal: {
      width: '100%',
      padding: '4rem',
      borderTop: `1px solid ${theme.palette.divider}`,
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1rem'
    },
    InputField:{
      width:'100%'
    },
    footer: {
      padding: '0 1.5rem 1.8rem 0'
    }
  }));