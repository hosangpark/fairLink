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
    location : string,
    equip_pilot : string,
    sel_location: string,
    sel_type: string,
    sel_stand1: string,
    sel_stand2: string,
    sel_price_type: string,
}