import { Backdrop, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { themeVariables } from "../../utils/constants/themeVariables";

export interface FeedbackRootProps {
    open: boolean,
    onClose?: () => void,
    children: React.ReactNode
}

const useFeedbackRootStyles = makeStyles({
  root: {
    zIndex: '9999999999999999',
    backdropFilter: 'blur(8px)',
    '-webkit-backdrop-filter': 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1rem',
  },
  content: {
    width: 'auto',
    maxWidth: '80%',
    minWidth: '600px',
    height: 'auto',
    padding: '1rem',
    backgroundColor: themeVariables.background.main,
    border: `1px solid ${themeVariables.border.main}`
  },
});

export const FeedbackRoot : React.FC<FeedbackRootProps> = ({open,onClose,children}) => {
    const { root,content } = useFeedbackRootStyles();
    return (
        <Backdrop
         className={root}
         open={open}
         onClick={onClose}
        >
         <Box component="div" className={content}>
            {children}
         </Box>
        </Backdrop>
    )
} 