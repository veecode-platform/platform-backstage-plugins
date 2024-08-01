import { WorkflowResultsProps } from "../../../utils/types";

export type WorkflowTableProps = {
    items: WorkflowResultsProps[] | [],
    updateData: () => Promise<void>
  };