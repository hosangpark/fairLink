import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { BackHeaderType } from '../componentsType';
import { colors, fontStyle, styles } from '../../style/style';
import { useNavigation } from '@react-navigation/native';

export const BackHeader = ({
    backAction,
    title,
    isBtnHide,
}:BackHeaderType) =>{

    const navigation = useNavigation();

    return(
        <View style={[styles.header_,styles.bottomBorder,{backgroundColor:'#ffffff'}]}>
        {!isBtnHide &&
            <TouchableOpacity onPress={()=>{
                    if(backAction){
                        backAction();
                    }
                    else{
                        navigation.goBack();
                    }
                }} 
            style={[{position:'absolute',left:20,width:50,height:50,justifyContent:'center'}]}>
                <Image style={{width:15,height:13}} source={require('../../assets/img/ic_back.png')}></Image>
            </TouchableOpacity>
        }
        <View style={[{flex:1,justifyContent:'center',alignItems:'center'}]}>
            <Text style={[fontStyle.f_semibold,{color:colors.FONT_COLOR_BLACK,fontSize:20}]}>{title}</Text>
        </View>
    </View> 
    )
}