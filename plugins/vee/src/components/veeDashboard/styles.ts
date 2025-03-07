import { makeStyles } from "@material-ui/core";

export const useVeeDashboardStyles = makeStyles( theme => ({
    wrapper : {
        backgroundColor: theme.palette.grey[900],
        minHeight: '100vh'
    },
    content: {
        padding: '4rem 1.5rem',
        height: '65vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '1rem'
    }
}))