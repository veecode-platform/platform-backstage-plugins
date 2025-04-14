import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

export interface FeedbackActionsProps {
    children: React.ReactNode
}

const useFeedbackActionsStyles = makeStyles({
    btnGroup:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '1rem'
    }
})

export const FeedbackActions : React.FC<FeedbackActionsProps> = ({children}) => {
    const { btnGroup } = useFeedbackActionsStyles();
    return <Box className={btnGroup}>{children}</Box>
}