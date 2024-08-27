import { makeStyles } from "@material-ui/core";

export const useAllJobsComponentStyles = makeStyles(theme => ({
    title: {
      paddingLeft: '1.5rem',
      fontSize: '1.5rem',
      display: 'flex',
      alignItems: 'center'
    },
    options:{
      padding: '0 0 1rem 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem'
    },
    buttonRefresh:{
      marginTop: '10%'
    },
    loadingComponent:{
      width:'100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '.3rem 0'
    },
    item:{
      maxWidth: '100% !important',
      overflow: 'hidden',
      background: 'red'
    },
    workflowsGroup: {
      width: '95%',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'flex-start',
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
  
  }));