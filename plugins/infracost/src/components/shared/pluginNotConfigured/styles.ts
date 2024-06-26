import { makeStyles } from "@material-ui/core";

export const usePluginNotConfiguredStyles = makeStyles(theme=>({
    annotation:{
        margin: '.5rem',
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        padding: '0 .3rem',
        borderRadius: '3px'
    }
}))