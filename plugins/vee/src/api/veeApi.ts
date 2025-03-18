import { createApiRef } from "@backstage/core-plugin-api";
import { ClearHistoryResponse, CreateFixedOptionsParams, CreatePluginParams, CreateStackParams, DeleteServiceResponse, FileContent, IFixedOptions, InitializeAssistantAIResponse, IPlugin, IRepository, IStack, ParamsWithRequiredId, PullRequestResponse, SubmitRepoResponse, VeeResponse } from "@veecode-platform/backstage-plugin-vee-common";

export const veeApiRef = createApiRef<VeeApi>({
    id: 'plugin.vee'
});

export interface VeeApi {
    cloneRepo(location: string): Promise<IRepository>;
    cloneTemplateSource(source: string): Promise<IRepository>;
    getContentBySource(source: string): Promise<string>;
    submitRepo(engine: string | undefined, files: FileContent[], repoName: string): Promise<SubmitRepoResponse>,
    submitTemplate(engine: string | undefined, files: FileContent[], templateName: string): Promise<SubmitRepoResponse>;
    getChat(engine: string | undefined, vectorStoreId: string, prompt: string, repoName?: string, repoStructure?: string): Promise<InitializeAssistantAIResponse>,
    getChatForTemplate(engine: string | undefined, vectorStoreId: string, prompt: string, templateName?: string, repoStructure?: string): Promise<InitializeAssistantAIResponse>;
    clearHistory(engine: string | undefined, vectorStoreId: string, assistantId: string, threadId: string): Promise<ClearHistoryResponse>,
    clearTemplateHistory(engine: string | undefined, vectorStoreId: string, assistantId: string, threadId: string): Promise<ClearHistoryResponse>;
    saveChangesInRepository(files: FileContent[], location: string,title:string, message: string): Promise<PullRequestResponse>
    listStacks(): Promise<IStack[]>;
    getStackById(stackId: string): Promise<IStack>;
    createStack({ name, source, icon, plugins }: CreateStackParams): Promise<VeeResponse<IStack>>;
    editStack({ id, ...data }: ParamsWithRequiredId<IStack>): Promise<VeeResponse<IStack>>;
    removeStack(stackId: string): Promise<DeleteServiceResponse>;
    listPlugins(): Promise<IPlugin[]>;
    getPluginById(pluginId: string): Promise<IPlugin>;
    addPlugin({ name, docs, annotations }: CreatePluginParams): Promise<VeeResponse<IPlugin>>;
    editPlugin({ id, ...data }: ParamsWithRequiredId<IPlugin>): Promise<VeeResponse<IPlugin>>;
    removePlugin(pluginId: string): Promise<DeleteServiceResponse>;
    listAllFixedOptions(): Promise<IFixedOptions[]>;
    getFixedOptionById(fixedOptionId: string): Promise<IFixedOptions>;
    createFixedOption({ type, options }: CreateFixedOptionsParams): Promise<VeeResponse<IFixedOptions>>;
    editFixedOption({ id, ...data }: ParamsWithRequiredId<IFixedOptions>): Promise<VeeResponse<IFixedOptions>>;
    removeFixedOption(fixedOptionId: string): Promise<DeleteServiceResponse>
}