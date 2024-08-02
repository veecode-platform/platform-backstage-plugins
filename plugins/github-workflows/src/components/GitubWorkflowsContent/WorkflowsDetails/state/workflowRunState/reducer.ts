import { WorkflowRun } from "../../../../../utils/types";

type WorkflowRunAction = 
|{type: 'ADD_WORKFLOW_RUN', payload: WorkflowRun} 
|{type: 'REMOVE_WORKFLOW_RUN', payload: {}}

export const initialWorkflowRunState : WorkflowRun | null = null

export const WorkflowRunReducer = (state: WorkflowRun | null, action: WorkflowRunAction) : WorkflowRun | null => {
    switch (action.type) {
        case 'ADD_WORKFLOW_RUN':
          return action.payload;
        case 'REMOVE_WORKFLOW_RUN':
          return null;
        default:
          return state;
    }
}