import { IRepository, PullRequestResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { FileContent } from "openai/resources";

export interface IGitManager {
    returnRepoInfo(location: string): Promise<{
        localPath: string;
        repoUrl: string;
        branch: string;
    }>,
    cloneRepo(token: string, localPath: string, repoUrl: string, branch: string): Promise<IRepository>;
    // returnFilesFromLocalPath(localPath: string): Promise<File[]>;
    createPullRequest(files: FileContent[], location: string, title: string, message: string): Promise<PullRequestResponse> 
}