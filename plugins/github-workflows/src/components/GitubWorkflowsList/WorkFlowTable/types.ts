import { WorkflowResultsProps } from "../../../utils/types";

export type DenseTableProps = {
    items: WorkflowResultsProps[] | [],
    updateData: () => Promise<void>
  };