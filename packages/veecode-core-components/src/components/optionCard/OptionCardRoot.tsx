import React from "react";
import { makeStyles } from "@mui/styles";
import { themeVariables } from "../../utils/constants/themeVariables";
import {Card, Grid } from "@mui/material";

export interface OptionCardRootProps {
    children: React.ReactNode
};

const useOptionCardRootStyles = makeStyles({
  root: {
   width: '500px',
       height: '100%',
       padding: '1rem',
       borderRadius: '5px',
       backgroundColor: `${themeVariables.background.main}`,
       border: `1px solid ${themeVariables.border.main}`,
       cursor: 'pointer',
       transition: 'all 0.5s ease-in-out',
      '&:hover':{
           border: `1px solid ${themeVariables.colors.main}`,
           backgroundColor: themeVariables.background.secondary,
           transition: 'all 0.5s ease-in',
       }
  },
  card: {
    width: '100%',
    height: '100%',
    padding: '.5rem 0'
  },
});

export const OptionCardRoot : React.FC<OptionCardRootProps> = ({children}) => {
    const { root,card } = useOptionCardRootStyles();
    return (
        <Card className={root}>
          <Grid container className={card}>
            {children}
          </Grid>
        </Card>
    );
}
