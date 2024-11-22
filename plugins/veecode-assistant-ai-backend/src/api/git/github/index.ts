import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import { Octokit } from "octokit";
import { readGithubIntegrationConfigs } from "@backstage/integration";
import { extractGitHubInfo } from "../../../utils/helpers/extractGithubInfo"
import { formatHttpErrorMessage } from "../../../utils/helpers/formatHttpErrorMessage";
import { Base64 } from 'js-base64';
import { generateBranchName } from "../../../utils/helpers/generateBranchName";
import type { Readable } from "stream";
import { extractFilesFromArchive } from "../../../utils/helpers/extractFilesFromArchive";

export class GithubManager {

  private readonly token: string;
    
    constructor(
      private config: Config,
      private logger: LoggerService,
      token:string
    ){
      this.token = token;
    }

    private async getOctokit(hostname: string = 'github.com'):Promise<Octokit>{

        const configs = readGithubIntegrationConfigs(
          this.config.getOptionalConfigArray('integrations.github') ?? [],
        );
        const githubIntegrationConfig = configs.find(v => v.host === hostname);
        const baseUrl = githubIntegrationConfig?.apiBaseUrl;
        return new Octokit({ auth: this.token, baseUrl });
    
     }

    async getFilesFromRepo(url:string){
        this.logger.info("Get Files from github repository...")
        try{
        const {host, owner, repo, branch} = extractGitHubInfo(url);
        const octokit = await this.getOctokit(host);

        // Download the ZIP file from the repository
        const response = octokit.rest.repos.downloadArchive({
            owner,
            repo,
            ref: branch,
            archive_format: 'zipball' // TODO check
          });

        if (!response.data) {
          throw new Error('Failed to download the ZIP file from the repository.');
         }

        // Convert the response stream into a buffer
        return await extractFilesFromArchive(response.data as unknown as Readable);

        }catch(error:any){
            throw new Error(`Erro to download files:  ${error}`);
        }
    }
    async createPullRequest(
      files: {name: string, content: string}[],
      location:string,
      title: string, 
      message: string
      ){
        const {host, owner, repo } = extractGitHubInfo(location);
        const octokit = await this.getOctokit(host);
        const branchName = generateBranchName(title);

        const repoData = await octokit.repos.get({
            owner,
            repo
        }).catch((e:any) => {
            throw new Error(formatHttpErrorMessage("Couldn't fetch repo data", e));
        });

        const parentRef = await octokit.git.getRef({
          owner,
          repo,
          ref: `heads/${repoData.data.default_branch}` 
        }).catch((e:any) => {
          throw new Error(
            formatHttpErrorMessage("Couldn't fetch default branch data", e),
          );
        });

        await octokit.git.createRef({
            owner,
            repo,
            ref: `refs/heads/${branchName}`,
            sha: parentRef.data.object.sha
        }).catch((e:any) => {
            throw new Error (
                formatHttpErrorMessage(
                    `Couldn't create a new branch with name '${branchName}'`,
                    e,
                  ), 
            )
        });

        for (const file of files) {
          const filePath = file.name;
          const fileContent = file.content;
      
          let fileSha: string | undefined = undefined;
          try {
            const { data } = await octokit.repos.getContent({
              owner,
              repo,
              path: filePath,
              ref: branchName,
            });
            if (!Array.isArray(data) && data.sha) {
              fileSha = data.sha;
            }
          } catch (e: any) {
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
            message: `${title}: Update ${filePath}`,
            content: Base64.encode(fileContent),
            branch: branchName,
            sha: fileSha,
          }).catch((e:any)=>{
            throw new Error(
                formatHttpErrorMessage(
                  `Couldn't create a commit with ${filePath} file added`,
                  e,
                ),
              );  
        });
        }

        const pullRequestResponse = await octokit.pulls.create({
            owner,
            repo,
            title,
            head: branchName,
            message,
            base: repoData.data.default_branch
        }).catch((e:any) => {
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
            message: 'Pull request created successfully!'
        }

    }
}