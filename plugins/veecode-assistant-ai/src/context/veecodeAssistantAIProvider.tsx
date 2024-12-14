import React from "react";
import { VeeCodeAssistantAIContext } from "./veecodeAssistantAIContext";
import { EntityInfoReducer, initialEntityInfoState } from "./state";

interface VeecodeAssistantAIProviderProps {
    children: React.ReactNode
}

export const VeecodeAssistantAIProvider: React.FC<VeecodeAssistantAIProviderProps> = ({children}) => {
    
    const [ vectorStoreId, setVectorStoreId ] = React.useState<string|null>(null);
    const [ assistantId, setAssistantId ] = React.useState<string|null>(null);
    const [ threadId, setThreadId ] = React.useState<string|null>(null);
    const [ showChat, setShowChat ] = React.useState<boolean>(false);
    const [ entityInfoState, entityInfoDispatch ] = React.useReducer(EntityInfoReducer, initialEntityInfoState);

    const handleChat = () => {
        setShowChat(!showChat)
      }

    return (
        <VeeCodeAssistantAIContext.Provider 
         value={{
            vectorStoreId,
            setVectorStoreId,
            assistantId,
            setAssistantId,
            threadId,
            setThreadId,
            showChat,
            handleChat,
            entityInfoState,
            entityInfoDispatch       
         }}
        >
            {children}
        </VeeCodeAssistantAIContext.Provider>
    )
};

export const useVeecodeAssistantAIContext = () => React.useContext(VeeCodeAssistantAIContext)