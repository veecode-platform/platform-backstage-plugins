import { ConfigApi } from "@backstage/core-plugin-api";
import { ScmAuthApi } from "@backstage/integration-react";
import { extractGitHubInfo } from "../../utils/helpers/extractGithubInfo";
import { readGithubIntegrationConfigs } from "@backstage/integration";
import { Octokit } from "@octokit/rest";
import { formatHttpErrorMessage } from "../../utils/helpers/formatHttpErrorMessage";
import { Base64 } from 'js-base64';
import { generateBranchName } from "../../utils/helpers/generateBranchName";
import { GithubFileResponse } from "../../utils/types";
import YAML from "js-yaml"

export class GithubManager {
    constructor(
        private readonly scmAuthApi: ScmAuthApi,
        private readonly configApi: ConfigApi
    ){}

    private async getOctokit(hostname: string = 'github.com'):Promise<Octokit>{
    
        const { token } = await this.scmAuthApi.getCredentials({
          url: `https://${hostname}/`,
          additionalScope: {
            repoWrite: true,
          },
        });

        const configs = readGithubIntegrationConfigs(
          this.configApi.getOptionalConfigArray('integrations.github') ?? [],
        );
        const githubIntegrationConfig = configs.find(v => v.host === hostname);
        const baseUrl = githubIntegrationConfig?.apiBaseUrl;
        return new Octokit({ auth: token, baseUrl });
    
     }
    
    async getContent(location:string,filePath:string[]){
        const {host, owner, repo, branch } = extractGitHubInfo(location);
        const octokit = await this.getOctokit(host);

        const specs = Promise.all(filePath.map(async (file:string) => {
            const response = await octokit.repos.getContent({
                owner,
                repo,
                path: file,
                branch
            });
    
            const data : GithubFileResponse = response.data as GithubFileResponse;
            const yamlContent = YAML.load(
                Buffer.from(data.content,'base64').toString('utf-8')
            ) as any;

            return yamlContent
        }))
        
        return specs
    }

    async createPullRequest(filePath:string,location:string, fileContent:string, title: string, message: string){
        const {host, owner, repo } = extractGitHubInfo(location);
        const octokit = await this.getOctokit(host);
        const branchName = generateBranchName(title);

        const repoData = await octokit.repos.get({
            owner,
            repo
        }).catch(e => {
            throw new Error(formatHttpErrorMessage("Couldn't fetch repo data", e));
        });

        const parentRef = await octokit.git.getRef({
          owner,
          repo,
          ref: `heads/${repoData.data.default_branch}` 
        }).catch(e => {
          throw new Error(
            formatHttpErrorMessage("Couldn't fetch default branch data", e),
          );
        });

        await octokit.git.createRef({
            owner,
            repo,
            ref: `refs/heads/${branchName}`,
            sha: parentRef.data.object.sha
        }).catch(e => {
            throw new Error (
                formatHttpErrorMessage(
                    `Couldn't create a new branch with name '${branchName}'`,
                    e,
                  ), 
            )
        });

         let fileSha: string | undefined = undefined;
         try {
             const { data } = await octokit.repos.getContent({
                 owner,
                 repo,
                 path: filePath,
                 ref: branchName
             });
             if (!Array.isArray(data) && data.sha) {
                 fileSha = data.sha;
             }
         } catch (e:any) {
             if (e.status !== 404) {
                 throw new Error(
                     formatHttpErrorMessage(
                         `Couldn't fetch existing file ${filePath} in the repo`,
                         e,
                     ),
                 );
             }
         }

        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: filePath,
            message: title,
            content: Base64.encode(fileContent),
            branch: branchName,
            sha: fileSha
        }).catch(e=>{
            throw new Error(
                formatHttpErrorMessage(
                  `Couldn't create a commit with ${filePath} file added`,
                  e,
                ),
              );  
        });

        const pullRequestResponse = await octokit.pulls.create({
            owner,
            repo,
            title,
            head: branchName,
            message,
            base: repoData.data.default_branch
        }).catch(e => {
            throw new Error(
                formatHttpErrorMessage(
                  `Couldn't create a pull request for ${branchName} branch`,
                  e,
                ),
              );
        })


        return {
            status: pullRequestResponse.status,
            link: pullRequestResponse.data.html_url,
            message: 'Pull request Created!'
        }

    }
}