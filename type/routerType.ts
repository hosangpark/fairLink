import { EquDetailFieldBoxDataType } from "../src/component/componentsType";
import { FavoriteListItemType, MatchingEquipmentItemType } from "../src/screen/screenType";

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
    Document:{
        cdwt_idx?:string,
    };

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
    MyInfo:undefined;
    FavoriteList:undefined;
    FavoriteAdd:{
        equFavType? : string
    };
    EquimentsAdd:undefined;
    EquimentsDetail:{
        eit_idx:string
    };
    SettingProfile:undefined;
    FavoriteFilotIndex:undefined;
    MyProfile:undefined;

    /** board */
    DetailField:{
        cot_idx:string
        cat_idx:string
    } //현장세부내용

    ScaneDetailField:{
        cot_idx:string
    } //장비 - 현장세부내용

    DetailWork:{
        cot_idx:string
        cat_idx:string
    } //작업세부내용
    Volunteer:{
        cot_idx?:string,
        cat_idx?:string,
    } //지원자현황
    CompanyProfile:{ //장비회사프로필
        cot_idx?:string,
        cat_idx?:string,
        mpt_idx?:string,
    } 
    PilotProfile:{ //조종사프로필
        cot_idx?:string,
        cat_idx?:string,
        mpt_idx?:string,
    } 
    ElectronicContract:{
        cot_idx:string
        cat_idx:string
        contract_idx? :string | undefined
        route_type?:string
    } //전자계약
    WorkReport:undefined //작업일보작성
    MatchingEquipment:{ //장비 및 조종사 매칭 (장비 선택)
        item : EquDetailFieldBoxDataType //건설회사 요구조건 
    }
    RequestPilot : {
        item : EquDetailFieldBoxDataType //건설회사 요구조건
        selEquip : MatchingEquipmentItemType,
    }
    MatchingPilot:{ //장비 및 조종사 매칭 (조종사 선택)
        item : EquDetailFieldBoxDataType,
        selEquip : MatchingEquipmentItemType,
        type : 'normal' | 'favorite',
    }
}