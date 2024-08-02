import { Branch } from "../../../../utils/types";


type Action =
| {type: 'ADD_BRANCHES'; payload: Branch[]}
| {type: 'REMOVE_BRANCH'; payload: string}
| {type: 'UPDATE_BRANCHES'; payload: Branch};

export const initialBranchesState : Branch[] = [];

export const branchesReducer = (state: Branch[], action: Action): Branch[] => {
    switch(action.type){
        case 'ADD_BRANCHES':
            return action.payload
        case 'REMOVE_BRANCH':
            return state.filter(item => item.name !== action.payload);
        case 'UPDATE_BRANCHES':
            return state.map(item => (item.name === action.payload.name ?  action.payload : item ));
        default:
            return state
    }
}