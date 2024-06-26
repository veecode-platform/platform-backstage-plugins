import { makeStyles } from "@material-ui/core";

export const useTableStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.background.paper,
        borderRadius: '5px',
        border: `1px solid ${theme.palette.grey[700]}`,
        display: 'flex',
        alignItems: 'space-between',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    header:{
        backgroundColor: theme.palette.background.default,
        borderRadius: '5px 5px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
    },
    th:{
        width: '100%',
        textAlign: 'center',
        padding: '1rem',
    },
    tbody:{
        borderRadius: '0 0 5px 5px',
    },
    tr:{
        textAlign: 'center',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // '&:first-child': {
        //     background: 'green'
        //   }
    },
    cell:{
        width: '100%',
        textAlign: 'center',
        padding: '.5rem',
    }
}));