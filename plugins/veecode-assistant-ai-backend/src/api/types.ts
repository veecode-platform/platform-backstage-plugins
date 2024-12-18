import { DefaultResponse, IChat } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export interface IVeeCodeAssistantAIClient{
    submitDataToVectorStore(engine:string, repoName: string, files: File[]): Promise<{
        vectorStoreId: string;
        status: string;
        message: string;
    }>,
    chat(engine:string, vectorStoreId: string, prompt: string): Promise<IChat>,
    clearHistory(engine:string,vectorStoreId: string, assistantId: string, threadId: string): Promise<DefaultResponse>
};

