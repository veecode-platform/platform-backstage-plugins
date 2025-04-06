import { makeStyles } from "@mui/styles";
import React from "react";
import { themeVariables } from "../../utils/constants/themeVariables";
import { Typography } from "@mui/material";

export interface OptionCardDescriptionProps {
    description: string
}

const useOptionCardDescriptionStyles = makeStyles({
  descriptionStyle: {
    color: themeVariables.colors.white,
  }
})

export const OptionCardDescription : React.FC<OptionCardDescriptionProps> = ({ description }) => {
    const { descriptionStyle } = useOptionCardDescriptionStyles();
    return (
      <Typography variant="body2" component="div" className={descriptionStyle}>
        {description}
      </Typography>
    );
}