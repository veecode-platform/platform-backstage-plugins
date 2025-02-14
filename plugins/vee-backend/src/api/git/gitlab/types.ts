
/**
 *  @public
 */
export interface IGitlabManager {
    returnRepoInfo(url: string): Promise<{
        localPath: string;
        repoUrl: string;
        branch: string;
    }>,
}