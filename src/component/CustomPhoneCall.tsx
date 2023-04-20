import React from 'react';
import { CustomPhoneCallType } from './componentsType';
import { Text, TouchableOpacity, Image } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';


export const CustomPhoneCall = ({
    phonenumber,
    alertModalOn
}:CustomPhoneCallType) => {
    return(
        <TouchableOpacity style={{flexDirection:'row', borderRadius:8,borderWidth:1,borderColor:colors.MAIN_COLOR,paddingHorizontal:10,paddingVertical:5,justifyContent:'center',marginVertical:10}}
        onPress={()=>{alertModalOn('phonenumber')}}
        >
        <Image style={{width:25,height:25,marginRight:5}} source={require('../assets/img/ic_phone.png')}/>
        <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.MAIN_COLOR,flexShrink:1}]}>
            {phonenumber}</Text>
        </TouchableOpacity>
    )
}

