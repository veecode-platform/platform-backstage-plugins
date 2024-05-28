import { makeStyles } from "@material-ui/core";

export const useAboutStyles = makeStyles(theme=>({
    listComponent:{
      background: theme.palette.background.default,
      height: '100%',
      minHeight: '65vh',
      margin:'.5rem',
    },
    listItemWrapper:{
      width: '100%',
      '&:nth-child(even)':{
        background: theme.palette.background.paper
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