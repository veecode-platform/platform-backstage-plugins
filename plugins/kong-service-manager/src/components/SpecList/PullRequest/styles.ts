import { makeStyles } from "@material-ui/core";

export const usePullRequestStyles = makeStyles(theme => ({
    root:{
        backgroundColor: theme.palette.background.default,
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px'
    },
    pullRequestCard:{
        backgroundColor: `${theme.palette.background.paper}85`,
        minHeight: '50vh',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
    },
    input:{
        backgroundColor: theme.palette.background.paper
    },
    cancel:{
        backgroundColor: theme.palette.grey[700],
        color: theme.palette.text.primary,
        '&:hover':{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
       }
    },
    submit:{
        backgroundColor: theme.palette.link,
        color: theme.palette.background.default,
        '&:hover':{
            backgroundColor: theme.palette.linkHover,
            color: theme.palette.background.default,
       }
    },
    footer:{
        paddingTop: '2rem',
        alignSelf: 'flex-end',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
    }
}));