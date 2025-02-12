import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useAlertBoxStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minWidth: '40vw',
        maxWidth: '45vw',
        padding: '1.2rem 2rem',
        borderRadius: '0 10px 10px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '2rem',
        color: themeVariables.colors.white,
        '& span':{
            marginRight: '1rem'
        },
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
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
}))