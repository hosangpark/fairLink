import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, fontStyle } from '../../../style/style';
import { pilotCareerList } from '../../../component/utils/list';

type ProfileInfoType = {
    info? : {
        mpt_aspire? : string,
        mpt_career? : string,
        mpt_qeuip_memo? : string,
        mpt_licence? : string,
    }
}

export const Profile = ({info}:ProfileInfoType) => {


    return (
        <View style={{ backgroundColor: colors.WHITE_COLOR, padding: 20,flex:1}}>
            <Text style={[ fontStyle.f_semibold, { fontSize: 20, color:colors.FONT_COLOR_BLACK}]}>경력사항</Text>
            <View style={{ marginVertical: 10 }}>
                <Text style={[ fontStyle.f_medium, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>{pilotCareerList[Number(info?.mpt_career)]}</Text>
                <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK2}]}>{info?.mpt_licence !== '-' ? '*' : ' '}{info?.mpt_licence}</Text>
            </View>
            <View style={{ marginVertical: 10 }}>
                <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>세부경력정보</Text>
                <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>{info?.mpt_qeuip_memo}</Text>
            </View>
            <View style={{ marginVertical: 20 }}>
                <Text style={[ fontStyle.f_semibold, { fontSize: 20, color:colors.FONT_COLOR_BLACK, marginBottom: 10}]}>나의 포부</Text>
                <Text style={[fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>{info?.mpt_aspire}</Text>
            </View>
        </View>
    )
}