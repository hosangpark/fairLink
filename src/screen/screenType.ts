export interface RouteType {
    route : any;
}
export interface HomeIndexType {
    setTabIndex? : (tab:number) => void;
}

export interface MyPageIndexType {
    setTabIndex? : (tab:number) => void;
}
export interface BoardIndexType {
    setTabIndex? : (tab:number) => void;
    type : string
}

// user
export type AgreementsType = RouteType & {
}

export type MemberLineType = RouteType & {

}

export type JoinInfoType = RouteType & {
    // memberType : 0 | 1 | 2  //회원타입 (0 : 건설회사 1 : 장비회사 2 : 조종사)
}

export type ErectionInputInfoType = {
    sns_id : string,
    memberType : number,
}
export type EquInputInfoType ={
    sns_id : string,
    memberType : number,
}
export type PilotInputInfoType = {
    sns_id : string,
    memberType : number,
}


export type RegDocumentType = RouteType & {
    
}

export interface SelImageType {
    uri : string,
    fileName : string,
    base64 : string,
    fileSize: number,
    height : number,
    width:number,
    type:string,
}
//user end