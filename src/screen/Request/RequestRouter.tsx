import { CardStyleInterpolators, StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Request } from './Request';
import { BackHandler, Platform } from 'react-native';
import { RequestIndexType } from '../screenType';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RouterNavigatorParams } from '../../../type/routerType';
import { AcqReqStep1 } from './acqReq/AcqReqStep1';
import { RequestRouterNavigatorParams } from '../../../type/RequestRouterType';


export const RequestRouter = ({setTabIndex}:RequestIndexType) => {

    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    
    const Stack = createStackNavigator<RouterNavigatorParams>();
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
          initialRouteName={'RequestMain'}
        >
                <Stack.Screen 
                    name = "RequestMain"
                    children={
                        () => <Request/>
                    }   
                    options={{gestureEnabled: Platform.OS == "android" ? false : true}} 
                />
                <Stack.Screen 
                    name="AcqReqStep1" 
                    component={AcqReqStep1}
                    options={{gestureEnabled: Platform.OS == "android" ? false : true}} 
                />
        </Stack.Navigator> 
    )
}