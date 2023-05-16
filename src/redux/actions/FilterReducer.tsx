import { FilterType } from "../types/reduxTypes";
import { types } from "../types/types";

export function Filter(data: FilterType) {
    return {
        type: types.Filter,
        sel_location:data.sel_location,
        sel_type: data.sel_type,
        sel_stand1: data.sel_stand1,
        sel_stand2: data.sel_stand2,
        sel_price_type: data.sel_price_type,
    };
}