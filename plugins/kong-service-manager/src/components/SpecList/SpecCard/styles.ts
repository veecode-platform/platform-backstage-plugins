import { makeStyles } from "@material-ui/core";

export const useSpecCardStyles = makeStyles(theme=>({
    root:{
        width: '100%',
        borderRadius: '5px',
        padding: '1rem 1.5rem',
        background: theme.palette.background.paper,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    },
    cardHeader:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 0',
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    cardBody:{
        width: '100%',
        padding: '2rem 0'
    },
    cardFooter:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '.5rem 0'
    }
}))