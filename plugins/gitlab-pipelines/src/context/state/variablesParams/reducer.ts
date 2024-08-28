import { VariablesParams } from "../../../utils/types";
import { VariablesActionType } from "./actions";

export const initialVariableParamsState : VariablesParams[] | null = null;

export const VariablesParamsReducer = (state:VariablesParams[] | null,action: VariablesActionType):VariablesParams[] | null => {
    switch (action.type) {
        case 'ADD_VARIABLES':
          return action.payload;
        case 'REMOVE_VARIABLE':
          return state ? state.filter(item => item.value !== action.payload) : state;
        case 'UPDATE_VARIABLE':
          return state ? state.map(item => item.value === action.payload.value ? action.payload : item) : state;
        default:
          return state;
    }
}