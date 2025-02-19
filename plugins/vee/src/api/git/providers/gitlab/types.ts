import type { FileContent, PullRequestResponse } from "@veecode-platform/backstage-plugin-vee-common";

/**
 *  @public
 * 
 */
export interface IGitlabManager {
    createMergeRequest(files: FileContent[], url: string, title: string, message: string): Promise<PullRequestResponse>
}