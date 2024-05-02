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
    '& time':{
        fontWeight: 'bold'
    }
   },
   jobsList:{
    width: '100%',
    '& > li:nth-child(even)':{
     backgroundColor: theme.palette.background.paper
    }
   },
   jobListItem:{
    width: '100%',
    height: '56px'
   }
}));