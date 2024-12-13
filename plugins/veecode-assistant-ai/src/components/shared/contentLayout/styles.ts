import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useContentLayoutStyles = makeStyles({
    root:{
        width: '100%',
        height: '100%',
        backgroundColor: themeVariables.background.main,
        borderRadius: '8px',
        border: `1px solid ${themeVariables.border.main}`,
    },
    titleBar:{
        width: '100%',
        margin: 'auto',
        display: 'flex',
        padding: '1rem 2rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${themeVariables.border}`,
        position: 'relative'
    },
    titleContent:{
        borderLeft: `3px solid ${themeVariables.colors.main}`,
        padding: '0 1rem'
    },
    logo:{
        width: '220px'
    },
    body:{
        padding: '1rem 2rem',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: themeVariables.background.dark,
        justifyContent: 'center'
    }
})