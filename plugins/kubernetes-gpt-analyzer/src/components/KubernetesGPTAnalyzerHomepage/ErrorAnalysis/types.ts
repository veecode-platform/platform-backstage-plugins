import { KubernetesResultItem } from "../../../utils/types/kubernetesResults"

export type ErrorAnalysisProps = {
    errors: number,
    messages: KubernetesResultItem[]
}