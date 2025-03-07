import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useMenuOptionCardStyles = makeStyles({
    link:{
        textDecoration: 'none !important'
    },
    root:{
        backgroundColor: themeVariables.background.main,
        padding: '2rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: '10px',
        gap: '.5rem',
        height: '200px',
        border: `1px solid ${themeVariables.background.dark}`,
        transition: 'all .5s ease-in-out',
        '&:hover':{
            background: themeVariables.background.secondary,
            transition: 'all .5s ease-in',
            border: `1px solid ${themeVariables.colors.main}`
        }
    },
    titleBar:{
        color: themeVariables.colors.main
    },
    body:{
        color: themeVariables.colors.white,
        width: '450px'
    }
})