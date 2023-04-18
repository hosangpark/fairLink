import React from 'react';
import { Text, TouchableOpacity, View ,Image } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { PilotInfoCardType } from '../componentsType';


export const PilotInfoCard = ({
    index = '0',
    userName = '정우성',
    age = 35,
    career = 3,
    phone = '010-9214-4575',
    score = 5,
    recommendation = 8,
    action
}:PilotInfoCardType) => {

    return (
        <TouchableOpacity style={{marginLeft: 5, marginBottom:10, }} onPress={action}>
            <View style={{margin: 10, padding: 10}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={[styles.cardProfileSize]}>
                            <Text>프로필 영역</Text>
                        </View>
                        <View style={{marginLeft:10,}}>
                            <View style={{ flexDirection: 'row'}}>
                                <Text style={[fontStyle.f_semibold,{fontSize: 18, color:colors.FONT_COLOR_BLACK}]}>{userName} </Text>
                                <Text style={[fontStyle.f_semibold,{fontSize: 16, color:colors.FONT_COLOR_BLACK2}]}>/ {age}세</Text>
                            </View>
                            <Text style={[fontStyle.f_regular,{fontSize: 15, color:colors.FONT_COLOR_BLACK2}]}>경력 {career}년</Text>
                            <View style={{flexDirection:'row',marginTop:8}}>
                                <Text style={[fontStyle.f_regular,{fontSize:14, color:colors.FONT_COLOR_BLACK}]}>{score.toFixed(1)}</Text>
                                <Text style={[fontStyle.f_regular,{fontSize:14, color:colors.FONT_COLOR_BLACK2,marginLeft:5}]}>추천수 {recommendation}</Text>
                            </View>
                            <Text style={[fontStyle.f_regular,{fontSize: 15, color:colors.FONT_COLOR_BLACK}]}>{phone} </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}