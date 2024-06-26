import { makeStyles } from "@material-ui/core";

export const useKubernetesGPTAnalyzerWrapperStyles = makeStyles(theme=>({
    container:{
        backgroundColor: '#1E1E1E05',
        borderRadius: '5px',
        border: `1px solid ${theme.palette.grey[700]}`
    },
    titleBar:{
        padding: '1rem 2.5rem',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px 5px 0 0 ',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '1rem',
        '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '6px',
            backgroundColor: theme.palette.linkHover,
            borderRadius: '5px 0 0 0'
        }
    },
    content:{
        minHeight: '68vh',
        paddingBottom: '2rem'
    }
}))