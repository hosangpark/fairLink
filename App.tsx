/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import React,{createRef} from 'react';
import { Router } from './Router';
import SplashScreen from 'react-native-splash-screen';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import store from './src/redux/store';

import {Platform,Alert} from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";

import PushNotification from 'react-native-push-notification'; //push...noti
import { useNavigationState } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';

/**
 * react-native 버전 및 sdk 버전은 git hub readme 참조해주세요. 
 *
 * component , page, modal, style 등은 src 폴더안에 있습니다.
 * 
 * component - 재사용할수 있는 레이아웃 혹은 hook을 생성합니다.
 * 
 * page - 사용자에게 보여지는 페이지 레이아웃을 구현합니다.
 * 
 * modal - 사용하는 modal을 정리할겁니다. (react-native-modal 패키지 사용할겁니다.)
 * 
 * 각 페이지마다 type파일을 생성해두었습니다.
 * 
 * 페이지 및 컴포넌트에 필요한 props type 혹은 props interface를 export로 지정해주시면 됩니다.
 * 
 *  !!!--- 될수있는한 any는 절대 사용하지 마세요. 나중에 진짜 처치곤란입니다.  ----!!
 * 
 * 스타일링 하실때 가급적이면 inline으로 하지마시고, src - style에 스타일 객체 만드셔서 사용해주세요.
 * 
 */

const sendLocalNotificationWithSound = (onRemote:any) => {
    // if (Platform.OS == 'ios') {
    //   PushNotificationIOS.addNotificationRequest({
    //     id: onRemote.data.notificationId
    //       ? onRemote.data.notificationId
    //       : new Date().toString(),
    //     title: (onRemote.title),
    //     subtitle: '',
    //     body: (onRemote.body ? onRemote.body : onRemote.message),
    //     sound: 'default',
    //     // sound: 'buzy1.wav',
    //   });
    // } else {
      PushNotification.localNotification({
        channelId: onRemote.channelId ?? 'default',
        id: onRemote.data.notificationId,
        title: (onRemote.data.title),
        message: (onRemote.data.message),
        soundName: 'default',
        playSound: true,
        // smallIcon: 'ic_stat_ic_notification',
        color: '#FFFFFF',
        largeIcon: '',
        largeIconUrl: '',
        priority: 'high',
        // bigPictureUrl?: string | undefined;
        // bigLargeIcon?: string | undefined;
        // bigLargeIconUrl?: string | undefined;
        vibrate: true,
        groupSummary: true,
        userInfo: onRemote.data,
        // badge: 0,
      });
    // }
  };

  messaging().setBackgroundMessageHandler(async notification => { //background push
    sendLocalNotificationWithSound(notification)
    console.log('is background', notification);
  });


const App = () => {

const [queryClient] = React.useState(()=>new QueryClient);

const navigationRef:React.RefObject<any> = createRef();
  


const fcmSetting = () => {
    // if (Platform.OS === 'ios') {
    //   PushNotificationIOS.setApplicationIconBadgeNumber(0);
    // }

    PushNotification.configure({
        /** firebaseToken */
      onRegister: function (token:any) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: async function (notification:any) {
        // console.log("navigationRef",navigationRef.current)
        // console.log('NOTIFICATION 작동여부:', notification.channelId);
        if(notification.userInteraction){
          // console.log('포그라운드에서 푸시 클릭했을때.');
          // console.log(notification.data);

          switch(notification.data.link1){
            case "Home":
              navigationRef.current.navigate('Home')
              break;
            case "DetailField_eq_pi":
              navigationRef.current.navigate('DetailField',{
                cot_idx:notification.data.link2.cot_idx
              })
              break;
            case "DetailField_eq":
              navigationRef.current.navigate('DetailField',{
                cot_idx:notification.data.link2.cot_idx,
              })
              break;
            case "DetailField_pi":
              navigationRef.current.navigate('DetailField',{
                cat_idx:notification.data.link2.cat_idx,
              })
              break;
            case "ElectronicContract_eq":
              console.log('pdf View')
              // navigationRef.current.navigate('ElectronicContract',{
              //   contract_idx:notification.data.link2,
              //   route_type:"Info2",
              // })
              break;
            case "ElectronicContract_cons":
              navigationRef.current.navigate('ElectronicContract',{
                route_type:"Info",
                cat_idx:notification.data.link2.cat_idx,
                cot_idx:notification.data.link3.cot_idx,
              })
              break;
            case "WorkReport_cons":
              navigationRef.current.navigate('WorkReport',{
                cdwt_idx:notification.data.link2.cdwt_idx
              })
              break;
            case "Board":
              navigationRef.current.navigate('Board')
              break;
            case "Request":
              navigationRef.current.navigate('Request')
              break;
          }

        } else{
          sendLocalNotificationWithSound(notification);
        }
        
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification:any) {
        // console.log('ACTION:', notification.action);
        // console.log('NOTIFICATION:', notification);
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err:any) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
      });

  }

  React.useEffect(() => {
    fcmSetting();
  }, [])
  

  React.useEffect(()=>{
    if (Platform.OS === "android") {
      check(PERMISSIONS.ANDROID.CAMERA)
        .then((result) => {
          // GRANTED 를 넣은 이유는 ELSE 문으로 가지 않게 하기 위해서 넣었음.
          // TODO: 사실 깔끔하게 만들기 위해서는 분리할 필요가 있음 if (alreadyGranted) return 과 같이...
          if (result === RESULTS.DENIED || result === RESULTS.GRANTED) {
            return request(PERMISSIONS.ANDROID.CAMERA);
          } else {
            console.log(result);
            throw new Error("카메라 지원 안 함");
          }
        })
        .catch(console.error);
    } else {
      check(PERMISSIONS.IOS.CAMERA)
        .then((result) => {
          if (
            result === RESULTS.DENIED ||
            result === RESULTS.LIMITED ||
            result === RESULTS.GRANTED
          ) {
            return request(PERMISSIONS.IOS.CAMERA);
          } else {
            console.log(result);
            throw new Error("카메라 지원 안 함");
          }
        })
        .catch(console.error);
    }
  },[])

  React.useEffect(()=>{
    // if(Platform.OS == 'ios'){
    //   PushNotificationIOS.setApplicationIconBadgeNumber(0);
    //   PushNotificationIOS.removeAllDeliveredNotifications();
    // }
    PushNotification.setApplicationIconBadgeNumber(0);
    PushNotification.cancelAllLocalNotifications();
  },[])

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
            <Router />
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
