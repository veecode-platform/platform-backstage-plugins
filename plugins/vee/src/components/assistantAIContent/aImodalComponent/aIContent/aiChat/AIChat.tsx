import React from "react";
import { Button, ChatBubble, FeedbackComponent, MarkdownRenderer } from "../../../../shared";
import { CircularProgress, Typography } from "@material-ui/core";
import { useAIChatStyles } from "./styles";
import type { AIChatProps } from "./types";
import { useVeeContext } from "../../../../../context/veeProvider";
import useAsync from "react-use/esm/useAsync";
import { FileContent } from "@veecode-platform/backstage-plugin-vee-common";
import { addPullRequestResponse, initialPullRequestResponseState, PullRequestResponseReducer } from "./state";

export const AIChat : React.FC<AIChatProps> = (props) => {
    
    const [LoadingPullRequest, setLoadingPullRequest ] = React.useState<boolean>(false);
    const [ showFeedback, setShowFeedback ] = React.useState<boolean>(false); 
    const [ pullRequestResponseState, pullRequestResponseDispatch ] = React.useReducer(PullRequestResponseReducer,initialPullRequestResponseState);
    const { handleChat, chat, promptValue, analyzeChangesAndSubmitToRepository, clearHistory } = useVeeContext();
    const { closeModal } = props;
    const { root, chatContent, footer, buttonGroup, spinner, creatingPr } = useAIChatStyles();

    const clearHistoryAndExit = () => {
      clearHistory();
      closeModal();
      handleChat();
    };

    const preparePullRequest = async (files: FileContent[]) => {
      if(files.length > 0) {
        setLoadingPullRequest(true)
        const response = await analyzeChangesAndSubmitToRepository(files);
        if (response) {
          pullRequestResponseDispatch(addPullRequestResponse({
            status: response.status === "ok" ? 'success':'error',
            message: response.message,
            link: response.link
          }));
          setShowFeedback(true);
        }
      }
    }

    const { value: chatResponse, loading, /* error */ } = useAsync(async()=>{  
        const response = await chat(promptValue!);
        return {
          analysisText: response?.analysis ?? 'The code could not be analyzed, please try again...',
          files: response?.files ?? []
        } 
    },[promptValue]);
    

    return(
       <>
        <div className={root}>
          <div className={chatContent}>
            <ChatBubble robot loading={loading}>
                <MarkdownRenderer markdown={chatResponse?.analysisText!} />
                {(chatResponse && chatResponse.files.length > 0) && (
                  <div className={footer}>
                    <Typography variant="body1">
                      Do you want to commit the changes to your repository?
                    </Typography>
                    <Button  
                      disabled={LoadingPullRequest} 
                      variant='primary'
                      onClick={() => preparePullRequest(chatResponse.files)}
                      >
                      {LoadingPullRequest ? 
                        (<span className={creatingPr}>
                          <CircularProgress className={spinner} size={20} color="inherit" /> 
                             Creating ...
                        </span>) 
                        : (<>Create Pull Request</>)}  
                    </Button>
                  </div>
                )}
            </ChatBubble>
          </div>
         {( loading || LoadingPullRequest) ? null : (<div className={buttonGroup}>
            <Button variant="secondary" onClick={handleChat}> New Analysis </Button>
            <Button variant="danger" onClick={ clearHistoryAndExit}>Exit</Button>
          </div>
         )}
        </div>

        {showFeedback && 
            (<FeedbackComponent 
              variant={pullRequestResponseState!.status} 
              message={pullRequestResponseState!.message} 
              actions={
                <>
                <Button variant="secondary" onClick={handleChat}> New Analysis </Button>
                <Button variant="danger" onClick={ clearHistoryAndExit}>Exit</Button>
                </>
              }
              />)}
       </>
    )
}