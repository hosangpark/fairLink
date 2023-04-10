import { loadingType } from "../types/reduxTypes"; 
import { types } from "../types/types";

const defaultState: loadingType = {
    isLoading: false,
};

export const Loading = (state = defaultState, action: any) => {
    // For Debugger
    switch (action.type) {
        case types.LOADING_TYPE:
            return {
                isLoading:action.toggleLoading,
            };
        default:
            return state;
    }
};
