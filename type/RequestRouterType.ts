import { AcqReqStep1ItemType } from "../src/screen/Request/acqReq/AcqReqStep1";
import { FavoriteListItemType } from "../src/screen/screenType";

export type RequestRouterNavigatorParams = { //배차요청 페이지
    /* 인증 */
    RequestMain : undefined ;
    AcquaintanceRequestTest:undefined; //지인배차 요청 (회사선택)
    AcqReqStep1 : { //지인배차 요청  step1
        item : FavoriteListItemType;
    };
    AcqReqStep2 : {
        item : FavoriteListItemType;
        firstInputInfo : AcqReqStep1ItemType;
    }
    PublicReqStep1 : undefined,
    PublicReqStep2 : {
        firstInputInfo : AcqReqStep1ItemType,
    }

}