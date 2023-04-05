import React from 'react';

import { Text } from 'react-native';
import { View } from 'react-native';


export const toastConfig = {
    'custom_type': (internalState) => {
        return ( //출력되는 토스트 레이아웃 설정  키값은 자유로(CusToast에서 호출)
            <View style={{ width: '100%',bottom:0,backgroundColor: '#000', borderRadius: 0, paddingHorizontal: 16, paddingVertical: 17,opacity:0.9,zIndex:999}}>
                <Text style={{textAlign: 'center', color: '#fff', fontSize:13.5,opacity:1}}>{internalState.text1.message}</Text>
            </View>
         )
    }
}