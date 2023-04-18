import React from 'react';
import { usePostMutation } from '../util/reactQuery';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../type/routerType';


export const Auth = () => {
    // const loginMutation = usePostMutation();

    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    const userAuth = async () => {
        AsyncStorage.getItem('loginInfo').then(data => {
            if(data === null){
                //props.navigation.navigate('Login');
                navigation.replace('SignIn');
            }
            else{
                // dispatch(loginAction.updateLogin(data));
                // tokenUpdate(JSON.parse(data).mt_id);
                // visitHandler(JSON.parse(data).mt_id);
                // props.navigation.replace('Home',{moveIndex : 1});
                //props.navigation.navigate('Home',{moveIndex : 1});
            }
        })
    }

    React.useEffect(()=>{
        userAuth();
    })

    return (
        <>
        </>
    )
}