import React from "react";
import { makeStyles } from "@mui/styles";
import { themeVariables } from "../../utils/constants/themeVariables";
import { AlertBoxRoot } from "./AlertBoxRoot";
import { WarningAnimation } from "../../animations";
import { Typography } from "@mui/material";
import { AlertBoxProps } from "./AltertBox";

const useAlertBoxWarningStyles = makeStyles({
  content: {
    width: '100%',
    backgroundColor: themeVariables.background.warning,
    borderLeft: `3px solid ${themeVariables.colors.warning}`,
    color: themeVariables.colors.white,
    position: 'relative'
  }
});

export const AlertBoxWarning : React.FC<AlertBoxProps> = ({open, variant, children}) => {
    const { content } = useAlertBoxWarningStyles();
    return (
       <AlertBoxRoot styles={content} open={open} variant={variant} icon={WarningAnimation}>
         <Typography variant="body2">
            {children}
         </Typography>
       </AlertBoxRoot>
    )
}