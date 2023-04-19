import React,{useState} from 'react';
import {Image} from 'react-native';
import { CustomInputTextBoxType } from './componentsType';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';
import { TextInput } from 'react-native-gesture-handler';


export const CustomInputTextBox = ({
    containerStyle,
    style,
    inputType = 'default',
    placeholder,
    imgfile,
    button,
    action,
    editable,
    placeholderTextColor,
    setInput,
    input,
    type,
    title,
    essential,
}:CustomInputTextBoxType) => {
  const [text,setText] = useState<string>('')
    return(
      <View style={{...containerStyle}}>
        {title &&
          <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:5}]}>{title} <Text style={{color:colors.ORANGE_COLOR}}>{essential && '*'}</Text></Text>
        }
        <View style={[editable?styles.TextInputBox:styles.TextInputFalseBox,style]}>
          <TextInput
              keyboardType={inputType} 
              style={[fontStyle.f_regular,{flexShrink:1,paddingHorizontal:10,flex:1,}]}
              // value={input} //살려주세요.

              value={text} //나중에 지워주세요
              onChangeText={e=>{
                if(type && setInput){
                  setInput(e,type)
                  setText(e) //나중에 지워주세요
                }
                else{
                  setText(e) //나중에 지워주세요
                }
              }}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              editable={editable}
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
      </View>
    )
}

