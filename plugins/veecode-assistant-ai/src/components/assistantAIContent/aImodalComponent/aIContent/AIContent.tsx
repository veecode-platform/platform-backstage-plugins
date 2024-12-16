import React from "react";
import type { AIContentProps } from "./types";
import { ContentLayout } from "../../../shared";
import { AIOptions } from "./aiOptions";
import { useVeecodeAssistantAIContext } from "../../../../context/veecodeAssistantAIProvider";
import { saveEntityInfo } from "../../../../context/state";
import { AIChat } from "./aiChat";

export const AIContent : React.FC<AIContentProps> = (props) => {

    const { engine, location, projectName,toggleDialog } = props; 
    const { entityInfoDispatch, showChat } = useVeecodeAssistantAIContext();

    React.useEffect(()=>{
      if(engine && location && projectName){
          entityInfoDispatch(saveEntityInfo({
            engine,
            location,
            projectName
          }))
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
           <ContentLayout
           title="Analyzer Source"
           >
            { showChat ? <AIChat closeModal={toggleDialog} /> : <AIOptions/>}
          </ContentLayout>
    )
}