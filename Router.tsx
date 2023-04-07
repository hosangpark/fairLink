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
                <Stack.Screen 
                    name={'Main'}
                    component={Main}
                    options={{headerShown:false}}
                />
                <Stack.Screen 
                    name={'MyPage'}
                    component={MyPageIndex}
                    options={{headerShown:false}}
                />
                <Stack.Screen 
                    name={'Agreements'}
                    component={Agreements}
                    options={{headerShown:false}}
                />
                <Stack.Screen 
                    name={'SignIn'}
                    component={SignIn}
                    options={{headerShown:false}}
                />
            </Stack.Navigator>
            <Toast config={toastConfig}/>
        </>
    )
}