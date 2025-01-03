import { FileContent } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { PullRequestResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export interface IGithubManager {
    returnRepoInfo(url: string): Promise<{
        localPath: string;
        repoUrl: string;
        branch: string;
    }>;
    createPullRequest(files: FileContent[], location: string, title: string, message: string): Promise<PullRequestResponse>  
}
