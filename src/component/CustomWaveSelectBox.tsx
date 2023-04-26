import React,{useState} from 'react';
import {Image} from 'react-native';
import { CustomWaveSelectBoxType } from './componentsType';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle, styles,selectBoxStyle } from '../style/style';
import { TextInput } from 'react-native-gesture-handler';
import { CustomInputTextBox } from './CustomInputTextBox';
import { CustomSelectBox } from './CustomSelectBox';
import { datedata } from './datedata';

export const CustomWaveSelectBox = ({
    style,
    strOptionList,
    selOption1,
    setStrOption1,
    selOption2,
    setStrOption2,
}:CustomWaveSelectBoxType) => {
    return(
      <View style={{flexDirection:'row'}}>
          <CustomSelectBox
            style={{flex:1}}
            defaultText='1일'
            strOptionList={strOptionList}
            selOption={selOption1}
            strSetOption={setStrOption1}
            buttonStyle={selectBoxStyle.btnStyle}
            buttonTextStyle={selectBoxStyle.btnTextStyle}
            rowStyle={selectBoxStyle.rowStyle}
            rowTextStyle={selectBoxStyle.rowTextStyle}
          />
          <View style={{justifyContent:'center',alignItems:'center',width:30}}>
              <Text style={[fontStyle.f_semibold,{fontSize:18}]}>~</Text>
          </View>
          <CustomSelectBox
            style={{flex:1}}
            defaultText='1일'
            strOptionList={strOptionList}
            selOption={selOption2}
            strSetOption={setStrOption2}
            buttonStyle={selectBoxStyle.btnStyle}
            buttonTextStyle={selectBoxStyle.btnTextStyle}
            rowStyle={selectBoxStyle.rowStyle}
            rowTextStyle={selectBoxStyle.rowTextStyle}
          />
      </View>
    )
}

