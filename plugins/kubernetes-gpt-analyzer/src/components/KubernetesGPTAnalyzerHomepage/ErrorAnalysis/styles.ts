import { makeStyles } from "@material-ui/core";

export const useErrorAnalysisStyles = makeStyles(theme=>({
    container:{
        width: '95%',
        height: '100%',
        minHeight: '60vh',
        margin: 'auto'
    },
    infoBar:{
        width: '100%',
        margin: '2rem 0',
        padding: '1rem',
        borderRadius:'5px',
        backgroundColor: '#818FD920',
        color: theme.palette.text.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '1rem'
    },
    content:{
        width: '100%',
        padding: '.5rem',
        margin: 'auto',
        display: 'grid',
        gridTemplate: 'auto / 1fr 1fr',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '1rem',
        [theme.breakpoints.down('md')]: {
           gridTemplate: 'auto / 1fr',
        }
    }
}))