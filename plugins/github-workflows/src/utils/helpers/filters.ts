import { WorkflowAnnotation } from "../types";

export const workflowFilter = (workflowsByAnnotation: WorkflowAnnotation[] | null) => workflowsByAnnotation ? workflowsByAnnotation.flatMap((w) => w.workflow) : []