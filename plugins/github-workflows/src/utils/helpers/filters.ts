import { WorkflowAnnotation } from "../types";

export const workflowFilter = (workflowsByAnnotation: WorkflowAnnotation[] | null) => {
    if(workflowsByAnnotation) return workflowsByAnnotation.flatMap((w) => w.workflow)
    return []
}