import { WorkflowResultsProps } from '../../../utils/types/index';

type WorkflowsAction = 
| { type: 'ADD_WORKFLOWS'; payload: WorkflowResultsProps[]}
| { type: 'REMOVE_WORKFLOW'; payload: number}
| { type: 'UPDATE_WORKFLOWS'; payload: WorkflowResultsProps};

export const initialWorkflowsState : WorkflowResultsProps[] = [];

export const WorkflowsReducer = (state: WorkflowResultsProps[], action: WorkflowsAction) : WorkflowResultsProps[] => {
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