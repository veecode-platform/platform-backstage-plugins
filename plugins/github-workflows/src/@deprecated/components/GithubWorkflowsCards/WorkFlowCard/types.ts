import { WorkflowResultsProps } from "../../../../utils/types"

export type CardsProps = {
    items: WorkflowResultsProps[] | [],
    updateData: () => Promise<void>
  }

