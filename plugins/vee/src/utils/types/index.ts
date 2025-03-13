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

export interface InstructionsProps {
    stackId: string,
    templateName: string,
    additionalInfo?: string,
    plugins?: pluginInstructionsType[]
}

export type pluginInstructionsType = { id: string }