import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, fontStyle } from '../../../style/style';

export const RequiredDocuments = () => {

    return (
        <View style={{backgroundColor: colors.WHITE_COLOR, padding: 20}}>
            <View style={{ marginVertical: 10, }}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'center', borderBottomWidth: 2, borderColor: colors.MAIN_COLOR, paddingVertical: 5 }}>
                    <Text style={[fontStyle.f_semibold, { fontSize: 20, color: colors.FONT_COLOR_BLACK }]}>차량서류</Text>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={[fontStyle.f_medium, { fontSize: 16, color:colors.FONT_COLOR_BLACK2, marginHorizontal: 4}]}>미첨부</Text>
                        <Text style={[fontStyle.f_medium, { fontSize: 16, color:colors.FONT_COLOR_BLACK2, marginHorizontal: 4}]}>승인중</Text>
                        <Text style={[fontStyle.f_medium, { fontSize: 16, color:colors.FONT_COLOR_BLACK2, marginHorizontal: 4}]}>승인완료</Text>
                    </View>
                </View>
            </View>
            <View>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: colors.MAIN_COLOR, paddingVertical: 5 }}>
                    <Text style={[fontStyle.f_medium, { fontSize: 16, color:colors.FONT_COLOR_BLACK}]}>건설기계등록중</Text>
                    <View style={{ flexDirection: 'row'}}>
                        <Text></Text>
                    </View>
                </View>
            </View>
        </View>
    )
}