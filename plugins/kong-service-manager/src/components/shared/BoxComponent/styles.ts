import { makeStyles } from "@material-ui/core";

export const useBoxComponentStyles = makeStyles(theme=>({
    container:{
      background: theme.palette.background.paper,
      backdropFilter: 'blur(13.5px)',
      '-webkit-backdrop-filter': 'blur(13.5px)',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: '10px',
    },
    toolbar:{
      paddingBottom: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    titlebar: {
      flexGrow: 1,
      color: theme.palette.text.primary
    },
    search:{
      position: 'absolute',
      top: '2.5rem'
    },
    buttonToolbar:{
      padding: '0 1em',
      position: 'relative',
      top: '0.5em'
    }
  }));