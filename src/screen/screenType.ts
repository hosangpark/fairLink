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

export interface mptEquipItemType {
    mpt_equip_type: string;
    mpt_equip_stand1: string;
    mpt_equip_stand2: string;
}

export type EquipInputInfoType = {
    mpt_before_profile : string,
    mpt_profile: tempUploadImageType;
    mpt_career: string;
    mpt_equip: mptEquipItemType[];
    mpt_equip_memo: string;
    mpt_aspire: string;

    mpt_file1 : string,
    mpt_file1_check : string,
    mpt_file2 : string,
    mpt_file2_check : string,
    mpt_file3 : string,
    mpt_file3_check : string,
    mpt_file4 : string,
    mpt_file4_check : string,
    mpt_file5 : string,
    mpt_file5_check : string,
    mpt_file6 : string,
    mpt_file6_check : string,

    [key:string] : string | tempUploadImageType | mptEquipItemType[],
    
}

export type FavoriteListItemType = { //userInfo card에 들어가는 정보 
    like_idx?:string,
    img_url?:string,
    mpt_idx?:string,
    pilot_type?:string,
    good:number,
    company:string,
    name?:string,
    score:number,
    score_count:number,
    equip:string,
    career?:string,
    location?:string,

    //배차선택시 들어감
    age ? : number,
    equip_idx? : string,
    equip_stand1? : string,
    equip_stand2? : string,
    equip_type? : string,
    equip_year? : string,

    //지원자 리스트
    cat_idx?:string,
    cot_idx?:string,
    type?:string,
    met_company?:string,
    mpt_name?:string,
    mpt_career?:string,
    mpt_location?:string,
}

export type ReqTopInfo = { //배차요청 상단정보 item
    company : string,
    crt_director : string,
    crt_location : string,
    crt_m_hp : string | null,
    crt_m_idx : string | null,
    crt_m_name : string,
    crt_name : string,
    detail_location : string,
}
export interface HomeIndexType {
    setTabIndex? : (tab:number) => void;
}

export interface RequestIndexType {
    setTabIndex? : (tab:number) => void;
}

export interface MyPageIndexType {
    setTabIndex? : (tab:number) => void;
}
export type OpenConstructionType = RouteType & {

}
export interface BoardIndexType {
    setTabIndex? : (tab:number) => void;
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



/************ 배차요청 ********/
export type AcqReqStep1Type = RouteType & {
    
}
export type AcqReqStep2Type = RouteType & {
    
}

export type RegDocumentType = RouteType & {
    
}

export interface DocCheckItemType {
    file_check : string,
    file_url : string,
    title : string,
}
export type CompanyInfoItemType = {
    data : {
        age : number,
        equip:string,
        gender : string,
        good : string,
        hp : string,
        img_url : string,
        mpt_idx : string,
        name : string,
        pilot_type : string,
        score:number,
        score_count:string,
        type?:string,
    },
    doc_check : {
        [key:string]:DocCheckItemType[]
    },
    profile : {
        mpt_aspire : string,
        mpt_career : string,
        mpt_equip_memo : string,
        mpt_licence : string,
    },
    sub : string[],
}
export type CompanyProfileType = RouteType &{ //장비회사 프로필

}
export type ElectronicContractType = RouteType &{ //장비회사 프로필
    mt_idx:string
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