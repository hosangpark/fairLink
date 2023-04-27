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
        registration:boolean,
    }[],
}

export interface ObjectArrayType {
    [key:string ] : string
}
export type CustomSelectBoxType = {
    strOptionList? : string[],
    objOptionList? : ObjectArrayType[], 
    strSetOption? : (opt : string, type?: string) => void;
    objSetOption? : (opt : string, type?: string) => void;
    selOption? : string | ObjectArrayType;
    type? : string,
    defaultText : string;
    style? : object;
    buttonStyle: object;
    buttonTextStyle: object;
    rowStyle: object;
    rowTextStyle: object;
    title? : string,
    essential? : boolean,
    isDisable? : boolean,
    labelFooter? : string,
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
    cat_idx?:string
    cot_idx?:string
    start_date:string
    end_date:string
    location:string
    crt_name:string
    content:string
    equip:string
    career:string
    apply_count:string
    cardtitle:string
}

export interface ProfileCardType {
    jobType : string,
    userProfileUrl : string,
    userName:string,
    score:number,
    rating:number,
    recEmpCount:number,
    location:string,
    age : string,
    gender : string,
    phone : string,
    index : string,
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