import React from "react";
import { VeeCodeAssistantAIContext } from "./veecodeAssistantAIContext";
import { EntityInfoReducer, initialEntityInfoState } from "./state";
import { errorApiRef, useApi,alertApiRef } from '@backstage/core-plugin-api';
import { veecodeAssistantAIApiRef } from "../api/veeCodeAssistantAIApi";
import { FileContent } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

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

    const submitRepoAndCreateVectorStore =  async () => {
        try{
            if(entityInfoState){
             const {engine, projectName, location} = entityInfoState;
             const response = await api.submitRepo(engine,projectName,location);
             setVectorStoreId(response.vectorStoreId);
             AlertApi.post({
                message: response.message,
                severity: 'success',
                display: 'transient',
              });
            }
        }
        catch(error:any){ 
            throw new Error(error);
        }
    }

    const chat = async (prompt: string) => {
        try{
            if(vectorStoreId && entityInfoState){
              const { engine } = entityInfoState;
              const response = await api.getChat(engine,vectorStoreId,prompt);
              setAssistantId(response.assistantId);
              setThreadId(response.threadId);
              return response
            }
            return null
        }
        catch(error:any){
            errorApi.post(error);
            return null
        }
    }

    const analyzeChangesAndSubmitToRepository = async(files:FileContent[])=>{
        try{
            if(vectorStoreId && entityInfoState){
                const { engine, location } = entityInfoState;
                const response = await api.createPullRequest(files,engine, vectorStoreId, location);
                AlertApi.post({
                    message: response.message,
                    severity: 'success',
                    display: 'transient',
                  });
                return response
            }
            return null
        }
        catch(error:any){
            errorApi.post(error);
            return null
        }
    }

    const clearHistory = async ()=> {
        try{
            if(vectorStoreId && assistantId && threadId && entityInfoState){
                const { engine } = entityInfoState;
                const response = await api.clearHistory(engine,vectorStoreId, assistantId, threadId);
                AlertApi.post({
                    message: response.message,
                    severity: 'success',
                    display: 'transient',
                  });
            }
        }
        catch(error:any){
            errorApi.post(error);
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
            submitRepoAndCreateVectorStore,
            chat,
            analyzeChangesAndSubmitToRepository,
            clearHistory    
         }}
        >
            {children}
        </VeeCodeAssistantAIContext.Provider>
    )
};

export const useVeecodeAssistantAIContext = () => React.useContext(VeeCodeAssistantAIContext)