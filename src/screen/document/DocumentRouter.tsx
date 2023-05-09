import { CardStyleInterpolators, StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BackHandler, Platform } from 'react-native';
import { DocumentIndexType, RequestIndexType } from '../screenType';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RouterNavigatorParams } from '../../../type/routerType';
import { RequestRouterNavigatorParams } from '../../../type/RequestRouterType';
import { useAppSelector } from '../../redux/store';
import { DocumentMain } from './DocumentMain';
import { DocumentRouterNavigatorParams } from '../../../type/DocumentRouterType';
import { WorkReport } from './WorkReport';


export const DocumentRouter = ({setTabIndex,route}:DocumentIndexType) => {

    const navigation = useNavigation<StackNavigationProp<RequestRouterNavigatorParams & RouterNavigatorParams>>();
    const {mt_type} = useAppSelector(state => state.userInfo);
    const {cdwt_idx} = route.params;
    const Stack = createStackNavigator<DocumentRouterNavigatorParams & RouterNavigatorParams>();
    const isFocused = useIsFocused();

    function handleBackButtonClick() {
        navigation.navigate('Home');
        return true;
      }
      
      React.useEffect(() => {
          if(isFocused && setTabIndex){
                setTabIndex(5)
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
          initialRouteName={'WorkReport'}
        >
                <Stack.Screen 
                    name = "WorkReport"
                    children={
                        () => (
                            <WorkReport cdwt_idx={cdwt_idx} />
                        )
                    }   
                    options={{gestureEnabled: Platform.OS == "android" ? false : true,headerShown:false}} 
                />
        </Stack.Navigator> 
    )
}