import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useAssistantAIStyles } from "./styles";
import { AIModalComponent } from "./aImodalComponent";
import { VeeProvider } from "../../context/veeProvider";
import { StarsIcon } from "../../assets/stars";

export const AssistantAIContent = () => {

    const [ showDialog, setShowDialog ] = React.useState<boolean>(false); 
    const { assistant } = useAssistantAIStyles();

    const handleDialog = () => setShowDialog(!showDialog);

    return (
        <VeeProvider>
        { showDialog && (
            <AIModalComponent
              show={showDialog}
              toggleDialog={handleDialog}
              />
          )}
            <Box className={assistant} onClick={handleDialog}>
              <span><Typography variant="body1">Analyze your code with AI</Typography></span>
              <StarsIcon/>
            </Box>
        </VeeProvider>
    )
}