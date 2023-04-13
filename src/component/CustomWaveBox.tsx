import React,{useState} from 'react';
import {Image} from 'react-native';
import { CustomWaveBoxType } from './componentsType';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';
import { TextInput } from 'react-native-gesture-handler';
import { CustomInputTextBox } from './CustomInputTextBox';


export const CustomWaveBox = ({
    style,
    placeholder,
    imgfile,
    button,
    action,
}:CustomWaveBoxType) => {
    return(
      <View style={{flexDirection:'row'}}>
          <CustomInputTextBox
              style={[{flex:1},style]}
              placeholder={placeholder}
              imgfile={imgfile}
              button={button}
              action={action}
          />
          <View style={{justifyContent:'center',alignItems:'center',width:30}}>
              <Text style={[fontStyle.f_semibold,{fontSize:18}]}>~</Text>
          </View>
          <CustomInputTextBox
              style={[{flex:1},style]}
              placeholder={placeholder}
              imgfile={imgfile}
              button={button}
              action={action}
          />
      </View>
    )
}

