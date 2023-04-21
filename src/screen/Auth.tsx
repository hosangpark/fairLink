import React from 'react';
import {View , ActivityIndicator} from 'react-native';
import { usePostMutation } from '../util/reactQuery';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../type/routerType';
import messaging from '@react-native-firebase/messaging';
import { useAppDispatch } from '../redux/store';
import { updateUserInfo } from '../redux/actions/UserInfoReducer';

export const Auth = () => {
    // const loginMutation = usePostMutation();
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const signInMutation = usePostMutation('signIn','member/login.php'); //로그인 mutation

    const userAuth = async () => {
        const pushToken = await messaging().getToken();

        AsyncStorage.getItem('loginInfo').then(async id => {
            if(id !== null){
                const signInParams = {
                    sns_id : id,
                    app_token : pushToken,
                }
                const {result,data, msg} = await signInMutation.mutateAsync(signInParams);


                if(result === 'true'){
                    dispatch(updateUserInfo(data.data));
                    navigation.replace('Main');
                }
                else{
                    navigation.navigate('SignIn');
                }
            }
            else{
                navigation.replace('SignIn');
            }
        })
    }

    React.useEffect(()=>{
        userAuth();
    },[])

    return (
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicator color="#0085CA" size={'large'} />
        </View>
    )
}