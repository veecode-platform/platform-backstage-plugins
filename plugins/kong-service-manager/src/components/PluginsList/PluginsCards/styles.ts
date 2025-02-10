import { makeStyles } from "@material-ui/core";

export const usePluginsCardsStyles = makeStyles( theme => ({
    content:{
      minHeight: '60vh',
      backgroundColor: `${theme.palette.background.default}85`,
      borderRadius: '5px'
     },
     categoryLabel:{
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
     },
     card: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.palette.background.default,
      gap: theme.spacing(4),
      borderRadius: '8px',
      border: `1px solid ${theme.palette.action.focus}`,
      minHeight: '100%',
      boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px'
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
     disabledTitle:{
      color: theme.palette.text.primary,
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
     disabledImg:{
      filter: 'grayscale(100%)',
      opacity: '.5'
     },
     button:{
      border: `1px solid ${theme.palette.primary.main}`,
      width: '100%',
      padding: '.5rem 9rem',
      marginBottom: '.5rem',
      '&:hover':{
        background: theme.palette.primary.main,
        transition: 'all .5s ease-in-out',
        color: theme.palette.background.default
      }
     },
     spinner:{
      color: theme.palette.text.primary,
      marginLeft: '.5rem'
    }
  }));