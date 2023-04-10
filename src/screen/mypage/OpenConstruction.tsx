import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { BackHeader } from '../../component/header/BackHeader';
import { MyPageIndexType } from '../screenType';
import { useIsFocused } from '@react-navigation/native';



export const OpenConstruction = ({setTabIndex}:MyPageIndexType) => {

    return (
        <View style={{flex:1}}>
            <BackHeader title="마이페이지" />
            <ScrollView style={{ flex:1,backgroundColor:colors.WHITE_COLOR}}>
                <View style={{padding:20}}>
                    <View style={[{backgroundColor:colors.MAIN_COLOR,borderRadius:8,padding:20}]}>
                        <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:3}]}>남동종합건설</Text>
                        <Text style={[fontStyle.f_semibold,{fontSize:24,color:colors.WHITE_COLOR,marginBottom:7}]}>홍길동 차장님</Text>
                        <Text style={[fontStyle.f_regular,{fontSize:18 , color:colors.WHITE_COLOR}]}>010-1234-5678</Text>
                    </View>
                </View>
                <View style={styles.deepTopBorder}>
                    <TouchableOpacity style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}
                    >
                        <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>나의 현장</Text>  
                    </TouchableOpacity>
                    <View style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                        <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>즐겨찾기 장비 관리</Text>  
                    </View>
                    <View style={[styles.deepBottomBorder,{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                        <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>나의 정보</Text>  
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}