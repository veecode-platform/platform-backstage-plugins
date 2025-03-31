import React from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";

export interface PageLayoutActionsProps {
    children: React.ReactNode
}

const usePageLayoutActionsStyles = makeStyles({
    footer:{
        position: 'absolute',
        bottom: '5%',
        right: '2%'
    }
});

export const PageLayoutActions : React.FC<PageLayoutActionsProps> = ({children}) => {
    const { footer } = usePageLayoutActionsStyles();
    return (
      <Box component="footer" className={footer}>
        <Grid2 container alignItems="center" justifyContent="flex-end" style={{ gap: '1rem'}}>
            {children}
        </Grid2>
      </Box>)
}