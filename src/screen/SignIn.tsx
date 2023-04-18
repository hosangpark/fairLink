import React, { useState } from 'react';
import { View, Text } from 'react-native'
import { colors, fontStyle, styles } from '../style/style';
import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../type/routerType';
import { KakaoOAuthToken } from '@react-native-seoul/kakao-login';

import {
    KakaoProfile,
    getProfile as getKakaoProfile,
    login,
    logout,
    unlink,
    getProfile,
  } from '@react-native-seoul/kakao-login';

export const SignIn = () => {
    const [checked, setChecked] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    const signInWithKakao = async (): Promise<void> => { //카카오 로그인
        try {
            const token: KakaoOAuthToken = await login();
            console.log('accessToken ? ' , token.accessToken);
            console.log('accessTokenExpiresAt' , token.accessTokenExpiresAt);
            console.log('refreshToken ? ' , token.refreshToken);
            console.log('refreshTokenExp ? ' , token.refreshTokenExpiresAt);
            
            const profile: KakaoProfile = await getProfile();
            console.log(profile);

            if(token){
                navigation.navigate('Agreements');
            }

        //   setResult(JSON.stringify(token));
        
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
    return (
        <View style={{ backgroundColor: colors.WHITE_COLOR, flex: 1 }}>
            <View style={{flex:1, alignItems:'center',justifyContent:'space-between'}}>
                <View style={{flex:1}} />
                <View style={{flex:1,justifyContent:'center',alignItems:'center',width:'100%',}}>
                    <View>
                        <Text style={[fontStyle.s_regular, { fontSize : 18, color: colors.MAIN_COLOR,textAlign:'center'}]}>중장비 배차 시범서비스</Text>
                        <Text style={[fontStyle.k_bold, { fontSize : 50, color: colors.MAIN_COLOR,textAlign:'center',marginTop:10}]}>페어링크</Text>

                        
                    </View>
                    <TouchableOpacity onPress={()=>{signInWithKakao();}} style={{flexDirection : 'row',width:'100%',height:52,paddingHorizontal:20,marginTop:40}}>
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
                            value={checked}
                            onValueChange={(e) => setChecked(e)}
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
            {/* <View style={{ flex: 3, justifyContent: 'flex-end', alignItems: 'center', margin: 20}}>
                <Text style={[fontStyle.s_regular, { fontSize : 18, color: colors.MAIN_COLOR}]}>중장비 배차 시범서비스</Text>
                <Text style={[fontStyle.k_bold, { fontSize : 50, color: colors.MAIN_COLOR}]}>페어링크</Text>
            </View>
            <View style={{ flex: 1, margin: 20 }}>
                <TouchableOpacity style={{ backgroundColor: colors.KAKAO_YELLOW, borderRadius: 8, alignItems: 'center', justifyContent: 'center', height: 52 }}
                    onPress={() => navigation.navigate('Agreements')}>
                    <Text style={[fontStyle.f_medium ,{ fontSize: 18, color: colors.FONT_COLOR_BLACK3 }]}>카카오로 시작하기</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center',}}>
                    <View style={{flexDirection: 'row', marginVertical: 8, marginTop: 12, }}>
                        <CheckBox
                            disabled={false}
                            value={checked}
                            onValueChange={(e) => setChecked(e)}
                            tintColors={{ true: colors.MAIN_COLOR }}
                            style={{ width: 24, height: 24 }}
                            />
                        <Text style={[fontStyle.f_medium, { fontSize: 18, color: colors.FONT_COLOR_BLACK, marginHorizontal: 10,}]}>자동로그인</Text>
                    </View>
                </View>
            </View> */}
            {/* 푸터 */}
            
        </View>
    
    )
}