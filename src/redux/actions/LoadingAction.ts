import { types } from "../types/types";

export function toggleLoading(data: any) {
    
    return {
        type: types.LOADING_TYPE,
        toggleLoading : data,
    };
}