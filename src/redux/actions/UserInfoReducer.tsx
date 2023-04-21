import { userInfoType } from "../types/reduxTypes";
import { types } from "../types/types";

export function updateUserInfo(data: userInfoType) {
    return {
        type: types.UPDATE_USER_INFO,
        file_check:data.file_check,
        file_upload : data.file_upload,
        mt_idx : data.mt_idx,
        mt_name : data.mt_name,
        mt_type : data.mt_type,
    };
}