import { InputsParamsActionType } from "./actions";

export const initialInputsParamsState : object = {};

export const InputsParamsReducer = (state:object, action: InputsParamsActionType) : object => {
    switch (action.type) {
        case 'ADD_INPUTS':
          return action.payload;
        case 'REMOVE_INPUTS':
          return {};   
        default:
          return state;
    }
}

