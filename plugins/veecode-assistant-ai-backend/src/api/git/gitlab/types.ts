import { FileContent, PullRequestResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

/**
 *  @public
 */
export interface IGitlabManager {
    returnRepoInfo(url: string): Promise<{
        localPath: string;
        repoUrl: string;
        branch: string;
    }>,
    createMergeRequest(files: FileContent[], url: string, title: string, message: string): Promise<PullRequestResponse>
}