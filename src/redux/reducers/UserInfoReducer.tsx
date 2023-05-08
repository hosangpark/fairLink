import { loadingType, userInfoType } from "../types/reduxTypes"; 
import { types } from "../types/types";

const defaultState: userInfoType = {
    file_check:[],
    file_upload:'',
    mt_idx : '',
    mt_name : '',
    mt_type : '',
    location : '',
};

export const UserInfo = (state = defaultState, action: any) => {
    // For Debugger
    switch (action.type) {
        case types.UPDATE_USER_INFO:
            return {
                file_check:action.file_check,
                file_upload : action.file_upload,
                mt_idx : action.mt_idx,
                mt_name : action.mt_name,
                mt_type : action.mt_type,
                location : action.location,
            };
        default:
            return state;
    }
};
