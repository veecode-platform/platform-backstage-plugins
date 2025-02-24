import { WorkflowResultsProps } from '../../../utils/types/index';

export const addWorkflows = (workflows:WorkflowResultsProps[]) => ({
    type: 'ADD_WORKFLOWS',
    payload: workflows
} as const)

export const resetWorkflows = () => ({
    type: 'RESET_WORKFLOWS',
    payload: []
} as const);

export const removeWorkflow = (workflowId: number) => ({
    type: 'REMOVE_WORKFLOW',
    payload: workflowId
} as const);

export const updateWorkflows = (workflow: WorkflowResultsProps) => ({
    type: 'UPDATE_WORKFLOWS',
    payload: workflow
} as const);


export type WorkflowActionType = ReturnType<typeof addWorkflows | typeof resetWorkflows | typeof removeWorkflow | typeof updateWorkflows>;