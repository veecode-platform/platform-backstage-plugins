import makeStyles from '@mui/styles/makeStyles';
import { themeVariables } from '../../utils/constants/theme';


export const useTemplateOutputStyles = makeStyles({
    root:{
        width: "100%",
        height: "100%"
    },
    codeSection:{
        overflow: "auto !important",
        "&::-webkit-scrollbar": {
        width: "6px",
        height: "4px",
        backgroundColor: themeVariables.background.dark,
        },
        "&::-webkit-scrollbar-track": {
            boxShadow: `inset 0 0 5px ${themeVariables.blur.dark}15`,
            borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
            background: themeVariables.border.main,
        },
        "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: themeVariables.background.secondary,
            cursor: 'pointer'
        },
        '& span':{
            backgroundColor: `${themeVariables.codeBlock.dark} !important`,
            height: "100% !important",
        }
    },
    footer: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        position: "relative"
    },
    buttonsGroup: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
        position: "fixed",
        bottom: "5rem"
    }
})