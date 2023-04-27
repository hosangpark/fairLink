import React from "react";
import { ScrollView, View, Text, useWindowDimensions } from "react-native";
import { colors, fontStyle, styles } from "../../../style/style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserInfoCard } from "../../../component/card/UserInfoCard";
import { AlertClearType } from "../../../modal/modalType";
import { AlertModal, initialAlert } from "../../../modal/AlertModal";
import { NodataView } from "../../../component/NodataView";

export const FavoriteSpare = () => {
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
    return (
        <View style={{ margin: 20}}>
            <TouchableOpacity style={{ marginBottom: 30}}>
                <View style={[styles.buttonStyle]}>
                    <Text style={[styles.buttonLabelStyle]}>조종사 추가하기</Text>
                </View>
            </TouchableOpacity>
            {
                // 즐겨찾기 등록 전
                <NodataView msg={'즐겨찾기 조종사가 없습니다'}/>
            }

            <View style={{marginBottom:30}}>
                {/* <UserInfoCard 
                    index = '0'
                    jobType = '0'
                    userProfileUrl = ''
                    empName = '힘찬중기'
                    userName = '정우성'
                    score = {5}
                    rating = {41}
                    recEmpCount = {6}
                    location = '[경남] 진주시, 사천시, 창원시'
                    isDelete = {true}
                    action={()=>{}}
                /> */}
            </View>
            <View style={{marginBottom:30}}>
                {/* <UserInfoCard 
                    index = '0'
                    jobType = '0'
                    userProfileUrl = ''
                    empName = '힘찬중기'
                    userName = '정우성'
                    score = {5}
                    rating = {41}
                    recEmpCount = {6}
                    location = '[경남] 진주시, 사천시, 창원시'
                    isDelete = {true}
                    action = {()=>{}}
                /> */}
            </View>
            <AlertModal 
            show={alertModal.alert}
                msg={alertModal.msg}
                // action={}
                hide={alertModalOff}
                type={alertModal.type}
            />
        </View>
    )
}