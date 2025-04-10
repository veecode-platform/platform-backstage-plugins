import React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { themeVariables } from "../../utils/constants/themeVariables";
import  Divider  from "@mui/material/Divider";

export interface ContentLayoutHeaderProps {
    icon: React.ElementType,
    children: React.ReactNode
}

const useContentLayoutHearderStyles = makeStyles({
  header: {
    maxWidth: '100%',
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
    justifyContent: 'flex-start',
    gap: '.5rem'
  },
});

export const ContentLayoutHeader : React.FC<ContentLayoutHeaderProps> = ({icon: Icon,children}) => {
    const { header, titleBar } = useContentLayoutHearderStyles();
    return (
      <>
        <Box component="header" className={header}>
          <Box className={titleBar}>{children}</Box>
          <Icon />
        </Box>
        <Divider />
      </>
    );
}