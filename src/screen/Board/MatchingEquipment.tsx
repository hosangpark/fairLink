import React, { useState } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { BackHeader } from "../../component/header/BackHeader";
import { colors, fontStyle, styles } from "../../style/style";
import { PilotInfoCard } from "../../component/card/PilotInfoCard";
import CheckBox from "@react-native-community/checkbox";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AlertClearType } from "../../modal/modalType";
import { AlertModal, initialAlert } from "../../modal/AlertModal";
import { SelectedEquipmentCard } from "../../component/card/SelectedEquipmentCard";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouterNavigatorParams } from "../../../type/routerType";
import { MatchingEquipmentItemType, MatchingEquipmentType } from "../screenType";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { usePostMutation, usePostQuery } from "../../util/reactQuery";
import { toggleLoading } from "../../redux/actions/LoadingAction";
import { BackHandlerCom } from "../../component/utils/BackHandlerCom";

export const MatchingEquipment = ({route}:MatchingEquipmentType) => {

    const dispatch = useAppDispatch();
    const {item : reqInfo} = route.params; //건설회사 요구조건이 담긴 item
    const {mt_idx} = useAppSelector(state => state.userInfo);

    const [selectedItems, setSelectedItems] = useState<number | undefined>(); //선택된 장비 key
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();


    const {data : equipData, isLoading : equipLoading, isError : equipError} = usePostQuery('getEquipList' , {
        mt_idx : mt_idx,
        cot_idx : reqInfo.cot_idx,
        // mt_idx : '22',
        // cot_idx : '16',
    } , 'equip/equip_order_e_list.php');

    const getIsPilotMutation = usePostMutation('getIsPilot','equip/equip_order_p_list.php');

    const [equipList, setEquipList] = React.useState<MatchingEquipmentItemType[]>([]); //장비 리스트

    const handleEquipCheck = (checked:boolean, id:number) => {
        if (checked) {
            setSelectedItems(id);
        } else if ( id === selectedItems) {
            setSelectedItems(undefined);
        }
    };

    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);

    const alertModalOn = ( msg : string, type? : string ) => {
        setAlertModal({
            alert: true,
            strongMsg: '',
            msg: msg,
            type: type ? type : '' ,
        })
    }

    const alertModalOff = () => {
        setAlertModal(initialAlert)
    }
    const alertAction = () => {
        if(alertModal.type === 'goBack'){
            navigation.goBack();
        }
        else if(alertModal.type === 'none_pilot'){
            if(selectedItems || selectedItems === 0){
                console.log(selectedItems);
                navigation.navigate('RequestPilot',{item:reqInfo,selEquip:equipList[selectedItems]});
            }
        }
        else if(alertModal.type === 'next_step'){
            if(selectedItems || selectedItems === 0){
                navigation.navigate('MatchingPilot',{item:reqInfo,selEquip:equipList[selectedItems],type:'normal'})
            }
        }
    }

    const onPressCheck = async () => {

        if(!selectedItems && selectedItems !== 0){
            alertModalOn('장비를 선택해주세요.');
        }
        else{
            dispatch(toggleLoading(true));
            const params = {
                mt_idx : mt_idx,
                cot_idx : reqInfo.cot_idx,
                eit_idx : equipList[selectedItems].eit_idx,
            }
            const {data , result, msg} = await getIsPilotMutation.mutateAsync(params);
            dispatch(toggleLoading(false));

            if(result === 'true'){
                if(data.data.length > 0){
                    alertModalOn('장비선택이 완료되었습니다.\n조종사 선택 페이지로 이동합니다.','next_step');
                }
                else{
                    alertModalOn('보유한 조종사가 없어서 조종사 요청하기 페이지로 이동합니다.','none_pilot');
                }
            }
            else{
                alertModalOn('보유한 조종사가 없어서 조종사 요청하기 페이지로 이동합니다.','none_pilot');
            }
        }

        
        // 보유 조종사가 있을 경우


            // alertModalOn('장비선택이 완료되었습니다. 조종사 선택 페이지로 이동합니다.','next_step')
            // 보유 조종사가 없을 경우
            // alertModalOn('보유한 조종사가 없어서 조종사 요청하기 페이지로 이동합니다.')
    }

    React.useEffect(()=>{
        dispatch(toggleLoading(equipLoading));
        if(equipData){

            if(equipError){
                alertModalOn('장비 목록을 불러오는 동안 오류가 발생했습니다.\n고객센터에 문의해주세요.','goBack');
            }
            else{
                const bodyData = equipData.data;
                console.log({mt_idx : mt_idx,
                    cot_idx : reqInfo.cot_idx,});
                if(equipData.result === 'true'){
                    
                    if(bodyData.data.length === 0){
                        alertModalOn('선택가능한 장비가 존재하지 않습니다.','goBack');
                    }
                    else{
                        setEquipList([...bodyData.data]);
                    }
                }
                else{
                    alertModalOn(equipData.msg,'goBack');
                }
            }
        }
    },[equipData,equipLoading,equipError])
    return (
        <>
            <BackHeader title="장비 및 조종사 매칭" />
            <BackHandlerCom />
            <ScrollView style={{flex:1}}>
                <View style={{ backgroundColor: colors.WHITE_COLOR}}>
                    <View style={{ margin: 20, }}>
                        <Text style={[ fontStyle.f_semibold, { fontSize: 20, color: colors.FONT_COLOR_BLACK}]}>장비 요구조건</Text>
                        <View style={{ marginVertical: 10, padding: 15, backgroundColor: colors.BACKGROUND_COLOR_GRAY1, borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 8}}>
                            <View style={{ flexDirection: 'row', marginBottom: 8}}>
                                <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 1}]}>장비종류</Text>
                                <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 2}]}>{reqInfo.equip_type}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 8}}>
                                <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 1}]}>규격</Text>
                                <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 2}]}>{reqInfo.equip_stand1}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 8}}>
                                <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 1}]}>세부 규격</Text>
                                <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 2}]}>{reqInfo.equip_stand2}</Text>
                            </View>
                            <View style={{ flexDirection: 'row',}}>
                                <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 1}]}>부속장치</Text>
                                <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 2}]}>{reqInfo.sub_text}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: colors.WHITE_COLOR, marginTop: 10,flex:1}}>
                    <View style={{ margin: 20 }}>
                        <Text style={[ fontStyle.f_semibold, { fontSize: 20, color: colors.FONT_COLOR_BLACK, marginBottom: 10}]}>장비 선택</Text>
                        {
                            equipList.map((data, key) => (
                                <TouchableOpacity key={key}
                                    style={{ borderWidth: selectedItems === key ? 2 : 1, borderColor: selectedItems === key ? colors.MAIN_COLOR : colors.BORDER_GRAY_COLOR, borderRadius: 8, marginBottom: 20}}
                                    onPress={()=>{
                                        handleEquipCheck(selectedItems !== key , key)
                                    }}
                                >
                                    <CheckBox 
                                        disabled={false}
                                        value={selectedItems === key ? true : false}
                                        onValueChange={(e) => handleEquipCheck(e, key)}
                                        tintColors={{ true: colors.MAIN_COLOR }}
                                        style={{ width: 20, height: 20, marginVertical: 6, top: 1, left: 1, zIndex: 1, position: 'absolute',}}
                                    />
                                    <SelectedEquipmentCard 
                                        item={data}
                                    />
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
                <AlertModal 
                    show={alertModal.alert}
                    msg={alertModal.msg}
                    hide={alertModalOff}
                    type={alertModal.type}
                    // action={() => navigation.navigate('MatchingFilot')}
                    action={alertAction}
                    
                />
            </ScrollView>
            <TouchableOpacity style={{ backgroundColor: colors.WHITE_COLOR }} onPress={() => onPressCheck()}>
                <View style={[styles.buttonStyle, {bottom: 0, width: '100%', height:58, zIndex: 2,borderRadius:0 }]}>
                    <Text style={[styles.buttonLabelStyle, fontStyle.f_semibold]}>장비 선택완료</Text>
                </View>
                {/* <View style={[styles.buttonStyle, { bottom: 0, width: '100%', zIndex: 2, }]}>
                    <Text style={[styles.buttonLabelStyle, fontStyle.f_semibold]}>즐겨찾기 조종사 구인</Text>
                </View> */}
            </TouchableOpacity>
        </>
    )
}