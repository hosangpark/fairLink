export type RouterNavigatorParams = {
    /* 인증 */
    Auth:undefined;

    /** main */
    Main:undefined;
    Video:undefined;
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
    }

    OpenConstruction:undefined;
    ApplicantStatus:undefined;
    
    /** mypage */
    MyInfo:{
        userType:string
    };
    FavoriteList:{
        userType:string
    };
    FavoriteAdd:undefined;
    EquimentsAdd:undefined;
    EquimentsDetail:undefined;
    SettingProfile:{
        userType:string
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
    Matching:undefined
}