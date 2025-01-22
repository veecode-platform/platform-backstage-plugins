import { readGithubIntegrationConfigs } from "@backstage/integration";
import { Octokit } from "@octokit/rest";
import { Base64 } from 'js-base64';
import { extractGitHubInfo } from "../../../../utils/helpers/extractGithubInfo";
import { formatHttpErrorMessage } from "../../../../utils/helpers/formatHttpErrorMessage";
import { generateBranchName } from "../../../../utils/helpers/generateBranchName";
import { FileContent, PullRequestResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { IGithubManager } from "./type";
import { Provider } from "../provider";

export class GithubManager extends Provider implements IGithubManager {

    private async getOctokit(hostname: string = 'github.com'):Promise<Octokit>{
        const configs = readGithubIntegrationConfigs(
          this.configApi.getOptionalConfigArray('integrations.github') ?? [],
        );
        const githubIntegrationConfig = configs.find(v => v.host === hostname);
        const baseUrl = githubIntegrationConfig?.apiBaseUrl;
        return new Octokit({ auth: this.token, baseUrl });
    
     }

    async createPullRequest(
        files: FileContent[],
        location: string,
        title: string,
        message: string
      ) {
        const { host, owner, repo } = extractGitHubInfo(location);
        const octokit = await this.getOctokit(host);
        const branchName = generateBranchName();

    
        // Fetch repository data
        const repoData = await octokit.repos
          .get({ owner, repo })
          .catch((e:any) => {
            throw new Error(formatHttpErrorMessage("Couldn't fetch repo data", e));
          });
    
        // Fetch base branch reference
        const parentRef = await octokit.git
          .getRef({ owner, repo, ref: `heads/${repoData.data.default_branch}` })
          .catch((e:any)=> {
            throw new Error(
              formatHttpErrorMessage("Couldn't fetch default branch data", e)
            );
          });
    
        // Create new branch
        await octokit.git
          .createRef({
            owner,
            repo,
            ref: `refs/heads/${branchName}`,
            sha: parentRef.data.object.sha,
          })
          .catch((e:any) => {
            throw new Error(
              formatHttpErrorMessage(
                `Couldn't create a new branch with name '${branchName}'`,
                e
              )
            );
          });
    
        // Add or update files in the repository
        for (const file of files) {
          const { relativePath, content } = file;
    
          let fileSha: string | undefined;
          try {
            const { data } = await octokit.repos.getContent({
              owner,
              repo,
              path: relativePath!,
              ref: branchName,
            });
            if (!Array.isArray(data) && data.sha) {
              fileSha = data.sha;
            }
          } catch (e: any) {
            if (e.status !== 404) {
              throw new Error(
                formatHttpErrorMessage(
                  `Couldn't fetch existing file ${relativePath} in the repo`,
                  e
                )
              );
            }

            fileSha = undefined;
          }

          const payload: any = {
            owner,
            repo,
            path: relativePath ?? '.',
            message: `${title}: Update ${relativePath}`,
            content: Base64.encode(content),
            branch: branchName,
          };

          if (fileSha) {
            payload.sha = fileSha;  // If the file already exists, pass sha to update
          }
        
    
          await octokit.repos
            .createOrUpdateFileContents(payload)
            .catch((e:any) => {
              throw new Error(
                formatHttpErrorMessage(
                  `Couldn't create a commit with ${relativePath} file added`,
                  e
                )
              );
            });
        }
    
        // Create pull request
        const pullRequestResponse = await octokit.pulls
          .create({
            owner,
            repo,
            title,
            head: branchName,
            base: repoData.data.default_branch,
            body: message,
          })
          .catch((e:any) => {
            throw new Error(
              formatHttpErrorMessage(
                `Couldn't create a pull request for ${branchName} branch`,
                e
              )
            );
          });
    
        return {
          status: pullRequestResponse.status === 201 ? "ok" : "error",
          link: pullRequestResponse.data.html_url,
          message: "Pull request created successfully!",
        } as PullRequestResponse;
      }
}