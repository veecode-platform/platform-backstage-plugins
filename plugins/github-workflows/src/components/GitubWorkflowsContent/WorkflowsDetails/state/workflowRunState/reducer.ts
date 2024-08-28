import { WorkflowRun } from "../../../../../utils/types";
import { WorkflowRunActionType } from "./actions";

export const initialWorkflowRunState : WorkflowRun | null = null

export const WorkflowRunReducer = (state: WorkflowRun | null, action: WorkflowRunActionType) : WorkflowRun | null => {
    switch (action.type) {
        case 'ADD_WORKFLOW_RUN':
          return action.payload;
        case 'DELETE_WORKFLOW_RUN':
          return null;
        default:
          return state;
    }
}