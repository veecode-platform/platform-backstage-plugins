import { WorkflowResultsProps } from '../../../utils/types/index';
import { WorkflowActionType } from './actions';

export const initialWorkflowsState : WorkflowResultsProps[] = [];

export const WorkflowsReducer = (state: WorkflowResultsProps[], action: WorkflowActionType) : WorkflowResultsProps[] => {
    switch (action.type) {
        case 'ADD_WORKFLOWS':
            return action.payload;
        case 'REMOVE_WORKFLOW':
            return state.filter(item => item.id !== action.payload)
        case 'UPDATE_WORKFLOWS':
            return state.map(item => (item.name === action.payload.name ?  action.payload : item ));
        default:
            return state;
    }
}