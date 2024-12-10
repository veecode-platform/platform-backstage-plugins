import { DefaultResponse, IChat } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export interface IVeeCodeAssistantAIClient{
    submitDataToVectorStore(repoName: string, files: File[]): Promise<{
        vectorStoreId: string;
        status: string;
        message: string;
    }>,
    chat(vectorStoreId: string, prompt: string): Promise<IChat>,
    clearHistory(vectorStoreId: string, assistantId: string, threadId: string): Promise<DefaultResponse>
};

