import { WorkflowDispatchParameters } from "../../../utils/types"

export type WorkFlowActionsProps = {
    workflowId?: number,
    status?: string,
    conclusion?: string
    parameters?: WorkflowDispatchParameters[] | []
}