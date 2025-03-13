import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useFeedbackStyles = makeStyles(theme=>({
    root:{
        zIndex: theme.zIndex.drawer + 1 ,
        backdropFilter: 'blur(8px)',
        '-webkit-backdrop-filter': 'blur(8px)',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem"
    },
    content: {
        width: "auto",
        maxWidth: "80%",
        minWidth: "800px",
        height: "25vh",
        padding: '2rem',
        backgroundColor: themeVariables.background.main,
        border: `1px solid ${themeVariables.border.main}`
    },
    animation: {
        height: '100%',
        position: 'relative',
    },
    textContent: {
        color: themeVariables.colors.white,
        height: '100%',
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start"
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