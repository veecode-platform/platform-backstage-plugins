import { ConfigApi } from "@backstage/core-plugin-api";
import { ScmAuthApi } from "@backstage/integration-react";
import { readGitLabIntegrationConfigs } from "@backstage/integration";
import { formatHttpErrorMessage } from "../../utils/helpers/formatHttpErrorMessage";
import { extractGitLabInfo } from "../../utils/helpers/extractGitlabInfo";
import { generateBranchName } from "../../utils/helpers/generateBranchName";
import { FileContent } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export class GitLabManager {
  constructor(
    private readonly scmAuthApi: ScmAuthApi,
    private readonly configApi: ConfigApi
  ) {}

  private async getToken(hostname: string = 'gitlab.com'): Promise<string> {
    const { token } = await this.scmAuthApi.getCredentials({
      url: `https://${hostname}/`,
      additionalScope: {
        customScopes: {
          gitlab: ['api'],
        },
      },
    });

    return token;
  }

  private async getApiBaseUrl(hostname: string): Promise<string> {
    const configs = readGitLabIntegrationConfigs(
      this.configApi.getOptionalConfigArray('integrations.gitlab') ?? [],
    );
    const gitlabIntegrationConfig = configs.find(v => v.host === hostname);
    return gitlabIntegrationConfig?.apiBaseUrl || `https://${hostname}/api/v4`;
  }

  private async fetchFromGitLab(url: string, token: string, options: RequestInit = {}) {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      const error = {
        status: response.status,
        message: errorMessage || `Error fetching ${url}`,
      };
      throw new Error(formatHttpErrorMessage(`Error fetching ${url}`, error));
    }
  
    return response.json();
  }

  async returnRepoInfo (url:string) {
    const { host, group, repo, branch } = extractGitLabInfo(url);
    const repoUrl = `https://${host}/${group}/${repo}.git`;
    const localPath = `./temp-${repo}`;

    return {
      localPath,
      repoUrl,
      branch
    }
  }

  // async getFilesFromRepo(url: string) {
  //   const { localPath, repoUrl, branch } = await this.returnRepoInfo(url)
   

  //   try {
  //     // TODO >> acessar o diretório local, extrair os files e retornar eles
  //   } catch (error: any) {
  //     // eslint-disable-next-line no-console
  //     console.error('Erro ao obter arquivos do repositório:', error);
  //     throw new Error(
  //       formatHttpErrorMessage(`Failed to download and extract repository archive`, {
  //         status: error.status || 500,
  //         message: error.message,
  //       })
  //     );
  //   }
  // }


async createMergeRequest(
    files: FileContent[],
    location: string,
    title: string,
    message: string
  ): Promise<{ status: number; link: string; message: string }> {
    const { host, group, repo } = extractGitLabInfo(location);
    const token = await this.getToken(host);
    const baseUrl = await this.getApiBaseUrl(host);
    const branchName = generateBranchName();
  
    const projectUrl = `${baseUrl}/projects/${encodeURIComponent(`${group}/${repo}`)}`;
    const project = await this.fetchFromGitLab(projectUrl, token);
  
    const defaultBranch = project.default_branch ?? 'main';
  
    // Get the parent branch commit
    const branchUrl = `${baseUrl}/projects/${project.id}/repository/branches/${defaultBranch}`;
    const parentBranch = await this.fetchFromGitLab(branchUrl, token);
  
    // Create a new branch
    const createBranchUrl = `${baseUrl}/projects/${project.id}/repository/branches`;
    await this.fetchFromGitLab(createBranchUrl, token, {
      method: 'POST',
      body: JSON.stringify({
        branch: branchName,
        ref: parentBranch.commit.id,
      }),
    });
  
    // Loop through files to create or update them
    for (const file of files) {
      const { name: filePath, content: fileContent } = file;
  
      const checkFileUrl = `${baseUrl}/projects/${project.id}/repository/files/${encodeURIComponent(
        filePath
      )}?ref=${defaultBranch}`;
  
      // Check if the file already exists in the repo
      const fileExists = await this.fetchFromGitLab(checkFileUrl, token).catch(() => null);
  
      const createOrUpdateFileUrl = `${baseUrl}/projects/${project.id}/repository/files/${encodeURIComponent(
        filePath
      )}`;
  
      if (fileExists) {
        // Update the existing file
        await this.fetchFromGitLab(createOrUpdateFileUrl, token, {
          method: 'PUT',
          body: JSON.stringify({
            branch: branchName,
            content: Buffer.from(fileContent).toString('base64'),
            commit_message: title,
            encoding: 'base64',
          }),
        });
      } else {
        // Create a new file
        await this.fetchFromGitLab(createOrUpdateFileUrl, token, {
          method: 'POST',
          body: JSON.stringify({
            branch: branchName,
            content: Buffer.from(fileContent).toString('base64'),
            commit_message: title,
            encoding: 'base64',
          }),
        });
      }
    }
  
    // Create a merge request
    const mergeRequestUrl = `${baseUrl}/projects/${project.id}/merge_requests`;
    const mergeRequestResponse = await this.fetchFromGitLab(mergeRequestUrl, token, {
      method: 'POST',
      body: JSON.stringify({
        source_branch: branchName,
        target_branch: defaultBranch,
        title,
        description: message,
      }),
    });
  
    return {
      status: mergeRequestResponse.web_url ? 201 : 404,
      link: mergeRequestResponse.web_url,
      message: 'Pull request created!',
    };
  }
  

}
