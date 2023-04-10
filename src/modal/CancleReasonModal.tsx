import React from 'react';
import { CancleReasonModalType } from './modalType';

import {View, Text} from 'react-native';

import Modal from 'react-native-modal';
import { colors, fontStyle, modalStyle, styles } from '../style/style';
import { TextInput } from 'react-native-gesture-handler';
import { CustomButton } from '../component/CustomButton';

export const CancleReasonModal = ({
    show,
    hide,
    action,
}:CancleReasonModalType) => {

    const [reason, setReason] = React.useState('');


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
                hide();
            }}
        >
            <View style={[modalStyle.modalWrapper,modalStyle.loginIntroModal]}>
                <Text style={[fontStyle.f_semibold,{fontSize:18,color:colors.FONT_COLOR_BLACK}]}>반려사유를 입력해주세요.</Text>

                <TextInput
                    value={reason}
                    onChangeText={(e)=>{setReason(e)}}
                    style={[fontStyle.f_regular,styles.border,{height:120,width:'100%',marginTop:10,borderRadius:4,alignSelf:'flex-start',fontSize:16,color:colors.FONT_COLOR_BLACK,textAlignVertical:'top',padding:10,}]}
                    placeholderTextColor={colors.GRAY_COLOR}
                    placeholder='반려사유 선택'
                />
                <CustomButton 
                    style={{marginTop:20}}
                    label='완료'
                    action={()=>{action(reason)}}
                />
            </View>
        </Modal>
    )
}