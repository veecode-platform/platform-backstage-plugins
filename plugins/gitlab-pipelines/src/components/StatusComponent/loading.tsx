import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useLoadingStyles = makeStyles({
    root: {
        width: '20px',
        height: '20px', 
        position: 'relative',
        background: '#cdcdcd08',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #2F75CB',
        borderRadius: '50%',
        boxSizing: 'border-box',
    },
    circle: {
        width: '14px',
        aspectRatio: '1',
        borderRadius: '50%',
        animation: '$fillClockwise 40s ease-in-out infinite'
    },
    '@keyframes fillClockwise': {
        '0%':   { background: 'conic-gradient(#2F75CB 0, #0000 0)' },
        '12.5%':{ background: 'conic-gradient(#2F75CB 45deg, #0000 46deg)' },
        '25%':  { background: 'conic-gradient(#2F75CB 90deg, #0000 91deg)' },
        '37.5%':{ background: 'conic-gradient(#2F75CB 135deg, #0000 136deg)' },
        '50%':  { background: 'conic-gradient(#2F75CB 180deg, #0000 181deg)' },
        '62.5%':{ background: 'conic-gradient(#2F75CB 225deg, #0000 226deg)' },
        '75%':  { background: 'conic-gradient(#2F75CB 270deg, #0000 271deg)' },
        '87.5%':{ background: 'conic-gradient(#2F75CB 315deg, #0000 316deg)' },
        '100%': { background: 'conic-gradient(#2F75CB 360deg, #0000 360deg)' }
    }
});

export const Loading = () => {
    const { root, circle } = useLoadingStyles();

    return (
        <div className={root}>
            <div className={circle}> </div>
        </div>
    );
};
