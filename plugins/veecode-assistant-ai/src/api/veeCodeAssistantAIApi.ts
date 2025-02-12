import { createApiRef } from "@backstage/core-plugin-api";
import { ClearHistoryResponse, FileContent, InitializeAssistantAIResponse, IRepository, PullRequestResponse, SubmitRepoResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export const veecodeAssistantAIApiRef = createApiRef<VeeCodeAssistantAIApi>({
    id: 'plugin.veecodeassistantai'
});

export interface VeeCodeAssistantAIApi {
    cloneRepo(location: string): Promise<IRepository>,
    submitRepo(engine: string | undefined, files: FileContent[], repoName: string): Promise<SubmitRepoResponse>,
    getChat(engine: string | undefined, vectorStoreId: string, prompt: string, repoName?: string, repoStructure?: string): Promise<InitializeAssistantAIResponse>,
    clearHistory(engine: string | undefined, vectorStoreId: string, assistantId: string, threadId: string): Promise<ClearHistoryResponse>,
    saveChangesInRepository(files: FileContent[], location: string, engine: string, vectorStoreId: string, repoName: string): Promise<PullRequestResponse>
}