import React from 'react';
import { CustomButtonType } from './componentsType';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';


export function NodataView(props:any) {

  const { msg, isLoaded, fontStyle } = props;

  let newMsg = msg ? msg : '데이터가 없습니다';
  if (typeof isLoaded != 'undefined') {
    if (!isLoaded) newMsg = '로딩중';
  }

  // console.log('rrr', viewStyle);

  return (
    <View style={{height: 45,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',}}>
      <Text style={{ fontSize: 14, color:colors.FONT_COLOR_BLACK, ...fontStyle }}>
        {newMsg}
      </Text>
    </View>
  );
}
