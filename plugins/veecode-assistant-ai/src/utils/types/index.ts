export type EntityAnnotationType = {
    engine: string,
    location: string,
    projectName: string
}

export interface submitRepoAndCreateVectorStoreResponse {
    vectorStoreId: string
}