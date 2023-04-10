import React from 'react';
import { AlertModalType, LoginIntroModalType } from './modalType';

import Modal from 'react-native-modal';
import { Pressable, Text, View } from 'react-native';
import { colors, fontStyle, modalStyle } from '../style/style';
import { CustomButton } from '../component/CustomButton';

export const LoginIntroModal = ({ //로그인시 나타나는 intro modal
    show,
    hide,
    action,
}:LoginIntroModalType) => {

    return(
        <Modal 
            animationIn  ={"slideInUp"}
            animationOut ={"slideOutDown"}
            animationInTiming  = {300}
            animationOutTiming = {300}
            isVisible={show}
            useNativeDriver={true}
            style={[{justifyContent:'center',alignItems:'center',flex:1,flexDirection : 'column', zIndex:999999999}]}
            onBackdropPress={()=>{
                if(action){
                    action();
                }
                hide();
            }}
        >
            <View style={[modalStyle.modalWrapper,modalStyle.loginIntroModal]}>
                <View style={{width:'100%'}}>
                    <Text style={[fontStyle.f_bold,{fontSize:24,color:colors.FONT_COLOR_BLACK}]}>안내글</Text>
                </View>
                <View>
                    <Text style={[fontStyle.f_regular,{fontSize:16, color:colors.FONT_COLOR_BLACK,marginTop:20}]}>본 서비스는 ‘중장비 배차 플랫폼’의 정식버전 개발을 위하여 사용자의 편의성 테스트 조사 목적으로 만들어졌습니다.</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:16, color:colors.FONT_COLOR_BLACK,marginTop:20}]}>입력하신 정보는 기업의 판매행위에 사용되거나 제3자에게 제공되지 않으며, 테스트기간 종료 이후 자동 폐기됩니다.</Text>
                </View>
                <CustomButton
                    style={{marginTop:20}}
                    action={()=>{if(action)action(); hide();}}
                    label='확인'
                />
            </View>
        </Modal>
    )
}