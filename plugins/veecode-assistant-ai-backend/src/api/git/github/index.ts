import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { readGithubIntegrationConfigs } from "@backstage/integration";
import { extractGitHubInfo } from "../../../utils/helpers/extractGithubInfo";
import { formatHttpErrorMessage } from "../../../utils/helpers/formatHttpErrorMessage";
import { Base64 } from "js-base64";
import { generateBranchName } from "../../../utils/helpers/generateBranchName";
import { IGithubManager } from "./types";
import { FileContent, PullRequestResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export class GithubManager implements IGithubManager {
  private readonly token: string;

  constructor(
    private config: Config,
    private logger: LoggerService,
    token: string
  ) {
    this.token = token;
  }

  private async getOctokit(hostname: string = "github.com") {
    const { Octokit } = await import("octokit");
    const configs = readGithubIntegrationConfigs(
      this.config.getOptionalConfigArray("integrations.github") ?? []
    );
    const githubIntegrationConfig = configs.find(v => v.host === hostname);
    const baseUrl = githubIntegrationConfig?.apiBaseUrl;
    return new Octokit({ auth: this.token, baseUrl });
  }

  async returnRepoInfo(url: string) {
    const { host, owner, repo, branch } = extractGitHubInfo(url);
    const repoUrl = `https://${host}/${owner}/${repo}.git`;
    const localPath = `./temp-${repo}`;

    return {
      localPath,
      repoUrl,
      branch,
    };
  }

  async createPullRequest(
    files: FileContent[],
    location: string,
    title: string,
    message: string
  ) {
    const { host, owner, repo } = extractGitHubInfo(location);
    const octokit = await this.getOctokit(host);
    const branchName = generateBranchName(title);

    this.logger.info("Creating Pull Request...");

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
          path: relativePath,
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
      }

      await octokit.repos
        .createOrUpdateFileContents({
          owner,
          repo,
          path: relativePath,
          message: `${title}: Update ${relativePath}`,
          content: Base64.encode(content),
          branch: branchName,
          sha: fileSha,
        })
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

    this.logger.info("Pull Request successfully created!");

    return {
      status: pullRequestResponse.status,
      link: pullRequestResponse.data.html_url,
      message: "Pull request created successfully!",
    } as PullRequestResponse;
  }
}
