import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles( theme => ({
    content:{
      minHeight: '60vh'
     },
     categoryLabel:{
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
     },
     card: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing(4),
      borderRadius: '8px',
      border: `1px solid ${theme.palette.action.focus}`,
     },
     cardHeader:{
      width:'100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.primary.main,
     },
     cardTitle:{
      color: theme.palette.primary.main,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
     },
     description:{
      textAlign: 'center', 
     },
     cardEdit:{
      
     },
     cardIcon:{
      width: '60px',
      height: '60px',
      objectFit: 'cover',
      borderRadius: '5px'
     },
     button:{
      border: `1px solid ${theme.palette.primary.main}`,
      width: '380px',
      padding: theme.spacing(1)
     }
  }));