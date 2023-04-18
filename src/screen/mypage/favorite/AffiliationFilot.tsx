import React from "react";
import { ScrollView, View, Text, useWindowDimensions } from "react-native";
import { colors, fontStyle, styles } from "../../../style/style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserInfoCard } from "../../../component/card/UserInfoCard";

export const AffiliationFilot = () => {

    return (
        <View style={{ margin: 20}}>
            <TouchableOpacity style={{ marginBottom: 30}}>
                <View style={[styles.buttonStyle]}>
                    <Text style={[styles.buttonLabelStyle]}>조종사 추가하기</Text>
                </View>
            </TouchableOpacity>
            <View>
                <UserInfoCard 
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
                />
            </View>
            <View>
                <UserInfoCard 
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
                />
            </View>
        </View>
    )
}