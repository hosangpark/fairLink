import { CardStyleInterpolators, StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Request } from './Request';
import { BackHandler, Platform } from 'react-native';
import { RequestIndexType } from '../screenType';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RouterNavigatorParams } from '../../../type/routerType';
import { AcqReqStep1 } from './acqReq/AcqReqStep1';
import { RequestRouterNavigatorParams } from '../../../type/RequestRouterType';
import { AcquaintanceRequest } from './acqReq/AcquaintanceRequest';
import { AcqReqStep2 } from './acqReq/AcqReqStep2';
import { PublicReqStep1 } from './publicReq/PublicReqStep1';
import { PublicReqStep2 } from './publicReq/PublicReqStep2';


export const RequestRouter = ({setTabIndex}:RequestIndexType) => {

    const navigation = useNavigation<StackNavigationProp<RequestRouterNavigatorParams & RouterNavigatorParams>>();
    
    const Stack = createStackNavigator<RequestRouterNavigatorParams & RouterNavigatorParams>();
    const isFocused = useIsFocused();

    function handleBackButtonClick() {
        navigation.navigate('Home');
        return true;
      }
      
      React.useEffect(() => {
          if(isFocused && setTabIndex){
                setTabIndex(2)
                BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
                return () => {
                BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
                };
          }
      }, [isFocused]);

    return(
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          initialRouteName={'AcquaintanceRequestTest'}
        >
                <Stack.Screen 
                    name = "RequestMain"
                    children={
                        () => <Request/>
                    }   
                    options={{gestureEnabled: Platform.OS == "android" ? false : true,headerShown:false}} 
                />
                <Stack.Screen //지인배차 - 지인선택
                    name="AcquaintanceRequestTest"
                    component={AcquaintanceRequest}
                    options={{gestureEnabled: Platform.OS == "android" ? false : true,headerShown:false}} 
                />
                <Stack.Screen //지인배차1
                    name="AcqReqStep1" 
                    component={AcqReqStep1}
                    options={{gestureEnabled: Platform.OS == "android" ? false : true,headerShown:false}} 
                />
                <Stack.Screen //지인배차2
                    name="AcqReqStep2"
                    component={AcqReqStep2}
                    options={{gestureEnabled: Platform.OS == "android" ? false : true,headerShown:false}} 
                />

                <Stack.Screen 
                    name="PublicReqStep1"
                    component={PublicReqStep1}
                    options={{gestureEnabled: Platform.OS == "android" ? false : true,headerShown:false}} 
                />
                <Stack.Screen
                    name="PublicReqStep2"
                    component={PublicReqStep2}
                    options={{gestureEnabled: Platform.OS == "android" ? false : true,headerShown:false}} 
                />
        </Stack.Navigator> 
    )
}