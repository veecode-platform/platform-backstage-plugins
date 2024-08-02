import { WorkflowDispatchParameters } from "../../../../utils/types"

export type WorkFlowItemProps = {
    id: number,
    workflowName: string,
    conclusion?: string,
    status?: string,
    parameters?: WorkflowDispatchParameters[] | [],
    lastRunId?: string
  }