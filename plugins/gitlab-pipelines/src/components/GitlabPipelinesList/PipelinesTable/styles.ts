import { makeStyles } from "@material-ui/core";

export const usePipelinesTableStyles = makeStyles(theme => ({
    title:{
      paddingLeft: '2rem',
      fontSize: '1.5rem'
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
      justifyContent: 'center',
      gap: '1rem',
      color: theme.palette.border,
    },
    item: {
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
    action:{
      height: "100%",
      marginTop: "1.5rem",
      display: "flex",
      justifyContent: "center"
    }
  }));