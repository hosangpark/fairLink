import React from "react";
import { View, Text, Image } from 'react-native';
import { colors, fontStyle } from "../style/style";

type StatusDisplayProps = {
    name: string,
    type: number, // 0: 미첨부, 1: 승인중, 2: 승인완료
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({name, type}) => {
    const images = [require('../assets/img/ic_circle_on.png'), require('../assets/img/ic_circle_off.png')];
    const image1 = images[type === 0 ? 0 : 1];
    const image2 = images[type === 1 ? 0 : 1];
    const image3 = images[type === 2 ? 0 : 1];

    return (
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, paddingVertical: 10 }}>
            <Text style={[fontStyle.f_medium, { fontSize: 16, color:colors.FONT_COLOR_BLACK, flex: 5}]}>{name}</Text>
            <View style={{ flexDirection: 'row', flex: 4, justifyContent: 'space-around' }}>
                <Image style={{ width: 14, height: 14, marginHorizontal: 4 }} source={ image1 }/>
                <Image style={{ width: 14, height: 14, marginHorizontal: 4 }} source={ image2 }/>
                <Image style={{ width: 14, height: 14, marginHorizontal: 4 }} source={ image3 }/>
            </View>
        </View>
    )
}