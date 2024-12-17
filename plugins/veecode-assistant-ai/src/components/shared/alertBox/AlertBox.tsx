import React from "react";
import { AlertBoxProps, AlertBoxWrapperProps } from "./types";
import { useAlertBoxStyles } from "./styles";
import { Box, Typography } from "@material-ui/core";


const AlertBoxWrapper : React.FC<AlertBoxWrapperProps> = (props) => {
    const { root } = useAlertBoxStyles();
    const { children, style } = props;
    return (
        <Box className={`${root} ${style}`}>
        <Typography variant="body2">
            {children}
        </Typography>
    </Box>
    )
}

export const AlertBox : React.FC<AlertBoxProps> = (props) => {
  
    const { variant, message } = props;
    const { errorStyle, warningStyle } = useAlertBoxStyles();

    if(variant === "error") return <AlertBoxWrapper style={errorStyle}><span>❌</span>{message}</AlertBoxWrapper>

    if(variant === "warning") return <AlertBoxWrapper style={warningStyle}><span>⚠️</span>{message}</AlertBoxWrapper>

    return null
}