import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle, styles } from '../style/style';
import { TextBoxType } from './componentsType';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../type/routerType';

export const TextBox = ({
    push_idx, // 1: 일반 , 2:팝업, 3:링크
    type ,
    date ,
    title ,
    content,
    link1,
    link2,
    link3
}:TextBoxType) => {
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const FlowEvent = ()=>{
        if(type == 'link'){
          switch(link1){
            case "Home":
              navigation.navigate('Home')
              break;
            case "DetailField_eq_pi":
              navigation.navigate('DetailField',{
                cot_idx:link2
              })
              break;
            case "DetailField_eq":
              navigation.navigate('DetailField',{
                cot_idx:link2
              })
              break;
            case "DetailField_pi":
              navigation.navigate('DetailField',{
                cat_idx:link2,
              })
              break;
            case "ElectronicContract_eq":
                console.log('pdf_View')
            //   navigation.navigate('ElectronicContract',{
            //     route_type:"Info2",
            //     contract_idx:link2
            //   })
              break;
            case "ElectronicContract_cons":
              navigation.navigate('ElectronicContract',{
                route_type:"Info",
                cat_idx:link2,
                cot_idx:link3,
              })
              break;
            case "WorkReport_cons":
              navigation.navigate('WorkReport',{
                cdwt_idx:link2
              })
              break;
            case "Board":
              navigation.navigate('Board')
              break;
            case "Request":
              navigation.navigate('Request')
              break;
          }

        }
    }
    return(
        <TouchableWithoutFeedback onPress={FlowEvent}>
            <View style={[styles.textBox, {borderColor: colors.BORDER_BLUE_COLOR, backgroundColor: colors.WHITE_COLOR}]}>
                <View style={{ flexDirection: 'row', alignItems:'center'}}>
                    <Text style={[fontStyle.f_medium,{ color: colors.FONT_COLOR_BLACK, fontSize: 16}]}>
                        {date}
                    </Text>
                    <Text style={[fontStyle.f_regular,{ color: colors.FONT_COLOR_BLACK, fontSize: 16, marginLeft:10}]}>{title}</Text>
                </View>
                <Text style={[fontStyle.f_medium,{ 
                    color: (push_idx == "1") ? colors.GRAY_COLOR : (push_idx == "2") ? colors.MAIN_COLOR : (push_idx == "3") ? colors.LIGHT_BLUE_COLOR : colors.FONT_COLOR_BLACK2, 
                    fontSize: 16,
                    justifyContent: 'flex-end' 
                }]}>
                    {content}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}