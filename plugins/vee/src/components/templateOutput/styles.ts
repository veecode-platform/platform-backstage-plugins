import makeStyles from '@mui/styles/makeStyles';
import { themeVariables } from '../../utils/constants/theme';


export const useTemplateOutputStyles = makeStyles({
    root:{
        width: "100%",
        height: "100%"
    },
    codeSection:{
        '& span':{
            backgroundColor: `${themeVariables.codeBlock.dark} !important`,
            height: "100% !important"
        }
    },
    footer: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center"
    },
    buttonsGroup: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem"
    }
})