import React from 'react';

import Modal from 'react-native-modal';
import {Pressable,View,Text,TouchableOpacity,Image} from 'react-native';
import { RecCardType, RecEmpModalType } from './modalType';
import { colors, fontStyle, styles } from '../style/style';
import { FlatList } from 'react-native-gesture-handler';


const RecCard = ({item}:RecCardType) => { //추천기업 card
    return(
        <View style={[styles.border,{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:8,padding:15,marginBottom:20}]}>
            <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>{item.company}</Text>

            <Text style={[fontStyle.f_light,{fontSize:16 , color:colors.MAIN_COLOR}]}>총 {item.totalCount}회 / 총 {item.totalDay}일</Text>

            <Text style={[fontStyle.f_semibold,{fontSize:16, color:colors.FONT_COLOR_BLACK,marginTop:10}]}>한줄평</Text>
            <Text style={[fontStyle.f_regular,{fontSize:16, color:colors.FONT_COLOR_BLACK,marginTop:3}]}>{item.comment}</Text>
        </View>
    )
}

export const RecEmpModal = ({ //추천기업 리스트 modal
    show,
    hide,
    action,
}:RecEmpModalType) =>{

    const tempInfoList = [
        {
            id:'1',
            company : 'DL E&C',
            totalCount : '6',
            totalDay : '27',
            comment : '터파기 작업을 안전하게 잘 해주셨습니다.'
        },
        {
            id:'2',
            company : '한화건설주식회사',
            totalCount : '3',
            totalDay : '60',
            comment : '흙막이 작업을 안전하게 잘 해주셨습니다.'
        },
        {
            id:'3',
            company : '삼성물산',
            totalCount : '3',
            totalDay : '60',
            comment : '흙막이 작업을 안전하게 잘 해주셨습니다.'
        },
        {
            id:'4',
            company : '두산',
            totalCount : '3',
            totalDay : '60',
            comment : '흙막이 작업을 안전하게 잘 해주셨습니다.'
        }
    ]

    return(
        <Modal 
                animationIn  ={"slideInRight"}
                animationOut ={"slideOutRight"}
                animationInTiming  = {300}
                animationOutTiming = {300}
                isVisible={show}
                useNativeDriver={true}
                onBackdropPress={hide}
                style={[{margin:0,justifyContent:'center',alignItems:'center',flex:1,flexDirection : 'column', zIndex:999999999,backgroundColor:'transparent'}]}
        >
                <View style={{flex:1,width:'90%',height:'100%',position:'absolute',top:0,right:0,backgroundColor:colors.WHITE_COLOR,borderTopLeftRadius:20,padding:20}}>
                    <TouchableOpacity style={{width:30,height:30,justifyContent:'center',alignItems:'flex-start'}} onPress={hide}>
                        <Image source={require('../assets/img/ic_x.png')} style={{width:13.5, height:13.5}}/>
                    </TouchableOpacity>

                    <View style={{marginTop:10}}>
                        <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>추천기업 현황</Text>

                        <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginTop:8}]}>총 <Text style={{color:colors.MAIN_COLOR}}>{tempInfoList.length}</Text>개 업체가 추천을 해주셨어요!</Text>
                    </View>

                    <FlatList
                        style={{width:'100%',zIndex:10,marginTop:20}}
                        renderItem={RecCard} 
                        data={tempInfoList}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
        </Modal>
    )
}