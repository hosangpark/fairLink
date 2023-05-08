import React, {useState} from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { BackHeader } from "../../component/header/BackHeader";
import { colors, fontStyle, styles } from "../../style/style";
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProfileInfoCard } from "../../component/card/ProfileInfoCard";
import { useNavigation } from '@react-navigation/native';    
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';

import { SafeAreaView } from "react-native-safe-area-context";
import { AlertModal } from "../../modal/AlertModal";
import { AlertClearType } from "../../modal/modalType";
import { initialAlert } from "../../modal/AlertModal";
import { Profile } from "./companyProfileDetail/Profile";
import { RequiredDocuments } from "./companyProfileDetail/RequiredDocuments";
import { BackHandlerCom } from "../../component/utils/BackHandlerCom";


const FirstRoute = () => (
        // <Profile />
        <>
        </>
);

const SecondRoute = () => (
        // <RequiredDocuments/>
        <>
        </>
);


const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});


export const PilotProfile = () => {

    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [tab, setTab] = useState(0);
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);
    
    
    const alertModalOn = ( msg : string, type? : string ) => {
        setAlertModal({
            alert: true,
            strongMsg: '',
            msg: '장비업체를 선정 하시겠습니까?',
            type:'confirm',
        })
    }

    const alertModalOff = () => {
        setAlertModal(initialAlert)
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <BackHeader title="조종사 프로필"/>
            <BackHandlerCom />
            <ScrollView style={{flex:1}}>
                <ProfileInfoCard
                    index = '0'
                    jobType = '차주 겸 조종사' 
                    userProfileUrl = '' 
                    userName = '정우성' 
                    score = {4.4} 
                    rating = {41} 
                    recEmpCount = {6} 
                    location = '경남 진주시' 
                    age = '42' 
                    gender = '남' 
                    phone = '010-1123-1111'
                    />
                <View style={{ flexDirection:'row', backgroundColor:colors.WHITE_COLOR, justifyContent:'space-around', alignItems: 'center', }}>
                    <View style={tab === 0 ? TabStyle.tabViewOn : TabStyle.tabViewOff }>
                        <TouchableOpacity onPress={() => setTab(0)}>
                            <Text style={[ tab === 0 ? fontStyle.f_semibold && TabStyle.tabTextOn : fontStyle.f_light && TabStyle.tabTextOff]}>프로필</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tab === 1 ? TabStyle.tabViewOn : TabStyle.tabViewOff }>
                        <TouchableOpacity onPress={() => setTab(1)}>
                            <Text style={[ tab === 1 ? fontStyle.f_semibold && TabStyle.tabTextOn : fontStyle.f_light && TabStyle.tabTextOff]}>필수서류</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    tab === 0
                    ? FirstRoute()
                    : SecondRoute()
                }
                <TouchableOpacity onPress={() => alertModalOn('','test')}>
                    <View style={[styles.buttonStyle, {}]}>
                        <Text style={[styles.buttonLabelStyle, fontStyle.f_semibold, ]}>조종사 선택 완료</Text>
                    </View>
                </TouchableOpacity>
                <AlertModal 
                    show={alertModal.alert}
                    msg={alertModal.msg}
                    action={()=>navigation.navigate('ElectronicContract',{cot_idx:cot_idx,cat_idx:cat_idx})} // 서류작성_임대계약페이지 만들어지면 연결
                    hide={alertModalOff}
                    type={alertModal.type}
                />
            </ScrollView>
        </SafeAreaView>

    )
}

const TabStyle = StyleSheet.create({
    tabViewOn : { flex: 1, borderBottomWidth: 3, borderColor: colors.MAIN_COLOR},
    tabViewOff : { flex: 1, borderBottomWidth: 1, borderColor: colors.BORDER_GRAY_COLOR1},
    tabTextOn : { color:colors.FONT_COLOR_BLACK, fontSize: 18,  textAlign: 'center', paddingVertical:10},
    tabTextOff : { color:colors.FONT_COLOR_GRAY, fontSize: 18,  textAlign: 'center', paddingVertical:10},
})