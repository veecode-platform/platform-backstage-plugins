export interface IGitAuthManager {
    getAccessToken(location: string): Promise<string>
}