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
        width: '40%',
        minWidth: '300px',
        borderRadius:'5px',
        backgroundColor: themeVariables.background.main,
        position: 'absolute',
        border: `2px solid ${theme.palette.grey[600]}`,
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        padding: '2rem',
        flexDirection: 'column',

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
    }
}))