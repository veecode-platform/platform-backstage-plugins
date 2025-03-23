import { FileContent } from "@veecode-platform/backstage-plugin-vee-common"

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

export interface PluginListProps {
    id: string,
    icon: string | React.JSX.Element | null,
    name: string,
    docs: string
}

export interface StackInstructiosProps {
    id: string,
    name: string,
    source: string,
}
export interface InstructionsProps {
    stackInfo: StackInstructiosProps,
    templateName: string,
    additionalInfo?: string,
    plugins?: pluginInstructionsType[]
}

export type pluginInstructionsType = {
    id: string,
    name: string,
    docs: string
 }

export type TemplateOutputProps = {
    templateName: string,
    files: FileContent[]
}