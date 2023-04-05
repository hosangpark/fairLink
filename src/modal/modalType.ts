

export type AlertClearType = { //초기 alert state 타입
    alert:boolean,
    msg : string,
    type:string,
}

export type AlertModalType = { //alertModal props type
    show : boolean,
    hide: () => void,
    msg : string,
    type? : string,
    title? : string,
    action? : () => void;
    btnLabel? : string,
}

export type LoadingModalType = { //loading modal props type
    isLoading : boolean,
}