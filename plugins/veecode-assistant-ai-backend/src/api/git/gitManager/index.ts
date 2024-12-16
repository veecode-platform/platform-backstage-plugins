import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { parseGitUrl } from "../../../utils/helpers/parseGitUrl";
import { GithubManager } from "../github";
// import { GitlabManager } from "../gitlab";
import { FileContent } from "../../../utils/types";

export class GitManager {

    private readonly githubManager : GithubManager;
   // private readonly gitlabManager : GitlabManager;
    private readonly token: string;
    
    constructor(
        private readonly config: Config,
        private readonly logger: LoggerService,
        token: string
    ){
        this.token = token;    
        this.githubManager = new GithubManager(this.config, this.logger, this.token);
        // this.gitlabManager = new GitlabManager(this.config, this.logger, this.token);
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