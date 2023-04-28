import React,{useState} from 'react';
import {Image} from 'react-native';
import { CustomInputTextBoxType } from './componentsType';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';
import { TextInput } from 'react-native-gesture-handler';


export const CustomInputTextBox = ({
    containerStyle, //container style
    style, //input box style
    inputType = 'default',
    placeholder,
    imgfile, //이미지 파일
    button, //btn 여부 (string) 버튼 텍스트
    action, //btn action
    editable, //수정 여부
    placeholderTextColor, //placeholder 색상
    setInput, //text input handler 
    input, //input value값
    type, //input 객체 key값 (단일 string이면 없어도 ok)
    title, //텍스트박스 제목
    essential, //필수 표시
    whiteReadOnly, //입력은 못하지만 화이트색상 textBox
    isTextLabel, //텍스트 라벨 input 끝쪽에 붙음 (type  = string)
}:CustomInputTextBoxType) => {
    return(
      <View style={{...containerStyle}}>
        {title &&
          <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:5}]}>{title} <Text style={{color:colors.ORANGE_COLOR}}>{essential && '*'}</Text></Text>
        }
        <View style={[(editable || whiteReadOnly) ?styles.TextInputBox:styles.TextInputFalseBox,style]}>
          <TextInput
              keyboardType={inputType} 
              style={[fontStyle.f_regular,{flexShrink:1,paddingHorizontal:10,flex:1,color:colors.FONT_COLOR_BLACK}]}
              value={input}
              onChangeText={e=>{
                if(setInput){
                  if(type){
                    setInput(e,type);
                  }
                  else{
                    setInput(e);
                  }
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
          {isTextLabel &&
            <View style={{justifyContent:'center',alignItems:'center',marginHorizontal:10}}>
              <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>{isTextLabel}</Text>
            </View>
          }
        </View>
      </View>
    )
}

