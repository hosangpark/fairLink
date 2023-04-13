import React from 'react';
import { View, Text, Image} from 'react-native';
import { colors } from '../../../style/style';

export const Device = () => {

    const deviceData = [
        { img: require('../../../assets/img/ic_main1.png'), name: '채바가지'}, // 임시 이미지
        { img: require('../../../assets/img/ic_main1.png'), name: '집게'},
        { img: require('../../../assets/img/ic_main1.png'), name: '브레이커'},
        { img: require('../../../assets/img/ic_main1.png'), name: '지게발'},
    ] 

    return (
        <View style={{ padding: 20,}}>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
                {
                    deviceData.map((data, i) => (
                        <View key={i} style={{ alignItems:'center', marginVertical: 20}}>
                            <Image style={{ width: 180, height: 134, borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 8, }} source={ data.img } />
                            <Text>{data.name}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}