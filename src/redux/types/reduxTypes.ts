//router type 지정하기

export type loadingType = {
    isLoading : boolean;
}

interface fileCheck {
    [key:string] : string,
}

export type userInfoType = {
    file_check : any[], //임시 any
    file_upload : string,
    mt_idx : string,
    mt_name : string,
    mt_type : string //1 : 건설 2 : 장비업체 4 : 조종사
}