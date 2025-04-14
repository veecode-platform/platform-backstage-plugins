import React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { themeVariables } from "../../utils/constants/themeVariables";
import Typography from "@mui/material/Typography";

export interface ContentLayoutLabelProps {
    label: string
}

const useContentLayoutLabelStyles = makeStyles({
  labelContent: {
    order: '1',
    borderLeft: `3px solid ${themeVariables.colors.main}`,
    padding: '0 1.5rem',
    color: themeVariables.colors.grey,
  },
});

export const ContentLayoutLabel : React.FC<ContentLayoutLabelProps> = ({label}) => {
  const { labelContent } = useContentLayoutLabelStyles();
  return (
    <Box component="span" className={labelContent}>
        <Typography variant="h6">
          {label}
        </Typography>
    </Box>
  )
}