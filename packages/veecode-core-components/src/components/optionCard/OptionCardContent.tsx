import { CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react"

export interface OptionCardContentProps {
    children: React.ReactNode
}

const useOptionCardContentStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '.8rem auto'
  },
});

export const OptionCardContent : React.FC<OptionCardContentProps> = ({ children }) => {
    const { content } = useOptionCardContentStyles();
    return (
        <CardContent className={content}>
            {children}
        </CardContent>
    )
}