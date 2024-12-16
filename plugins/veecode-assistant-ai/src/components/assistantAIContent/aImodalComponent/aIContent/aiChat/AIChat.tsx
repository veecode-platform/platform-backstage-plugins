import React from "react";
import { Button, ChatBubble } from "../../../../shared";
import { Typography } from "@material-ui/core";
import { useAIChatStyles } from "./styles";
import type { AIChatProps } from "./types";
import { useVeecodeAssistantAIContext } from "../../../../../context/veecodeAssistantAIProvider";

export const AIChat : React.FC<AIChatProps> = (props) => {

    const [ loading, setLoading ] = React.useState<boolean>(false);  // TODO Loading > Remove useState and apply useAsync
    const { handleChat } = useVeecodeAssistantAIContext();
    const { closeModal } = props;
    const { root, footer, buttonGroup } = useAIChatStyles();

    const clearHistoryAndExit = () => {
      closeModal();
      handleChat();
    };

    React.useEffect(()=>{
      setLoading(true);
      setTimeout(()=>{
        setLoading(false)
      },4000)
    },[])

    return(
        <div className={root}>
          <ChatBubble robot loading={loading}>
            <>
              <Typography variant="body1">
                This Message will be generate for openAI.
              </Typography>
              <div className={footer}>
                <Typography variant="body1">
                  Do you want to commit the changes to your repository?
                </Typography>
                <Button variant="primary">Create Pull Request</Button>
              </div>
            </>
          </ChatBubble>
         {loading ? null : (
           <div className={buttonGroup}>
           <Button variant="secondary" onClick={handleChat}> New Analysis </Button>
           <Button variant="danger" onClick={ clearHistoryAndExit }>Exit</Button>
         </div>
         )}
        </div>
    )
}