import React from 'react';
import {View, TextInput,Image,TouchableOpacity} from 'react-native';
import { colors, fontStyle } from '../../../../style/style';

export const FavoriteAddPhone = () => {
    return(
        <View style={{backgroundColor:colors.WHITE_COLOR,paddingHorizontal:20,paddingVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{flex:9}}>
                <TextInput 
                    style={[fontStyle.f_regular,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}
                    placeholderTextColor={colors.BORDER_GRAY_COLOR}
                    placeholder='연락처를 입력해주세요.'
                    numberOfLines={1}
                />
            </View>
            <View style={{flex:1}}>
                <TouchableOpacity
                    style={{justifyContent:'center',alignItems:'center',width:25,height:25}}
                >
                    <Image 
                        source={require('../../../../assets/img/ic_add_img.png')}
                        style={{width:18.5,height:18.5}}
                    />
                </TouchableOpacity>
            </View>
        </View>    
    )
}