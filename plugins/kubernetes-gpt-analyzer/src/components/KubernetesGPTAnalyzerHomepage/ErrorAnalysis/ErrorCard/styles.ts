import { makeStyles } from "@material-ui/core";

export const useErrorCardStyles = makeStyles(theme=>({
    card:{
        minWidth: '100%',
        minHeight: '335px',
        margin: 'auto',
        padding: '2.5rem 3rem !important',
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
        borderRadius:'8px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1.3rem',
        [theme.breakpoints.down('lg')]: {
            minHeight: '375px',
         }
    },
    cardTitle:{
        width: '100%',
        position: 'relative',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottom: `1px solid ${theme.palette.divider}`,
        paddingBottom: '1rem'
    },
    title:{
        marginLeft: '2rem'
    },
    errorBody:{
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
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