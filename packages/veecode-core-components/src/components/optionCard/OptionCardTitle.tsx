import { makeStyles } from "@mui/styles";
import React from "react";
import { themeVariables } from "../../utils/constants/themeVariables";
import { Typography } from "@mui/material";


export interface OptionCardTitleProps {
    title: string
}

const useOptionCardTitleStyles = makeStyles({
  titleStyle: {
    color: themeVariables.colors.white,
  },
});

export const OptionCardTitle : React.FC<OptionCardTitleProps> = ({ title }) => {
    const { titleStyle } = useOptionCardTitleStyles();
    return (
        <Typography component="div" variant="h5" className={titleStyle}>
            {title}
        </Typography>
    )
}