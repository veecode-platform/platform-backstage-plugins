import { ScmAuthApi } from "@backstage/integration-react";
import { parseGitUrl } from "../utils/helpers/parseGitUrl";
import { GithubManager } from "./git-providers/Github";
import { ConfigApi } from "@backstage/core-plugin-api";
import { GitLabManager } from "./git-providers/Gitlab";

export class PullRequestManager {

    constructor(
        private readonly scmAuthApi: ScmAuthApi,
        private readonly configApi: ConfigApi,
        private readonly githubManager = new GithubManager(this.scmAuthApi, this.configApi),
        private readonly gitlabManager = new GitLabManager(this.scmAuthApi, this.configApi)
    ){}

    async createPullRequest(
        location: string,
        fileContent: string,
        title: string,
        message: string
    ){
        const  url = parseGitUrl(location); 

        switch(true){
            case url.includes('github'): {
               return this.githubManager.createPullRequest(url,fileContent,title,message);
            }
            case url.includes('gitlab'): {
                return this.gitlabManager.createPullRequest(url,fileContent,title,message);
             }
            default:
              throw new Error('unimplemented!');
        }

        
    }
}