import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Main } from './src/screen/Main';
import { RouterNavigatorParams } from './type/routerType';
import { toastConfig } from './src/util/toast/toastConfig';
import Toast from 'react-native-toast-message';
import { MyPageIndex } from './src/screen/mypage/MyPageIndex';
import SplashScreen from 'react-native-splash-screen';
import { Agreements } from './src/screen/signUp/Agreements';
import { SignIn } from './src/screen/SignIn';
import { OpenConstruction } from './src/screen/mypage/OpenConstruction';
import { MemberLine } from './src/screen/signUp/MemberLine';
import { MyInfo } from './src/screen/mypage/MyInfo';
import { ApplicantStatus } from './src/screen/construction/ApplicantStatus';
import { FavoriteListIndex } from './src/screen/mypage/favorite/FavoriteListIndex';
import { FavoriteAdd } from './src/screen/mypage/favorite/FavoriteAdd';
import { CompanyProfile } from './src/screen/construction/CompanyProfile';
import { DetailField } from './src/screen/Board/DetailField';
import { DetailWork } from './src/screen/Board/DetailWork';

//navigator router ;;
// type ToastRef = Toast | null;

export const Router = () => { 

    /** 
        router stack이 추가될때 넘겨야할 params가 있으면 RouterNavigatorParams에 타입을 선언해주세요.
    */
    const Stack = createStackNavigator<RouterNavigatorParams>(); 

    React.useEffect(()=>{
        setTimeout(()=>{
            try{
                SplashScreen.hide();
            }
            catch(err){
                console.log(err)
            }
        },2000)
    },[])
    
    

    return(
        <>
            <Stack.Navigator initialRouteName='Main'>
                {/** page가 추가되면 페이지에 여기에 stack을 추가해주세요. */}

                {/** MAIN */}
                <Stack.Screen 
                    name={'Main'}
                    component={Main}
                    options={{headerShown:false}}
                />


                {/** USER  */}
                <Stack.Screen // 이용약관
                    name={'Agreements'}
                    component={Agreements}
                    options={{headerShown:false}}
                />
                <Stack.Screen // 로그인
                    name={'SignIn'}
                    component={SignIn}
                    options={{headerShown:false}}
                />


                 {/** board - 이력 및 현황 */}
                <Stack.Screen  // 이력 및 현황 - 현장세부내용
                    name={'DetailField'}
                    component={DetailField}
                    options={{headerShown:false}}
                />
                <Stack.Screen // 이력 및 현황 - 작업세부내용
                    name={'DetailWork'}
                    component={DetailWork}
                    options={{headerShown:false}}
                />
                <Stack.Screen // 회원 구분
                    name={'MemberLine'}
                    component={MemberLine}
                    options={{headerShown:false}}
                />
                
                <Stack.Screen // 지원자 현황
                    name={'ApplicantStatus'}
                    component={ApplicantStatus}
                    options={{headerShown:false}}
                />
                <Stack.Screen
                    name={'CompanyProfile'}
                    component={CompanyProfile}
                    options={{headerShown:false}}
                />

                {/** mypage */}
                <Stack.Screen  //마이페이지 ROOT
                    name={'MyPage'}
                    component={MyPageIndex}
                    options={{headerShown:false}}
                />
                <Stack.Screen //나의 현장 - 현장개설하기 & 수정하기
                    name={'OpenConstruction'}
                    component={OpenConstruction}
                    options={{headerShown:false}}
                />
                <Stack.Screen //나의 정보
                    name={'MyInfo'}
                    component={MyInfo}
                    options={{headerShown:false}}
                />
                <Stack.Screen //나의 즐겨찾기
                    name={'FavoriteList'}
                    component={FavoriteListIndex}
                    options={{headerShown:false}}
                />
                <Stack.Screen //나의 즐겨찾기 추가
                    name={'FavoriteAdd'}
                    component={FavoriteAdd}
                    options={{headerShown:false}}
                />

            </Stack.Navigator>
            <Toast config={toastConfig}/>
        </>
    )
}