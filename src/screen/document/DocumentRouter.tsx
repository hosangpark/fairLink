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
import { AlertModal, initialAlert } from '../../modal/AlertModal';


export const DocumentRouter = ({setTabIndex,route}:DocumentIndexType) => {

    const navigation = useNavigation<StackNavigationProp<RequestRouterNavigatorParams & RouterNavigatorParams>>();
    const {mt_type} = useAppSelector(state => state.userInfo);
    const {cdwt_idx} = route.params;
    const Stack = createStackNavigator<DocumentRouterNavigatorParams & RouterNavigatorParams>();
    const isFocused = useIsFocused();

    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

    const alertModalOn = (msg:string, type? : string) => {
        setAlertModal({
            ...alertModal,
            alert:true,
            msg:msg,
            type : type ? type : '',
        })
    }

    const alertModalOff = () => {
        setAlertModal(()=>initialAlert);
    }

    const alertAction = () => {
        if(alertModal.type === 'cdwt_none_move'){
            navigation.goBack();
        }
    }

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

    React.useEffect(()=>{
        if(isFocused){
            if(!cdwt_idx || cdwt_idx === ''){
                alertModalOn('작성가능한 작업일보가 존재하지 않습니다.','cdwt_none_move');
            }
        }
    },[isFocused])

    return(
        <>
            <AlertModal 
                show={alertModal.alert}
                hide={alertModalOff}
                msg={alertModal.msg}
                action={alertAction}
                type={alertModal.type}
            />
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
        </>
    )
}