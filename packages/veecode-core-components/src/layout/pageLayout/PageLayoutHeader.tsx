import React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { themeVariables } from "../../utils/constants/themeVariables";
import { VeeLogo } from "../../icons/VeeLogo";
import  Divider  from "@mui/material/Divider";

export interface PageLayoutHeaderProps {
    children: React.ReactNode
}

const usePageLayoutHearderStyles = makeStyles({
  header: {
    width: '100%',
    margin: 'auto',
    display: 'flex',
    padding: '.5rem 2rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${themeVariables.border.main}`,
    position: 'relative',
  },
  titleBar: {
    padding: '3rem 1rem',
    color: themeVariables.colors.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '.5rem',
  },
});

export const PageLayoutHeader : React.FC<PageLayoutHeaderProps> = ({children}) => {
    const { header, titleBar } = usePageLayoutHearderStyles();
    return (
      <>
        <Box component="header" className={header}>
          <Box className={titleBar}>{children}</Box>
          <VeeLogo />
        </Box>
        <Divider />
      </>
    );
}