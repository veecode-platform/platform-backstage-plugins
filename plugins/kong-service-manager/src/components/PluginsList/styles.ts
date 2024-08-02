import { makeStyles } from "@material-ui/core";

export const usePluginListStyles = makeStyles(theme=>({
    wrapper:{
       paddingTop: theme.spacing(4),
    },
    emptyContent:{
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     minHeight: '60vh'
    }
 }));