import { makeStyles } from "@material-ui/core";

export const useKubernetesGPTAnalyzerCardStyles = makeStyles(theme => ({
    title: {
      paddingLeft: '1.5rem',
      fontSize: '1.5rem',
      display: 'flex',
      alignItems: 'center'
    },
    options:{   
      width: '100%',
      padding:'1rem'
    },
    loadingComponent:{
      width:'100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '.3rem 0'
    },
    cardHeader:{
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    notificationIcon:{
      color: theme.palette.text.secondary
    },
    cardBody: {
      width: '95%',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '2rem 1rem',
      gap: '1.5rem',
      overflow: 'auto',
      borderTop: `1px solid ${theme.palette.divider}`,
      '&::-webkit-scrollbar': {
        width: '10px',
        height: '4px'
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '50px',
        background: theme.palette.grey[600],
  
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
        height: '2px'
      }
    },
    info: {
      width: '100%',
      textAlign: 'center'
    },
    content:{
      padding: '.8rem 3rem',
      background: '#A1A1A110',
      boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
      border: `1px solid ${theme.palette.border}`,
      borderRadius: '30px',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      color: theme.palette.text.primary,
      minWidth: '235px',
      cursor: 'pointer',
    }
  
  }));