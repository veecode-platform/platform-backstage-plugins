export interface IGit {
    cloneRepo(token:string,localPath: string, repoUrl: string, branch: string): Promise<string>,
    returnFilesFromLocalPath(localPath: string): Promise<File[]>
}