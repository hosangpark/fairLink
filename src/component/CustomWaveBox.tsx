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
    placeholderTextColor,
    text1,
    setText1,
    text2,
    setText2,
}:CustomWaveBoxType) => {
    return(
      <View style={{flexDirection:'row'}}>
          <CustomInputTextBox
            text={text1}
            setText={setText1}
            style={style}
            containerStyle={{flex:1}}
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
            text={text2}
            setText={setText2}
            style={style}
            containerStyle={{flex:1}}
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

