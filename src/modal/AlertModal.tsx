import React from 'react';
import { AlertModalType } from './modalType';

import Modal from 'react-native-modal';
import { Pressable, Text, View } from 'react-native';

export const initialAlert = { //alertModal 초기 state 값
    alert : false,
    msg : '',
    type :'',
}

export const AlertModal = ({
    show,
    hide,
    msg,
    type,
    title,
    action,
}:AlertModalType) => {

    return(
        <Modal 
            animationIn  ={"slideInUp"}
            animationOut ={"slideOutDown"}
            animationInTiming  = {300}
            animationOutTiming = {300}
            isVisible={show}
            useNativeDriver={true}
            style={[{justifyContent:'center',alignItems:'center',flex:1,flexDirection : 'column', zIndex:999999999}]}
            onRequestClose={() => {                                                                                          
                hide();
                if(action)action();
            }}
        >
            <Pressable style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                // backgroundColor:'transparent',
                // backgroundColor:'black',

                }}
                onPress={hide}
            >
                <View>
                    <Text>hihihihihihihihihihihihihihi</Text>
                </View>
            </Pressable>
        </Modal>
    )
}