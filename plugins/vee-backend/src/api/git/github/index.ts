import { extractGitHubInfo } from "../../../utils/helpers/extractGithubInfo";
import { IGithubManager } from "./types";

export class GithubManager implements IGithubManager {

  async returnRepoInfo(url : string) {
    const { host, owner, repo, branch,folderPath } = extractGitHubInfo(url);
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
