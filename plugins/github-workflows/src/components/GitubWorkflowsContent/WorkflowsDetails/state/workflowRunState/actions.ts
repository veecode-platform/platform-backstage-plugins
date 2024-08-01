import { WorkflowRun } from '../../../../../utils/types';

export const addWorkflowRun = (workflowRun: WorkflowRun)=>({
  type: 'ADD_WORKFLOW_RUN',
  payload: workflowRun
}as const);

export const deleteWorkflowRun = ()=>({
    type: 'DELETE_WORKFLOW_RUN',
    payload: {}
} as const)

export type WorkflowRunActionType = ReturnType<typeof addWorkflowRun | typeof deleteWorkflowRun >