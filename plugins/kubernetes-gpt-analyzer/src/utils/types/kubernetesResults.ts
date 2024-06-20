import { KubernetesGPTEnum } from "../enum/kubernetes-gpt"

export interface KubernetesResult {
    apiVersion: KubernetesGPTEnum.apiVersion,
    items: KubernetesResultItem[],
    kind: 'ResultList',
    metadata: KubernetesResultMetadata
}

export type KubernetesResultMetadata = {
    continue: string,
    resourceVersion: string
}

export type KubernetesResultItem = {
    apiVersion: KubernetesGPTEnum.apiVersion,
    kind: 'Result',
    metadata: KubernetesItemMetadata,
    spec: KubernetesItemSpec,
    status: KubernetesItemStatus
}

export type KubernetesItemMetadata = {
    creationTimestamp: Date,
    generation: number,
    labels:JsonObject,
    managedFields: ManagedFields[],
    name: string,
    namespace: string,
    resourceVersion: string,
    uid: string
}

export type KubernetesItemSpec = {
    backend: string,
    details: string,
    error: ErrorMessage[],
    kind: string,
    name: string,
    parentObject: string
}

export type KubernetesItemStatus = {
    lifecycle: string
}

export type ErrorMessage = {
    text: string
}

export type JsonObject = {
    [key:string] : string
}

export type ManagedFields = {
    apiVersion: KubernetesGPTEnum.apiVersion,
    fieldsType: string,
    fieldsV1: object,
    manager: string,
    operation: string,
    time: Date
}