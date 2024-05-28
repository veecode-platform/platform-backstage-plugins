import { makeStyles } from "@material-ui/core";

export const useHomepageStyles = makeStyles(theme=>({
    content:{
      [theme.breakpoints.down('md')]: {
        minWidth: '60vw',
        overflowX: 'scroll'
       }
    },
    divider: {
      borderRight: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.down('md')]: {
        borderRight: `1px solid transparent`
       }
    }
  }))