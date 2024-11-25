import { FileContent } from "../../../utils/types";
import { PullRequestResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export interface IGithubManager {
    getFilesFromRepo(url: string): Promise<File[]>,
    createPullRequest(files: FileContent[], location: string, title: string, message: string): Promise<PullRequestResponse>  
}
