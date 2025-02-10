import React from "react";
import { themeVariables } from "../../../utils/constants/theme";
import { MethodLabelProps } from "./type"
import { Chip } from "@material-ui/core";

export const MethodLabel : React.FC<MethodLabelProps> = (props) => {
   
    const { variant } = props;
    const lowerMethod = variant.toLowerCase();
    const backgroundColor = lowerMethod in themeVariables.methods.background 
      ? themeVariables.methods.background[lowerMethod as keyof typeof themeVariables.methods.background]
      : themeVariables.background.secondary;
    const textColor = lowerMethod in themeVariables.methods.colors 
    ? themeVariables.methods.colors[lowerMethod as keyof typeof themeVariables.methods.colors]
    : themeVariables.colors.dark;
    
    return (
        <Chip
          style={{
            background: backgroundColor,
            color: textColor
          }}
          label={variant}
         />
    )
}