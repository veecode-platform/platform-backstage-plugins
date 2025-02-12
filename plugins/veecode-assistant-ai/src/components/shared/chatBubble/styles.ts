import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useChatBubbleStyles = makeStyles(theme => ({
    root:{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '1rem',
    },
    loadingContent:{
        marginTop: '-1.5rem',
        marginLeft: '-.8rem'
    },
    bubble:{
        border: `1px solid ${themeVariables.border.main}`,
        boderRadius: '20px',
        padding: '3rem',
        backgroundColor: themeVariables.background.main
    },
    aiBubble:{
        borderRadius: '0px 20px 20px 20px'
    },
    avatar:{
        width: '60px',
        height: '60px',
        borderRadius: '50px',
        padding: '.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        backgroundColor: themeVariables.colors.black,
        border: `1px solid ${themeVariables.border.main}`,
    },
    avatarImg:{
        width: '75%',
        objectFit: 'cover'
    },
    content:{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            width: '60vw'
           }
    }
}))