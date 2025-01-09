export interface IGitManager {
    getAccessToken(location: string): Promise<string>
}