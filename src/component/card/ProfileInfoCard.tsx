import React, { useState } from 'react';
import { Text, TouchableOpacity, View ,Image, Linking } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { ProfileCardType } from '../componentsType';
import { StarRating } from '../StarRating';
import { AlertClearType } from '../../modal/modalType';
import { AlertModal, initialAlert } from '../../modal/AlertModal';
import { RecEmpModal } from '../../modal/RecEmpModal';


export const ProfileInfoCard = ({
    index = '0',
    jobType,
    userProfileUrl = '',
    userName = '정우성',
    score = 5,
    score_count,
    good,
    location = '경남 진주시',
    age = '42',
    gender = '남',
    phone = '010-1123-1111',
    equip,
    mpt_idx,
}:ProfileCardType) => {

    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);
    const [recEmpModal, setRecEmpModal] = React.useState(false);

    const alertModalOn = ( msg : string, type? : string , strongMsg? : string) => {
        setAlertModal({
            alert: true,
            strongMsg: strongMsg ? strongMsg : '',
            msg: msg,
            type: type ? type : '',
        })
    }

    const alertModalOff = () => {
        setAlertModal(initialAlert)
    }
    const alertAction = () => {
        alertModalOff();
        if(alertModal.type === 'call_confirm'){
            const tempPhone = phone.split('-').join('');
            Linking.openURL(`tel:${tempPhone}`)
        }
    }

    return (
        <>
        <View style={{ margin: 20, position:'relative', }}>
            <View style={[styles.cardWrapper]}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
                        <View style={[styles.cardProfileSize]}>
                            {userProfileUrl === '' ? 
                                <Image source={require('../../assets/img/profile_default.png')} style={{width:100,height:100,borderRadius:50}}/>
                            :   
                                <Image source={{uri:userProfileUrl}} style={{width:100,height:100,borderRadius:50}}/> 
                            }
                        </View>
                        <View style={{marginLeft:15,flexShrink:1}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center',}}>
                                <Text style={[fontStyle.f_semibold, {fontSize: 18, color:colors.FONT_COLOR_BLACK}]}>{userName} / </Text>
                                <Text style={[fontStyle.f_regular, {fontSize: 16, color:colors.FONT_COLOR_BLACK}]}>{age}세 ({gender=='M'? '남':'여'})</Text>
                            </View>
                            <View style={{ marginBottom: 5}}>
                                <Text style={[fontStyle.f_regular,{fontSize:15, color:colors.MAIN_COLOR}]}>{location}</Text>
                            </View>
                            <View style={{ marginBottom: 7}}>
                                <Text style={[fontStyle.f_regular,{fontSize:16, color:colors.FONT_COLOR_BLACK}]}>
                                    {equip}
                                </Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                            {jobType &&
                                <Text style={[fontStyle.f_medium,{fontSize:15, color:jobType === 'Y' ? colors.BLUE_COLOR : colors.ORANGE_COLOR,borderWidth:1, borderRadius:16, paddingHorizontal:10, paddingVertical:2, borderColor:jobType === 'Y' ? colors.BLUE_COLOR : colors.ORANGE_COLOR}]}>
                                    {jobType === 'Y' ? '차주 겸 조종사' : 
                                    // jobType === 'like ' ? '스페어 조종사' :
                                    '장비회사 소속 조종사'}
                                </Text>
                            }
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 20, }}>
                    <TouchableOpacity style={[styles.whiteButtonStyle]} onPress={
                        () => alertModalOn('로 \n전화연결 하시겠습니까?','call_confirm',`[${phone}]`)
                        }>
                        <View style={{ flexDirection: 'row' , alignItems: 'center'}}>
                            <Image style={{ width: 21, height: 21 }} source={ require('../../assets/img/ic_phone.png') }/>
                            <Text style={[fontStyle.f_medium, {fontSize:18, color:colors.MAIN_COLOR, paddingLeft: 6}]}>{phone}</Text>
                        </View>
                    </TouchableOpacity>
                    <AlertModal 
                        show={alertModal.alert}
                        msg={alertModal.msg}
                        action={alertAction}
                        hide={alertModalOff}
                        type={alertModal.type}
                        strongMsg={alertModal.strongMsg}
                    />
                </View>
            </View>
        </View>
        <View style={{ marginHorizontal: 20, position:'relative', }}>
        <View style={[styles.cardWrapper]}>
            <View style={{ }}>
                <View>
                    <StarRating score={score} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={[fontStyle.f_medium, { fontSize: 18, color: colors.FONT_COLOR_BLACK, marginRight: 10 }]}>평가 <Text style={{ color: colors.MAIN_COLOR}}>{score_count}</Text> 개</Text>
                    <Text style={[fontStyle.f_medium, { fontSize: 18, color: colors.FONT_COLOR_BLACK,}]}>평균 <Text style={{ color: colors.MAIN_COLOR}}>{Number(score).toFixed(1)}</Text></Text>
                </View>
            </View>
        </View>
    </View>
    <TouchableOpacity style={{ margin: 20, position:'relative',}} onPress={()=>{setRecEmpModal(true)}}>
        <View style={[styles.buttonStyle]}>
            <Text style={[fontStyle.f_medium, {fontSize:16,color:colors.WHITE_COLOR,}]}>총 <Text style={[fontStyle.f_bold, {fontSize: 18, }]}>{good}</Text> 업체가 추천을 해주었어요!</Text>
        </View>
    </TouchableOpacity>
    <RecEmpModal 
        show={recEmpModal}
        hide={()=>{setRecEmpModal(false)}}
        action={()=>{}}
        mpt_idx={mpt_idx ? mpt_idx : ''}
    />
    </>
    )
}