import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';
import { TextBoxType } from './componentsType';

export const TextBox = ({
    type = 1, // 진행상황
    boldText = '03.03',
    subText = '굴삭기',
    rightText = '[모집완료]',
    
}:TextBoxType) => {

    return(
        <View>
            <View style={[styles.textBox, {borderColor: colors.BORDER_BLUE_COLOR, backgroundColor: colors.WHITE_COLOR}]}>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ color: colors.FONT_COLOR_BLACK, fontSize: 16, margin: 3 }}>{boldText}</Text>
                    <Text style={{ color: colors.FONT_COLOR_BLACK, fontSize: 16, margin: 3 }}>{subText}</Text>
                </View>
                <Text style={{ 
                    color: (type === 1) ? colors.GRAY_COLOR : (type === 2) ? colors.MAIN_COLOR : (type === 3) ? colors.LIGHT_BLUE_COLOR : colors.FONT_COLOR_BLACK2, 
                    fontSize: 16, 
                    margin: 3, 
                    justifyContent: 'flex-end' 
                }}>
                    {rightText}
                </Text>
            </View>
        </View>
    )
}