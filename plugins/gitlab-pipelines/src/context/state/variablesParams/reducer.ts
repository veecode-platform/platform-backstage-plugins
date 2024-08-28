import { VariablesParams } from "../../../utils/types";

type VariablesParamsAction = 
| {type: 'ADD_VARIABLES', payload: VariablesParams[]}
| {type: 'REMOVE_VARIABLE', payload: string}
| { type: 'UPDATE_VARIABLE', payload: VariablesParams};

export const initialVariableParamsState : VariablesParams[] = [];

export const VariablesParamsReducer = (state:VariablesParams[],action: VariablesParamsAction):VariablesParams[] => {
    switch (action.type) {
        case 'ADD_VARIABLES':
          return action.payload;
        case 'REMOVE_VARIABLE':
          return state.filter(item => item.value !== action.payload);
        case 'UPDATE_VARIABLE':
          return state.map(item => item.value === action.payload.value ? action.payload : item)
        default:
          return state;
    }
}