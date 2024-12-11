import { makeStyles } from "@material-ui/core";

export const useAssistantAIStyles = makeStyles(theme=>({
    assistant:{
        width: '80px',
        height: '80px',
        backgroundColor: '#00000055',
        padding: '1.5rem',
        border: `solid 2px #87F3CF`,
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
            border: `solid 2px ${theme.palette.border}`,
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
        },
    icon:{
        color: '#87F3CF',
        width: '100%',
        maxWidth: '30px'
    }
}))