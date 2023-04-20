import React from "react";
import { Image, Text, View } from "react-native";
import { colors, fontStyle } from "../../style/style";
import { SelectedEquipmentCardType } from "../componentsType";

export const SelectedEquipmentCard = ({
    equipNumb = '',
    year = 0,
    sideEquip = '',
}:SelectedEquipmentCardType) => {

    return (
            <View style={{ flexDirection: 'row'}}>
                <View style={{ width: 130, height: 130, justifyContent: 'center', /* alignItems: 'center' */}}>
                    <Image style={{ width: '100%', height: '100%', backgroundColor: colors.BACKGROUND_COLOR_GRAY1, alignSelf: 'center', margin:0 }} /* source={ require('../../assets/img/ic_main1.png')} */ />
                </View>
                <View style={{ flex: 2, margin: 15}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                        <Text style={[ fontStyle.f_medium, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>차량번호</Text>
                        <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK2}]}>{equipNumb}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                        <Text style={[ fontStyle.f_medium, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>제작연도</Text>
                        <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK2}]}>{year}년</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                        <Text style={[ fontStyle.f_medium, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>부속장치</Text>
                        <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK2}]}>{sideEquip}</Text>
                    </View>
                </View>
            </View>

    )
}