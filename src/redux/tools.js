import * as ActionTypes from './ActionTypes';

export const Tools = (state = {
        isLoading: true, errMess: null, tools: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_TOOLS:
            return {...state, isLoading: false, errMess: null, tools: action.payload};
        case ActionTypes.TOOLS_LOADING:
            return {...state, isLoading: true, errMess: null, tools: []};
        case ActionTypes.TOOLS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, tools: []};
        default: return state;
    }
}