import { makeStyles } from "@material-ui/core";

export const useErrorCardStyles = makeStyles(theme=>({
    card:{
        width: '95%',
        maxWidth: '1200px',
        margin: 'auto',
        padding: '2.5rem 3rem',
        backgroundColor: theme.palette.background.paper,
        // border: `1px solid ${theme.palette.grey[200]}`,
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
        borderRadius:'5px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    cardTitle:{
        position: 'relative',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        marginLeft: '2rem'
    },
    footer:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    button:{
        padding: '.8rem',
    }
}))