import { makeStyles } from "@mui/styles";
import React from "react";
import { themeVariables } from "../../utils/constants/themeVariables";
import { Tooltip, Typography } from "@mui/material";

export interface OptionCardSubtitleProps {
    subtitle: string;
}

const useOptionCardSubtitleStyles = makeStyles({
  subtitleStyle: {
    color: themeVariables.colors.main,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '300px',
  },
});

export const OptionCardSubtitle : React.FC<OptionCardSubtitleProps> = ({ subtitle }) => {
    const { subtitleStyle } = useOptionCardSubtitleStyles();
    return (
      <Tooltip title={subtitle} placement="right-start" arrow>
        <Typography
          variant="subtitle1"
          component="div"
          className={subtitleStyle}
        >
          {subtitle}
        </Typography>
      </Tooltip>
    );
}