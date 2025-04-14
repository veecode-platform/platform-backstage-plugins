import React from "react";
import { makeStyles } from "@mui/styles";
import { themeVariables } from "../../utils/constants/themeVariables";
import { AlertBoxRoot } from "./AlertBoxRoot";
import { SuccessAnimation } from "../../animations";
import { Typography } from "@mui/material";
import { AlertBoxProps } from "./AltertBox";

const useAlertBoxSuccessStyles = makeStyles({
  content: {
    backgroundColor: themeVariables.background.success,
    borderLeft: `3px solid ${themeVariables.colors.success}`,
    color: themeVariables.colors.white,
    position: 'relative'
  },
});

export const AlertBoxSuccess : React.FC<AlertBoxProps> = ({open, variant,children}) => {
    const { content } = useAlertBoxSuccessStyles();
    return (
      <AlertBoxRoot styles={content} open={open} variant={variant} icon={SuccessAnimation}>
        <Typography variant="body2">
          {children}
        </Typography>
      </AlertBoxRoot>
    );
}