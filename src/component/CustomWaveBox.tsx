import React,{useState} from 'react';
import {Image} from 'react-native';
import { CustomWaveBoxType } from './componentsType';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';
import { TextInput } from 'react-native-gesture-handler';
import { CustomInputTextBox } from './CustomInputTextBox';


export const CustomWaveBox = ({
    style,
    placeholder1,
    placeholder2,
    imgfile,
    button,
    action,
    editable,
    placeholderTextColor
}:CustomWaveBoxType) => {
    return(
      <View style={{flexDirection:'row'}}>
          <CustomInputTextBox
              style={[{flex:1},style]}
              placeholder={placeholder1}
              imgfile={imgfile}
              button={button}
              action={action}
              editable={editable}
              placeholderTextColor={placeholderTextColor}
          />
          <View style={{justifyContent:'center',alignItems:'center',width:30}}>
              <Text style={[fontStyle.f_semibold,{fontSize:18}]}>~</Text>
          </View>
          <CustomInputTextBox
              style={[{flex:1},style]}
              placeholder={placeholder2}
              imgfile={imgfile}
              button={button}
              action={action}
              editable={editable}
              placeholderTextColor={placeholderTextColor}
          />
      </View>
    )
}

