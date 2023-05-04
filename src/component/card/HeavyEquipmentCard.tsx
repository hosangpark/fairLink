import React,{useState} from 'react';
import { Text, TouchableOpacity, View ,Image,StyleSheet } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { HeavyEquipmentCardType } from '../componentsType';


export const HeavyEquipmentCard = ({
    item,
    action,
    action2
}:HeavyEquipmentCardType) => {

    const [isDelete,setIsDelete] = useState(false)
    const Addnumber = ()=>{
        setIsDelete(!isDelete)
        // if(isDelete)
        action2()
    }

    return (
        <View style={{width:'100%',position:'relative',marginBottom:30}} >
            <View style={[styles.cardWrapper]}>
                <View style={[styles.card2Location,{flexDirection:'column'}]}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                        <Text style={[fontStyle.f_bold,{fontSize:18,color:colors.FONT_COLOR_BLACK,flexShrink:1,marginRight:20}]}>{item.device}</Text>
                        <TouchableOpacity onPress={Addnumber}>
                            { isDelete ? <Image style={HeavyEquipmentCardstyle.Ontrash} source={require('../../assets/img/ic_trash2_on.png')}/> : <Image style={HeavyEquipmentCardstyle.trash} source={require('../../assets/img/ic_trash1.png')}/> }
                        </TouchableOpacity>
                    </View>
                <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK2}]}>{item.year}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={action}>
                <Image style={{width:100,height:100,borderRadius:4,marginRight:20,}} source={item.img? {uri:item.img}:require('../../assets/img/no_image.png')}/>
                </TouchableOpacity>
                <View style={{flex:1}}>
                    <View style={HeavyEquipmentCardstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,HeavyEquipmentCardstyle.boxText1,{marginRight:20}]}>차량번호</Text>
                        <Text style={[fontStyle.f_regular,HeavyEquipmentCardstyle.boxText1,{flexShrink:1}]}>
                            {item.reg_no}
                        </Text>
                    </View>
                    <View style={HeavyEquipmentCardstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,HeavyEquipmentCardstyle.boxText1,{marginRight:20}]}>부속장치</Text>
                        <Text style={[fontStyle.f_regular,HeavyEquipmentCardstyle.boxText1,{flexShrink:1}]}>
                            {item.sub}
                        </Text>
                    </View>
                    <View style={HeavyEquipmentCardstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,HeavyEquipmentCardstyle.boxText1,{marginRight:20}]}>필수서류</Text>
                        <Text style={[fontStyle.f_regular,item.doc_check == '완비'? HeavyEquipmentCardstyle.boxText1:HeavyEquipmentCardstyle.redText,{flexShrink:1}]}>
                            {item.doc_check}
                        </Text>
                    </View>
                </View>
                </View>
            </View>
        </View>
    )
}

const HeavyEquipmentCardstyle = StyleSheet.create({
    WhiteBox:{paddingHorizontal:20,paddingTop:30,paddingBottom:30,backgroundColor:colors.WHITE_COLOR,marginBottom:10},
    DefaultBlackText:{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10},
    cardInbox:{flexDirection:'row',justifyContent:'space-between',marginBottom:5},
    boxText1:{fontSize:16,color:colors.FONT_COLOR_BLACK},
    redText:{fontSize:16,color:colors.RED_COLOR3},
    Ontrash:{borderWidth:1,borderColor:colors.BORDER_RED_COLOR2,borderRadius:4,padding:2,width:27,height:27},
    trash:{borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,borderRadius:4,padding:2,width:27,height:27},
})