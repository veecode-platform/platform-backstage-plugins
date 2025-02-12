import { IRepository } from "@veecode-platform/backstage-plugin-veecode-assistant-ai-common";

export interface IGitManager {
    returnRepoInfo(location: string): Promise<{
        localPath: string;
        repoUrl: string;
        branch: string;
    }>,
    cloneRepo(token: string, localPath: string, repoUrl: string, branch: string): Promise<IRepository>;
}