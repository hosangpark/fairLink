export type RouterNavigatorParams = {
    /* 인증 */
    Auth:undefined;

    /** main */
    Main:undefined;
    Request:undefined;
    OpenRequest:undefined;
    AcquaintanceRequest:undefined;
    Board:{
        type:string
    };
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

    OpenConstruction:undefined;
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
    DetailField:undefined //현장세부내용
    DetailWork:undefined //작업세부내용
    Volunteer:undefined //지원자현황
    CompanyProfile:undefined //장비회사프로필
    PilotProfile:undefined //조종사프로필
    ElectronicContract:undefined //전자계약
    WorkReport:undefined //작업일보작성
    MatchingEquipment:undefined
    MatchingFilot:undefined
}