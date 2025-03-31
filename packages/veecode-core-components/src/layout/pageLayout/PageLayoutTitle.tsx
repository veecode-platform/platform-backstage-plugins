import { makeStyles } from "@mui/styles";
import React from "react";
import Typography from "@mui/material/Typography";

export interface PageLayoutTitleProps {
    title: string
}

const usePageLayoutTitleStyles = makeStyles({
  titleStyle: {
        order: '2',
        width: '100%',
        alignSelf: 'flex-start',
      }  
});

export const PageLayoutTitle : React.FC<PageLayoutTitleProps> = ({title}) => {
    const { titleStyle } = usePageLayoutTitleStyles();
    return (
      <Typography 
       variant="h5" 
        className={titleStyle}>
            {title}
      </Typography>)
}