import React from "react";
import { makeStyles } from "@mui/styles";
import { themeVariables } from "../../utils/constants/themeVariables";
import { AlertBoxRoot } from "./AlertBoxRoot";
import { WarningAnimation } from "../../animations";
import { Typography } from "@mui/material";

export interface AlertBoxWarningProps {
    children: string
}

const useAlertBoxWarningStyles = makeStyles({
  content: {
    width: '100%',
    backgroundColor: themeVariables.background.warning,
    borderLeft: `3px solid ${themeVariables.colors.warning}`,
    color: themeVariables.colors.white,
    position: 'relative'
  }
});

export const AlertBoxWarning : React.FC<AlertBoxWarningProps> = ({children}) => {
    const { content } = useAlertBoxWarningStyles();
    return (
       <AlertBoxRoot styles={content} icon={WarningAnimation}>
         <Typography variant="body2">
            {children}
         </Typography>
       </AlertBoxRoot>
    )
}