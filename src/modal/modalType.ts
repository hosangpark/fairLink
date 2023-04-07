

export type AlertClearType = { //초기 alert state 타입
    alert:boolean,
    strongMsg: string,
    msg : string,
    type:string,
}

export type AlertModalType = { //alertModal props type
    show : boolean,
    hide: () => void,
    strongMsg? : string,
    msg : string,
    type? : string,
    title? : string,
    action? : () => void;
    btnLabel? : string,
}

interface ObjectArrayType {
    [key:string ] : string
}

export type SelectModalType = {
    show : boolean,
    hide : () =>void;
    action : (opt : string) => void;
    strSetOption : (opt : string) => void;
    objSetOption : (opt : ObjectArrayType) => void;
    bigTitle? : string,
    smallTitle? : string,
    date? : string,
    strOptList? : string[],
    objOptList ? :ObjectArrayType[],
    defaultText ? :string,
}

export interface LoginIntroModalType {
    show : boolean;
    hide : () => void;
    action : () => void;
}

export type LoadingModalType = { //loading modal props type
    isLoading : boolean,
}