import { WorkflowDispatchParameters, WorkflowResultsProps } from "../../../utils/types"

export type CardsProps = {
    items: WorkflowResultsProps[] | [],
    updateData: () => Promise<void>
  }

export type WorkFlowItemProps = {
    id: number,
    workflowName: string,
    conclusion?: string,
    status?: string,
    parameters?: WorkflowDispatchParameters[] | [],
    lastRunId?: string
  }