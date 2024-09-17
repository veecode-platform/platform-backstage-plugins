import { makeStyles } from "@material-ui/core";

export const useBoxComponentStyles = makeStyles(theme=>({
    container:{
      backgroundColor: theme.palette.background.paper,
      backdropFilter: 'blur(13.5px)',
      '-webkit-backdrop-filter': 'blur(13.5px)',
      border: `1px solid ${theme.palette.grey[700]}`,
      borderRadius: '10px',
    },
    toolbar:{
      paddingBottom: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
      borderBottom: `1px solid  ${theme.palette.grey[700]}`,

    },
    titlebar: {
      flexGrow: 1,
      color: theme.palette.text.primary,
      '&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '6px',
        backgroundColor: theme.palette.linkHover,
        borderRadius: '5px 0 0 0'
    }
    },
    search:{
      position: 'absolute',
      top: '2.5rem'
    },
    buttonToolbar:{
      padding: '0 1em',
      position: 'relative',
      top: '0.5em'
    },
    content:{
      minWidth: '100%',
      height: '100%'
    },
    closeButton:{
      cursor: 'pointer',
      padding: '2rem 0 1rem 0',
      '&:hover':{
        color: theme.palette.link,
        transform: 'scale(1.15)',
        transition: 'all .5s ease-in-out'
      }
    }
  }));
