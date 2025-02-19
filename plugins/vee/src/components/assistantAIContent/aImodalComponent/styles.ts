import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useAIModalComponentStyles = makeStyles(theme=>({
    modalOnBlur:{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
       },
       modalContent:{
        backgroundColor: themeVariables.blur.dark,
        backdropFilter: 'blur(8px)',
        '-webkit-backdrop-filter':'blur(8px)',
        width: '100%',
        height: '100%',
        padding: '1rem',
        borderRadius: '8px',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
       },
       modalHeader:{
        width: '100%',
        padding: '.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('md')]: {
            padding: '1.2rem .8rem',
            marginBottom: '.5rem'
        },
        
       },
       closeModal:{
        cursor: 'pointer',
        color: themeVariables.colors.main,
        transition: 'all .5s ease-in',
        '&:hover':{
            transition: 'all .5s ease-in-out',
            transform: 'scale(1.1)'
        }
       },
       modalBody:{
        width: '85%',
        margin: 'auto',
        marginTop: '-1.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '3.5rem',
        color: themeVariables.colors.white,
        [theme.breakpoints.down('md')]: {
            width: '95%'
        }
       }
}))