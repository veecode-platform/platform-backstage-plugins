import { makeStyles } from "@material-ui/core";

export const usePluginListStyles = makeStyles(theme=>({
    wrapper:{
       paddingTop: theme.spacing(4),
       background: theme.palette.background.paper
    },
    emptyContent:{
     minWidth: '100%',
     minHeight: '60vh',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
    }
 }));