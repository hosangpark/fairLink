import React,{useState} from 'react';
import {Image} from 'react-native';
import { CustomInputTextBoxType } from './componentsType';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';
import { TextInput } from 'react-native-gesture-handler';


export const CustomInputTextBox = ({
    style,
    placeholder,
    imgfile,
    button,
    action,
}:CustomInputTextBoxType) => {
  const [text,setText] = useState<string>('')
    return(
      <View style={[styles.TextInputBox,style]}>
        <TextInput 
            style={{flexShrink:1,paddingHorizontal:10,flex:1,}}
            value={text}
            onChangeText={e=>{setText(e)}}
            placeholder={placeholder}
            >
        </TextInput>
        {button || imgfile ?
        <TouchableOpacity onPress={()=>{
          if(action)action();
        }} style={{justifyContent:'center',alignItems:'center',marginHorizontal:10}}>
          {button? <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.MAIN_COLOR}]}>{button}</Text>
          :
            <Image style={{width:20,height:20}} source={imgfile}/>
          }
        </TouchableOpacity>
        :null
        }
      </View>
    )
}

