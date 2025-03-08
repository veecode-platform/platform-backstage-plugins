import { makeStyles } from "@material-ui/core";

export const usePageLayoutStyles = makeStyles({
    content: {
        padding: '4rem 1.5rem',
        height: '75vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '.5rem',
        flexWrap: 'wrap',
        position: 'relative',
    },
    footerContent: {
        position: 'absolute',
        bottom: '5%',
        right: '2%'
    }
})