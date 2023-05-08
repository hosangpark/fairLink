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
import { BackHandlerCom } from "../../component/utils/BackHandlerCom";
import { MatchingPilotItemType, MatchingPilotType } from "../screenType";
import { usePostMutation, usePostQuery } from "../../util/reactQuery";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toggleLoading } from "../../redux/actions/LoadingAction";
import cusToast from "../../util/toast/CusToast";

export const MatchingPilot = ({route}:MatchingPilotType) => {

    const dispatch = useAppDispatch();
    const {item : reqInfo, selEquip , type} = route.params;

    const {mt_idx} = useAppSelector(state => state.userInfo);
    const [checkItems, setCheckItems] = useState<{id:number; name: string}>();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    const {data : pilotData, isLoading : pilotLoading, isError : pilotError} = usePostQuery('getPilotList',{
        mt_idx : mt_idx,
        cot_idx : reqInfo.cot_idx,
        eit_idx : selEquip.eit_idx,
    },type === 'normal' ? 'equip/equip_order_p_list.php' : 'equip/equip_order_open_like_list.php')

    const insertEquOrderMutation = usePostMutation('insertEquOrder' , 'equip/equip_order_insert.php');
    
    const [pilotList, setPilotList] = React.useState<MatchingPilotItemType[]>([]);

    const handleSingleCheck = (checked:boolean, id:number, name:string) => {
        if (checked) {
            setCheckItems({id, name});
        } else if (checkItems && id === checkItems.id) {
            setCheckItems(undefined);
        }
    };

    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);

    const alertModalOn = ( msg : string, type? : string, strongMsg? : string ) => {
        setAlertModal({
            alert: true,
            strongMsg: strongMsg ? strongMsg : '',
            msg: msg,
            type: type ? type : '' ,
        })
    }

    const alertModalOff = () => {
        setAlertModal(initialAlert)
    }

    const alertAction = () => {
        if(alertModal.type === 'insert_equ_confirm'){
            insertEquOrderHandler();
        }
        else if(alertModal.type === 'insert_success'){
            navigation.navigate('Board');
        }
        // if(alertModal.type === 'confirm_selected_complete'){
        //     alertModalOn('지원되었습니다.')
        // }
        // if(alertModal.type === ''){ 
        //     navigation.navigate('Board')
        // }
    }

    const insertEquOrderHandler = async () => {

        if(checkItems){
            console.log(pilotList[checkItems.id]);
            const params = {
                mt_idx : mt_idx,
                cot_idx : reqInfo.cot_idx,
                eit_idx : selEquip.eit_idx,
                mpt_idx : pilotList[checkItems.id].mpt_idx,
                type : type === 'normal' ? 'Y' : 'N'
            }
            dispatch(toggleLoading(true));
            const {result, msg} = await insertEquOrderMutation.mutateAsync(params);
            dispatch(toggleLoading(false));

            if(result === 'true'){
                alertModalOn('새로운 조종사 지명모집 요청이 접수됐습니다.','insert_success');
            }
            else{
                alertModalOn(msg)
            }
        }        
    }

    React.useEffect(()=>{
        dispatch(toggleLoading(pilotLoading));
        if(pilotError){
            alertModalOn('조종사 목록을 불러오는 도중 오류가 발생했습니다. \n고객센터에 문의해주세요.');
        }
        else{
            if(pilotData){
                const {data,result,msg} = pilotData;
                if(result === 'true'){
                    setPilotList([...data.data]);
                }
                else{
                    alertModalOn(msg)
                }
            }
        }
        

    },[pilotData, pilotLoading,pilotError])
    
    return (
        <>
            <ScrollView>
                <BackHeader title="장비 및 조종사 매칭" />
                <BackHandlerCom />
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
                <View style={{ backgroundColor: colors.WHITE_COLOR}}>
                    <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
                        <Text style={[ fontStyle.f_semibold, { fontSize: 20, color: colors.FONT_COLOR_BLACK, marginBottom: 10}]}>장비 선택</Text>
                        <View
                            style={{ borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 8, marginBottom: 20}}>
                            <SelectedEquipmentCard
                                item={selEquip}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: colors.WHITE_COLOR, marginVertical: 10, paddingBottom: 20}}>
                    <View style={{ marginHorizontal: 20 }}>
                        <View style={{ marginVertical: 20 }}>
                            <Text style={[ fontStyle.f_semibold, { fontSize: 20, color: colors.FONT_COLOR_BLACK}]}>{'조종사 선택'}</Text>
                            {/* <Text style={[ fontStyle.f_semibold, { fontSize: 20, color: colors.FONT_COLOR_BLACK}]}>{'즐겨찾기 조종사 선택'}</Text> 조종사 요청하기 페이지에서 넘어올 때*/}
                        </View>
                        {
                            pilotList.map((data, key) => (
                                <View key={key}
                                    style={{ flexDirection: 'row', alignContent: 'flex-start', borderWidth: 2, borderColor: checkItems && checkItems.id === key ? colors.MAIN_COLOR : colors.BORDER_GRAY_COLOR, borderRadius: 8, marginBottom: 20}}>
                                    <CheckBox
                                        disabled={false}
                                        value={checkItems && checkItems.id === (key) ? true : false}
                                        onValueChange={(e) => handleSingleCheck(e, key, data.name)}
                                        tintColors={{ true: colors.MAIN_COLOR }}
                                        style={{ width: 20, height: 20, marginVertical: 6, top: 1, left: 1, zIndex: 1, position: 'absolute'  }}
                                    />
                                    <PilotInfoCard
                                        item={data}
                                        action={()=>{handleSingleCheck(checkItems?.id !== (key), key, data.name)}}
                                    />
                                </View>
                            ))
                        }
                        
                    </View>
                </View>
                <AlertModal 
                    show={alertModal.alert}
                    msg={alertModal.msg}
                    hide={alertModalOff}
                    type={alertModal.type}
                    action={alertAction}
                    strongMsg={alertModal.strongMsg}
                />
                
            </ScrollView>
            <TouchableOpacity style={{ backgroundColor: colors.WHITE_COLOR }} onPress={() => {
                if(!checkItems){
                    alertModalOn('조종사를 선택해주세요.');
                }
                else{
                    alertModalOn(type === 'normal' ? `조종사와 함께 현장에 지원하시겠습니까?` : '님께 구인요청을 보냅니다.', 'insert_equ_confirm' , `[${checkItems && checkItems.name}]` )
                }                
            }}>
                <View style={[styles.buttonStyle, {bottom: 0, width: '100%', height:58, zIndex: 2,borderRadius:0 }]}>
                    {type === 'normal' ?
                        <Text style={[styles.buttonLabelStyle, fontStyle.f_semibold]}>조종사 선택완료</Text>
                    :
                        <Text style={[styles.buttonLabelStyle, fontStyle.f_semibold]}>즐겨찾기 조종사 구인 요청</Text>
                    }
                </View>
            </TouchableOpacity>
        </>
    )
}