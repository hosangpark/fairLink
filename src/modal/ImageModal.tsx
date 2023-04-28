import React from 'react';
import { ImageModalType } from './modalType';
import {ActivityIndicator, View,TouchableOpacity,Image} from 'react-native'
import Modal from 'react-native-modal'
import { colors } from '../style/style';

export const ImageModal = ({
    show,
    action,
    hide,
    imgrl
}:ImageModalType) => {
    return(
        <Modal 
            isVisible={show}
            style={[{justifyContent:'center',alignItems:'center',flex:1, zIndex:999999999}]}
            onBackdropPress={()=>{
                if(action){
                    action();
                }
                hide();
            }}
            >
        <TouchableOpacity style={{position:'absolute',width:'100%',height:'100%',backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}
            onPress={()=>hide()}
        >
            <Image style={{position:'absolute',right:30,top:30}} source={require('../assets/img/ic_x.png')}/>
            <Image resizeMode={'contain'} style={{width:'100%',height:'100%',zIndex:999}} source={{uri:imgrl}}/>
        </TouchableOpacity>
        </Modal>
    )
}