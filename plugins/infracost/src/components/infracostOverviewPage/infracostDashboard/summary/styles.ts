import { makeStyles } from "@material-ui/core";

export const useSummaryStyles = makeStyles({
    infoStyle:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '.5rem'
    },
    listStyle:{
        marginLeft: '-1rem',
        minHeight: '10vh'
    }
})