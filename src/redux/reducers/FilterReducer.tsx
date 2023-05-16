import { loadingType, FilterType } from "../types/reduxTypes"; 
import { types } from "../types/types";

const defaultState: FilterType = {
    sel_location: '',
    sel_type: '',
    sel_stand1: '',
    sel_stand2: '',
    sel_price_type: '',
};

export const FilterReducer = (state = defaultState, action: any) => {
    // For Debugger
    switch (action.type) {
        case types.Filter:
            return {
                sel_location: action.sel_location,
                sel_type: action.sel_type,
                sel_stand1: action.sel_stand1,
                sel_stand2: action.sel_stand2,
                sel_price_type: action.sel_price_type,
            };
        default:
            return state;
    }
};
