import { makeStyles } from "@material-ui/core";

export const useModalStyle = makeStyles(theme=>({
   modalOnBlur:{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
   },
   modalContent:{
    backgroundColor: theme.palette.background.default,
    backdropFilter: 'blur(13.5px)',
    '-webkit-backdrop-filter':'blur(13.5px)',
    width: '60%',
    height: '80%',
    padding: '1rem',
    borderRadius: '8px',
    border: `1px solid ${theme.palette.background.paper}`,
    overflowY:'auto'
   },
   modalHeader:{
    width: '100%',
    padding: '.8rem',
    borderBottom: `2px solid ${theme.palette.divider}`
   },
   subtitle:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '.5rem',
    '& time':{
        fontWeight: 'bold'
    }
   },
   jobsList:{
    width: '100%',
    '& > li:nth-child(odd)':{
     backgroundColor: theme.palette.background.paper
    }
   },
   jobListItem:{
    width: '100%',
    height: '56px'
   },
   AccordionLogs:{
    marginTop: '.5rem',
    padding: '.5rem',
    backgroundColor: theme.palette.background.paper
   },
   button: {
    order: -1,
    marginRight: 0,
    marginLeft: '-20px',
    },
    modalLog: {
        display: 'flex',
        alignItems: 'center',
        width: '85%',
        height: '85%',
        justifyContent: 'center',
        margin: 'auto',
    },
    normalLogContainer: {
        height: '75vh',
        width: '100%',
    },
    modalLogContainer: {
        height: '100%',
        width: '100%',
    },
    log: {
       backgroundColor: theme.palette.background.default,
    },
}));