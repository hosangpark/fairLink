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
            onBackButtonPress={()=>{
                hide();
            }}
            animationIn  ={"fadeIn"}
            animationOut ={"fadeOut"}
            animationInTiming  = {100}
            animationOutTiming = {100}
            useNativeDriver={true}
            style={[{margin:0,justifyContent:'center',alignItems:'center',flex:1,flexDirection : 'column', zIndex:9999,backgroundColor:'transparent'}]}
            >
            <TouchableOpacity style={{position:'absolute',width:'100%',height:'100%',top:0,left:0,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}
                onPress={()=>hide()}
            >
                <Image style={{position:'absolute',right:30,top:30}} source={require('../assets/img/ic_x.png')}/>
                <Image resizeMode={'contain'} style={{width:'100%',height:'100%',zIndex:999}} source={{uri:imgrl}}/>
            </TouchableOpacity>
        </Modal>
    )
}