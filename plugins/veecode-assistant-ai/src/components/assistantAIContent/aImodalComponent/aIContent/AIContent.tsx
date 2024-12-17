import React from "react";
import type { AIContentProps } from "./types";
import { ContentLayout, LoadingProgress } from "../../../shared";
import { AIOptions } from "./aiOptions";
import { useVeecodeAssistantAIContext } from "../../../../context/veecodeAssistantAIProvider";
import { saveEntityInfo } from "../../../../context/state";
import { AIChat } from "./aiChat";
import { useAIContentStyles } from "./style";
import useAsync from "react-use/esm/useAsync";

export const AIContent : React.FC<AIContentProps> = (props) => {

    const [ loadingState, setLoadingState ] = React.useState<boolean>(false);
    const { engine, location, projectName,toggleDialog } = props; 
    const { entityInfoDispatch, entityInfoState, showChat } = useVeecodeAssistantAIContext();
    const { loadingContainer } = useAIContentStyles();
    const { submitRepoAndCreateVectorStore } = useVeecodeAssistantAIContext();

    React.useEffect(()=>{
      setLoadingState(true);
      if(engine && location && projectName){
          entityInfoDispatch(saveEntityInfo({
            engine,
            location,
            projectName
          }));
       setTimeout(()=>setLoadingState(false),1000)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[engine,location,projectName]);

    const { loading, error } = useAsync(async () => {
      await submitRepoAndCreateVectorStore();
    },[entityInfoState])

    if(loadingState) return (
      <div className={loadingContainer}>
        <LoadingProgress/>
      </div>
    )

    return ( 
          <ContentLayout
            title="Analyzer Source"
            >
             { showChat ? <AIChat closeModal={toggleDialog} /> : (
              <AIOptions 
                loading={loading}
                error={error}
                />
             )}
           </ContentLayout>
           )
}