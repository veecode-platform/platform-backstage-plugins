import React from "react";
import { makeStyles } from "@mui/styles";
import { themeVariables } from "../../utils/constants/themeVariables";
import { AlertBoxRoot } from "./AlertBoxRoot";
import { InfoAnimation } from "../../animations";
import { Typography } from "@mui/material";

export interface AlertBoxInfoProps {
    children: string
}

const useAlertBoxInfoStyles = makeStyles({
  content: {
    backgroundColor: themeVariables.background.info,
    borderLeft: `3px solid ${themeVariables.colors.info}`,
    color: themeVariables.colors.white,
    position: 'relative'
  },
});

export const AlertBoxInfo : React.FC<AlertBoxInfoProps> = ({children}) => {
    const { content } = useAlertBoxInfoStyles();
    return (
        <AlertBoxRoot styles={content} icon={InfoAnimation}>
         <Typography>
           {children}
          </Typography>
       </AlertBoxRoot>
    )
}