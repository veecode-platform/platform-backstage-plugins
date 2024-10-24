import { makeStyles } from "@material-ui/core";

export const useChartStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    blur: {
        '& svg': {
            '& > g:first-of-type': {
                opacity: '0.8 !important', 
            },
        },
    },
    btn: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 3,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        padding: '1rem',
        color: theme.palette.info.main,
        fontSize: '2rem',
        [theme.breakpoints.down('md')]: {
            top: '-70%',
            left: '0'
        }
    },
}));
