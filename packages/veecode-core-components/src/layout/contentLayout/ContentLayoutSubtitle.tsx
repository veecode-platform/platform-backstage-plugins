import { makeStyles } from "@mui/styles";
import React from "react";
import { themeVariables } from "../../utils/constants/themeVariables";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface ContentLayoutSubtitleProps {
    subtitle: string
}

const useContentLayoutSubtitleStyles = makeStyles({
  subtitleBox: {
    backgroundColor: themeVariables.colors.darkGrey,
    color: themeVariables.colors.white,
    borderRadius: '5px',
    order: '3',
    width: 'auto',
    padding: '.5rem',
    marginTop: '.2rem',
  },
});

export const ContentLayoutSubtitle : React.FC<ContentLayoutSubtitleProps> = ({subtitle})=>{
    const { subtitleBox } = useContentLayoutSubtitleStyles();
    return(
        <Box className={subtitleBox} component="div">
            <Typography variant="subtitle2">
                {subtitle}
            </Typography>
        </Box>
    )
}