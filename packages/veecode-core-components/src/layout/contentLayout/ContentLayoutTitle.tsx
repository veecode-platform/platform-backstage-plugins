import { makeStyles } from "@mui/styles";
import React from "react";
import Typography from "@mui/material/Typography";

export interface ContentLayoutTitleProps {
    title: string
}

const useContenLayoutTitleStyles = makeStyles({
  titleStyle: {
        order: '2',
        width: '100%',
        alignSelf: 'flex-start',
      }  
});

export const ContentLayoutTitle : React.FC<ContentLayoutTitleProps> = ({title}) => {
    const { titleStyle } = useContenLayoutTitleStyles();
    return (
      <Typography 
       variant="h5" 
        className={titleStyle}>
            {title}
      </Typography>)
}