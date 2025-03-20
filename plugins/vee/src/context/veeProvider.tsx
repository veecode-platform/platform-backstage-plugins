/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { VeeContext } from "./veeContext";
import { 
    EntityInfoReducer, 
    FixedOptionSelectedReducer, 
    FixedOptionsReducer, 
    initialEntityInfoState, 
    initialFixedOptionSelectedState, 
    initialFixedOptionsState, 
    initialInstructionsState, 
    initialPluginSelectedState, 
    initialPluginsState, 
    initialPullRequestState, 
    initialStackSelectedState, 
    initialStacksState, 
    InstructionsReducer, 
    PluginSelectedReducer,
    PluginsReducer, 
    PullRequestInfoReducer, 
    saveFixedOptions, 
    saveFixedOptionSelected, 
    savePlugins, 
    savePluginSelected, 
    savePullRequestInfo, 
    saveStacks, 
    saveStackSelected, 
    StackSelectedReducer, 
    StacksReducer } from "./state";
import { 
    alertApiRef, 
    errorApiRef, 
    useApi } from '@backstage/core-plugin-api';
import { veeApiRef } from "../api/veeApi";
import { 
    CreateFixedOptionsParams,
    CreatePluginParams, 
    CreateStackParams, 
    FileContent, 
    IFixedOptions, 
    IPlugin, 
    IStack } from "@veecode-platform/backstage-plugin-vee-common";

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
    const [ allStacksState, allStackDispatch ] = React.useReducer(StacksReducer, initialStacksState);
    const [ stackSelectedState, stackSelectedDispatch ] = React.useReducer(StackSelectedReducer, initialStackSelectedState);
    const [ allPluginsState, allPluginsDispatch ] = React.useReducer(PluginsReducer, initialPluginsState);
    const [ allFixedOptionsState, allFixedOptionsDispatch] = React.useReducer(FixedOptionsReducer,initialFixedOptionsState);
    const [ fixedOptionSelectedState, fixedOptionselectedDispatch ] = React.useReducer(FixedOptionSelectedReducer, initialFixedOptionSelectedState);
    const [ pluginSelectedState, pluginSelectedDispatch ] = React.useReducer(PluginSelectedReducer, initialPluginSelectedState);
    const [ instructionsState, instructionsDispatch ] = React.useReducer(InstructionsReducer, initialInstructionsState);
    const api = useApi(veeApiRef);
    const errorApi = useApi(errorApiRef);
    const alertApi = useApi(alertApiRef);

    const handleChat = () => setShowChat(!showChat);

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
    };

    const getTemplateFilesAndCreateVectorStore = async (source:string, templateName:string, engine: string = "openAI") => {
        try{
             const { files, structure } = await api.cloneRepo(source);
             const response = await api.submitTemplate(engine, files, templateName);
             setVectorStoreId(response.vectorStoreId);
             setProjectStructure(structure);
             return response
        }
        catch(error:any){ 
            throw new Error(error);
        }
    }

    const templateChat = async (templateName: string, prompt: string, engine: string = "openAI") => {
        try{
            if(vectorStoreId && projectStructure){
              const response = await api.getChatForTemplate(engine,vectorStoreId,prompt,templateName, projectStructure);
              setAssistantId(response.assistantId);
              setThreadId(response.threadId);
              dispatchPullRequestInfo(savePullRequestInfo({title: response.title, message: response.message}))
              return {
                title: response.title,
                analysis: response.message,
                files: response.generatedFiles,
              }
            }
            return null
        }
        catch(error:any){
            errorApi.post(error);
            return null
        }
    }

    const clearTemplateHistory = async (engine:string="openAI")=> {
        try{
            if(vectorStoreId && assistantId && threadId){
                await api.clearTemplateHistory(engine,vectorStoreId, assistantId, threadId);
            }
            return
        }
        catch(error:any){
            errorApi.post(error);
        }
    };

    /**
    * stacks
    */
    const listAllStacks = React.useCallback( async ()=>{
        try{
             const response = await api.listStacks();
             allStackDispatch(saveStacks(response))
             return response
            }
            catch(err:any){
              errorApi.post(err.message);
              return []
            }
        },[api]);

    const getStackById = React.useCallback(async (id:string) => {
        try{
            const response = await api.getStackById(id)
            return response
        }
        catch(err:any){
            errorApi.post(err.message);
            return null;
        }    
    },[api]);

    const createStack = React.useCallback(async(stackData : CreateStackParams)=>{
        try{
            const newStack = await api.createStack(stackData);
            await listAllStacks();
            alertApi.post({message: newStack.message, severity: 'success', display: 'transient'});
        }
        catch(err:any){
            errorApi.post(err.message);
        }
    
    },[api]);

    const updateStack = React.useCallback( async(id:string, updateData: IStack)=>{
        try{
         const response = await api.editStack({id, ...updateData});
         await listAllStacks();
         alertApi.post({message: response.message, severity: 'success', display: 'transient'});
        }
        catch(err:any){
          errorApi.post(err.message);
        }
     },[api]);
 
     const removeStack = React.useCallback(async (stackId: string) => {
         try{
            const response = await api.removeStack(stackId);
            await listAllStacks();
            alertApi.post({message: response.message, severity: 'success', display: 'transient'});
         }
         catch(err:any){
           errorApi.post(err.message);
         }
     }, [api]);
 
     const addStackSelected = React.useCallback((stack:IStack)=>{
      stackSelectedDispatch(saveStackSelected(stack))
     },[stackSelectedState]);

    /**
     * plugins
     */

    const listAllPlugins = React.useCallback( async ()=>{
        try{
             const plugins = await api.listPlugins();
             allPluginsDispatch(savePlugins(plugins));
             return plugins
            }
            catch(err:any){
              errorApi.post(err.message);
              return []
            }

        },[api]);
    
    const getPluginById = React.useCallback(async (id:string) => {
        try{
            const plugin = await api.getPluginById(id);
            return plugin
        }
        catch(err:any){
            errorApi.post(err.message);
            return null;
        }    
    },[api]);

    const addPlugin = React.useCallback(async(pluginData : CreatePluginParams)=>{
        try{
            const newPlugin = await api.addPlugin(pluginData);
            await listAllPlugins();
            alertApi.post({message: newPlugin.message, severity: 'success', display: 'transient'});
        }
        catch(err:any){
            errorApi.post(err.message);
        }
    
    },[api]);
    
    const updatePlugin = React.useCallback( async(id:string, updateData: IPlugin)=>{
       try{
        const response = await api.editPlugin({id, ...updateData});
        await listAllPlugins();
        alertApi.post({message: response.message, severity: 'success', display: 'transient'});
       }
       catch(err:any){
         errorApi.post(err.message);
       }
    },[api]);

    const removePlugin = React.useCallback(async (pluginId: string) => {
        try{
           const response = await api.removePlugin(pluginId);
           await listAllPlugins();
           alertApi.post({message: response.message, severity: 'success', display: 'transient'});
        }
        catch(err:any){
          errorApi.post(err.message);
        }
    }, [api]);

    const addPluginSelected = React.useCallback((plugin:IPlugin)=>{
      pluginSelectedDispatch(savePluginSelected(plugin))
    },[pluginSelectedState]);

    /**
    * Fixed options
    */
    const listAllFixedOptions = React.useCallback( async ()=>{
        try{
           const response = await api.listAllFixedOptions();
           allFixedOptionsDispatch(saveFixedOptions(response))
           return response;
        }catch(err:any){
            errorApi.post(err.message);
            return []
        }     
    },[api])

    const getFixedOptionById = React.useCallback(async (id:string) => {
        try{
            const response = await api.getFixedOptionById(id)
            return response
        }
        catch(err:any){
            errorApi.post(err.message);
            return null;
        }    
    },[api]);

    const createFixedOption = React.useCallback(async(fixedOptionData : CreateFixedOptionsParams)=>{
        try{    
            // eslint-disable-next-line no-console
            console.log("FIXED_OPTION_DATA >>>> ",fixedOptionData)
            const newFixedOption = await api.createFixedOption(fixedOptionData);
            await listAllFixedOptions();
            alertApi.post({message: newFixedOption.message, severity: 'success', display: 'transient'});
        }
        catch(err:any){
            errorApi.post(err.message);
        }
    },[api]);

    const updateFixedOption = React.useCallback( async(id:string, updateData: IFixedOptions)=>{
        try{
         // eslint-disable-next-line no-console
         console.log(`ESSE é O ID >> ${id} e esse os dados ${updateData}`)
         const response = await api.editFixedOption({id, ...updateData});
         await listAllFixedOptions();
         alertApi.post({message: response.message, severity: 'success', display: 'transient'});
        }
        catch(err:any){
          errorApi.post(err.message);
        }
     },[api]);
 
     const removeFixedOption = React.useCallback(async (fixedOptionId: string) => {
         try{
            const response = await api.removeFixedOption(fixedOptionId);
            await listAllFixedOptions();
            alertApi.post({message: response.message, severity: 'success', display: 'transient'});
         }
         catch(err:any){
           errorApi.post(err.message);
         }
     }, [api]);

     const addFixedOptionSelected = React.useCallback((fixedOption:IFixedOptions)=>{
        fixedOptionselectedDispatch(saveFixedOptionSelected(fixedOption))
       },[stackSelectedState]);

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
            clearHistory,
            getTemplateFilesAndCreateVectorStore,
            templateChat,
            clearTemplateHistory,
            allStacksState,
            listAllStacks,
            getStackById,
            createStack,
            updateStack,
            removeStack,
            addStackSelected,
            stackSelectedState,
            allPluginsState,
            listAllPlugins,
            getPluginById,
            addPlugin,
            updatePlugin,
            removePlugin,
            addPluginSelected,
            pluginSelectedState,
            instructionsState,
            instructionsDispatch,
            listAllFixedOptions,
            getFixedOptionById,
            createFixedOption,
            updateFixedOption,
            removeFixedOption,
            addFixedOptionSelected,
            allFixedOptionsState,
            fixedOptionSelectedState
         }}
        >
            {children}
        </VeeContext.Provider>
    )
};

export const useVeeContext = () => React.useContext(VeeContext)