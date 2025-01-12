import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useButtonStyles = makeStyles({
    root:{
        outline: 'none',
        border: 'none',
        borderRadius: '5px',
        minWidth: '200px',
        padding: '.8rem',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'all .5s ease-in',
        '&:hover':{
            transform: 'scale(1.04)',
            transition: 'all .5s ease-in-out'
        },
        '&:disabled': {
            cursor: 'not-allowed',
            backgroundColor: themeVariables.colors.grey,
            color: themeVariables.colors.dark, 
            opacity: 0.6, 
        }
    },
    primary:{
        backgroundColor: themeVariables.colors.main,
        color: themeVariables.colors.black
    },
    secondary:{
        backgroundColor: themeVariables.colors.grey,
        color: themeVariables.colors.black
    },
    danger:{
        backgroundColor: themeVariables.colors.red,
        color: themeVariables.colors.white
    }
})