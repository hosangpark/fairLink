import React from "react";
import { View, Text } from "react-native";
import { colors, fontStyle } from "../style/style";

type StatusDisplayHeaderProps = {
    category : string;
}

/** 상태표시 헤더 */
export const StatusDisplayHeader: React.FC<StatusDisplayHeaderProps> = ({category}) => {
    
    return (
        <View style={{ marginTop: 10, }}>
            <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems: 'center', borderBottomWidth: 2, borderColor: colors.MAIN_COLOR,}}>
                <Text style={[fontStyle.f_semibold, { fontSize: 20, color: colors.FONT_COLOR_BLACK, marginVertical: 10, flex: 5, }]}>{category}</Text>
                <View style={{ flexDirection: 'row', flex: 4, justifyContent: 'space-around',}}>
                    <Text style={[fontStyle.f_medium, { fontSize: 16, color:colors.FONT_COLOR_BLACK2,}]}>미첨부</Text>
                    <Text style={[fontStyle.f_medium, { fontSize: 16, color:colors.FONT_COLOR_BLACK2,}]}>승인중</Text>
                    <Text style={[fontStyle.f_medium, { fontSize: 16, color:colors.FONT_COLOR_BLACK2,}]}>승인완료</Text>
                </View>
            </View>
        </View>
    )
}