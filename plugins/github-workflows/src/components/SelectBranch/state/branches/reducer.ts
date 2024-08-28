import { Branch } from "../../../../utils/types";
import { BrancheActionType } from "./actions";

export const initialBranchesState : Branch[] = [];

export const branchesReducer = (state: Branch[], action: BrancheActionType): Branch[] => {
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