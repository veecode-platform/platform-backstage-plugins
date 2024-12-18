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

   // const [ loadingState, setLoadingState ] = React.useState<boolean>(false);
    const [ repoFiles, setRepoFiles ] = React.useState<File[]>([]);
    const { engine, location, projectName,toggleDialog } = props; 
    const { entityInfoDispatch, entityInfoState, showChat } = useVeecodeAssistantAIContext();
    const { loadingContainer } = useAIContentStyles();
    const { downloadRepoFiles, submitRepoAndCreateVectorStore } = useVeecodeAssistantAIContext();

    React.useEffect(()=>{
      if(engine && location && projectName){
          entityInfoDispatch(saveEntityInfo({
            engine,
            location,
            projectName
          }));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[engine,location,projectName]);

    const { loading: loadingState, error: ErrorLoading } = useAsync(async () => {
     const response = await downloadRepoFiles(location);
     setRepoFiles(response)
    },[])


    const { loading, error } = useAsync(async () => {
     if(repoFiles.length >= 1){
      // await submitRepoAndCreateVectorStore(repoFiles);
      // eslint-disable-next-line no-console
      console.log(repoFiles)
     }
    },[entityInfoState])

    if(loadingState) return (
      <div className={loadingContainer}>
        <LoadingProgress/>
      </div>
    )

    if(ErrorLoading) return <h1>Houve um erro</h1> // TODO

    return ( 
          <ContentLayout
            title="Analyzer Source"
            >
             { showChat ? 
             <AIChat closeModal={toggleDialog} /> 
             : (
              <AIOptions 
                loading={loading}
                error={error}
                />
             )}
           </ContentLayout>
           )
}