import { ConfigApi, OAuthApi } from "@backstage/core-plugin-api";
import { parseGitUrl } from "../../utils/helpers/parseGitUrl";
import { IGitManager } from "./types";
import { FileContent } from "@veecode-platform/backstage-plugin-vee-common";
import { GithubManager } from "./providers/github/githubManager";
import { GitlabManager } from "./providers/gitlab/gitlabManager";



export class GitManager implements IGitManager{

    constructor(
        private config: ConfigApi,
        private githubAuthApi: OAuthApi,
        private gitlabAuthApi : OAuthApi,
    ){}

    async getAccessToken(location: string){

        const  url = location.startsWith('url:') ? parseGitUrl(location) : location; 
        
        switch(true){
            case url.includes('github'): {
                const token = await this.githubAuthApi.getAccessToken([
                    'read_user', 'repo', 'public_repo', 'api', 'read_api', 'workflow'
                ])
               return token;
            }
            case url.includes('gitlab'): {
                const token = await this.gitlabAuthApi.getAccessToken([
                    'read_user', 'api', 'read_api', 'read_repository', 'write_repository',
                ]);
               return token;
             }
            default:
              throw new Error('Git provider Auth error: unimplemented!');
        }

        
    }

    getGithubManager(token:string){
        return new GithubManager(this.config, token)
    }

    getGitlabManager(token:string){
        return new GitlabManager(this.config, token)
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
                const token = await this.getAccessToken(location);
                const githubManager = this.getGithubManager(token);
                return githubManager.createPullRequest(files,location,title,message);
            }
            case url.includes('gitlab'): {
                const token = await this.getAccessToken(location);
                const gitlabManager = this.getGitlabManager(token);
                return gitlabManager.createMergeRequest(files,location,title,message);
             }
            default:
              throw new Error('Git provider error: Pull request unimplemented!');
        }  
    }

    async getContentBySource(source: string){

        switch(true){
            case source.includes('github'): {
                const token = await this.getAccessToken(source);
                const githubManager = this.getGithubManager(token);
                return githubManager.getContentBySource(source);
            }
            case source.includes('gitlab'): {  // TODO
                const token = await this.getAccessToken(source);
                const githubManager = this.getGithubManager(token);
                return githubManager.getContentBySource(source);
             }
            default:
              throw new Error('Git provider error: Pull request unimplemented!');
        }  
    }
    
}