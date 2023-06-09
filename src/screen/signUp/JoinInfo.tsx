import React from 'react';
import { View,ScrollView,Text } from 'react-native';
import { JoinInfoType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, styles } from '../../style/style';
import { KakaoProfile, getProfile as getKakaoProfile, } from '@react-native-seoul/kakao-login';
import { ErectionInputInfo } from './inputInfo/ErectionInputInfo';
import { EquInputInfo } from './inputInfo/EquInputInfo';
import { PilotInputInfo } from './inputInfo/PilotInputInfo';

export const JoinInfo = ({route}:JoinInfoType) => {
    const {token, memberType} = route.params; //token : kakao token / memberType : 선택한 가입유형
    const [profileInfo, setProfileInfo] = React.useState<KakaoProfile & {birthday:string}>();

    const getProfileInfo = async () => { //카카오 정보 불러오기
        const profile : KakaoProfile & {birthday:string} = await getKakaoProfile();
        console.log(profile);
        setProfileInfo(profile);
    }


    React.useEffect(()=>{
        getProfileInfo();
    },[])
    return (
        <View style={{flex:1}}>
            <BackHeader title={`회원가입 : ${memberType === 0 ? '건설회사' : memberType === 1 ? '장비회사' : '조종사'}`}/>
            <ScrollView style={{flex:1}}>
                {profileInfo &&
                <View style={styles.white_box_con}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>회원정보</Text>
                    <View style={{marginTop:20}}>
                        <View style={{flexDirection:'row',marginBottom:15}}>
                            <View style={{flex:2.5}}>
                                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>이름</Text>
                            </View>
                            <View style={{flex:8}}>
                                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>{profileInfo.nickname}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',marginBottom:15}}>
                            <View style={{flex:2.5}}>
                                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>생년월일</Text>
                            </View>
                            <View style={{flex:8}}>
                                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>{profileInfo.birthyear === 'null' ? '1998' : profileInfo.birthyear}.{profileInfo.birthday === 'null' ? '01.06' : profileInfo.birthday.slice(0,2)+'.'+profileInfo.birthday.slice(2,4)}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',marginBottom:15}}>
                            <View style={{flex:2.5}}>
                                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>연락처</Text>
                            </View>
                            <View style={{flex:8}}>
                                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>{profileInfo.phoneNumber === 'null' ? '010-1234-1234' : profileInfo.phoneNumber}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                }

                <View style={{...styles.white_box_con,marginTop:10, flex:1}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>회원정보 추가입력</Text>
                        <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}><Text style={{color:colors.ORANGE_COLOR}}>*</Text> 필수항목</Text>
                    </View>
                    {memberType === 0 &&
                        <ErectionInputInfo sns_id={token} memberType={memberType} />
                    }
                    {memberType === 1 &&
                        <EquInputInfo sns_id={token} memberType={memberType} />
                    } 
                    {memberType === 2 &&
                        <PilotInputInfo sns_id={token} memberType={memberType} />
                    }
                    
                </View>
            </ScrollView>
        </View>

    )
}