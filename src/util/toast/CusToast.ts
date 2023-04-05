import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, StatusBar } from 'react-native';
// import { Toast } from 'native-base';
import Toast from 'react-native-toast-message';
import {ToastPosition} from 'react-native-toast-message';
import { getStatusBarHeight } from 'react-native-status-bar-height';


/*
    step3 토스트메세지를 받아서 토스트 출력
    message 필수 나머지 선택
    message (출력메세지)
    duration (출력시간 - ms단위)
    position (출력 위치)
    offset (출력위치의 offset값)
*/

const cusToast = (message:string, duration?:number, position?:ToastPosition, offset?: number) => {
  const str = `{
    "message" :"`+message+`"
  }`;
  Toast.show({
    type: 'custom_type', //success | error | info
    position: position?position:(Platform.OS === 'ios'?'bottom':'bottom'),
    text1: JSON.parse(str),
    // text2: '내용',
    visibilityTime: duration?duration:2000,
    autoHide: true,
    topOffset: (Platform.OS === 'ios'? 66 + getStatusBarHeight() : 10),
    bottomOffset: offset ? offset + 10 : Platform.OS === "ios" ? 25 : 10,
    onShow: () => {},
    onHide: () => {}
  });

}

export default cusToast;