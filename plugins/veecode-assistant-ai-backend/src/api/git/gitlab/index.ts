import type { LoggerService } from "@backstage/backend-plugin-api";
import type { Config } from "@backstage/config";
import type { FileContent } from "../../../utils/types";
import { Gitlab } from "@gitbeaker/rest";
import type { Readable } from "stream";
import { extractGitLabInfo } from "../../../utils/helpers/extractGitlabInfo";
import { extractFilesFromArchive } from "../../../utils/helpers/extractFilesFromArchive";
import { generateBranchName } from "../../../utils/helpers/generateBranchName";
import { Base64 } from "js-base64";

export class GitlabManager {

    private readonly token: string;
    private readonly gitlabApi: InstanceType<typeof Gitlab>;

    constructor(
        private config: Config,
        private logger: LoggerService,
        token: string
    ) {
        this.token = token;
        const host = this.config.getOptionalString("integrations.gitlab.host") || "https://gitlab.com";
        this.gitlabApi = new Gitlab({
            host,
            token: this.token,
        });
    }

    async getFilesFromRepo(url: string) {
        this.logger.info("Downloading files from Gitlab repository");
        const { group, repo, branch } = extractGitLabInfo(url);

        const projectId = encodeURIComponent(`${group}/${repo}`);

        try {
            const archive = await this.gitlabApi.Repositories.showArchive(projectId, { sha: branch });

            if (!archive) {
                throw new Error("Failed to download the archive from the repository")
            }

            return await extractFilesFromArchive(archive as unknown as Readable);
        } catch (error: any) {
            throw new Error("Failed to download the archive from repository")
        }
    }

    async createPullRequest(
        files: FileContent[],
        url: string,
        title: string,
        message: string) {

        const { group, repo } = extractGitLabInfo(url);

        const projectId = encodeURIComponent(`${group}/${repo}`);
        const branchName = generateBranchName(title);
        const baseBranch = "main";

        try {
            // create branch
            await this.gitlabApi.Branches.create(projectId, branchName, baseBranch);

            // Add files to the branch
            for (const file of files) {
                const { name, content } = file;

                let fileExists = false;

                try {
                    await this.gitlabApi.RepositoryFiles.show(projectId, name, branchName);
                    fileExists = true;
                } catch (error: any) {
                    if (error.response?.status !== 404) {
                        throw new Error(`Error fetching file ${name}: ${error.message}`);
                    }
                }

                if (fileExists) {
                    // Update existing file
                    await this.gitlabApi.RepositoryFiles.edit(
                        projectId,
                        name,
                        branchName,
                        Base64.encode(content),
                        `Updating ${name} in branch ${branchName}`
                    );
                } else {
                    // Create new file
                    await this.gitlabApi.RepositoryFiles.create(
                        projectId,
                        name,
                        branchName,
                        Base64.encode(content),
                        `Adding ${name} in branch ${branchName}`
                    );
                }
            }

            // Create merge request
            this.logger.info(`Creating merge request for branch ${branchName}...`);
            const mergeRequest = await this.gitlabApi.MergeRequests.create(
                projectId,
                branchName,
                baseBranch,
                title,
                {
                    description: message,
                }
            );

            return {
                status: "success",
                link: mergeRequest.web_url,
                message: "Merge request created successfuly!"
            }
        } catch (error: any) {
            throw new Error(`Error creating pull request: ${error.message}`);
        }

    }
}