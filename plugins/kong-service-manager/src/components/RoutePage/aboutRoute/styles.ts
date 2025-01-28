import { makeStyles } from "@material-ui/core";

export const useAboutRouteStyles = makeStyles(theme=>({
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
    }
  }));