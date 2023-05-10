import React from "react";
import { ScrollView, View, Text } from "react-native";
import { BackHeader } from "../../component/header/BackHeader";
import { colors, fontStyle } from "../../style/style";
import { UserInfoCard } from "../../component/card/UserInfoCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouterNavigatorParams } from "../../../type/routerType";

export const OpenRequest = () => {
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    return (
        <ScrollView>
            <BackHeader title="지원자 현황" />
            <View style={{ backgroundColor: colors.MAIN_COLOR, padding: 20,}}>
                <Text style={[ fontStyle.f_bold, { color: colors.WHITE_COLOR, fontSize: 20}]}>본사 사옥 신축공사</Text>
                <View style={{ marginVertical: 10}}>
                    <Text style={[ fontStyle.f_semibold, { color: colors.WHITE_COLOR, fontSize: 16}]}>요구 장비</Text>
                    <Text style={[ fontStyle.f_regular, { color: colors.WHITE_COLOR, fontSize: 16}]}>굴착기 03W / 2015년식+ / 브레이커</Text>
                </View>
                <View style={{ marginVertical: 10}}>
                    <Text style={[ fontStyle.f_semibold, { color: colors.WHITE_COLOR, fontSize: 16}]}>작업일시</Text>
                    <Text style={[ fontStyle.f_regular, { color: colors.WHITE_COLOR, fontSize: 16}]}>2023.03.14 08:00 ~ 17:00</Text>
                </View>
            </View>
            <View style={{ margin: 20 }}>
                <View style={{ marginBottom: 25 }}>
                    <Text style={[ fontStyle.f_semibold, {fontSize: 18, color: colors.FONT_COLOR_BLACK}]}>현재까지 지원자 <Text style={{ color: colors.MAIN_COLOR}}>4</Text>명</Text>
                </View>
                <View style={{ marginVertical: 15 }}>                
                    {/* <UserInfoCard 
                        index="1"
                        empName='힘찬중기'
                        jobType='1'
                        location='[경남]'
                        rating={23}
                        score={5}
                        recEmpCount={64}
                        userName='김경태'
                        userProfileUrl=''
                        isDelete={false}
                        action={()=>{}}
                    /> */}
                </View>
            </View>
        </ScrollView>
    )
}