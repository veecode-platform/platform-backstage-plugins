import { createApiRef } from "@backstage/core-plugin-api";
import { ClearHistoryResponse, CreatePluginParams, CreateStackParams, DeleteServiceResponse, FileContent, InitializeAssistantAIResponse, IPlugin, IRepository, IStack, ParamsWithRequiredId, PullRequestResponse, SubmitRepoResponse, VeeResponse } from "@veecode-platform/backstage-plugin-vee-common";

export const veeApiRef = createApiRef<VeeApi>({
    id: 'plugin.vee'
});

export interface VeeApi {
    cloneRepo(location: string): Promise<IRepository>,
    submitRepo(engine: string | undefined, files: FileContent[], repoName: string): Promise<SubmitRepoResponse>,
    getChat(engine: string | undefined, vectorStoreId: string, prompt: string, repoName?: string, repoStructure?: string): Promise<InitializeAssistantAIResponse>,
    clearHistory(engine: string | undefined, vectorStoreId: string, assistantId: string, threadId: string): Promise<ClearHistoryResponse>,
    saveChangesInRepository(files: FileContent[], location: string,title:string, message: string): Promise<PullRequestResponse>
    listStacks(): Promise<IStack[]>;
    getStackById(stackId: string): Promise<IStack>;
    createStack({ name, source, icon, plugins }: CreateStackParams): Promise<VeeResponse<IStack>>;
    editStack({ id, ...data }: ParamsWithRequiredId<IStack>): Promise<VeeResponse<IStack>>;
    removeStack(stackId: string): Promise<DeleteServiceResponse>;
    listPlugins(): Promise<IPlugin[]>;
    getPluginById(pluginId: string): Promise<IPlugin>;
    addPlugin({ name, annotations }: CreatePluginParams): Promise<VeeResponse<IPlugin>>;
    editPlugin({ id, ...data }: ParamsWithRequiredId<IPlugin>): Promise<VeeResponse<IStack>>;
    removePlugin(pluginId: string): Promise<DeleteServiceResponse>
}