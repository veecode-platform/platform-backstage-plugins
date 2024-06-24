import { KubernetesResult } from "./kubernetesResults"

export type UseKubernetesProps = {
    clusterName: string,
    intervalMs?: number
}

export type UseKubernetesResponse = {
    kubernetesResults: KubernetesResult,
    loading: boolean,
    error: string
}

