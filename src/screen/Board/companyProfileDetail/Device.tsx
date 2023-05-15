import React from 'react';
import { View, Text, Image} from 'react-native';
import { colors, fontStyle } from '../../../style/style';
import { conssubDataType } from '../../../component/componentsType';
import { sliceArray } from '../../../util/func';
import { deviceImgList } from '../../../component/utils/list';

export const Device = (route:{subData : string[]}) => {
    const subDataList = sliceArray(route.subData,2);

    console.log(subDataList);
// conssubDataType
    return (
        <View style={{ padding: 20,}}>
            {subDataList.map((item,index) => {
                return(
                    <View key={index} style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',flex:1,marginBottom:20}}>
                        {item.map((listItem,listIndex) => {
                            return(
                                <View style={{justifyContent:'center',alignItems:'center',flex:1 }} key={listIndex}>
                                    <Image style={{width:'90%',resizeMode:'cover',height:134, borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 8,}} source={deviceImgList[listItem]} />
                                    <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginTop:10}]}>{listItem}</Text>
                                </View>
                            )
                        })}
                    </View>
                )
            })}
            {/* {
                route.subData.map((data, i) => (
                    <View key={i} style={{ alignItems:'center', marginVertical: 20}}>
                        <Image style={{ width: 180, height: 134, borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 8, }} source={ data?.img ? 
                        {uri:data.img}
                        :
                        require('../../../assets/img/ic_main1.png')} />
                        <Text>{data}</Text>
                    </View>
                ))
            } */}
        </View>
    )
}