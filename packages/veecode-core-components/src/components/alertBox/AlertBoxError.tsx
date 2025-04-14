import { makeStyles } from "@mui/styles";
import React from "react";
import { themeVariables } from "../../utils/constants/themeVariables";
import { AlertBoxRoot } from "./AlertBoxRoot";
import { ErrorAnimation } from "../../animations";
import { Typography } from "@mui/material";
import { AlertBoxProps } from "./AltertBox";

const useAlertBoxErrorStyles = makeStyles({
  content: {
    backgroundColor: themeVariables.background.danger,
    borderLeft: `3px solid ${themeVariables.colors.danger}`,
    color: themeVariables.colors.white,
    position: 'relative'
  },
});

export const AlertBoxError : React.FC<AlertBoxProps> = ({open,variant,children}) => {
    const { content } = useAlertBoxErrorStyles();
    return (
        <AlertBoxRoot open={open} variant={variant} styles={content} icon={ErrorAnimation}>
          <Typography>
            {children}
          </Typography>
       </AlertBoxRoot>
    )
}