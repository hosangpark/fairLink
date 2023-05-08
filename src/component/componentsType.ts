import { ImageSourcePropType,KeyboardTypeOptions } from "react-native";
import { FavoriteListItemType } from "../screen/screenType";

export interface NumberObejctType {
    [key: number]: string;
}

export interface BackHeaderType {
    backAction? : () => void;
    title : string;
    isPop? : boolean;
}

export interface CustomButtonType {
    style? : object,
    labelStyle ? : object,
    label : string,
    action : ()=>void,
}
export interface CustomPhoneCallType {
    phonenumber:string
    alertModalOn: (e:string)=>void
}
export interface CustomAccordionType {
    data:{
        title:string,
        count:number,
        list:object[]
    },
    userType:string
    action : ()=>void,
}
export interface CustomAccordionType2 {
    title:string,
    subtitle:string,
    data:object[],
    userType:string
    action : ()=>void,
}
export interface DocumentAccordionType {
    title:string,
    subList:{
        title:string,
        file_check:string
        file_url:string
    }[],
}

export interface ObjectArrayType {
    [key:string ] : string
}
export type CustomSelectBoxType = {
    containerStyle? : object;
    style? : object;
    strOptionList? : string[],
    objOptionList? : ObjectArrayType[], 
    strSetOption? : (opt : string, type?: string , selIndex? : number) => void;
    objSetOption? : (opt : string, type?: string, selIndex? : number) => void;
    selOption? : string | ObjectArrayType;
    type? : string,
    defaultText : string;
    buttonStyle: object;
    buttonTextStyle: object;
    rowStyle: object;
    rowTextStyle: object;
    title? : string,
    essential? : boolean,
    isDisable? : boolean,
    labelFooter? : string,
    selIndex? : number , //array로 관리되는 object 변경시 사용
}
export type CustomWaveSelectBoxType = {
    style : object,
    strOptionList : string[],
    selOption1 : string | ObjectArrayType;
    setStrOption1: (opt : string, type?: string) => void;
    selOption2 : string | ObjectArrayType;
    setStrOption2: (opt : string, type?: string) => void;
}


export interface UserInfoCardType {
    // jobType : string,
    // userProfileUrl : string,
    // empName : string,
    // userName:string,
    // score:number,
    // rating:number,
// recEmpCount:number
    // location:string,
    item : FavoriteListItemType,
    isDelete: boolean,
    isFavorite?:boolean,
    isCheck?:string,
    index : string,
    action:(e:string)=>void,
    refetch? : () => void;
}
export interface HeavyEquipmentCardType {
    EquiName : string,
    EquiFacturing : string,
    EquiUrl : string,
    EquiNumber:string,
    Device : string,
    Documents:string,
    action:()=>void
    action2:()=>void
}
export interface BoardCardType {
    jobType?:string,
    cat_idx:string 
    cot_idx:string 
    start_date:string
    end_date:string
    location:string
    crt_name:string
    content:string
    equip:string
    career:string
    apply_count:string
    cardtitle:string
    contract_idx?:string
    contract_check?:string
    met_company?:string
    mct_company?:string
    match_type?:string
}

export interface ProfileCardType {
    jobType? : string,
    userProfileUrl : string,
    userName:string,
    score:number,
    score_count:string,
    good:number,
    location:string,
    age : string,
    gender : string,
    phone : string,
    index? : string,
    equip:string
}

export interface TextBoxType {
    boldText?: string,
    subText: string,
    rightText: string,
    type: number,
}

export interface CustomInputTextBoxType {
    containerStyle? : object,
    style? : object,
    inputType? : KeyboardTypeOptions,
    imgfile?:ImageSourcePropType,
    placeholder?:string,
    button?:string,
    action?:()=>void,
    editable?:boolean
    placeholderTextColor?:string,
    input? : string,
    setInput? : (text:string,key?:string) => void;
    type? : string,
    title? : string,
    essential? : boolean,
    whiteReadOnly? : boolean,
    isTextLabel? : string,
}
export interface CustomWaveBoxType {
    style? : object,
    title? : string,
    imgfile?:ImageSourcePropType,
    placeholder1?:string,
    placeholder2?:string,
    button?:string,
    action?:()=>void,
    action2?:()=>void,
    editable?:boolean,
    placeholderTextColor?:string,
    text1:string,
    setText1:(e:string,type?:string)=>void,
    type1? : string,
    text2:string,
    setText2:(e:string,type?:string)=>void,
    type2? : string,
    whiteReadOnly1? : boolean,
    whiteReadOnly2? : boolean,
    essential? : boolean,
}
export interface PilotInfoCardType {
    index: string,
    userName: string,
    age: number,
    career: number,
    phone: string,
    score: number,
    recommendation: number,
    action: ()=>void
    editable:boolean
    placeholderTextColor:string
}

export type MarginComType = {
    mt? : number,
    mb? : number,
    my? : number,
    isBorder? : boolean,
    isBorderDeep ? : boolean,
}

export type SelectedEquipmentCardType = {
    equipNumb : string,
    year : number,
    sideEquip : string,
}

export type MypageDataType = { //초기 alert state 타입
    company:string,
    hp:string,
    name:string,
    position:string,
    require_check:string
}
export type MyInfoDataType = { //초기 alert state 타입
    mt_name:string,
    mct_busi_num:string,
    mct_ceo:string,
    mct_company:string,
    mct_position:string
    mt_email:string
    mt_hp:string
}
export type DetailFieldBoxDataType = { 
    crt_name:string,
    company:string,
    detail_location:string,
    cot_e_type:string,
    cot_e_year:string,
    cot_e_sub:string,
    cot_content:string,
    cot_career:string,
    cot_age:string,
    cot_score:string,
    cot_goods:string,
    cot_start_date:string,
    cot_end_date:string,
    cot_start_time:string,
    cot_end_time:string,
    cot_pay_type:string,
    cot_pay_price:string,
    cot_pay_date:string,
    cot_pay_etc?:string | null,
    cot_m_name:string,
    cot_m_num:string,
}
export type VolunteerListType = { 
    data:{
        crt_name:string,
        equip:string,
        year:string,
        sub:string,
        start_date:string,
        end_date:string,
        start_time:string,
        end_time:string
    }
    count:number,
    list:{
        cat_idx:string,
        cot_idx:string,
        type:string,
        met_company:string,
        mpt_name:string,
        good:string,
        score:number,
        score_count:string,
        equip:string,
        mpt_career:string,
        mpt_location:string,
    }[]
}

export type consProfileDataType = {
    profileData:{
        mpt_career:string,
        mpt_licence:string,
        mpt_equip_memo:string,
        mpt_aspire:string,
    }
}
export type conssubDataType = {
    subData:{
        
    }
}
export type DetailFieldBoxType = {
    title:string,
    text?:string,
    cot_pay_type?:string,
    cot_career?:string,
    cot_age?:string,
    cot_score?:string,
    cot_goods?:string,
    cot_start_date?:string,
    cot_end_date?:string,
    cot_start_time?:string,
    cot_end_time?:string,
    cot_pay_date?:string,
    cot_pay_etc?:string
}