import { ConfigApi } from "@backstage/core-plugin-api";
import { ScmAuthApi } from "@backstage/integration-react";
import { readGitLabIntegrationConfigs } from "@backstage/integration";
import { formatHttpErrorMessage } from "../../utils/helpers/formatHttpErrorMessage";
import { Base64 } from 'js-base64';
import { extractGitLabInfo } from "../../utils/helpers/extractGitlabInfo";
import { generateBranchName } from "../../utils/helpers/generateBranchName";

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

  async createPullRequest(location: string, fileContent: string, title: string, message: string) {
    const { host, group, repo, filePath } = extractGitLabInfo(location);  
    const token = await this.getToken(host);
    const baseUrl = await this.getApiBaseUrl(host);
    const branchName = generateBranchName(title);

    const projectUrl = `${baseUrl}/projects/${encodeURIComponent(`${group}/${repo}`)}`;
    const project = await this.fetchFromGitLab(projectUrl, token);

    const defaultBranch = project.default_branch ?? 'main';

    const branchUrl = `${baseUrl}/projects/${project.id}/repository/branches/${defaultBranch}`;
    const parentBranch = await this.fetchFromGitLab(branchUrl, token);

    const createBranchUrl = `${baseUrl}/projects/${project.id}/repository/branches`;
    await this.fetchFromGitLab(createBranchUrl, token, {
      method: 'POST',
      body: JSON.stringify({
        branch: branchName,
        ref: parentBranch.commit.id,
      }),
    });

    const checkFileUrl = `${baseUrl}/projects/${project.id}/repository/files/${encodeURIComponent(filePath)}?ref=${defaultBranch}`;
    const fileExists = await this.fetchFromGitLab(checkFileUrl, token).catch(() => null);

    const createOrUpdateFileUrl = `${baseUrl}/projects/${project.id}/repository/files/${encodeURIComponent(filePath)}`;

    if (fileExists) {
      await this.fetchFromGitLab(createOrUpdateFileUrl, token, {
        method: 'PUT',
        body: JSON.stringify({
          branch: branchName,
          content: Base64.encode(fileContent),
          commit_message: title,
          encoding: 'base64',
        }),
      });
    } else {
      await this.fetchFromGitLab(createOrUpdateFileUrl, token, {
        method: 'POST',
        body: JSON.stringify({
          branch: branchName,
          content: Base64.encode(fileContent),
          commit_message: title,
          encoding: 'base64',
        }),
      });
    }

    const mergeRequestUrl = `${baseUrl}/projects/${project.id}/merge_requests`;
    const pullRequestResponse = await this.fetchFromGitLab(mergeRequestUrl, token, {
      method: 'POST',
      body: JSON.stringify({
        source_branch: branchName,
        target_branch: defaultBranch,
        title,
        description: message,
      }),
    });

    return {
      status: pullRequestResponse.web_url ? 201 : 404,
      link: pullRequestResponse.web_url,
      message: 'Pull request created!',
    };
  }

}
