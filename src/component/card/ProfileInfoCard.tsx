import React from 'react';
import { Text, TouchableOpacity, View ,Image } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { ProfileCardType } from '../componentsType';
import { StarRating } from '../StarRating';


export const ProfileInfoCard = ({
    index = '0',
    jobType = '차주 겸 조종사',
    userProfileUrl = '',
    userName = '정우성',
    score = 5,
    rating = 41,
    recEmpCount = 6,
    location = '경남 진주시',
    age = '42',
    gender = '남',
    phone = '010-1123-1111'
}:ProfileCardType) => {

    return (
        <>
        <View style={{ margin: 20, position:'relative', }}>
            <View style={[styles.cardWrapper]}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={[styles.cardProfileSize]}>
                            <Text>프로필 영역</Text>
                        </View>
                        <View style={{marginLeft:15,}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center',}}>
                                <Text style={[fontStyle.f_semibold, {fontSize: 18, color:colors.FONT_COLOR_BLACK}]}>{userName} / </Text>
                                <Text style={[fontStyle.f_regular, {fontSize: 16, color:colors.FONT_COLOR_BLACK}]}>{age}세 ({gender})</Text>
                            </View>
                            <View style={{ marginBottom: 5}}>
                                <Text style={[fontStyle.f_regular,{fontSize:15, color:colors.MAIN_COLOR}]}>{location}</Text>
                            </View>
                            <View style={{ marginBottom: 7}}>
                                <Text style={[fontStyle.f_regular,{fontSize:16, color:colors.FONT_COLOR_BLACK}]}>6W 굴착기, 2021년식</Text>
                            </View>
                            <View style={{ backgroundColor:colors.WHITE_COLOR, borderWidth:1, borderRadius:16, paddingHorizontal:10, paddingVertical:2, borderColor:jobType === '1' ? colors.BLUE_COLOR : colors.YELLOW_COLOR }}>
                                <Text style={[fontStyle.f_medium,{fontSize:15, color:jobType === '1' ? colors.BLUE_COLOR : colors.YELLOW_COLOR}]}>{jobType === '1' ? '차주 겸 조종사' : '장비회사 소속 조종사'}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 20, }}>
                    <TouchableOpacity style={[styles.whiteButtonStyle]}>
                        <View style={{ flexDirection: 'row' , alignItems: 'center'}}>
                            <Image style={{ width: 21, height: 21 }} source={ require('../../assets/img/ic_phone.png') }/>
                            <Text style={[fontStyle.f_medium, {fontSize:18, color:colors.MAIN_COLOR, paddingLeft: 6}]}>{phone}</Text>
                        </View>
                    </TouchableOpacity>
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
                    <Text style={[fontStyle.f_medium, { fontSize: 18, color: colors.FONT_COLOR_BLACK, marginRight: 10 }]}>평가 <Text style={{ color: colors.MAIN_COLOR}}>{rating}</Text> 개</Text>
                    <Text style={[fontStyle.f_medium, { fontSize: 18, color: colors.FONT_COLOR_BLACK,}]}>평균 <Text style={{ color: colors.MAIN_COLOR}}>{score.toFixed(1)}</Text></Text>
                </View>
            </View>
        </View>
    </View>
    <View style={{ margin: 20, position:'relative',}}>
        <TouchableOpacity style={[styles.buttonStyle]}>
            <Text style={[fontStyle.f_medium, {fontSize:16,color:colors.WHITE_COLOR,}]}>총 <Text style={[fontStyle.f_bold, {fontSize: 18, }]}>{recEmpCount}</Text> 업체가 추천을 해주었어요!</Text>
        </TouchableOpacity>
    </View>
    </>
    )
}