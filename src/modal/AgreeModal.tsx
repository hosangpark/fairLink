import React from 'react';
import Modal from 'react-native-modal';
import { Pressable, Text, View } from 'react-native';
import { colors, fontStyle, modalStyle } from '../style/style';
import { ScrollView } from 'react-native-gesture-handler';
import { MarginCom } from '../component/MarginCom';
type AgreeModalType = {
    show : boolean,
    hide : ()=>void,
    action? : ()=>void,
    type:string,
}

export const AgreeModal = ({
    show,
    hide,
    action,
    type,
}:AgreeModalType) => {

    const [title, setTitle] = React.useState('');

    React.useEffect(()=>{
        switch(type){
            case '0':
                setTitle('개인정보 수집 및 이용 동의');
            break;
            case '1':
                setTitle('서비스 이용약관 동의');
            break;
            case '2':
                setTitle('개인정보 제3자 제공 동의');
            break;
            case '3':
                setTitle('이벤트 등 프로모션 알림 수신 동의');
            break;
        }
    },[type])

    return(
        <Modal 
                animationIn  ={"slideInUp"}
                animationOut ={"slideOutDown"}
                animationInTiming  = {300}
                animationOutTiming = {300}
                isVisible={show}
                useNativeDriver={true}
                onBackButtonPress={()=>{
                    hide();
                }}
                onBackdropPress={()=>{
                    hide();
                }}
                style={[{justifyContent:'center',alignItems:'center',flex:1,flexDirection : 'column', zIndex:999999999}]}
            >
                <View style={[modalStyle.modalWrapper,modalStyle.alertModal]}>
                    <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.FONT_COLOR_BLACK,textAlign:'left'}]}>{title}</Text>
                    <MarginCom mt={20} />
                    <ScrollView style={{maxHeight:400,width:'100%'}}>
                        <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>{title}</Text>
                    </ScrollView>
                </View>
        </Modal>
    )
}