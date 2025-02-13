import type { FileContent, PullRequestResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export interface IGitManager {
    getAccessToken(location: string): Promise<string>;
    createPullRequest(files: FileContent[], location: string, title: string, message: string): Promise<PullRequestResponse>
}