import { createApiRef } from "@backstage/core-plugin-api";
import { clearHistoryResponse, FileContent, InitializeAssistantAIResponse, SubmitRepoResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export const veeCodeAssistantAIApiRef = createApiRef<VeeCodeAssistantAIApi>({
    id: 'plugin.veecode.asistant.ai.service'
});

export interface VeeCodeAssistantAIApi {
    submitRepo(engine: string | undefined, repoName: string, location: string): Promise<SubmitRepoResponse>,
    getChat(engine: string | undefined, vectorStoreId: string, prompt: string): Promise<InitializeAssistantAIResponse>,
    clearHistory(engine: string | undefined, vectorStoreId: string, assistantId: string, threadId: string): Promise<clearHistoryResponse>,
    createPullRequest(files: FileContent[], location: string): Promise<SubmitRepoResponse>
}