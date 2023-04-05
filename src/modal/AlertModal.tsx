import React from 'react';
import { AlertModalType } from './modalType';

import Modal from 'react-native-modal';
import { Pressable, Text, View } from 'react-native';
import { fontStyle, modalStyle } from '../style/style';
import { CustomButton } from '../component/CustomButton';

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
    btnLabel,
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
                width:'100%',
                justifyContent:'center',
                alignItems:'center',
                // backgroundColor:'transparent',
                // backgroundColor:'black',

                }}
                onPress={hide}
            >
                <View style={[modalStyle.modalWrapper]}>
                    <View style={{marginBottom:20}}>
                        {title &&
                        <Text style={[modalStyle.title,fontStyle.f_bold]}>
                            {title}
                        </Text>
                        }
                        <Text style={[modalStyle.contents,fontStyle.f_medium]}>
                            {msg}
                        </Text>
                    </View>

                    <CustomButton
                        action={()=>{if(action)action(); hide();}}
                        label={btnLabel ? btnLabel : '확인'}
                    />
                </View>
            </Pressable>
        </Modal>
    )
}