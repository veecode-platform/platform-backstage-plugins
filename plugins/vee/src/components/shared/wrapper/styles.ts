import { makeStyles } from "@material-ui/core";

export const useWrapperStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.grey[900],
        minHeight: '100vh'
    }
}));