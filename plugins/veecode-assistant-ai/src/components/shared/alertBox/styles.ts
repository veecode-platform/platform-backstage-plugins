import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useAlertBoxStyles = makeStyles({
    root: {
        width: '100%',
        minWidth: '40vw',
        padding: '1.2rem 2rem',
        borderRadius: '0 10px 10px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '2rem',
        color: themeVariables.colors.white,
        '& span':{
            marginRight: '1rem'
        }
    },
    warningStyle:{
        backgroundColor: 'yellow',
        color: 'black'
    },
    errorStyle:{
        backgroundColor: themeVariables.background.danger,
        color: themeVariables.colors.white
    }
})