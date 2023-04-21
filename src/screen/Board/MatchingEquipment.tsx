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

export const MatchingEquipment = () => {
    const [selectedItems, setSelectedItems] = useState<number>();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    const data = [
        {
            equipType : '굴착기',
            size : '6W',
            side : '브레이커',
        }
    ]

    const seletedEquip = [
        {id: 0, equipNumb : '경기 12머6040', year : 2020, sideEquip : '브레이커, 채바가지'},
        {id: 1, equipNumb : '경기 12머6040', year : 2020, sideEquip : '브레이커, 채바가지'},
    ]

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

    const onPressCheck = () => {
            // 보유 조종사가 있을 경우
            alertModalOn('장비선택이 완료되었습니다. 조종사 선택 페이지로 이동합니다.')
            // 보유 조종사가 없을 경우
            // alertModalOn('보유한 조종사가 없어서 조종사 요청하기 페이지로 이동합니다.')
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
                <View style={{ backgroundColor: colors.WHITE_COLOR, marginTop: 10}}>
                    <View style={{ margin: 20 }}>
                        <Text style={[ fontStyle.f_semibold, { fontSize: 20, color: colors.FONT_COLOR_BLACK, marginBottom: 10}]}>장비 선택</Text>
                        {
                            seletedEquip.map((data, key) => (
                                <View key={key}
                                    style={{ borderWidth: selectedItems === (data.id) ? 2 : 1, borderColor: selectedItems === (data.id) ? colors.MAIN_COLOR : colors.BORDER_GRAY_COLOR, borderRadius: 8, marginBottom: 20}}>
                                    <CheckBox 
                                        disabled={false}
                                        value={selectedItems === (data.id) ? true : false}
                                        onValueChange={(e) => handleEquipCheck(e, data.id)}
                                        tintColors={{ true: colors.MAIN_COLOR }}
                                        style={{ width: 20, height: 20, marginVertical: 6, top: 1, left: 1, zIndex: 1, position: 'absolute',}}
                                    />
                                    <SelectedEquipmentCard 
                                        equipNumb={data.equipNumb}
                                        year={data.year}
                                        sideEquip={data.sideEquip}
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
                    action={() => navigation.navigate('MatchingFilot')}
                    
                />
            </ScrollView>
            <TouchableOpacity style={{ backgroundColor: colors.WHITE_COLOR }} onPress={() => onPressCheck()}>
                <View style={[styles.buttonStyle, { /* position: 'absolute',  */bottom: 0, width: '100%', zIndex: 2, }]}>
                    <Text style={[styles.buttonLabelStyle, fontStyle.f_semibold]}>장비 선택완료</Text>
                </View>
                {/* <View style={[styles.buttonStyle, { bottom: 0, width: '100%', zIndex: 2, }]}>
                    <Text style={[styles.buttonLabelStyle, fontStyle.f_semibold]}>즐겨찾기 조종사 구인</Text>
                </View> */}
            </TouchableOpacity>
        </>
    )
}