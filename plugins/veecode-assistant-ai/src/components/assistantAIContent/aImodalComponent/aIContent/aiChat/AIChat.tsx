import React from "react";
import { Button, ChatBubble } from "../../../../shared";
import { Typography } from "@material-ui/core";
import { useAIChatStyles } from "./styles";
import type { AIChatProps } from "./types";
import { useVeecodeAssistantAIContext } from "../../../../../context/veecodeAssistantAIProvider";

export const AIChat : React.FC<AIChatProps> = (props) => {

    const { handleChat } = useVeecodeAssistantAIContext();
    const {} = props;
    const { root, footer, buttonGroup } = useAIChatStyles();

    return(
        <div className={root}>
          <ChatBubble robot>
             <Typography variant="body1">
              This Message will be generate for openAI.
             </Typography>
             <div className={footer}>
               <Typography variant="body1">
                Do you want to commit the changes to your repository?
               </Typography>
               <Button variant="primary">Create Pull Request</Button>
             </div>
          </ChatBubble>
          <div className={buttonGroup}>
            <Button variant="secondary" onClick={handleChat}> New Analysis </Button>
            <Button variant="danger">Exit</Button>
          </div>
        </div>
    )
}