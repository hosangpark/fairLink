import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle, modalStyle, styles } from '../style/style';
import Modal from 'react-native-modal';
import { useAppSelector } from '../redux/store';
import { usePostMutation, usePostQuery } from '../util/reactQuery';
import { PilotWorkModalType, pilotWorkListItemType } from './modalType';
import { AlertModal, initialAlert } from './AlertModal';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../type/routerType';



export const PilotWorkListModal = ({
    show,
    hide,
    alertModalOn,
    setTabIndex,
} :PilotWorkModalType) => {

    const {mt_idx} = useAppSelector(state => state.userInfo);
    const getPilotWorkListMutaion = usePostMutation('getPilotWorkList','pilot/pilot_work_list.php');
	const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();


    const isFocused = useIsFocused();

    const [pilotWorkList , setPilotWorkList] = React.useState<pilotWorkListItemType[]>([]);


    const getPilotWorkList = async () => {
        const {data,result,msg} = await getPilotWorkListMutaion.mutateAsync({mt_idx:'22'});

        if(result === 'true'){
            if(data.data.length === 0 ){
                hide();
                alertModalOn('작업일보 목록이 존재하지 않습니다.');
            }
            else{
                setPilotWorkList([...data.data]);
            }
        }
        else{
            hide();
            alertModalOn(msg,'')
        }
    }

    // useFocusEffect(()=>{
    //     getPilotWorkList();
    // })

    React.useEffect(()=>{
        if(isFocused && show){
            getPilotWorkList();
        }
    },[isFocused,show])

    React.useEffect(()=>{
        console.log(pilotWorkList);
    },[pilotWorkList])

    return(
        <>
            <Modal 
                animationIn  ={"slideInUp"}
                animationOut ={"slideOutDown"}
                animationInTiming  = {300}
                animationOutTiming = {300}
                isVisible={show}
                useNativeDriver={true}
                onBackButtonPress={hide}
                onBackdropPress={hide}
                style={[{justifyContent:'center',alignItems:'center',flex:1,flexDirection : 'column', zIndex:999999999}]}
            >
                <View style={[modalStyle.modalWrapper,modalStyle.alertModal,{alignItems:'flex-start',maxHeight:'70%'}]}>
                    <View>
                        <Text style={[fontStyle.f_semibold,{fontSize:18,color:colors.FONT_COLOR_BLACK,textAlign:'left'}]}>작업일보 목록</Text>
                    </View>
                    <FlatList
                        style={{width:'100%',zIndex:10,marginTop:20}}
                        renderItem={({item})=>{
                            return(
                                <TouchableOpacity 
                                    style={[styles.border,{padding:15,borderRadius:8,marginBottom:15,flexDirection:'row'}]}
                                    onPress={()=>{
                                        if(setTabIndex)setTabIndex(5);
                                        navigation.navigate('Document',{cdwt_idx:item.cdwt_idx});
                                        hide();
                                    }}
                                >
                                    <Text style={[fontStyle.f_semibold,{fontSize:16, color:colors.FONT_COLOR_BLACK, marginRight:10}]}>{item.date}</Text>
                                    <Text style={[fontStyle.f_regular,{fontSize:16, color:colors.FONT_COLOR_BLACK}]}>{item.crt_name}</Text>
                                </TouchableOpacity>
                            )
                        }} 
                        data={pilotWorkList}
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
        </>
    )
}