import { makeStyles } from "@material-ui/core";

export const usePageLayoutStyles = makeStyles( theme => ({
    wrapper : {
        backgroundColor: theme.palette.grey[900],
        minHeight: '100vh'
    },
    content: {
        padding: '4rem 1.5rem',
        height: '70vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '1rem',
        flexWrap: 'wrap',
        position: 'relative',
    },
    footerContent: {
        position: 'absolute',
        bottom: '5%',
        right: '2%'
    }
}))