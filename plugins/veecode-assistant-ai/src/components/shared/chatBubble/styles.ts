import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useChatBubbleStyles = makeStyles({
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
        width: '55px',
        height: '55px',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start'
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
})