
/**
 *  @public
 */
export interface IGithubManager {
    returnRepoInfo({url, partial}:ReturnGithubRepoInfo): Promise<{
        localPath: string;
        repoUrl: string;
        branch: string;
        folderPath: string | null
    }>
}

export type ReturnGithubRepoInfo = {
    url: string,
    partial?:boolean
}