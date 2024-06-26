import { makeStyles } from "@material-ui/core";

export const useOverallStyles = makeStyles(theme=>({
    root:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    header:{
        backgroundColor: theme.palette.background.paper,
        padding: '1rem',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}))