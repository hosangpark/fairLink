import { FavoriteListItemType } from "../src/screen/screenType";

export type RequestRouterNavigatorParams = { //배차요청 페이지
    /* 인증 */
   RequestMain : undefined ;
   RequestAcqReqStep1 : {
    item:FavoriteListItemType;
   }
}