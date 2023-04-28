import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, fontStyle } from '../../../style/style';
import { consProfileDataType } from '../../../component/componentsType';

export const Profile = (route:consProfileDataType) => {

    return (
        <View style={{ backgroundColor: colors.WHITE_COLOR, padding: 20}}>
            <Text style={[ fontStyle.f_semibold, { fontSize: 20, color:colors.FONT_COLOR_BLACK}]}>경력사항</Text>
            <View style={{ marginVertical: 10 }}>
                <Text style={[ fontStyle.f_medium, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>
                    {route.profileData.mpt_career} 년
                </Text>
                <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK2}]}>
                    {route.profileData.mpt_licence} {'\n'}
                    {/* * 면허취득일(2008.04) / 15년 10개월 */}
                </Text>
            </View>
            <View style={{ marginVertical: 10 }}>
                <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>세부경력정보</Text>
                <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>
                    {route.profileData.mpt_equip_memo}
                    {/* - 흙막이 작업 : 총 8년 3개월 */}
                </Text>
                {/* <Text style={[fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>- 상하수도 작업 : 총 1년 5개월</Text> */}
            </View>
            <View style={{ marginVertical: 20 }}>
                <Text style={[ fontStyle.f_semibold, { fontSize: 20, color:colors.FONT_COLOR_BLACK, marginBottom: 10}]}>나의 포부</Text>
                <Text style={[fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>
                    {route.profileData.mpt_aspire}
                </Text>
            </View>
        </View>
    )
}