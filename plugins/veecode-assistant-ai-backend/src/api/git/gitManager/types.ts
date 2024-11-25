import { PullRequestResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { FileContent } from "openai/resources";

export interface IGitManager {
    downloadRepoFiles(location: string): Promise<File[]>,
    createPullRequest(files: FileContent[], location: string, title: string, message: string): Promise<PullRequestResponse>
}