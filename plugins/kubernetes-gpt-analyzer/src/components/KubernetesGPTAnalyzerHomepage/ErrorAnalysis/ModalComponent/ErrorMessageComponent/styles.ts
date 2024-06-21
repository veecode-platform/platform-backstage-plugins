import { makeStyles } from "@material-ui/core";

export const useErrorMessageComponentStyles = makeStyles(theme=>({
    content:{
        alignSelf:'flex-end',
        background: theme.palette.background.paper,
        padding: '2rem',
        width: '75%',
        borderRadius:'20px 0 20px 20px',
        borderRight: `5px solid ${theme.palette.linkHover}`,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '2rem',
        [theme.breakpoints.down('md')]: {
            width: '90%'
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    }
}))