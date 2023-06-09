import React from 'react';
import { MarginComType } from './componentsType';
import {View} from 'react-native';
import { colors, styles } from '../style/style';

export const MarginCom = ({
    mt,
    mb,
    my,
    isBorder,
    isBorderDeep,
    isWhiteBorder,
}:MarginComType) => {

    return(
        <View style={{
            marginTop: mt ? mt : 0,
            marginBottom:mb ? mb : 0,
            borderTopColor:isWhiteBorder ? colors.WHITE_COLOR : isBorderDeep ? colors.BORDER_GRAY_COLOR1 : colors.BORDER_GRAY_COLOR,
            borderTopWidth : isBorder ? 1 : 0
        }} />
    )
}