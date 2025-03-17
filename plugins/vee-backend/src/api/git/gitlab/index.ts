import { extractGitLabInfo } from "../../../utils/helpers/extractGitlabInfo";
import { IGitlabManager, ReturnGitlabRepoInfo } from "./types";

export class GitlabManager implements IGitlabManager {

    async returnRepoInfo ({url, partial}:ReturnGitlabRepoInfo) {
        const { host, group, repo, branch } = extractGitLabInfo(url);
        const repoUrl = `https://${host}/${group}/${repo}.git`;
        const localPath = `./temp-${repo}`;
        const folderPath =  partial ? '' : null // TODO 
    
        return {
          localPath,
          repoUrl,
          branch,
          folderPath
        }
      }
}