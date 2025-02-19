import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../utils/constants/theme";

export const useAssistantAIStyles = makeStyles(theme=>({
    assistant:{
        width: '80px',
        height: '80px',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${themeVariables.colors.main}`,
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
        padding: '1.5rem',
        borderRadius: '50px',
        position: 'absolute',
        bottom: '5%',
        right: '3%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'all .5s ease-in',
        '& span':{
            display: 'none'
        },
        '&:hover':{
            width: '280px',
            transition: 'all .5s ease-in-out',
            borderRadius: '50px 0 50px 50px',
            '& img':{
                animation: '$opacity 2s ease-in'
            },
            '& span':{
                display: 'inline',
                animation: '$opacity 3.8s ease-in'
            }
        },
    },
    '@keyframes opacity':{
            '0%': {
                opacity: '0'
            },
            '100%': {
                opacity: '1'
            }
        }
}))