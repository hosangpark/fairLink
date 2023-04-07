

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

export interface LoginIntroModalType {
    show : boolean;
    hide : () => void;
    action : () => void;
}

export type LoadingModalType = { //loading modal props type
    isLoading : boolean,
}