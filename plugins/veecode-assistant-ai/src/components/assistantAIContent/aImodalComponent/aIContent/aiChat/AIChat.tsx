import React from "react";
import { Button, ChatBubble, MarkdownRenderer } from "../../../../shared";
import { Typography } from "@material-ui/core";
import { useAIChatStyles } from "./styles";
import type { AIChatProps } from "./types";
import { useVeecodeAssistantAIContext } from "../../../../../context/veecodeAssistantAIProvider";
import useAsync from "react-use/esm/useAsync";

export const AIChat : React.FC<AIChatProps> = (props) => {

    const { handleChat, chat, promptValue } = useVeecodeAssistantAIContext();
    const { closeModal } = props;
    const { root, chatContent, footer, buttonGroup } = useAIChatStyles();

    const clearHistoryAndExit = () => {
      closeModal();
      handleChat();
    };

    const { value: analysisText, loading, /* error */ } = useAsync(async()=>{
      
       if(promptValue){
        const response = await chat(promptValue);
        return response?.analysis
       }

       return 'The code could not be analyzed, please try again...'
    
      
    },[promptValue])

    return(
        <div className={root}>
          <div className={chatContent}>
            <ChatBubble robot loading={loading}>
              <>
                <MarkdownRenderer markdown={analysisText!} />
                <div className={footer}>
                  <Typography variant="body1">
                    Do you want to commit the changes to your repository?
                  </Typography>
                  <Button variant="primary">Create Pull Request</Button>
                </div>
              </>
            </ChatBubble>
          </div>
         {loading ? null : (
           <div className={buttonGroup}>
           <Button variant="secondary" onClick={handleChat}> New Analysis </Button>
           <Button variant="danger" onClick={ clearHistoryAndExit }>Exit</Button>
         </div>
         )}
        </div>
    )
}