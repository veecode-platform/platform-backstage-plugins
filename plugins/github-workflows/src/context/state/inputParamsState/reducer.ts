type InputsParamsAction = 
| {type: 'ADD_INPUTS', payload: object}
| {type: 'REMOVE_INPUTS', payload: {}};

export const initialInputsParamsState : object = {};

export const InputsParamsReducer = (state:object, action: InputsParamsAction) : object => {
    switch (action.type) {
        case 'ADD_INPUTS':
          return action.payload;
        case 'REMOVE_INPUTS':
          return {};   
        default:
          return state;
    }
}

