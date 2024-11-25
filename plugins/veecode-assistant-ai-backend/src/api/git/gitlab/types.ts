import { PullRequestResponse } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";
import { FileContent } from "../../../utils/types";

export interface IGitlabManager {
    getFilesFromRepo(url: string): Promise<File[]>,
    createMergeRequest(files: FileContent[], url: string, title: string, message: string): Promise<PullRequestResponse>
}