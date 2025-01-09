import { extractGitHubInfo } from "../../../utils/helpers/extractGithubInfo";
import { IGithubManager } from "./types";

export class GithubManager implements IGithubManager {

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
}
