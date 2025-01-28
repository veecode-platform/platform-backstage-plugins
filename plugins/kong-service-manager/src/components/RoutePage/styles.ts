import { makeStyles } from "@material-ui/core";

export const useServicePageStyles = makeStyles(theme=>({
    root:{
      position: 'relative'
    },
    backButton:{
      position: 'absolute',
      right: '20px',
      top: '10px',
      'z-index': '999999999999999999999999999',
      backgroundColor: theme.palette.link,
      color: theme.palette.background.default,
      padding: '.8rem 1rem',
      width: 'auto',
      transition: 'all .5s ease-in-out both',
      '&:hover':{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.linkHover,
        transition: 'all .5s ease-in both'
      }
    },
    cardTabstyle:{
      backgroundColor: theme.palette.background.paper,
      height: '65px',
      padding: '.5rem'
    },
  }));