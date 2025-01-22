import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useFeedbackComponentStyles = makeStyles(theme=>({
    blur:{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themeVariables.blur.dark,
        backdropFilter: 'blur(8px)',
        '-webkit-backdrop-filter':'blur(8px)',
    },
    root:{
        width: '45%',
        minWidth: '350px',
        borderRadius:'5px',
        backgroundColor: themeVariables.background.main,
        position: 'absolute',
        border: `2px solid ${theme.palette.grey[600]}`,
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        padding: '2rem',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]:{
            minWidth: '90vw'
        }

    },
    content:{
        width: '100%',
        padding: '3rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    animation:{
        position: 'absolute',
        left: '10%'
    },
    btnGroup:{
        width: '80%',
        margin: '2rem auto 0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
    }
}))