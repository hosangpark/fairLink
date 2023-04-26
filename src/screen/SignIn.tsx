import React, { useState } from 'react';
import { View, Text } from 'react-native'
import { colors, fontStyle, styles } from '../style/style';
import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../type/routerType';
import { KakaoOAuthToken } from '@react-native-seoul/kakao-login';
import messaging from '@react-native-firebase/messaging';

import {
    KakaoProfile,
    login,
    logout,
    unlink,
    getProfile,
  } from '@react-native-seoul/kakao-login';
import { LoginIntroModal } from '../modal/LoginIntroModal';
import { usePostMutation, usePostQuery } from '../util/reactQuery';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { updateUserInfo } from '../redux/actions/UserInfoReducer';
import AsyncStorage from '@react-native-community/async-storage';

export const SignIn = () => {
    const dispatch = useAppDispatch();

    const userInfo = useAppSelector(state => state.userInfo);

    const [isAutoLogin, setIsAutoLogin] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    const signInMutation = usePostMutation('signIn','member/login.php'); //로그인 mutation
    // const {data : listData , isLoading : listLoading, isError  : listError, refetch : listRefetch} = usePostQuery('cashKey' , {}, '/apiadress'); //list query

    const [introModal, setIntroModal] = useState(false);

    const introAction = () => {
        setIntroModal(false);
        signInWithKakao();
    }


    const signInWithKakao = async (): Promise<void> => { //카카오 로그인
        try {
            const token: KakaoOAuthToken = await login();
            const pushToken = await messaging().getToken();
            // console.log('pushToken ? ' ,pushToken);
            // console.log('accessToken ? ' , token.accessToken);
            
            const profile: any = await getProfile();

            // if(profile.id){
                console.log(profile.id);

                const signInParams = {
                    sns_id : profile.id ? profile.id : '123',
                    app_token : pushToken,
                }
                const {result,data, msg} = await signInMutation.mutateAsync(signInParams);


                if(result === 'true'){
                    navigation.replace('Main');
                    dispatch(updateUserInfo(data.data));
                    if(isAutoLogin){
                        AsyncStorage.setItem('loginInfo',profile.id);
                    }
                }
                else{
                    navigation.navigate('Agreements',{token : profile.id});
                }
            // }
        } catch(err) {
            console.log(err);
            
        }
    };

    const unlinkKakao = async (): Promise<void> => { //카카오 로그아웃
        try {
          
          const message = await unlink();
          console.log(message);
        } catch(err) {
          console.log(err);
          
        }
      };

    React.useEffect(()=>{
        console.log(isAutoLogin);
    },[isAutoLogin])

    // React.useEffect(()=>{ //query list setState
    //     if(listData){
    //         setList(listData.data)
    //     }
    // },[listData,listLoading])

    return (
        <View style={{ backgroundColor: colors.WHITE_COLOR, flex: 1 }}>
            <LoginIntroModal 
                show={introModal}
                hide={()=>{setIntroModal(false)}}
                action={introAction}
            />
            <View style={{flex:1, alignItems:'center',justifyContent:'space-between'}}>
                <View style={{flex:1}} />
                <View style={{flex:1,justifyContent:'center',alignItems:'center',width:'100%',}}>
                    <View>
                        <Text style={[fontStyle.s_regular, { fontSize : 18, color: colors.MAIN_COLOR,textAlign:'center'}]}>중장비 배차 시범서비스</Text>
                        <Text style={[fontStyle.k_bold, { fontSize : 50, color: colors.MAIN_COLOR,textAlign:'center',marginTop:10}]}>페어링크</Text>

                        
                    </View>
                    <TouchableOpacity onPress={()=>{setIntroModal(true);}} style={{flexDirection : 'row',width:'100%',height:52,paddingHorizontal:20,marginTop:40}}>
                        <View style={{flex:1,backgroundColor:colors.KAKAO_YELLOW,alignItems:'center',justifyContent:'center',borderRadius:8}}>
                            <Text style={[fontStyle.f_medium ,{ fontSize: 18, color: colors.FONT_COLOR_BLACK3 }]}>카카오로 시작하기</Text>
                        </View>
                    </TouchableOpacity>
                    {/*** 임시 */}
                    <TouchableOpacity onPress={()=>{unlinkKakao();}} style={{flexDirection : 'row',width:'100%',height:52,paddingHorizontal:20,marginTop:40}}>
                        <View style={{flex:1,backgroundColor:colors.KAKAO_YELLOW,alignItems:'center',justifyContent:'center',borderRadius:8}}>
                            <Text style={[fontStyle.f_medium ,{ fontSize: 18, color: colors.FONT_COLOR_BLACK3 }]}>카카오로그아웃</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', marginTop:20}}>
                        <CheckBox
                            disabled={false}
                            value={isAutoLogin}
                            onValueChange={(e) => setIsAutoLogin(e)}
                            tintColors={{ true: colors.MAIN_COLOR }}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={[fontStyle.f_medium, { fontSize: 18, color: colors.FONT_COLOR_BLACK, marginHorizontal: 10,}]}>자동로그인</Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20}}>
                    <Text style={[fontStyle.f_semibold, { fontSize: 16, color:colors.FONT_COLOR_BLACK2}]}>한국남동발전(주)</Text>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={[fontStyle.f_light, { fontSize: 16, color:colors.FONT_COLOR_BLACK2, marginRight: 2}]}>사내벤처</Text>
                        <Text style={[fontStyle.f_regular, { fontSize: 16, color:colors.MAIN_COLOR,}]}>Fair Link</Text>
                    </View>
                </View>
                
            </View>
            
        </View>
    
    )
}