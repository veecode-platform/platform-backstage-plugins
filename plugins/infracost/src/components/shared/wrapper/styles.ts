import { makeStyles } from "@material-ui/core";

export const useWrapperStyles = makeStyles(theme=>({
    root: {
        backgroundColor: theme.palette.background.default,
        padding: '1.5rem',
        borderRadius: '5px',
        border: `1px solid ${theme.palette.grey[700]}`
    }
}));