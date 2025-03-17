import { FileContent, PullRequestResponse } from "@veecode-platform/backstage-plugin-vee-common";

export interface IGithubManager {
    createPullRequest(files: FileContent[], location: string, title: string, message: string): Promise<PullRequestResponse>;
    getContentBySource(source: string): Promise<string>
}