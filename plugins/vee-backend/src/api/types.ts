import { DefaultResponse, FileContent, IChat } from "@veecode-platform/backstage-plugin-vee-common";

export interface IVeeClient{
    submitDataToVectorStore({
        engine,
        repoName, 
        files
       }: SubmitDataToVectorStoreParams
       ): Promise<{
        vectorStoreId: string;
        status: string;
        message: string;
    }>,
    chat({
       engine,
       vectorStoreId,
       prompt,
       repoName,
       repoStructure
     }:ChatParams
    ): Promise<IChat>,
    clearHistory({
        engine,
        vectorStoreId, 
        assistantId,
        threadId
    }: ClearHistoryParams
    ): Promise<DefaultResponse>
};

export type SubmitDataToVectorStoreParams = {
    engine: string,
    repoName: string,
    files: FileContent[]
}

export type ChatParams = {
    engine:string, 
    vectorStoreId: string, 
    prompt: string, 
    repoName:string, 
    repoStructure:string
    isTemplate?:boolean,
    useDataset?:boolean
}

export type ClearHistoryParams = {
    engine:string,
    vectorStoreId: string, 
    assistantId: string, 
    threadId: string
}