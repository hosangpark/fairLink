import React from 'react';
import Modal from 'react-native-modal';
import {Pressable,View,Text,TouchableOpacity,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ReqDispatchModalType } from './modalType';
import { colors, fontStyle } from '../style/style';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../type/routerType';


export const ReqDispatchModal = ({ //배차 요청 선택 modal
    show,
    hide,
    action,
}:ReqDispatchModalType) => {

	const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

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
                <View style={{flex:1,position:'absolute',top:0,left:0}}>
                    <View style={{flexDirection:'row',justifyContent:'flex-end',width:'100%'}} >
                        <TouchableOpacity style={{width:40,height:40,alignItems:'center',justifyContent:'center'}} onPress={hide}>
                            <Image source={require('../assets/img/ic_x_w.png')} style={{width:20,height:20}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:'100%'}}>
                    <TouchableOpacity style={{backgroundColor:colors.WHITE_COLOR,borderRadius:8,paddingVertical:20,paddingHorizontal:30, justifyContent:'center'}}
                    onPress={()=>{navigation.navigate('OpenRequest'),hide();}}
                    >
                        <Image source={require('../assets/img/ic_op1.png')} style={{width:83,height:80}}/>
                        <Text style={[fontStyle.k_bold,{fontSize:18,color:colors.ORANGE_COLOR,textAlign:'center',marginTop:10}]}>공개배차</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:colors.WHITE_COLOR,borderRadius:8,paddingVertical:20,paddingHorizontal:30, justifyContent:'center'}}
                    onPress={()=>{navigation.navigate('AcquaintanceRequest'),hide();}}
                    >
                        <Image source={require('../assets/img/ic_op2.png')} style={{width:83,height:80}}/>
                        <Text style={[fontStyle.k_bold,{fontSize:18,color:colors.BLUE_COLOR,textAlign:'center',marginTop:10}]}>지인배차</Text>
                    </TouchableOpacity>
                </View>
        </Modal>
    )   
}