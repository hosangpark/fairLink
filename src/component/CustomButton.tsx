import React from 'react';
import { CustomButtonType } from './componentsType';
import { Text, TouchableOpacity, View } from 'react-native';
import { fontStyle, styles } from '../style/style';


export const CustomButton = ({
    style,
    labelStyle,
    label,
    action,
}:CustomButtonType) => {
    return(
        <TouchableOpacity 
            style={[styles.buttonStyle,style]}
            onPress={()=>{
                if(action)action();
            }}
        >
            <Text style={[styles.buttonLabelStyle,fontStyle.f_medium,labelStyle]}>{label}</Text>
        </TouchableOpacity>
    )
}

