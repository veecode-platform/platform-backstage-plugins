import React from "react";
import { VeeCodeAssistantAIContext } from "./veecodeAssistantAIContext";
import { EntityInfoReducer, initialEntityInfoState } from "./state";
import { errorApiRef, useApi,alertApiRef } from '@backstage/core-plugin-api';
import { veecodeAssistantAIApiRef } from "../api/veeCodeAssistantAIApi";

interface VeecodeAssistantAIProviderProps {
    children: React.ReactNode
}

export const VeecodeAssistantAIProvider: React.FC<VeecodeAssistantAIProviderProps> = ({children}) => {
    
    const [ vectorStoreId, setVectorStoreId ] = React.useState<string|null>(null);
    const [ assistantId, setAssistantId ] = React.useState<string|null>(null);
    const [ threadId, setThreadId ] = React.useState<string|null>(null);
    const [ showChat, setShowChat ] = React.useState<boolean>(false);
    const [ entityInfoState, entityInfoDispatch ] = React.useReducer(EntityInfoReducer, initialEntityInfoState);
    const api = useApi(veecodeAssistantAIApiRef);
    const errorApi = useApi(errorApiRef);
    const AlertApi = useApi(alertApiRef);

    const handleChat = () => {
        setShowChat(!showChat)
      };

    const submitRepoAndCreateVectorStore =  async (engine:string,repoName:string,location:string) => {
        try{
            const response = await api.submitRepo(engine,repoName,location)
            AlertApi.post({
                message: response.message,
                severity: 'success',
                display: 'transient',
              });
            return {
                vectorStoreId: response.vectorStoreId
            }
        }
        catch(error:any){
            errorApi.post(error);
            return null
        }
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
            entityInfoDispatch,
            submitRepoAndCreateVectorStore       
         }}
        >
            {children}
        </VeeCodeAssistantAIContext.Provider>
    )
};

export const useVeecodeAssistantAIContext = () => React.useContext(VeeCodeAssistantAIContext)