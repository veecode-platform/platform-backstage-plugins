import { ConfigApi } from "@backstage/core-plugin-api";
import { ScmAuthApi } from "@backstage/integration-react";
import { Gitlab } from '@gitbeaker/node';
import { readGitLabIntegrationConfigs } from "@backstage/integration";
import { formatHttpErrorMessage } from "../../utils/helpers/formatHttpErrorMessage";
import { Base64 } from 'js-base64';
import { extractGitLabInfo } from "../../utils/helpers/extractGitlabInfo";

export class GitLabManager {
  constructor(
    private readonly scmAuthApi: ScmAuthApi,
    private readonly configApi: ConfigApi
  ) {}

  private async getGitlabClient(hostname: string = 'gitlab.com'): Promise<InstanceType<typeof Gitlab>> {
    const { token } = await this.scmAuthApi.getCredentials({
      url: `https://${hostname}/`,
      additionalScope: {
        customScopes: {
          gitlab: ['api'],
        },
      },
    });

    const configs = readGitLabIntegrationConfigs(
      this.configApi.getOptionalConfigArray('integrations.gitlab') ?? [],
    );
    const gitlabIntegrationConfig = configs.find(v => v.host === hostname);
    const baseUrl = gitlabIntegrationConfig?.apiBaseUrl || `https://${hostname}/api/v4`;

    return new Gitlab({ token, host: baseUrl });
  }

  async createPullRequest(location: string, fileContent: string, title: string, message: string) {
    const { host, group, repo, filePath } = extractGitLabInfo(location);  
    const gitlabClient = await this.getGitlabClient(host);
    const branchName = title.replace(" ", "-");

    const project = await gitlabClient.Projects.show(`${group}/${repo}`).catch((e: any) => {
      throw new Error(formatHttpErrorMessage("Couldn't fetch project data", e));
    });

    const defaultBranch = project.default_branch ?? 'main';

    const parentBranch = await gitlabClient.Branches.show(project.id, defaultBranch).catch((e: any) => {
      throw new Error(formatHttpErrorMessage("Couldn't fetch default branch data", e));
    });


    await gitlabClient.Branches.create(project.id, branchName, parentBranch.commit.id as string).catch((e: any) => {
      throw new Error(
        formatHttpErrorMessage(`Couldn't create a new branch with name '${branchName}'`, e),
      );
    });

    await gitlabClient.RepositoryFiles.create(
        project.id,          
        filePath,            
        branchName,          
        Base64.encode(fileContent),  
        title,               
        {                    
          encoding: 'base64' 
        }
      ).catch((e: any) => {
        throw new Error(
          formatHttpErrorMessage(`Couldn't create a commit with ${filePath} file added`, e),
        );
      });

    const pullRequestResponse = await gitlabClient.MergeRequests.create(
      project.id,
      branchName,
      defaultBranch,
      title,
      { description: message }
    ).catch((e: any) => {
      throw new Error(
        formatHttpErrorMessage(`Couldn't create a pull request for ${branchName} branch`, e),
      );
    });

    return {
      link: pullRequestResponse.web_url,
      message: 'Pull request created!',
    };
  }
}
