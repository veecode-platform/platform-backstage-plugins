import { makeStyles } from "@material-ui/core";

export const useSuccessfulAnalysisStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        height: '100%',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content:{
        width: '60%',
        padding: '2rem',
        border: `1px solid ${theme.palette.grey[200]}`,
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
        borderRadius: '0 15px 15px 15px',
        background: theme.palette.background.paper
    },
    header:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        marginBottom: '2rem',
    },
    subtitle:{
      marginLeft: '4rem'
    },
    feedbackBody:{
        minHeight: '30vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    }
}));