import { makeStyles } from "@material-ui/core";

export const useFeedbackComponentStyles = makeStyles(theme=>({
    root:{
        width: '40%',
        minWidth: '300px',
        borderRadius:'5px',
        backgroundColor: theme.palette.background.default,
        position: 'absolute',
        border: `2px solid ${theme.palette.grey[600]}`,
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        padding: '2rem',
        flexDirection: 'column'
    },
    content:{
        width: '100%',
        padding: '3rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    animation:{
        position: 'absolute',
        left: '10%'
    }
}))