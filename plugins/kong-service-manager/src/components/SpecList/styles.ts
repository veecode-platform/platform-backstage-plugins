import { makeStyles } from "@material-ui/core";

export const useSpecListStyles = makeStyles(theme => ({
    content:{
        width: '100%',
        minHeight: '65vh',
        backgroundColor: theme.palette.background.default,
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        gap: '2rem'
    },
    noSpec: {
        width: '100%',
        padding: '2rem'
    }
}))