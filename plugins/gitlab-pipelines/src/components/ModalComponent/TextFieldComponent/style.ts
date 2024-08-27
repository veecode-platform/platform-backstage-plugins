import { makeStyles } from "@material-ui/core";

export const useTextFieldStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
        }
    },
    field: {
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: '100%',
        marginBottom: '1rem',
    },
    input: {
        minWidth: '45%',
    }
}))