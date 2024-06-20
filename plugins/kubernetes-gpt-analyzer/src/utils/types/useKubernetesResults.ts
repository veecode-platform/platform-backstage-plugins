import { KubernetesResult } from "./kubernetesResults"

export type UseKubernetesProps = {
    clusterId: string,
    intervalMs?: number
}

export type UseKubernetesResponse = {
    kubernetesResults: KubernetesResult,
    loading: boolean,
    error: string
}

