import React from "react";
import { VeeContext } from "./veeContext";
import { EntityInfoReducer, initialEntityInfoState, initialPullRequestState, PullRequestInfoReducer, savePullRequestInfo } from "./state";
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { veeApiRef } from "../api/veeApi";
import { FileContent } from "@veecode-platform/backstage-plugin-vee-common";

interface VeeProviderProps {
    children: React.ReactNode
}

export const VeeProvider: React.FC<VeeProviderProps> = ({children}) => {
    
    const [ vectorStoreId, setVectorStoreId ] = React.useState<string|null>(null);
    const [ assistantId, setAssistantId ] = React.useState<string|null>(null);
    const [ threadId, setThreadId ] = React.useState<string|null>(null);
    const [ showChat, setShowChat ] = React.useState<boolean>(false);
    const [ projectStructure, setProjectStructure] = React.useState<string|null>(null);
    const [ promptValue, setPromptValue ] = React.useState<string|null>(null);
    const [ pullRequestInfoState, dispatchPullRequestInfo ] = React.useReducer(PullRequestInfoReducer, initialPullRequestState);
    const [ entityInfoState, entityInfoDispatch ] = React.useReducer(EntityInfoReducer, initialEntityInfoState);
    const api = useApi(veeApiRef);
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
              dispatchPullRequestInfo(savePullRequestInfo({title: response.title, message: response.message}))
              return {
                title: response.title,
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
            if(vectorStoreId && entityInfoState && pullRequestInfoState){
                const { location } = entityInfoState;
                const { title, message } = pullRequestInfoState;
                const response = await api.saveChangesInRepository(files,location,title, message);
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
        <VeeContext.Provider 
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
        </VeeContext.Provider>
    )
};

export const useVeeContext = () => React.useContext(VeeContext)