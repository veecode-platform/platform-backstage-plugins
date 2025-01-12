import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useLoadingAnswerStyles = makeStyles(theme => ({
    loadingContent: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    loadingAnalysis: {
        minWidth: '25vw',
        marginLeft: '.8rem',
        marginTop: '1.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        position: 'relative',
        gap: '2rem',
        border: `1px solid ${themeVariables.border.main}`,
        borderRadius: '0px 20px 20px 20px',
        padding: '2.5rem 3rem',
        backgroundColor: themeVariables.background.main,
        [theme.breakpoints.down('md')]: {
            minWidth: '35vw',
           }
    },
    analysisText: {
        animation: `$fadeInOut 2s infinite`,
    },
    "@keyframes fadeInOut": {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
    },
}));
