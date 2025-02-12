import { FileContent } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { Base64 } from "js-base64";
import { readGitLabIntegrationConfigs } from "@backstage/integration";
import { PullRequestResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { extractGitLabInfo } from "../../../../utils/helpers/extractGitlabInfo";
import { generateBranchName } from "../../../../utils/helpers/generateBranchName";
import { IGitlabManager } from "./types";
import { Provider } from "../provider";
import { formatHttpErrorMessage } from "../../../../utils/helpers/formatHttpErrorMessage";

export class GitlabManager extends Provider implements IGitlabManager {

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

  async createMergeRequest(
    files: FileContent[],
    url: string,
    title: string,
    message: string
  ): Promise<PullRequestResponse> {
    const { host, group, repo } = extractGitLabInfo(url);
  
    const baseUrl = await this.getApiBaseUrl(host);
    const projectUrl = `${baseUrl}/projects/${encodeURIComponent(`${group}/${repo}`)}`;
    const project = await this.fetchFromGitLab(projectUrl, this.token);
    const defaultBranch = project.default_branch ?? 'main';
    const branchName = generateBranchName();
  
    try {
      // Create branch
      const createBranchUrl = `${baseUrl}/projects/${project.id}/repository/branches`;
      await this.fetchFromGitLab(createBranchUrl, this.token, {
        method: 'POST',
        body: JSON.stringify({
          branch: branchName,
          ref: defaultBranch,
        }),
      });
  
      // Add or update files in the branch
      for (const file of files) {
        const { relativePath, content } = file;
        const fileUrl = `${baseUrl}/projects/${project.id}/repository/files/${encodeURIComponent(relativePath!)}`;
  
        try {
          // Directly try to create or update the file
          await this.fetchFromGitLab(fileUrl, this.token, {
            method: 'POST',
            body: JSON.stringify({
              branch: branchName,
              content: Base64.encode(content),
              commit_message: `Adding or updating ${relativePath} in branch ${branchName}`,
              encoding: 'base64',
            }),
          });
        } catch (error: any) {
          throw new Error(`Error creating or updating file ${relativePath}: ${error.message}`);
        }
      }
  
      // Create merge request
      const mergeRequestUrl = `${baseUrl}/projects/${project.id}/merge_requests`;
      const mergeRequest = await this.fetchFromGitLab(mergeRequestUrl, this.token, {
        method: 'POST',
        body: JSON.stringify({
          source_branch: branchName,
          target_branch: defaultBranch,
          title,
          description: message,
        }),
      });
  
      return {
        status: mergeRequest.web_url ? 'ok' : 'error',
        link: mergeRequest.web_url,
        message: 'Merge request created successfully!',
      } as PullRequestResponse;
    } catch (error: any) {
      throw new Error(`Error creating merge request: ${error.message}`);
    }
  }
   
  
  
}


