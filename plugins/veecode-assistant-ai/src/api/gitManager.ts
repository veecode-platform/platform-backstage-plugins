import { ScmAuthApi } from "@backstage/integration-react";
import { parseGitUrl } from "../utils/helpers/parseGitUrl";
import { ConfigApi } from "@backstage/core-plugin-api";
import { FileContent } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { GithubManager } from "./git-providers/github";

export class GitManager {
  
    private readonly githubManager : GithubManager;
    // private readonly gitlabManager : GitLabManager;
   
    constructor(
        private readonly scmAuthApi: ScmAuthApi,
        private readonly configApi: ConfigApi,
    ){
        this.githubManager = new GithubManager(this.scmAuthApi, this.configApi);
       // this.gitlabManager = new GitLabManager(this.scmAuthApi, this.configApi)
    }

    
    async downloadRepoFiles(location:string){
        const  url = parseGitUrl(location);
        switch(true){
            case url.includes('github'): {
               return this.githubManager.getFilesFromRepo(url);
            }
            // case url.includes('gitlab'): {
            //     return this.gitlabManager.getFilesFromRepo(url);
            //  }
            default:
              throw new Error('Git provider error: unimplemented!');
        }
    }

    async createPullRequest(
        files: FileContent[],
        location: string,
        title: string,
        message: string
    ){
        const  url = parseGitUrl(location); 

        switch(true){
            case url.includes('github'): {
               return this.githubManager.createPullRequest(files,url,title,message);
            }
            // case url.includes('gitlab'): {
            //     return this.gitlabManager.createMergeRequest(files,url,title,message);
            //  }
            default:
              throw new Error('Git provider error: unimplemented!');
        }        
    }
}