import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useChatBubbleStyles = makeStyles(theme => ({
    root:{
        backgroundColor: themeVariables.background.dark,
        border: `1px solid ${themeVariables.border.main}`,
        boderRadius: '10px',
        padding: '3rem',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '2rem'
    },
    aiBubble:{
        borderRadius: '0px 10px 10px 10px'
    },
    avatar:{
        width: '60px',
        height: '50px',
        borderRadius: '50%',
        padding: '.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        backgroundColor: theme.palette.background.default
    },
    avatarImg:{
        width: '100%',
        objectFit: 'cover'
    },
    content:{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    }
}))