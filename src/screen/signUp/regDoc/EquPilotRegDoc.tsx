import React from 'react';
import {View ,Text, TouchableOpacity,ImageBackground,Image, Platform} from 'react-native';

import { colors, fontStyle, styles } from '../../../style/style';
import { launchImageLibrary, launchCamera } from "react-native-image-picker";


export const EquPilotRegDoc = ({memberType}:{memberType:number}) => {

    const [guaranteeImage,setguaranteeImage] = React.useState<undefined>()

    const imagePickerOption = {
        mediaType: "photo",
        maxWidth: 768,
        maxHeight: 768,
        includeBase64: Platform.OS === "android",
    };
    

    const onPickImage = (res:any) => {
        if(res.didCancle || !res){
            return;
        }
        console.log('pick image ? ' , res);
    }

    const onLaunchImageLibrary = () => {
        launchImageLibrary(imagePickerOption, onPickImage);
      };
    

    return(
       <View style={[styles.white_box_con]}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>서류 업로드{memberType === 1 && '(장비 관련)'}</Text>
                <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}><Text style={{color:colors.ORANGE_COLOR}}>*</Text> 필수항목</Text>
            </View>

            <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>건설기계지급보증서</Text>
            <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR,marginBottom:10}]}>건설기계 대금 200만원 이상인 경우 의무가입 대상입니다.
            </Text>
            <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }} onPress={()=>{onLaunchImageLibrary();}}>
                <ImageBackground
                style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:guaranteeImage? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                source={guaranteeImage}
                resizeMode="cover"
                imageStyle={{ borderRadius: 10 }}>
                    <Image 
                    style={{ width: 15, height: 15}}
                    source={require('../../../assets/img/ic_add.png')}
                    />
                    <TouchableOpacity
                        style={{ position:'absolute', right: 10, top: 10 }}
                        onPress={() =>{setguaranteeImage}}>
                        <Image
                        style={{ width: 25, height: 25 }}
                        source={require('../../../assets/img/ic_modify.png')}
                        />
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity>
       </View> 
    )
}