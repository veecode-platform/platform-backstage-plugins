import { makeStyles } from "@material-ui/core";

export const useModalComponentStyles = makeStyles(theme=>({
    modalOnBlur:{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
       },
       modalContent:{
        // backgroundColor: theme.palette.background.default,
        backdropFilter: 'blur(8px)',
        '-webkit-backdrop-filter':'blur(8px)',
        width: '80%',
        height: '100%',
        padding: '1rem',
        borderRadius: '8px',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
        // border: `1px solid ${theme.palette.background.paper}`,
       },
       modalHeader:{
        width: '100%',
        padding: '.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
       },
       closeModal:{
        cursor: 'pointer',
        color: theme.palette.link,
        transition: 'all .5s ease-in-out',
        '&:hover':{
            color: theme.palette.linkHover
        }
       },
       modalBody:{
        width: '95%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '3.5rem',
        margin: '1rem 0',
       },
       loadingContainer:{
        width: '50%',
        marginTop: '-5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
       }
}))