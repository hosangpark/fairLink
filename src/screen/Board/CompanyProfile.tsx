import React, {useState} from "react";
import { ScrollView, View, Text, useWindowDimensions } from "react-native";
import { BackHeader } from "../../component/header/BackHeader";
import { colors, fontStyle, styles } from "../../style/style";
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProfileInfoCard } from "../../component/card/ProfileInfoCard";
import { CustomWaveBox } from "../../component/CustomWaveBox";
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
    <View style={{ backgroundColor: colors.WHITE_COLOR, flex: 1}}>
        <Profile />
    </View>
);

const SecondRoute = () => (
    <View style={{ backgroundColor: colors.WHITE_COLOR, flex: 1}}>
        <RequiredDocuments/>
    </View>
);

const ThirdRoute = () => (
    <View style={{ backgroundColor: colors.WHITE_COLOR, flex: 1}}>
        <Device />
    </View>
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
});


export const CompanyProfile = () => {

    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);
    const [routes] = React.useState([
        { key: 'first', title: '프로필' },
        { key: 'second', title: '필수서류' },
        { key: 'third', title: '부속장치' },
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
            <BackHeader title="장비회사 프로필"/>
            <View style={{flex:1}}>
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
                {/* <View style={{flex:1}}> */}
                <TabView
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
                                borderBottomWidth:1,
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
                {/* </View> */}
                <TouchableOpacity onPress={() => alertModalOn('','test')}>
                    <View style={[styles.buttonStyle, {}]}>
                        <Text style={[styles.buttonLabelStyle, fontStyle.f_semibold, ]}>장비회사 선정</Text>
                    </View>
                </TouchableOpacity>
                <AlertModal 
                    show={alertModal.alert}
                    msg={alertModal.msg}
                    action={()=>navigation.navigate('ElectronicContract')} // 서류작성_임대계약페이지 만들어지면 연결
                    hide={alertModalOff}
                    type={alertModal.type}
                />
            </View>
        </SafeAreaView>

    )
}
