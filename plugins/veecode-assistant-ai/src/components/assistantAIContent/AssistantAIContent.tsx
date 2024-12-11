import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useAssistantAIStyles } from "./styles";
import StarsIcon from "../../assets/stars.png"

export const AssistantAIContent = () => {

    const { assistant, icon } = useAssistantAIStyles();

    return (
        <Box className={assistant}>
          <span><Typography variant="body1">Analyze your code with AI</Typography></span>
          <img src={StarsIcon} alt="" className={icon}/>
        </Box>
    )
}