import type { FileContent, PullRequestResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

/**
 *  @public
 * 
 */
export interface IGitlabManager {
    createMergeRequest(files: FileContent[], url: string, title: string, message: string): Promise<PullRequestResponse>
}