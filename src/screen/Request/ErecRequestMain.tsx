import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle } from '../../style/style';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { RequestRouterNavigatorParams } from '../../../type/RequestRouterType';
import { BackHeader } from '../../component/header/BackHeader';
import { BackHandlerCom } from '../../component/utils/BackHandlerCom';

export const ErecRequstMain = () =>{

	const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams & RequestRouterNavigatorParams>>();



    return(
        <View style={{flex:1}}>
            <BackHeader title="현장지원" />
            <BackHandlerCom />
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:'100%'}}>
                <TouchableOpacity style={{backgroundColor:colors.WHITE_COLOR,borderRadius:8,paddingVertical:20,paddingHorizontal:30, justifyContent:'center'}}
                onPress={()=>{
                    navigation.navigate('RequestRouter',{
                        screen : 'PublicReqStep1'
                    });
                }}
                >
                    <Image source={require('../../assets/img/ic_op1.png')} style={{width:83,height:80}}/>
                    <Text style={[fontStyle.k_bold,{fontSize:18,color:colors.ORANGE_COLOR,textAlign:'center',marginTop:10}]}>공개배차</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:colors.WHITE_COLOR,borderRadius:8,paddingVertical:20,paddingHorizontal:30, justifyContent:'center'}}
                onPress={()=>{
                    navigation.navigate('RequestRouter',{
                        screen : 'AcquaintanceRequestTest'
                    })
                }}
                >
                    <Image source={require('../../assets/img/ic_op2.png')} style={{width:83,height:80}}/>
                    <Text style={[fontStyle.k_bold,{fontSize:18,color:colors.BLUE_COLOR,textAlign:'center',marginTop:10}]}>지인배차</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}