
import React from "react";
import { Content } from "@backstage/core-components/index";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export interface PageLayoutRootProps {
    children: React.ReactNode
}

const usePageLayoutRootStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[900],
    minHeight: '100vh',
  }
}));

export const PageLayoutRoot : React.FC<PageLayoutRootProps> = ({children}) => {
  const { root } = usePageLayoutRootStyles();
  return <Content className={root}> {children} </Content>
}