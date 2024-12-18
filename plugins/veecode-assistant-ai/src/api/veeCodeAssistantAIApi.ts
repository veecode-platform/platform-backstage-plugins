import { createApiRef } from "@backstage/core-plugin-api";
import { clearHistoryResponse, FileContent, InitializeAssistantAIResponse, SubmitRepoResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export const veecodeAssistantAIApiRef = createApiRef<VeeCodeAssistantAIApi>({
    id: 'plugin.veecodeassistantai'
});

export interface VeeCodeAssistantAIApi {
    downloadRepoFiles(location: string): Promise<File[]>,
    submitRepo(engine: string | undefined, files: File[], repoName: string): Promise<SubmitRepoResponse>,
    getChat(engine: string | undefined, vectorStoreId: string, prompt: string): Promise<InitializeAssistantAIResponse>,
    clearHistory(engine: string | undefined, vectorStoreId: string, assistantId: string, threadId: string): Promise<clearHistoryResponse>,
    createPullRequest(files: FileContent[], engine: string, vectorStoreId: string, location: string): Promise<void>
}