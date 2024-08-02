import React from 'react';
import { makeStyles } from "@material-ui/core";

const useLoadingStyles = makeStyles({
    root: {
        width: '28px',
        height: '28px', 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loader: {
        width: '26px',
        height: '26px',
        border: '2px solid #cdcdcd42',
        borderBottomColor: '#eab308',
        borderRadius: '50%',
        display: 'inline-block',
        boxSizing: 'border-box',
        animation: '$rotation 1s linear infinite',
    },
    '@keyframes rotation': {
        '0%': {
            transform: 'rotate(0deg)'
        },
        '100%': {
            transform: 'rotate(360deg)'
        }
    },
    circle: {
        backgroundColor: '#eab308',
        borderRadius: '50%',
        width: '14px',
        height: '14px',
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
            transform: 'translate(-50%, -50%) scale(1.05)' 
        }
    }
});

export const Loading = () => {
    const { root, loader, circle } = useLoadingStyles();

    return (
        <div className={root}>
            <span className={loader}> </span>
            <span className={circle}> </span>
        </div>
    );
};
