import { ImageSourcePropType } from "react-native";
export interface BackHeaderType {
    backAction? : () => void;
    title : string;
}

export interface CustomButtonType {
    style? : object,
    labelStyle ? : object,
    label : string,
    action : ()=>void,
}
export interface CustomAccordionType {
    title:string,
    data:object[],
    action : ()=>void,
}

export interface ObjectArrayType {
    [key:string ] : string
}
export type CustomSelectBoxType = {
    strOptionList? : string[],
    objOptionList? : ObjectArrayType[], 
    strSetOption? : (opt : string) => void;
    objSetOption? : (opt : ObjectArrayType) => void;
    selOption? : string | ObjectArrayType;
    defaultText : string;
    style? : object;
    buttonStyle: object;
    buttonTextStyle: object;
    rowStyle: object;
    rowTextStyle: object;
}


export interface UserInfoCardType {
    jobType : string,
    userProfileUrl : string,
    empName : string,
    userName:string,
    score:number,
    rating:number,
    recEmpCount:number,
    location:string,
    isDelete: boolean,
    isFavorite?:string,
    index : string,
    action:()=>void
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
export interface UserInfoCard2Type {
    jobType:string,
    userName:string,
    score:number,
    location:string,
    complete:boolean
    workType:number
    userType:string
    total:number
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
    style? : object,
    imgfile:ImageSourcePropType | undefined,
    placeholder:string,
    button:string,
    action:()=>void,
    editable:boolean
    placeholderTextColor:string
}
export interface CustomWaveBoxType {
    style? : object,
    imgfile:ImageSourcePropType | undefined,
    placeholder1:string,
    placeholder2:string,
    button:string,
    action:()=>void
    editable:boolean
    placeholderTextColor:string
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