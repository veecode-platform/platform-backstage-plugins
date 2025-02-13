import React from "react";
import type { AIContentProps } from "./types";
import { ContentLayout, LoadingProgress } from "../../../shared";
import { AIOptions } from "./aiOptions";
import { useVeeContext } from "../../../../context/veeProvider";
import { saveEntityInfo } from "../../../../context/state";
import { AIChat } from "./aiChat";
import { useAIContentStyles } from "./style";
import useAsync from "react-use/esm/useAsync";

export const AIContent : React.FC<AIContentProps> = (props) => {

    const [ loadingState, setLoadingState ] = React.useState<boolean>(false);
    const { engine, location, projectName,toggleDialog } = props; 
    const { entityInfoDispatch, entityInfoState, showChat, getFilesFromRepoAndCreateVectorStore } = useVeeContext();
    const { content } = useAIContentStyles();

    React.useEffect(()=>{
      setLoadingState(true);
      if(engine && location && projectName){
          entityInfoDispatch(saveEntityInfo({
            engine,
            location,
            projectName
          }));
      }
      setLoadingState(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[engine,location,projectName]);


    const { value: vectorStoreId, loading, error } = useAsync(async()=>{
      const response = await getFilesFromRepoAndCreateVectorStore();
      return response
    },[entityInfoState]);


    if(loadingState) return (
      <div className={content}>
        <LoadingProgress/>
      </div>
    )

    return ( 
          <ContentLayout
            title="Analyzer Source"
            >
             { showChat ? 
             <AIChat closeModal={toggleDialog} /> 
             : (
              <AIOptions 
                loading={loading || !vectorStoreId?.vectorStoreId && !error}
                error={error}
                />
             )}
           </ContentLayout>
           )
}