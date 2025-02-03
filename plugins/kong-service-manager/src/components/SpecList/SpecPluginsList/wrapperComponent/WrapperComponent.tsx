import React from "react";
import { WrapperComponentProps } from "./types";
import { Box, Typography } from "@material-ui/core";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useWrapperComponentStyles } from "./styles";

export const WrapperComponent : React.FC<WrapperComponentProps> = (props) => {
  const { root, content,titleBar } = useWrapperComponentStyles();
  const { title, buttonBack,handleBack, children } = props;
  return (
    <div className={root}>
      <Box className={content}>
        <div className={titleBar}>
          <Typography variant="h6">{title}</Typography>
          {buttonBack && (
             <RiArrowGoBackFill
               onClick={handleBack}
               size={26}
               color="#CDCDCD"
               style={{ cursor: 'pointer' }}
               title="Go Back"
              />
           )}
        </div>
         {children}
      </Box>
    </div>
  )
}
