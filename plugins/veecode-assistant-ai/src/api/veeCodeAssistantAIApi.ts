import { createApiRef } from "@backstage/core-plugin-api";
import { ClearHistoryResponse, FileContent, InitializeAssistantAIResponse, PullRequestResponse, SubmitRepoResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export const veecodeAssistantAIApiRef = createApiRef<VeeCodeAssistantAIApi>({
    id: 'plugin.veecodeassistantai'
});

export interface VeeCodeAssistantAIApi {
    getRepoFiles(location:string): Promise<File[]>,
    submitRepo(engine: string | undefined, files: File[], repoName: string): Promise<SubmitRepoResponse>,
    getChat(engine: string | undefined, vectorStoreId: string, prompt: string): Promise<InitializeAssistantAIResponse>,
    clearHistory(engine: string | undefined, vectorStoreId: string, assistantId: string, threadId: string): Promise<ClearHistoryResponse>,
    saveChangesInRepository(files: FileContent[], engine: string | undefined, vectorStoreId: string, location: string): Promise<PullRequestResponse>
}