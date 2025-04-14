import React from "react";
import Box from "@mui/material/Box"
import makeStyles from "@mui/styles/makeStyles";
import { themeVariables } from "../../utils/constants/themeVariables";

export interface ContentLayoutRootProps {
    children: React.ReactNode
}

const useContentLayoutStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: themeVariables.background.main,
    borderRadius: '8px',
    border: `1px solid ${themeVariables.border.main}`,
  },
});

export const ContentLayoutRoot: React.FC<ContentLayoutRootProps> = ({children}) => {
  const { root } = useContentLayoutStyles();
  return <Box className={root}>{children}</Box>;
};