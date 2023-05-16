import React from 'react';
import { Text, TouchableOpacity, View ,Image } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { PilotInfoCardType } from '../componentsType';
import { pilotCareerList } from '../utils/list';
import { MarginCom } from '../MarginCom';


export const PilotInfoCard = ({
    item,
    action
}:PilotInfoCardType) => {

    return (
        <TouchableOpacity style={{marginLeft: 5, marginBottom:10, }} onPress={action}>
            <View style={{paddingHorizontal:20,paddingVertical:15}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={[styles.cardProfileSize]}>
                            {/* <Text>프로필 영역</Text> */}
                            <Image
                                style={{width:90,height:90,borderRadius:100}}
                                source={item.img_url === '' ? require('../../assets/img/profile_default.png') : {uri:item.img_url}} 
                            />
                        </View>
                        <View style={{marginLeft:10,}}>
                            <View style={{ flexDirection: 'row',alignItems:'center'}}>
                                <Text style={[fontStyle.f_semibold,{fontSize: 18, color:colors.FONT_COLOR_BLACK}]}>{item.name}</Text>
                                <Text style={[fontStyle.f_semibold,{fontSize: 16, color:colors.FONT_COLOR_BLACK2}]}> / {item.age}세</Text>
                            </View>
                            <Text style={[fontStyle.f_regular,{fontSize: 15, color:colors.FONT_COLOR_BLACK2}]}>경력 {pilotCareerList[Number(item.career)]}</Text>
                            <View style={{flexDirection:'row',marginTop:8,alignItems:'center'}}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image source={require('../../assets/img/ic_star_sm.png')} style={{width:13,height:13}} />
                                    <Text style={[fontStyle.f_regular,{fontSize:14, color:colors.FONT_COLOR_BLACK,marginLeft:3}]}>{item.score}</Text>
                                </View>
                                <Text style={[fontStyle.f_regular,{fontSize:14, color:colors.FONT_COLOR_BLACK2,marginLeft:5}]}>추천수 {item.good}</Text>
                            </View>
                            <MarginCom mt={5} />
                            <Text style={[fontStyle.f_regular,{fontSize: 15, color:colors.FONT_COLOR_BLACK}]}>{item.hp} </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}