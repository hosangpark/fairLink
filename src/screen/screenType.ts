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

export type EquipInputInfoType = { //장비회사 - 프로필정보 설정 및 수정
    mpt_before_profile : string,
    mpt_profile: tempUploadImageType;
    mpt_career: string;
    mpt_equip: mptEquipItemType[];
    mpt_equip_memo: string;
    mpt_aspire: string;
    mpt_location:string;
    mpt_vank : string;
    mpt_vank_num : string;
    mpt_c_check : string,
    mpt_c_name : string,
    mpt_c_ceo : string,

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

    [key:string] : string | tempUploadImageType | mptEquipItemType[]
}
export type MyEquListItemType = {
    idx : string,
    img : string,
    device : string,
    year : string,
    reg_no : string,
    sub:string,
    doc_check:string,
    doc_color:string,
    stand : string,
}

export type VolunteerTopDataType = { //지원자 리스트 상단 정보
    crt_name : string,
    end_date : string,
    equip : string,
    start_date : string,
    sub : string,
    year : string,
    start_time? : string,
    end_time? : string,
}

export type FavoriteListItemType = { //userInfo card에 들어가는 정보 
    like_idx?:string,
    img_url?:string,
    mpt_idx?:string,
    pilot_type?:string,
    good:number, //건설업체 지원자리스트 추천기업 count
    goods?:number,//장비업체 지원자리스트 추천기업 count
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
    mt_name?:string,
    like_check?:string,
    mpt_career?:string,
    mpt_location?:string,
}

export type EquipOrderItemType = {
    apply_cnt : number,
    assign_check : string,
    cot_idx? : string, //장비회사일때
    cat_idx? : string, //조종사회사일때
    crt_content : string,
    crt_name : string,
    d_day:string,
    end_date : string,
    equip : string,
    location : string,
    open_check : string,
    pay_price : string,
    pay_type : string,
    payment : string,
    public : string,
    start_date : string,
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

export type MatchingEquipmentItemType = { //장비및 조종사 매칭(장비 리스트 아이템 타입)
    eit_idx : string,
    eit_reg_no : string,
    eit_sub : string,
    eit_year : string,
    img_url : string,
}

export type MatchingPilotItemType = { //장비 및 조종사 매칭 (파일럿 아이템)
    age : number,
    apply_check : string,
    career : string,
    good : string,
    hp : string,
    img_url : string,
    mpt_idx : string,
    name : string,
    score : string,
}

export type PilotWorkInfoType = {
    cdwt_content : string,
    cdwt_date : string,
    cdwt_end_time : string,
    cdwt_idx : string,
    cdwt_memo : string,
    cdwt_price : string,
    cdwt_price_type : string,
    cdwt_start_time : string,
    cons_hp : string,
    cons_name : string,
    crt_name : string,
    equip_name : string,
    equip_reg_no : string,
    equip_style : string,
    pilot_hp : string,
    pilot_name : string,
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
export type DocumentIndexType = RouteType & {
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

export type PilotProfileItemType = {
    data : {
        age : number,
        equip : string,
        gender : string,
        good : string,
        hp : string,
        img_url : string,
        location : string,
        mpt_idx : string,
        name : string,
        score : number , 
        score_count : string,
    },
    doc : {
        [key:string]:{
            file_check : string,
            file_url : string,
            title : string,
        }[]
    },
    profile : {
        mpt_aspire : string,
        mpt_career : string,
        mpt_equip_memo : string,
        mpt_licence : string,
    }
}

export type ContractItemType = {
    data : {
        cot_idx : string,
        cat_idx : string,
        cct_e_type: string,
        cct_e_reg_no: string,
        cct_e_style: string,
        cct_e_ocrdate2: string,
        cct_e_ocrdate1: string,
        cct_c_name: string,
        cct_c_location: string,
        cct_c_manage: string,
        cct_c_company: string,
        cct_c_file_check: string,
        cct_start_date: string,
        cct_end_date: string,
        cct_pay_price: string,
        cct_time: string,
        cct_pay_check1: string,
        cct_pay_check2: string
    },
    data1 : {
        company: string,
        busi_num: string,
        name: string,
        birth_num: string,
    },
    data2 : {
        company: string,
        busi_num: string,
        name: string,
        birth_num: string,
    }
}

export type CompanyProfileType = RouteType &{ //장비회사 프로필

}
export type ElectronicContractType = RouteType &{ 
    // mt_idx:string
}
export type DetailWorkType = RouteType &{ 
}

export type FavoriteAddType = RouteType & {
    
}

export type ScaneDetailFieldType = RouteType &{ //장비 - 현장세부페이지 타입

}

export type MatchingEquipmentType = RouteType & { //장비 - 장비 및 조종사 매칭1 - 장비 선택

}
export type ReqeustPilotType = RouteType & { //장비 - 조종사 요청하기

}

export type MatchingPilotType = RouteType & { //장비 - 장비 및 조종사 매칭1 - 조종사 선택

}

export type PilotProfileType = RouteType & { //장비 - 조종사 프로필 조회

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
export interface tempUploadImageKeyType {
    uri : string,
    name?:string,
    fileName : string,
    base64 : string,
    fileSize: number,
    height : number,
    width:number,
    type:string,
    key?:string,
    tmp_name:string
    size:number
}
//user end