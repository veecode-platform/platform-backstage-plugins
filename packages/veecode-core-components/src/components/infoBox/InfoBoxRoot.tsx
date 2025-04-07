import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

export interface InfoBoxRootProps {
    children: React.ReactNode
};

const useInfoBoxRootStyles = makeStyles({
    root: {
        width: '100%',
        fontSize: '1rem',
        borderRadius: '8px',
        background: '#60a5fa40',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '.5rem',
        marginBottom: '1rem',
    }
});

export const InfoBoxRoot : React.FC<InfoBoxRootProps> = ({children}) => {
    const { root } = useInfoBoxRootStyles();
    return <Box component="div" className={root}>{children}</Box>
};