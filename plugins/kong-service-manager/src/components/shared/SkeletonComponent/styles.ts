import { makeStyles } from "@material-ui/core";

export const useSkeletonStyles = makeStyles(theme=>({
    listComponent:{
      backgroundColor: '#1E1E1E05',
      height: '100%',
      minHeight: '65vh',
      margin:'.5rem',
  
    },
    listItemWrapper:{
      width: '100%',
      '&:nth-child(odd)':{
        background: theme.palette.background.default
      }
    },
    listItem:{
      width: '100%',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'flex-start',
    },
    itemValue: {
      width: '70%',
    },
    id:{
      width: '50%',
      height: '56px'
    },
    normal:{
      width: '50%',
      height: '32px',
    },
    tags:{
      width: '50%',
      height: '88px'
    }
  }));