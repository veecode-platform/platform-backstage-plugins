export type EntityAnnotationType = {
    engine: string,
    location: string,
    projectName: string
}

export type PullRequestType = {
    title: string,
    message: string
}

export interface submitRepoAndCreateVectorStoreResponse {
    vectorStoreId: string
}

export type JsonObject = {
    [key:string] : string
}