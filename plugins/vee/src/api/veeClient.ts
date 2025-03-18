import { ConfigApi, FetchApi,OAuthApi } from "@backstage/core-plugin-api";
import { VeeApi } from "./veeApi";
import { ResponseError } from '@backstage/errors';
import { ClearHistoryResponse, CreateFixedOptionsParams, CreatePluginParams, CreateStackParams, DeleteServiceResponse, FileContent, IFixedOptions, InitializeAssistantAIResponse, IPlugin, IRepository, IStack, ParamsWithRequiredId, SubmitRepoResponse, VeeResponse } from "@veecode-platform/backstage-plugin-vee-common";
import { GitManager } from "./git/gitManager";


export class VeeClient implements VeeApi {
  constructor(
    private readonly configApi: ConfigApi,
    private readonly fetchApi: FetchApi,
    private readonly githubAuthApi: OAuthApi,
    private readonly gitlabAuthApi: OAuthApi,
  ) {}

  private async fetch<T>(input: string, init?: RequestInit): Promise<T> {
    const baseUrl = `${this.configApi.getString('backend.baseUrl')}/api/vee`;
    const response = await this.fetchApi.fetch(`${baseUrl}${input}`, {
      ...init,
    });

    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }

    return response.json() as Promise<T>;
  }

  private async getGitManager() {
    return new GitManager(
      this.configApi,
      this.githubAuthApi,
      this.gitlabAuthApi,
    );
  }

  async cloneRepo(location: string) {
    const body = {
      location,
    };

    const gitManager = await this.getGitManager();
    const token = await gitManager.getAccessToken(location);

    const headers: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Git-Authorization': `Bearer ${token}`,
      },
    };

    const response = await this.fetch<any>('/clone-repository', headers);

    return {
      files: response.data.files,
      structure: response.data.structure,
    } as IRepository;
  }

  async cloneTemplateSource(source: string) {
    const body = {
      source,
    };

    const gitManager = await this.getGitManager();
    const token = await gitManager.getAccessToken(source);

    const headers: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Git-Authorization': `Bearer ${token}`,
      },
    };

    const response = await this.fetch<any>(
      '/partial-clone-repository',
      headers,
    );

    return {
      files: response.data.files,
      structure: response.data.structure,
    } as IRepository;
  }

  async getContentBySource(source: string) {
    const gitManager = await this.getGitManager();
    const response = await gitManager.getContentBySource(source);
    return response;
  }

  async submitRepo(
    engine: string = 'openAI',
    files: FileContent[],
    repoName: string,
  ): Promise<SubmitRepoResponse> {
    const body = {
      engine,
      repoName,
      files,
    };

    const headers: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await this.fetch<SubmitRepoResponse>(
      '/submit-repo',
      headers,
    );
    return response;
  }

  async submitTemplate(
    engine: string = 'openAI',
    files: FileContent[],
    templateName: string,
  ): Promise<SubmitRepoResponse>{
    const body = {
      engine,
      templateName,
      files,
    };

    const headers: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await this.fetch<SubmitRepoResponse>(
      '/submit-template',
      headers,
    );
    return response;
  }

  // async createAssistant(
  //   engine: string = 'openAI',
  //   vectorStoreId: string,
  //   prompt: string,
  //   repoName?: string,
  //   repoStructure?: string,
  // ) {
  //   const body = {
  //     engine,
  //     vectorStoreId,
  //     prompt,
  //     repoName,
  //     repoStructure,
  //   };
  //   const headers: RequestInit = {
  //     method: 'POST',
  //     body: JSON.stringify(body),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };
  //   const response = await this.fetch<InitializeAssistantAIResponse>(
  //     '/chat-analyze-repo',
  //     headers,
  //   );
  //   return response;
  // }

  async getChat(
    engine: string = 'openAI',
    vectorStoreId: string,
    prompt: string,
    repoName?: string,
    repoStructure?: string,
  ): Promise<InitializeAssistantAIResponse> {
    const body = {
      engine,
      vectorStoreId,
      prompt,
      repoName,
      repoStructure,
    };
    const headers: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await this.fetch<InitializeAssistantAIResponse>(
      '/chat-analyze-repo',
      headers,
    );
    return response;
  }

  async getChatForTemplate(
    engine: string = 'openAI',
    vectorStoreId: string,
    prompt: string,
    templateName?: string,
    repoStructure?: string,
  ): Promise<InitializeAssistantAIResponse> {
    const body = {
      engine,
      vectorStoreId,
      prompt,
      repoName: templateName,
      repoStructure,
    };
    const headers: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await this.fetch<InitializeAssistantAIResponse>(
      '/chat-template',
      headers,
    );
    return response;
  }

  async clearHistory(
    engine: string = 'openAI',
    vectorStoreId: string,
    assistantId: string,
    threadId: string,
  ): Promise<ClearHistoryResponse> {
    const body = {
      engine,
      vectorStoreId,
      assistantId,
      threadId,
    };
    const headers: RequestInit = {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await this.fetch<ClearHistoryResponse>(
      '/chat-analyze-repo',
      headers,
    );
    return response;
  }

  async clearTemplateHistory(
    engine: string = 'openAI',
    vectorStoreId: string,
    assistantId: string,
    threadId: string,
  ): Promise<ClearHistoryResponse> {
    const body = {
      engine,
      vectorStoreId,
      assistantId,
      threadId,
    };
    const headers: RequestInit = {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await this.fetch<ClearHistoryResponse>(
      '/chat-template',
      headers,
    );
    return response;
  }

  async saveChangesInRepository(
    files: FileContent[],
    location: string,
    title: string,
    message: string,
  ) {
    const gitManager = await this.getGitManager();

    return gitManager.createPullRequest(files, location, title, message);
  }

  async listStacks() {
    const response = await this.fetch<IStack[]>('/stacks');
    return response;
  }

  async getStackById(stackId: string) {
    const response = await this.fetch<IStack>(`/stacks/${stackId}`);
    return response;
  }

  async createStack({ name, source, icon, plugins }: CreateStackParams) {
    const body = {
      name,
      source,
      icon,
      plugins,
    };
    const headers: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await this.fetch<VeeResponse<IStack>>('/stacks', headers);
    return response;
  }

  async editStack({ id, ...data }: ParamsWithRequiredId<IStack>) {
    const body = {
      ...data,
    };
    const stackId = id;
    const headers: RequestInit = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await this.fetch<VeeResponse<IStack>>(
      `/stacks/${stackId}`,
      headers,
    );
    return response;
  }

  async removeStack(stackId: string) {
    const headers: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await this.fetch<DeleteServiceResponse>(
      `/stacks/${stackId}`,
      headers,
    );
    return response;
  }

  async listPlugins() {
    const response = await this.fetch<IPlugin[]>('/plugins');
    return response;
  }

  async getPluginById(pluginId: string) {
    const response = await this.fetch<IPlugin>(`/plugins/${pluginId}`);
    return response;
  }

  async addPlugin({ name, docs, annotations }: CreatePluginParams) {
    const body = {
      name,
      docs,
      annotations,
    };
    const headers: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await this.fetch<VeeResponse<IPlugin>>(
      '/plugins',
      headers,
    );
    return response;
  }

  async editPlugin({ id, ...data }: ParamsWithRequiredId<IPlugin>) {
    const body = {
      ...data,
    };
    const pluginId = id;
    const headers: RequestInit = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await this.fetch<VeeResponse<IPlugin>>(
      `/plugins/${pluginId}`,
      headers,
    );
    return response;
  }

  async removePlugin(pluginId: string) {
    const headers: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await this.fetch<DeleteServiceResponse>(
      `/plugins/${pluginId}`,
      headers,
    );
    return response;
  }

  async listAllFixedOptions() {
    const response = await this.fetch<IFixedOptions[]>('/fixedOptions');
    return response;
  }

  async getFixedOptionById(fixedOptionId: string) {
    const response = await this.fetch<IFixedOptions>(`/fixedOptions/${fixedOptionId}`);
    return response;
  }

  async createFixedOption({ type, options }: CreateFixedOptionsParams) {
    const body = {
      type,
      options
    };
    const headers: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await this.fetch<VeeResponse<IFixedOptions>>('/fixedOptions', headers);
    return response;
  }

  async editFixedOption({ id, ...data }: ParamsWithRequiredId<IFixedOptions>) {
    const body = {
      ...data,
    };
    const fixedOptionId = id;
    const headers: RequestInit = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await this.fetch<VeeResponse<IFixedOptions>>(
      `/fixedOptions/${fixedOptionId}`,
      headers,
    );
    return response;
  }

  async removeFixedOption(fixedOptionId: string) {
    const headers: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await this.fetch<DeleteServiceResponse>(
      `/fixedOptions/${fixedOptionId}`,
      headers,
    );
    return response;
  }
}