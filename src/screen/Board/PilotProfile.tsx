import React, {useState} from "react";
import { ScrollView, View, Text, useWindowDimensions } from "react-native";
import { BackHeader } from "../../component/header/BackHeader";
import { colors, fontStyle, styles } from "../../style/style";
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProfileInfoCard } from "../../component/card/ProfileInfoCard";
import { useNavigation } from '@react-navigation/native';    
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';

import { SafeAreaView } from "react-native-safe-area-context";
import { Device } from "./companyProfileDetail/Device";
import { AlertModal } from "../../modal/AlertModal";
import { AlertClearType } from "../../modal/modalType";
import { initialAlert } from "../../modal/AlertModal";
import { Profile } from "./companyProfileDetail/Profile";
import { RequiredDocuments } from "./companyProfileDetail/RequiredDocuments";


const FirstRoute = () => (

        <Profile />

);

const SecondRoute = () => (

        <RequiredDocuments/>

);


const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});


export const PilotProfile = () => {

    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);
    const [routes] = React.useState([
        { key: 'first', title: '프로필' },
        { key: 'second', title: '필수서류' },
    ]);
    
    
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
                {/* <ProfileInfoCard
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
                    /> */}
                <View style={{height:150,backgroundColor:'aqua'}}></View>
            <>
                <TabView
                overScrollMode={'auto'}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            indicatorStyle={{
                                backgroundColor: colors.MAIN_COLOR,
                                height:3,
                            }}
                            style={{
                                backgroundColor: "white",
                                shadowOffset: { height: 0, width: 0 },
                                shadowColor: "transparent",
                                
                            }}
                            tabStyle={{
                                borderColor:colors.BORDER_GRAY_COLOR,
                                borderRightWidth:1,
                                borderTopWidth:1,
                            }}
                            pressColor={"transparent"}
                            renderLabel={({ route, focused }) => (
                                <Text style={[focused ? fontStyle.f_semibold : fontStyle.f_light,{fontSize:18, color: focused ? colors.FONT_COLOR_BLACK : colors.GRAY_COLOR}]}>
                                {route.title}
                                </Text>
                            )}
                        />
                    )}
                />
                <TouchableOpacity onPress={() => alertModalOn('','test')}>
                    <View style={[styles.buttonStyle, {}]}>
                        <Text style={[styles.buttonLabelStyle, fontStyle.f_semibold, ]}>조종사 선택 완료</Text>
                    </View>
                </TouchableOpacity>
                <AlertModal 
                    show={alertModal.alert}
                    msg={alertModal.msg}
                    action={()=>navigation.navigate('ElectronicContract')} // 서류작성_임대계약페이지 만들어지면 연결
                    hide={alertModalOff}
                    type={alertModal.type}
                />
            </>
        </SafeAreaView>

    )
}
