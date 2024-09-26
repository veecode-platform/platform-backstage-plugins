import { WorkflowDispatchParameters } from "../../../../utils/types"

export interface WorkFlowItemProps {
    id: number,
    workflowName: string,
    conclusion?: string,
    status?: string,
    parameters?: WorkflowDispatchParameters[] | [],
    lastRunId?: string,
    path?:string
  }