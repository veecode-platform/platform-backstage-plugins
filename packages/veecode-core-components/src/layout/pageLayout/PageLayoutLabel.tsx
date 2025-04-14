import React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { themeVariables } from "../../utils/constants/themeVariables";
import Typography from "@mui/material/Typography";

export interface PageLayoutLabelProps {
    label: string
}

const usePageLayoutLabelStyles = makeStyles({
  labelContent: {
    order: '1',
    borderLeft: `3px solid ${themeVariables.colors.main}`,
    padding: '0 1.5rem',
    color: themeVariables.colors.grey,
  },
});

export const PageLayoutLabel : React.FC<PageLayoutLabelProps> = ({label}) => {
  const { labelContent } = usePageLayoutLabelStyles();
  return (
    <Box component="span" className={labelContent}>
        <Typography variant="h6">
          {label}
        </Typography>
    </Box>
  )
}