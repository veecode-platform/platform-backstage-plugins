import React from 'react';
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    value: {
        fontWeight: 'bold',
        overflow: 'hidden',
        lineHeight: '24px',
        wordBreak: 'break-word',
    },
    label: {
        color: theme.palette.text.secondary,
        textTransform: 'uppercase',
        fontSize: '10px',
        fontWeight: 'bold',
        letterSpacing: 0.5,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
}));

export const Label = ({title} : {title:string} ) => {
    const classes = useStyles();
    return (
        <Typography variant="h2" className={classes.label}>
            {title}
        </Typography>
    )
}

export const Value = ({content} : {content:string | React.ReactNode}) => {
    const classes = useStyles();
    return (
        <Typography variant="body2" className={classes.value}>
            {content}
        </Typography>
    )
}