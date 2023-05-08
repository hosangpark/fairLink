import React from "react";
import { Image, Text, View } from "react-native";
import { colors, fontStyle } from "../../style/style";
import { SelectedEquipmentCardType } from "../componentsType";

export const SelectedEquipmentCard = ({
    item
}:SelectedEquipmentCardType) => {

    return (
            <View style={{ flexDirection: 'row'}}>
                <View style={{ width: 130, height: 130, justifyContent: 'center', /* alignItems: 'center' */}}>
                    <Image 
                        style={{ width: '100%', height: '100%', backgroundColor: colors.BACKGROUND_COLOR_GRAY1, alignSelf: 'center', margin:0,borderTopLeftRadius:8,borderBottomLeftRadius:8 }} 
                        source={ item.img_url === '' ?  require('../../assets/img/no_image.png') : {uri : item.img_url}} 
                    />
                </View>
                <View style={{ flex: 2, margin: 15}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
                        <Text style={[ fontStyle.f_medium, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>차량번호</Text>
                        <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK2,marginLeft:5}]}>{item.eit_reg_no}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
                        <Text style={[ fontStyle.f_medium, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>제작연도</Text>
                        <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK2,marginLeft:5}]}>{item.eit_year}년</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
                        <Text style={[ fontStyle.f_medium, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>부속장치</Text>
                        <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK2,marginLeft:5,flexWrap:'wrap'}]}>{item.eit_sub}</Text>
                    </View>
                </View>
            </View>

    )
}