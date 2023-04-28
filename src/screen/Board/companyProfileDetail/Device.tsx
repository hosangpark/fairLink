import React from 'react';
import { View, Text, Image} from 'react-native';
import { colors } from '../../../style/style';
import { conssubDataType } from '../../../component/componentsType';

export const Device = (route:any) => {
// conssubDataType
    return (
        <View style={{ padding: 20,}}>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
                {
                    route.subData.map((data, i) => (
                        <View key={i} style={{ alignItems:'center', marginVertical: 20}}>
                            <Image style={{ width: 180, height: 134, borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 8, }} source={ data?.img ? 
                            {uri:data.img}
                            :
                            require('../../../assets/img/ic_main1.png')} />
                            <Text>{data}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}