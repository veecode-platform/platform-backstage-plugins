
/**
 *  @public
 */
export interface IGithubManager {
    returnRepoInfo(url:string): Promise<{
        localPath: string;
        repoUrl: string;
        branch: string;
        folderPath: string | null
    }>
}
