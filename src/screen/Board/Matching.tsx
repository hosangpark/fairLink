import React, { useState } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { BackHeader } from "../../component/header/BackHeader";
import { colors, fontStyle, styles } from "../../style/style";
import { ProfileInfoCard } from "../../component/card/ProfileInfoCard";
import { UserInfoCard } from "../../component/card/UserInfoCard";
import { PilotInfoCard } from "../../component/card/PilotInfoCard";
import CheckBox from "@react-native-community/checkbox";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AlertClearType } from "../../modal/modalType";
import { AlertModal, initialAlert } from "../../modal/AlertModal";

export const Matching = () => {
    const [checkItems, setCheckItems] = useState<number>();

    const data = [
        {
            equipType : '굴착기',
            size : '6W',
            side : '브레이커',
        }
    ]

    const seletedEquip = [
        {numb : '경기 12머6040', date : '2020년', sideSeleted : '브레이커, 채바가지'},
        {numb : '경기 12머6040', date : '2020년', sideSeleted : '브레이커, 채바가지'},
    ]

    const pilotData = [
        {id : 0, index : '0', userName : '홍길동', age : 35, career : 8, phone : '010-1234-5678', score : 4.8, recommendation : 5},
        {id : 1, index : '1', userName : '홍길동', age : 35, career : 8, phone : '010-1234-5678', score : 4.8, recommendation : 5},
        {id : 2, index : '2', userName : '홍길동', age : 35, career : 8, phone : '010-1234-5678', score : 4.8, recommendation : 5},
    ]

    const handleSingleCheck = (checked:boolean, id:number) => {
        if (checked) {
            setCheckItems(id);
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
        if (pilotData.length > 0) {
            alertModalOn('장비선택이 완료되었습니다. 조종사 선택 페이지로 이동합니다.', ) // 페이지 연결하기
        } else {
            alertModalOn('보유한 조종사가 없어서 조종사 요청하기 페이지로 이동합니다.') // 페이지 연결하기
        }

    }

    return (
        <>
            <ScrollView style={{ backgroundColor: colors.WHITE_COLOR }}>
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
                    <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
                        <Text style={[ fontStyle.f_semibold, { fontSize: 20, color: colors.FONT_COLOR_BLACK}]}>장비 선택</Text>
                        <View style={{ flexDirection: 'row', marginVertical: 10, borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 8}}>
                            <View style={{ width: 130, height: 130, justifyContent: 'center', /* alignItems: 'center' */}}>
                                <Image style={{ width: '100%', height: '100%', backgroundColor: colors.BACKGROUND_COLOR_GRAY1, alignSelf: 'center', margin:0 }} /* source={ require('../../assets/img/ic_main1.png')} */ />
                            </View>
                            <View style={{ flex: 2, margin: 15}}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                                    <Text style={[ fontStyle.f_medium, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>차량번호</Text>
                                    <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK2}]}>{seletedEquip[0].numb}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                                    <Text style={[ fontStyle.f_medium, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>제작연도</Text>
                                    <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK2}]}>{seletedEquip[0].date}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                                    <Text style={[ fontStyle.f_medium, { fontSize: 16, color: colors.FONT_COLOR_BLACK}]}>부속장치</Text>
                                    <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK2}]}>{seletedEquip[0].sideSeleted}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: colors.WHITE_COLOR, marginVertical: 10, paddingBottom: 20}}>
                    <View style={{ marginHorizontal: 20 }}>
                        <View style={{ marginVertical: 20 }}>
                            <Text style={[ fontStyle.f_semibold, { fontSize: 20, color: colors.FONT_COLOR_BLACK}]}>즐겨찾기 조종사 선택</Text>
                        </View>
                        {
                            pilotData.map((data, key) => (
                                <View key={key}
                                    style={{ flexDirection: 'row', alignContent: 'flex-start', borderWidth: checkItems === (data.id) ? 2 : 1, borderColor: checkItems === (data.id) ? colors.MAIN_COLOR : colors.BORDER_GRAY_COLOR, borderRadius: 8, marginBottom: 20}}>
                                    <CheckBox
                                        disabled={false}
                                        value={checkItems === (data.id) ? true : false}
                                        onValueChange={(e) => handleSingleCheck(e, data.id)}
                                        tintColors={{ true: colors.MAIN_COLOR }}
                                        style={{ width: 20, height: 20, marginVertical: 6 }}
                                    />
                                    <PilotInfoCard
                                        index='0'
                                        userName="홍길동"
                                        age={35}
                                        career={8}
                                        phone="010-1234-5678"
                                        score={4.8}
                                        recommendation={5}
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
                />
            </ScrollView>
            <TouchableOpacity style={{ backgroundColor: colors.WHITE_COLOR }} onPress={() => onPressCheck()}>
                <View style={[styles.buttonStyle, { /* position: 'absolute',  */bottom: 0, width: '100%', zIndex: 2, }]}>
                    <Text style={[styles.buttonLabelStyle, fontStyle.f_semibold]}>즐겨찾기 조종사 구인</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}