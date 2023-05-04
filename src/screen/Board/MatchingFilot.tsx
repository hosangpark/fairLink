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

export const MatchingFilot = () => {
    const [checkItems, setCheckItems] = useState<{id:number; name: string}>();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    const data = [
        {
            equipType : '굴착기',
            size : '6W',
            side : '브레이커',
        }
    ]
    
    const pilotData = [
        {id : 0, index : '0', userName : '홍길동', age : 35, career : 8, phone : '010-1234-5678', score : 4.8, recommendation : 5},
        {id : 1, index : '1', userName : '홍길동2', age : 35, career : 8, phone : '010-1234-5678', score : 4.8, recommendation : 5},
        {id : 2, index : '2', userName : '홍길동3', age : 35, career : 8, phone : '010-1234-5678', score : 4.8, recommendation : 5},
    ]

    const handleSingleCheck = (checked:boolean, id:number, name:string) => {
        if (checked) {
            setCheckItems({id, name});
        } else if (checkItems && id === checkItems.id) {
            setCheckItems(undefined);
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
        console.log(alertModal.type)

        if(alertModal.type === 'confirm_selected_complete'){
            alertModalOn('지원되었습니다.')
        }
        if(alertModal.type === ''){ 
            navigation.navigate('Board')
            }
    }
    
    return (
        <>
            <ScrollView>
                <BackHeader title="장비 및 조종사 매칭" />
                <View style={{ backgroundColor: colors.WHITE_COLOR}}>
                    <View style={{ margin: 20, }}>
                        <Text style={[ fontStyle.f_semibold, { fontSize: 20, color: colors.FONT_COLOR_BLACK}]}>장비 요구조건</Text>
                        <View style={{ marginVertical: 10, padding: 15, backgroundColor: colors.BACKGROUND_COLOR_GRAY1, borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 8}}>
                            <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 1}]}>장비종류</Text>
                                <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 2}]}>{data[0].equipType}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 1}]}>규격</Text>
                                <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 2}]}>{data[0].size}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 1}]}>부속장치</Text>
                                <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 2}]}>{data[0].side}</Text>
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
                                equipNumb="경기 12머6040"
                                year={2022}
                                sideEquip="브레이커, 채바가지"
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
                            pilotData.map((data, key) => (
                                <View key={key}
                                    style={{ flexDirection: 'row', alignContent: 'flex-start', borderWidth: checkItems && checkItems.id === (data.id) ? 2 : 1, borderColor: checkItems && checkItems.id === (data.id) ? colors.MAIN_COLOR : colors.BORDER_GRAY_COLOR, borderRadius: 8, marginBottom: 20}}>
                                    <CheckBox
                                        disabled={false}
                                        value={checkItems && checkItems.id === (data.id) ? true : false}
                                        onValueChange={(e) => handleSingleCheck(e, data.id, data.userName)}
                                        tintColors={{ true: colors.MAIN_COLOR }}
                                        style={{ width: 20, height: 20, marginVertical: 6, top: 1, left: 1, zIndex: 1, position: 'absolute'  }}
                                    />
                                    <PilotInfoCard
                                        index={data.index}
                                        userName={data.userName}
                                        age={data.age}
                                        career={data.career}
                                        phone={data.phone}
                                        score={data.score}
                                        recommendation={data.recommendation}
                                        editable={false}
                                        placeholderTextColor=""
                                        action={()=>{}}
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
                />
                
            </ScrollView>
            <TouchableOpacity style={{ backgroundColor: colors.WHITE_COLOR }} onPress={() => alertModalOn(`${checkItems && checkItems.name}조종사와 함께 현장에 지원하시겠습니까?`, 'confirm_selected_complete' )}>
                <View style={[styles.buttonStyle, { /* position: 'absolute',  */bottom: 0, width: '100%', zIndex: 2, }]}>
                    <Text style={[styles.buttonLabelStyle, fontStyle.f_semibold]}>장비 선택완료</Text>
                    {/* <Text style={[styles.buttonLabelStyle, fontStyle.f_semibold]}>즐겨찾기 조종사 구인 요청</Text> 조종사 요청하기 페이지에서 넘어올 때*/}
                </View>
            </TouchableOpacity>
        </>
    )
}