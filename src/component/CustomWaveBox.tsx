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
    action2,
    editable,
    placeholderTextColor,
    text1,
    setText1,
    type1,
    text2,
    setText2,
    type2,
    whiteReadOnly1,
    whiteReadOnly2,
    title,
    essential,
}:CustomWaveBoxType) => {
    return(
      <View>
        {title &&
          <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:5}]}>{title} <Text style={{color:colors.ORANGE_COLOR}}>{essential && '*'}</Text></Text>
        }
        <View style={{flexDirection:'row'}}>
            <CustomInputTextBox
              input={text1}
              setInput={setText1}
              type={type1}
              style={style}
              containerStyle={{flex:1}}
              placeholder={placeholder1}
              imgfile={imgfile}
              button={button}
              action={action}
              editable={editable}
              placeholderTextColor={placeholderTextColor}
              whiteReadOnly={whiteReadOnly1}
            />
            <View style={{justifyContent:'center',alignItems:'center',width:30}}>
                <Text style={[fontStyle.f_semibold,{fontSize:18}]}>~</Text>
            </View>
            <CustomInputTextBox
              input={text2}
              setInput={setText2}
              type={type2}
              style={style}
              containerStyle={{flex:1}}
              placeholder={placeholder2}
              imgfile={imgfile}
              button={button}
              action={action2}
              editable={editable}
              placeholderTextColor={placeholderTextColor}
              whiteReadOnly={whiteReadOnly2}
            />
        </View>
      </View>
    )
}

