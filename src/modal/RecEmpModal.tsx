import React from 'react';

import Modal from 'react-native-modal';
import {Pressable,View,Text,TouchableOpacity,Image} from 'react-native';
import { RecCardType, RecEmpItemType, RecEmpModalType } from './modalType';
import { colors, fontStyle, styles } from '../style/style';
import { FlatList } from 'react-native-gesture-handler';
import { usePostMutation, usePostQuery } from '../util/reactQuery';
import { useAppDispatch } from '../redux/store';
import { toggleLoading } from '../redux/actions/LoadingAction';
import { useIsFetching } from 'react-query';
import { useIsFocused } from '@react-navigation/native';
import { initialAlert } from './AlertModal';



const RecCard = ({item}:RecCardType) => { //추천기업 card
    return(
        <View style={[styles.border,{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:8,padding:15,marginBottom:20}]}>
            <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>{item.company_name}</Text>

            <Text style={[fontStyle.f_light,{fontSize:16 , color:colors.MAIN_COLOR}]}>총 {item.count}회 / 총 {item.days}일</Text>

            <Text style={[fontStyle.f_semibold,{fontSize:16, color:colors.FONT_COLOR_BLACK,marginTop:10}]}>한줄평</Text>
            <Text style={[fontStyle.f_regular,{fontSize:16, color:colors.FONT_COLOR_BLACK,marginTop:3}]}>{item.content}</Text>
        </View>
    )
}

export const RecEmpModal = ({ //추천기업 리스트 modal
    show,
    hide,
    action,
    mpt_idx, //선택한 회원 idx
}:RecEmpModalType) =>{
    const dispatch = useAppDispatch();
    const isFocused = useIsFocused();
    // const {data : recEmpData, isLoading : recEmpLoading, isError : recEmpError} = usePostQuery('getRecEmp',{mpt_idx:mpt_idx},'equip/pilot_profile_good_list.php');
    const getRecEmpListMutation = usePostMutation('getRecEmpList','equip/pilot_profile_good_list.php');
    const [recEmpList, setRecEmpList] = React.useState<RecEmpItemType[]>([]); //추천기업 현황

    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

    const alertModalOff = ()=>{setAlertModal(()=>initialAlert)}

    const alertModalOn = (msg:string, type?:string) => {
        setAlertModal({
            ...alertModal,
            alert:true,
            msg:msg,
            type:type ? type : ''
        })
    }
    const alertAction = () => {
        alertModalOff();
        if(alertModal.type === 'error'){
            hide();
        }

    }

    async function getRecEmpList(){
        const {data,result,msg} = await getRecEmpListMutation.mutateAsync({
            mpt_idx : mpt_idx,
        })
        if(result === 'true'){
            const bodyData = data.data;
            setRecEmpList([...bodyData]);
        }
        else{
            alertModalOn(msg,'error');
        }
    }

    React.useEffect(()=>{
        if(isFocused){
            getRecEmpList();
        }
    },[isFocused])
    
    // React.useEffect(()=>{
    //     if(isFocused){
    //         dispatch(toggleLoading(recEmpLoading));
    //         if(recEmpData){
    //             if(recEmpData.result === 'true'){
    //                 const bodyData = recEmpData.data.data;
    //                 setRecEmpList([...bodyData]);
    //             }
    //             else{
    //                 alertModalOn(recEmpData.msg,'error');
    //             }
    //         }
    //     }
    // },[recEmpData, recEmpLoading,recEmpError])

    return(
        <Modal 
                animationIn  ={"slideInRight"}
                animationOut ={"slideOutRight"}
                animationInTiming  = {300}
                animationOutTiming = {300}
                isVisible={show}
                useNativeDriver={true}
                onBackdropPress={hide}
                style={[{margin:0,justifyContent:'center',alignItems:'center',flex:1,flexDirection : 'column', zIndex:9999,backgroundColor:'transparent'}]}
        >
                <View style={{flex:1,width:'90%',height:'100%',position:'absolute',top:0,right:0,backgroundColor:colors.WHITE_COLOR,borderTopLeftRadius:20,padding:20}}>
                    <TouchableOpacity style={{width:30,height:30,justifyContent:'center',alignItems:'flex-start'}} onPress={hide}>
                        <Image source={require('../assets/img/ic_x.png')} style={{width:13.5, height:13.5}}/>
                    </TouchableOpacity>
                    <View style={{marginTop:10}}>
                        <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>추천기업 현황</Text>
                        {recEmpList.length > 0 &&
                            <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginTop:8}]}>총 <Text style={{color:colors.MAIN_COLOR}}>{recEmpList.length}</Text>개 업체가 추천을 해주셨어요!</Text>
                        }
                    </View>
                    <FlatList
                        style={{width:'100%',zIndex:10,marginTop:20}}
                        renderItem={RecCard} 
                        data={recEmpList}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={()=>{
                            return(
                                <View>
                                    <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>추천기업 목록이 존재하지 않습니다.</Text>
                                </View>
                            )
                        }}
                    />
                </View>
        </Modal>
    )
}