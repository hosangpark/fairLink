import { FavoriteListItemType } from "../src/screen/screenType";

export type RouterNavigatorParams = {
    /* 인증 */
    Auth:undefined;

    /** main */
    Main:undefined;
    RequestRouter : {
        screen : string,
    } ;
    Home:undefined;
    Request:undefined;
    OpenRequest:undefined;
    // AcquaintanceRequest:undefined; //지인배차 요청 (회사선택)
    // AcqReqStep1 : { //지인배차 요청  step1
    //     item : FavoriteListItemType;
    // }
    Board:undefined;
    Release:undefined;
    MyPage:undefined;

    /** user */
    SignIn:undefined;
    Agreements:{
        token : string;
    };
    MemberLine:{
        token : string;
    };
    JoinInfo : {
        token : string;
        memberType : number;
    }
    RegDocument : {
        fileCheck:object;
        memberType : number;
        mt_idx : number;
        mt_id : string;
    }

    OpenConstruction:{
        isData:boolean,
    };
    ApplicantStatus:undefined;
    
    /** mypage */
    MyInfo:{
        mt_type:string
    };
    FavoriteList:{
        mt_type:string
    };
    FavoriteAdd:undefined;
    EquimentsAdd:undefined;
    EquimentsDetail:undefined;
    SettingProfile:{
        mt_type:string
    };
    FavoriteFilotIndex:undefined;
    MyProfile:undefined;

    /** board */
    DetailField:{
        cot_idx:string
    } //현장세부내용
    DetailWork:{
        cot_idx:string
        cat_idx:string
    } //작업세부내용
    Volunteer:{
        cot_idx:string
    } //지원자현황
    CompanyProfile:{
        cot_idx?:string
        cat_idx?:string
    } //장비회사프로필
    PilotProfile:undefined //조종사프로필
    ElectronicContract:undefined //전자계약
    WorkReport:undefined //작업일보작성
    MatchingEquipment:undefined
    MatchingFilot:undefined
}