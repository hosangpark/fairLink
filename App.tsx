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
import React from 'react';
import { Router } from './Router';
import SplashScreen from 'react-native-splash-screen';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import store from './src/redux/store';

import {Platform,Alert} from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";

import messaging from '@react-native-firebase/messaging';
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


const App = () => {

  const [queryClient] = React.useState(()=>new QueryClient);

  messaging().setBackgroundMessageHandler(async remoteMessage => { //background push
    console.log('is background', remoteMessage);
  });
  

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

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
            <Router />
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
