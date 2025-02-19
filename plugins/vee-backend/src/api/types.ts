import { DefaultResponse, FileContent, IChat } from "@veecode-platform/backstage-plugin-vee-common";

export interface IVeeClient{
    submitDataToVectorStore(engine:string, repoName: string, files: FileContent[]): Promise<{
        vectorStoreId: string;
        status: string;
        message: string;
    }>,
    chat(engine:string, vectorStoreId: string, prompt: string, repoName:string, repoStructure:string): Promise<IChat>,
    clearHistory(engine:string,vectorStoreId: string, assistantId: string, threadId: string): Promise<DefaultResponse>
};

