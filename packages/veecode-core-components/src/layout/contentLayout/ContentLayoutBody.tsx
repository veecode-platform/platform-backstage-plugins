import React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { themeVariables } from "../../utils/constants/themeVariables";

export interface ContentLayoutBodyProps {
    children: React.ReactNode;
    styleCustom?: string
}

const useContentLayoutBodyStyles = makeStyles({
  body: {
    padding: '2.5rem 2rem',
    minHeight: '75vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: themeVariables.background.dark,
    color: themeVariables.colors.white,
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    '&::-webkit-scrollbar': {
      width: '6px',
      backgroundColor: themeVariables.background.dark,
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: `inset 0 0 5px ${themeVariables.blur.dark}15`,
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: themeVariables.border.main,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: themeVariables.background.secondary,
      cursor: 'pointer',
    },
  },
});

export const ContentLayoutBody : React.FC<ContentLayoutBodyProps> = ({children,styleCustom}) => {
    const {body} = useContentLayoutBodyStyles();
    return(
        <Box component="section" className={`${body} ${styleCustom ?? ''}`}>
            {children}
        </Box>
    )
}