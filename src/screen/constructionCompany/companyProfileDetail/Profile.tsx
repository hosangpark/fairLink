import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, fontStyle } from '../../../style/style';

export const Profile = () => {

    return (
        <View style={{ backgroundColor: colors.WHITE_COLOR, padding: 20}}>
            <Text style={[ fontStyle.f_semibold, { fontSize: 20, color:colors.FONT_COLOR_BLACK}]}>경력사항</Text>
            <View style={{ marginVertical: 10 }}>
                <Text style={[ fontStyle.f_medium, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>10년</Text>
                <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK2}]}>* 면허취득일(2008.04) / 15년 10개월</Text>
            </View>
            <View style={{ marginVertical: 10 }}>
                <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>세부경력정보</Text>
                <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>- 흙막이 작업 : 총 8년 3개월</Text>
                <Text style={[fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>- 상하수도 작업 : 총 1년 5개월</Text>
            </View>
            <View style={{ marginVertical: 20 }}>
                <Text style={[ fontStyle.f_semibold, { fontSize: 20, color:colors.FONT_COLOR_BLACK, marginBottom: 10}]}>나의 포부</Text>
                <Text style={[fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>가는 없는 현저하게 살 봄바람이다. 청춘 인도하겠다는 것이 피어나기 노년에게서 쓸쓸하랴? 할지니, 창공에 방황하였으며, 피가 예가 보이는 그들의 듣는다. 살았으며, 노래하며 그들의 교향악이다.</Text>
            </View>
        </View>
    )
}