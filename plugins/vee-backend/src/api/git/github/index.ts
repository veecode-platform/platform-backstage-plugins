import { extractGitHubInfo } from "../../../utils/helpers/extractGithubInfo";
import { IGithubManager, ReturnGithubRepoInfo } from "./types";

export class GithubManager implements IGithubManager {

  async returnRepoInfo({url, partial}:ReturnGithubRepoInfo) {
    const { host, owner, repo, branch,folderPath } = extractGitHubInfo(url,partial);
    const repoUrl = `https://${host}/${owner}/${repo}.git`;
    const localPath = `./temp-${repo}`;
    const folderPathResult = folderPath ? folderPath : null

    return {
      localPath,
      repoUrl,
      branch,
      folderPath: folderPathResult
    };
  }
}
