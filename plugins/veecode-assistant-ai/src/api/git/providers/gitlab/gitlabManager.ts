import { FileContent } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { Gitlab } from "@gitbeaker/rest";
import { Base64 } from "js-base64";
import { readGitLabIntegrationConfigs } from "@backstage/integration";
import { PullRequestResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { extractGitLabInfo } from "../../../../utils/helpers/extractGitlabInfo";
import { generateBranchName } from "../../../../utils/helpers/generateBranchName";
import { IGitlabManager } from "./types";
import { Provider } from "../provider";

export class GitlabManager extends Provider implements IGitlabManager {

    private async getGitlabApi(hostname: string = 'gitlab.com'){
        const configs = readGitLabIntegrationConfigs(
            this.configApi.getOptionalConfigArray('integrations.gitlab') ?? [],
          );
          const gitlabIntegrationConfig = configs.find(v => v.host === hostname);
          const baseUrl = gitlabIntegrationConfig?.apiBaseUrl;
          return new Gitlab({ host:baseUrl, token: this.token }); // TODO check baseurl or host
    }

    async createMergeRequest(
        files: FileContent[],
        url: string,
        title: string,
        message: string) {

        const { host, group, repo } = extractGitLabInfo(url);

        const gitlabApi = await this.getGitlabApi(host);
        const projectId = encodeURIComponent(`${group}/${repo}`);
        const branchName = generateBranchName();
        const baseBranch = "main";

        try {
            // create branch
            await gitlabApi.Branches.create(projectId, branchName, baseBranch);

            // Add files to the branch
            for (const file of files) {
                const { name, content } = file;

                let fileExists = false;

                try {
                    await gitlabApi.RepositoryFiles.show(projectId, name, branchName);
                    fileExists = true;
                } catch (error: any) {
                    if (error.response?.status !== 404) {
                        throw new Error(`Error fetching file ${name}: ${error.message}`);
                    }
                }

                if (fileExists) {
                    // Update existing file
                    await gitlabApi.RepositoryFiles.edit(
                        projectId,
                        name,
                        branchName,
                        Base64.encode(content),
                        `Updating ${name} in branch ${branchName}`
                    );
                } else {
                    // Create new file
                    await gitlabApi.RepositoryFiles.create(
                        projectId,
                        name,
                        branchName,
                        Base64.encode(content),
                        `Adding ${name} in branch ${branchName}`
                    );
                }
            }

            // Create merge request
            const mergeRequest = await gitlabApi.MergeRequests.create(
                projectId,
                branchName,
                baseBranch,
                title,
                {
                    description: message,
                }
            );

            return {
                status: "success",
                link: mergeRequest.web_url as string,
                message: "Merge request created successfuly!"
            } as PullRequestResponse;
        } catch (error: any) {
            throw new Error(`Error creating pull request: ${error.message}`);
        }

    }
}