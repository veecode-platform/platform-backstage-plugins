import { extractGitLabInfo } from "../../../utils/helpers/extractGitlabInfo";
import { IGitlabManager } from "./types";

export class GitlabManager implements IGitlabManager {

    async returnRepoInfo (url:string) {
        const { host, group, repo, branch } = extractGitLabInfo(url);
        const repoUrl = `https://${host}/${group}/${repo}.git`;
        const localPath = `./temp-${repo}`;
        const folderPath =  null // TODO 
    
        return {
          localPath,
          repoUrl,
          branch,
          folderPath
        }
      }
}