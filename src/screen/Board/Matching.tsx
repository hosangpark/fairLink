import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { BackHeader } from "../../component/header/BackHeader";
import { colors, fontStyle } from "../../style/style";

export const Matching = () => {

    const data = [
        {
            equipType : '굴착기',
            size : '6W',
            side : '브레이커',
            numb : '경기 12머6040',
            date : '2020년',
            sideSeleted : '브레이커, 채바가지'
        }
    ]

    return (
        <ScrollView>
            <BackHeader title="장비 및 조종사 매칭" />
            <View style={{ backgroundColor: colors.WHITE_COLOR}}>
                <View style={{ margin: 20, }}>
                    <Text style={[ fontStyle.f_semibold, { fontSize: 20, color: colors.FONT_COLOR_BLACK}]}>장비 요구조건</Text>
                    <View style={{ marginVertical: 10, padding: 15, backgroundColor: colors.BACKGROUND_COLOR_GRAY1, borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 8}}>
                        <View style={{ flexDirection: 'row', marginBottom: 5}}>
                            <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 1}]}>장비종류</Text>
                            <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 2}]}>{data[0].equipType}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 5}}>
                            <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 1}]}>규격</Text>
                            <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 2}]}>{data[0].size}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 5}}>
                            <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 1}]}>부속장치</Text>
                            <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 2}]}>{data[0].side}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
                    <Text style={[ fontStyle.f_semibold, { fontSize: 20, color: colors.FONT_COLOR_BLACK}]}>장비 선택</Text>
                    <View style={{ flexDirection: 'row', marginVertical: 10, borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 8}}>
                        <View style={{ width: 130, height: 130, justifyContent: 'center', /* alignItems: 'center' */}}>
                            <Image style={{ width: '100%', height: '100%', backgroundColor: colors.BACKGROUND_COLOR_GRAY1, alignSelf: 'center', margin:0 }} /* source={ require('../../assets/img/ic_main1.png')} */ />
                        </View>
                        <View style={{ flex: 2, margin: 15}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                                <Text style={[ fontStyle.f_medium, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>차량번호</Text>
                                <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK2}]}>{data[0].numb}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                                <Text style={[ fontStyle.f_medium, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>제작연도</Text>
                                <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK2}]}>{data[0].date}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                                <Text style={[ fontStyle.f_medium, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>부속장치</Text>
                                <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK2}]}>{data[0].sideSeleted}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: colors.WHITE_COLOR, marginVertical: 10}}>
                <View style={{ margin: 20 }}>
                    <Text style={[ fontStyle.f_semibold, { fontSize: 20, color: colors.FONT_COLOR_BLACK}]}>즐겨찾기 조종사 선택</Text>
                </View>
            </View>
        </ScrollView>
    )
}