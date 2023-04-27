import React from 'react';
import { LoadingModalType } from './modalType';
import {ActivityIndicator, View} from 'react-native'
import Modal from 'react-native-modal'

export const LoadingModal = ({
    isLoading
}:LoadingModalType) => {
    
    return(
        <Modal 
                isVisible={isLoading}
                useNativeDriver={true}
                style={[{justifyContent:'center',alignItems:'center',flex:1,flexDirection : 'column',zIndex:99999}]}
            >
                <View>
                    <ActivityIndicator color="#0085CA" size={'large'} />
                </View>
        </Modal>
    )
}