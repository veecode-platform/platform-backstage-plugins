import { makeStyles } from "@material-ui/core";

export const useRoutesListStyles = makeStyles(theme=>({
    content:{
      background: theme.palette.background.paper,
      height: '100%',
      minHeight: '65vh',
      margin:'.5rem',
    },
  }))