import { InputsParamsActionType } from "./actions";
import { InputsParamsType } from "./types";

export const initialInputsParamsState : InputsParamsType = {};

export const InputsParamsReducer = (state:InputsParamsType, action: InputsParamsActionType) : InputsParamsType => {
    switch (action.type) {
        case 'ADD_INPUTS':
          return action.payload;
        case 'REMOVE_INPUTS':
          return {};   
        default:
          return state;
    }
}

