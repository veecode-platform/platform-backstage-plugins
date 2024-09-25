import { makeStyles } from "@material-ui/core";

export const useMenuOptionsStyles = makeStyles(theme => ({
    listComponent: {
     height: '100%',
     minHeight: '70vh',
     [theme.breakpoints.down('md')]: {
       display: 'flex',
       minHeight: 'auto',
      }
    },
    link:{
     color: theme.palette.text.primary,
     textDecoration: 'none',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
    },
    activeLink:{
     borderRadius: '8px',
     color: theme.palette.text.primary,
     background: theme.palette.background.paper,
     '&:before': {
       content: '""',
       width: '3px',
       height: '30px',
       backgroundColor: theme.palette.link,
       borderRadius: '3px',
       position: 'absolute',
       left: 0,
       [theme.breakpoints.down('md')]: {
        backgroundColor: 'transparent'
       },
     },
    },
    listItem: {
     cursor: 'pointer',
     height: '64px',
     fontWeight: 700,
     borderRadius: '8px',
     paddingLeft: theme.spacing(4),
     '&:hover':{
         background: '#CDCDCD90',
     },
     [theme.breakpoints.down('md')]: {
       minWidth: '165px',
      },
      [theme.breakpoints.down('sm')]: {
        minWidth: '100px',
       },
      [theme.breakpoints.down('xs')]: {
        minWidth: '115px',
       }
    }
 }));