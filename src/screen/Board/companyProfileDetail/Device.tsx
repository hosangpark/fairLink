import React from 'react';
import { View, Text, Image} from 'react-native';
import { colors } from '../../../style/style';
import { conssubDataType } from '../../../component/componentsType';
import { sliceArray } from '../../../util/func';

export const Device = (route:{subData : string[]}) => {
    const subDataList = sliceArray(route.subData,2);

    console.log(subDataList);
// conssubDataType
    return (
        <View style={{ padding: 20,}}>
            {subDataList.map((item,index) => {
                return(
                    <View key={index} style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',flex:1}}>
                        {item.map((listItem,listIndex) => {
                            return(
                                <View style={{justifyContent:'center',alignItems:'center',flex:1 }}>
                                    <Image style={{width:184,height:134, borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 8,}} source={require('../../../assets/img/ic_main1.png')} />
                                    <Text>{listItem}</Text>
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