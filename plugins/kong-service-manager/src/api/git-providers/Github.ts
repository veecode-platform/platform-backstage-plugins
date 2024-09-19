import { ConfigApi } from "@backstage/core-plugin-api";
import { ScmAuthApi } from "@backstage/integration-react";
import { extractGitHubInfo } from "../../utils/helpers/githubExctractInfo";
import { readGithubIntegrationConfigs } from "@backstage/integration";
import { Octokit } from "@octokit/rest";
import { formatHttpErrorMessage } from "../../utils/helpers/formatHttpErrorMessage";
import { Base64 } from 'js-base64';

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

    async createPullRequest(location:string, fileContent:string, title: string, message: string){
        const {host, owner, repo, file} = extractGitHubInfo(location);
        const octokit = await this.getOctokit(host);
        const branchName = title.replace(" ","-");

        const repoData = await octokit.repos.get({
            owner,
            repo
        }).catch(e => {
            throw new Error(formatHttpErrorMessage("Couldn't fetch repo data", e));
        });

        const parentRef = await octokit.git.getRef({
            owner,
            repo,
            ref: `heads/${repoData}.data.default_branch`
        }).catch(e=>{
            throw new Error(
                formatHttpErrorMessage("Couldn't fetch default branch data", e),
              );
        });

        await octokit.git.createRef({
            owner,
            repo,
            ref: `refs:/heads/${branchName}`,
            sha: parentRef.data.object.sha
        }).catch(e => {
            throw new Error (
                formatHttpErrorMessage(
                    `Couldn't create a new branch with name '${branchName}'`,
                    e,
                  ), 
            )
        });

        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: file,
            message: title,
            content: Base64.encode(fileContent),
            branch: branchName
        }).catch(e=>{
            throw new Error(
                formatHttpErrorMessage(
                  `Couldn't create a commit with ${file} file added`,
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
            link: pullRequestResponse.data.html_url,
            message: 'Pull request Created!'
        }

    }
}