import { makeStyles } from "@material-ui/core";

export const useServicePageStyles = makeStyles(theme=>({
    cardTabstyle:{
      backgroundColor: theme.palette.background.paper,
      height: '65px',
      padding: '.5rem'
    },
  }));