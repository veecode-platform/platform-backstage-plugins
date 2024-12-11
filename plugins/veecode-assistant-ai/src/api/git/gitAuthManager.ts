import { OAuthApi } from "@backstage/core-plugin-api";
import { parseGitUrl } from "../../utils/helpers/parseGitUrl";
import { IGitAuthManager } from "./types";

export class GitAuthManager implements IGitAuthManager{
   
    constructor(
        private githubAuthApi: OAuthApi,
        private gitlabAuthApi : OAuthApi,
    ){
    }

    async getAccessToken(location: string){

        const  url = parseGitUrl(location); 

        switch(true){
            case url.includes('github'): {
                const token = await this.githubAuthApi.getAccessToken([
                    'read_user', 'api', 'read_api', 'read_repository'
                ]);
               return token;
            }
            case url.includes('gitlab'): {
                const token = await this.gitlabAuthApi.getAccessToken([
                    'read_user', 'api', 'read_api', 'read_repository'
                ]);
               return token;
             }
            default:
              throw new Error('Git provider Auth error: unimplemented!');
        }

        
    }
}