export interface RouteType {
    route : any;
}
export type tempUploadImageType = { //파일 업로드 타입
    name : string
    type : string,
    uri : string,
    size : number,
}

export type ObjArrayType = { //object 타입의 배열을 selectbox에 사용할때 사용
    key:string,
    name : string, //value라고 생각하면 됨
}

export type ManagerItemType = { //담당자 아이템 타입
    crt_m_cons_idx : string,
    crt_m_name : string,
    crt_m_num : string,
}

export type FavoriteListItemType = {
    carrer : string,
    compnay:string,
    equip:string,
}

export interface HomeIndexType {
    setTabIndex? : (tab:number) => void;
}

export interface MyPageIndexType {
    setTabIndex? : (tab:number) => void;
}
export type OpenConstructionType = RouteType & {

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

export type ErectionInputInfoType = { //건설회사 정보넣기 페이지 (회원가입)
    sns_id : string,
    memberType : number,
}
export type EquInputInfoType ={ //건설회사 정보넣기 페이지 (회원가입)
    sns_id : string,
    memberType : number,
}
export type PilotInputInfoType = { //조종사 정보넣기 페이지 (회원가입)
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
    key?:string,
}
//user end