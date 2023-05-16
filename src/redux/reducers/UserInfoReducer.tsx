import { loadingType, userInfoType } from "../types/reduxTypes"; 
import { types } from "../types/types";

const defaultState: userInfoType = {
    file_check:[],
    file_upload:'',
    mt_idx : '',
    mt_name : '',
    mt_type : '',
    location : '',
    equip_pilot : '',
    sel_location: '',
    sel_type: '',
    sel_stand1: '',
    sel_stand2: '',
    sel_price_type: '',
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
                equip_pilot : action.equip_pilot ? action.equip_pilot : '',
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
