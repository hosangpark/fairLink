import React from 'react';
import { AlertModalType } from './modalType';

import Modal from 'react-native-modal';
import { Pressable, Text, View } from 'react-native';
import { fontStyle, modalStyle, styles } from '../style/style';
import { CustomButton } from '../component/CustomButton';

export const initialAlert = { //alertModal 초기 state 값
    alert : false,
    strongMsg: '',
    msg : '',
    type :'',
}

export const AlertModal = ({ //알림창
    show,
    hide,
    strongMsg,
    msg,
    type, //type에 confirm 문자가 있으면 confirm창으로
    title,
    action,
    btnLabel,
    cancleAction
}:AlertModalType) => {

    return(
        <Modal 
            animationIn  ={"slideInUp"}
            animationOut ={"slideOutDown"}
            animationInTiming  = {300}
            animationOutTiming = {300}
            isVisible={show}
            useNativeDriver={true}
            onBackButtonPress={()=>{
                if(!type?.includes('confirm')){
                    if(action)action();
                }
                hide();
            }}
            onBackdropPress={()=>{
                if(!type?.includes('confirm')){
                    if(action)action();
                }
                hide();
            }}
            style={[{justifyContent:'center',alignItems:'center',flex:1,flexDirection : 'column', zIndex:999999999}]}
        >
            <View style={[modalStyle.modalWrapper,modalStyle.alertModal]}>
                <View style={{marginBottom:20}}>
                    {title &&
                    <Text style={[modalStyle.title,fontStyle.f_bold,{textAlign:'center',marginBottom:10}]}>
                        {title}
                    </Text>
                    }
                    <Text style={[modalStyle.contents,fontStyle.f_medium,{textAlign:'center'}]}>
                        {strongMsg &&
                        <Text style={fontStyle.f_bold}> {strongMsg} </Text>  // [] 잠시 삭제하겠습니다. strongMsg에 섞어서 넣어주세요.
                        }{msg}
                    </Text>
                </View>
                {type?.includes('confirm') ? 
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <CustomButton
                            style={{flex:1,marginRight:10}}
                            action={()=>{if(action)action(); hide();}}
                            label={btnLabel ? btnLabel : '예'}
                        />
                        <CustomButton
                            action={()=>{if(cancleAction)cancleAction(); hide();}}
                            label={'아니오'}
                            style={{...styles.whiteButtonStyle,flex:1}}
                            labelStyle={styles.whiteButtonLabelStyle}
                        />
                    </View>
                :
                    <CustomButton
                        action={()=>{if(action)action(); hide();}}
                        label={btnLabel ? btnLabel : '확인'}
                    />
                }
            </View>
        </Modal>
    )
}