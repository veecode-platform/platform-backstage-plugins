import { IRepository } from "@veecode-platform/backstage-plugin-vee-common";

export interface IGitManager {
    returnRepoInfo(location: string): Promise<{
        localPath: string;
        repoUrl: string;
        branch: string;
    }>,
    cloneRepo(token: string, localPath: string, repoUrl: string, branch: string): Promise<IRepository>;
}