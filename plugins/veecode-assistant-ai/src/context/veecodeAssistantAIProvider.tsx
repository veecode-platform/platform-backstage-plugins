import React from "react";
import { VeeCodeAssistantAIContext } from "./veecodeAssistantAIContext";
import { EntityInfoReducer, initialEntityInfoState } from "./state";
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
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
    const [ projectStructure, setProjectStructure] = React.useState<string|null>(null);
    const [ promptValue, setPromptValue ] = React.useState<string|null>(null);
    const [ entityInfoState, entityInfoDispatch ] = React.useReducer(EntityInfoReducer, initialEntityInfoState);
    const api = useApi(veecodeAssistantAIApiRef);
    const errorApi = useApi(errorApiRef);

    const handleChat = () => {
        setShowChat(!showChat)
      };

    const getFilesFromRepoAndCreateVectorStore =  async () => {
        try{
            if(entityInfoState){
             const {engine, projectName, location } = entityInfoState;
             const { files, structure } = await api.cloneRepo(location);
             const response = await api.submitRepo(engine, files, projectName);
             setVectorStoreId(response.vectorStoreId);
             setProjectStructure(structure);
              return response
            }
            return null
        }
        catch(error:any){ 
            throw new Error(error);
        }
    }

    const chat = async (prompt: string) => {
        try{
            if(vectorStoreId && entityInfoState && projectStructure){
              const { projectName,engine } = entityInfoState;
              const response = await api.getChat(engine,vectorStoreId,prompt,projectName, projectStructure);
              setAssistantId(response.assistantId);
              setThreadId(response.threadId);
              return {
                analysis: response.message,
                files: response.generatedFiles
              }
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
                const { engine, location, projectName } = entityInfoState;
                const response = await api.saveChangesInRepository(files,location, engine, vectorStoreId,projectName);
                return response
            }
            return null
        }
        catch(error:any){
            errorApi.post(error);
            return {
                status: 'error',
                link: '',
                message: 'There was an error trying to save the changes'
                }
        }
    }

    const clearHistory = async ()=> {
        try{
            if(vectorStoreId && assistantId && threadId && entityInfoState){
                const { engine } = entityInfoState;
                await api.clearHistory(engine,vectorStoreId, assistantId, threadId);
            }
            return
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
            getFilesFromRepoAndCreateVectorStore,
            chat,
            setPromptValue,
            promptValue,
            analyzeChangesAndSubmitToRepository,
            clearHistory    
         }}
        >
            {children}
        </VeeCodeAssistantAIContext.Provider>
    )
};

export const useVeecodeAssistantAIContext = () => React.useContext(VeeCodeAssistantAIContext)