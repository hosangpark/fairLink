import React from 'react';
import { Text, TouchableOpacity, View ,Image } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { UserInfoCardType } from '../componentsType';


export const UserInfoCard = ({
    index = '0',
    jobType = '차주 겸 조종사',
    userProfileUrl = '',
    empName = '힘찬중기',
    userName = '정우성',
    score = 5,
    rating = 41,
    recEmpCount = 6,
    location = '[경남] 진주시, 사천시, 창원시',
    isDelete = true,
    isFavorite,
    action
}:UserInfoCardType) => {



    return (
        <TouchableOpacity style={{width:'100%',position:'relative',marginBottom:30}} onPress={action}>
            {   jobType === '0' 
                ?   null 
                :   <View style={[styles.cardJobArea,{borderColor: jobType === '1' ? colors.BLUE_COLOR : colors.ORANGE_COLOR}]}>
                        <Text style={[fontStyle.f_medium,{fontSize:15, color:jobType === '1' ? colors.BLUE_COLOR : colors.ORANGE_COLOR}]}>{jobType === '1' ? '차주 겸 조종사' : '장비회사 소속 조종사'}</Text>
                    </View>
            }
            <View style={[styles.cardWrapper]}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={[styles.cardProfileSize]}>
                            <Text>프로필 영역</Text>
                        </View>
                        <View style={{marginLeft:10,}}>
                            { jobType === '0' 
                                ? null 
                                : <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.MAIN_COLOR}]}>{empName}</Text>
                            }
                            <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>{userName} 님</Text>
                            <View style={{flexDirection:'row',marginTop:5}}>
                                <Text style={[fontStyle.f_regular,{fontSize:14, color:colors.FONT_COLOR_BLACK}]}>{score.toFixed(1)}</Text>
                                <Text style={[fontStyle.f_regular,{fontSize:14, color:colors.FONT_COLOR_BLACK2,marginLeft:5}]}>평가수 {rating}</Text>
                            </View>
                            <TouchableOpacity style={[styles.cardReqEmpBtn]}>
                                <Text style={[fontStyle.f_semibold,{fontSize:15,color:colors.WHITE_COLOR}]}>추천기업 {recEmpCount}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity>
                        { isDelete ? <Image source={require('../../assets/img/ic_trash1.png')} style={{width:25,height:25}} /> : null }
                        { isFavorite === '0' 
                            ? <Image source={require('../../assets/img/ic_bookmark_on.png')} style={{width:22,height:30}} /> 
                            : isFavorite === '1' 
                                ? <Image source={require('../../assets/img/ic_bookmark_off.png')} style={{width:22,height:30}} /> 
                                : null }
                    </TouchableOpacity>
                </View>
                <View style={[styles.cardInfoArea]}>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>6W 굴착기</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>경력 15년+</Text>
                </View>
                <Text style={[fontStyle.f_light,{fontSize:15,color:colors.FONT_COLOR_BLACK2,marginTop:10}]}>{location}</Text>
            </View>
        </TouchableOpacity>
    )
}