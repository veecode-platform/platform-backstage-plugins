import React from 'react';
import { makeStyles } from "@material-ui/core";

const useQueuedStyles = makeStyles({
    root: {
        width: '28px',
        height: '28px', 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle: {
        backgroundColor: '#eab308',
        borderRadius: '50%',
        width: '15px',
        height: '15px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(1)', 
        animation: '$growUp 1s linear infinite',
    },
    '@keyframes growUp': {
        '0%': {
            transform: 'translate(-50%, -50%) scale(.9)' 
        },
        '100%': {
            transform: 'translate(-50%, -50%) scale(1.08)' 
        }
    }
});

export const Queued = () => {
    const { root, circle } = useQueuedStyles();

    return (
        <div className={root}>
            <span className={circle}> </span>
        </div>
    );
};
