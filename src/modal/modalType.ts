import { SelImageType } from "../screen/screenType";


export type AlertClearType = { //초기 alert state 타입
    alert:boolean,
    strongMsg: string,
    msg : string,
    type:string,
}


export interface DispatchInfoItemType{ //최근 배차리스트 아이템 타입
    id:string,
    location : string,
    title : string,
    date : string,
    contents : string,
    kind : string,
    company : string,
    pilot : string,
    contract : string,
    // selDispatch : string[],
    // setSelDispatch : (check : boolean , selIdx:string) => void;
}

// export interface RecEmpItemType{ //추천기업 현황 card에 들어가는 info 타입
//     id:string,
//     company : string,
//     totalCount:string,
//     totalDay : string,
//     comment : string
// }

export type RecCardType = { //추천기업 현황 아이템 component 타입
    item : RecEmpItemType,
}

export type RecEmpItemType = {
    company_name : string,
    content : string,
    count : string,
    days : string,
}

export type AlertModalType = { //alertModal props type
    show : boolean,
    hide: () => void,
    strongMsg? : string,
    msg : string,
    type? : string,
    title? : string,
    action? : () => void;
    cancleAction? : () => void;
    btnLabel? : string,
}

export type SelectImageUploadType = {
    show : boolean,
    hide : () => void,
    setImage : (image:SelImageType) => void;
}



interface ObjectArrayType {
    [key:string ] : string
}

export type SelectModalType = { //select box있는 modal type
    show : boolean,
    hide : () =>void;
    action : () => void;
    strSetOption? : (opt : string , type? : string) => void;
    objSetOption? : (opt : string , type? : string) => void;
    bigTitle? : string,
    smallTitle? : string,
    date? : string,
    strOptList? : string[],
    objOptList ? :ObjectArrayType[],
    defaultText ? :string,
    btnLabel : string,
    style ? :object,
    type? : string,
    labelFooter? : string,
    selOption? : string,
    isDisable? : boolean,
}

interface ModalType { //default modal type
    show:boolean;
    hide : () => void;
}

export interface LoginIntroModalType extends ModalType{ //로그인 시작할때 나타나는 modal
    action? : () => void;
}

export interface LastDispatchModalType extends ModalType{ //최근 배차리스트 modal
    action? : () => void;
}

export interface ReqDispatchModalType extends ModalType{ //배차요청 type 선택 modal
    action? : () => void;
    isReplace? : boolean;
}

export interface RecEmpModalType extends ModalType{ //추천기업 현황 modal 
    action? : () => void;
    mpt_idx : string;
}

export interface CancleReasonModalType extends ModalType{ //반려사유 입력 modal
    action : (reason:string) => void;
}




export type LoadingModalType = { //loading modal props type
    isLoading : boolean,
}
export type ImageModalType = { 
    show:boolean
    action:()=>void
    hide:()=>void,
    imgrl : string,
}

