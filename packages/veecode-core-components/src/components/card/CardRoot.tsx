import { makeStyles } from "@mui/styles";
import React from "react";
import { themeVariables } from "../../utils/constants/themeVariables";
import { Box, Card } from "@mui/material";
import { Link } from "@backstage/core-components/*";

export interface CardRootProps {
    path: string,
    children: React.ReactNode
};

const useCardRootStyles = makeStyles({
  link: {
    textDecoration: 'none !important',
  },
  root: {
    width: '500px',
    height: '100%',
    padding: '1rem',
    borderRadius: '5px',
    backgroundColor: themeVariables.background.main,
    border: `1px solid ${themeVariables.border.main}`,
    cursor: 'pointer',
    transition: 'all 0.5s ease-in-out',
    '&:hover': {
      border: `1px solid ${themeVariables.colors.main}`,
      backgroundColor: themeVariables.background.secondary,
      transition: 'all 0.5s ease-in',
    },
  },
  card: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '.5rem 0',
  },
});

export const CardRoot : React.FC<CardRootProps> = ({path,children}) => {
    const { root,card } = useCardRootStyles();
    return (
        <Card className={root}>
          <Box className={card}>
            {children}
          </Box>
        </Card>
    );
}