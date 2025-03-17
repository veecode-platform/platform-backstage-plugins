
/**
 *  @public
 */
export interface IGitlabManager {
    returnRepoInfo({url, partial}:ReturnGitlabRepoInfo): Promise<{
        localPath: string;
        repoUrl: string;
        branch: string;
        folderPath?: string | null
    }>,
}

export type ReturnGitlabRepoInfo = {
    url: string,
    partial?:boolean
}