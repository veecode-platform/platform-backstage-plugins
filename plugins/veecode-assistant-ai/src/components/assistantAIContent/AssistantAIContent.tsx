import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useAssistantAIStyles } from "./styles";
import StarsIcon from "../../assets/stars.png"
import { AIModalComponent } from "./aImodalComponent";


export const AssistantAIContent = () => {

    const [ showDialog, setShowDialog ] = React.useState<boolean>(false); 
    const { assistant, icon } = useAssistantAIStyles();

    const handleDialog = () => setShowDialog(!showDialog);

    return (
        <>
          { showDialog && (
            <AIModalComponent
            show={showDialog}
            toggleDialog={handleDialog}
           />
          )}
          <Box className={assistant} onClick={handleDialog}>
            <span><Typography variant="body1">Analyze your code with AI</Typography></span>
            <img src={StarsIcon} alt="" className={icon}/>
          </Box>
        </>
    )
}