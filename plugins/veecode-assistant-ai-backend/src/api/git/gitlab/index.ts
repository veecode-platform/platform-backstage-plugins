// import type { LoggerService } from "@backstage/backend-plugin-api";
// import type { Config } from "@backstage/config";
// import type { FileContent } from "../../../utils/types";
// import { Gitlab } from "@gitbeaker/rest";
// import type { Readable } from "stream";
// import { extractGitLabInfo } from "../../../utils/helpers/extractGitlabInfo";
// import { extractFilesFromArchive } from "../../../utils/helpers/extractFilesFromArchive";
// import { generateBranchName } from "../../../utils/helpers/generateBranchName";
// import { Base64 } from "js-base64";
// import { IGitlabManager } from "./types";
// import { readGitLabIntegrationConfigs } from "@backstage/integration/index";

// export class GitlabManager implements IGitlabManager {

//     private readonly token: string;

//     constructor(
//         private config: Config,
//         private logger: LoggerService,
//         token: string
//     ) {
//         this.token = token;
//     }

//     private async getGitlabApi(hostname: string = 'gitlab.com'){
//         const configs = readGitLabIntegrationConfigs(
//             this.config.getOptionalConfigArray('integrations.gitlab') ?? [],
//           );
//           const gitlabIntegrationConfig = configs.find(v => v.host === hostname);
//           const baseUrl = gitlabIntegrationConfig?.apiBaseUrl;
//           return new Gitlab({ host:baseUrl, token: this.token }); // TODO check baseurl or host
//     }

//     async getFilesFromRepo(url: string) {
//         this.logger.info("Downloading files from Gitlab repository");
//         const { host, group, repo, branch } = extractGitLabInfo(url);

//         const projectId = encodeURIComponent(`${group}/${repo}`);

//         try {
//             const gitlabApi = await this.getGitlabApi(host);
//             const archive = await gitlabApi.Repositories.showArchive(projectId, { sha: branch });

//             if (!archive) {
//                 throw new Error("Failed to download the archive from the repository")
//             }

//             return await extractFilesFromArchive(archive as unknown as Readable);
//         } catch (error: any) {
//             throw new Error("Failed to download the archive from repository")
//         }
//     }

//     async createMergeRequest(
//         files: FileContent[],
//         url: string,
//         title: string,
//         message: string) {

//         const { host, group, repo } = extractGitLabInfo(url);

//         const gitlabApi = await this.getGitlabApi(host);
//         const projectId = encodeURIComponent(`${group}/${repo}`);
//         const branchName = generateBranchName(title);
//         const baseBranch = "main";

//         try {
//             // create branch
//             await gitlabApi.Branches.create(projectId, branchName, baseBranch);

//             // Add files to the branch
//             for (const file of files) {
//                 const { name, content } = file;

//                 let fileExists = false;

//                 try {
//                     await gitlabApi.RepositoryFiles.show(projectId, name, branchName);
//                     fileExists = true;
//                 } catch (error: any) {
//                     if (error.response?.status !== 404) {
//                         throw new Error(`Error fetching file ${name}: ${error.message}`);
//                     }
//                 }

//                 if (fileExists) {
//                     // Update existing file
//                     await gitlabApi.RepositoryFiles.edit(
//                         projectId,
//                         name,
//                         branchName,
//                         Base64.encode(content),
//                         `Updating ${name} in branch ${branchName}`
//                     );
//                 } else {
//                     // Create new file
//                     await gitlabApi.RepositoryFiles.create(
//                         projectId,
//                         name,
//                         branchName,
//                         Base64.encode(content),
//                         `Adding ${name} in branch ${branchName}`
//                     );
//                 }
//             }

//             // Create merge request
//             this.logger.info(`Creating merge request for branch ${branchName}...`);
//             const mergeRequest = await gitlabApi.MergeRequests.create(
//                 projectId,
//                 branchName,
//                 baseBranch,
//                 title,
//                 {
//                     description: message,
//                 }
//             );

//             return {
//                 status: "success",
//                 link: mergeRequest.web_url as string,
//                 message: "Merge request created successfuly!"
//             }
//         } catch (error: any) {
//             throw new Error(`Error creating pull request: ${error.message}`);
//         }

//     }
// }