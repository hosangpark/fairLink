import React, {useState} from "react";
import { ScrollView, View, Text, useWindowDimensions } from "react-native";
import { BackHeader } from "../../component/header/BackHeader";
import { colors, fontStyle, styles } from "../../style/style";
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProfileInfoCard } from "../../component/card/ProfileInfoCard";
import { CustomWaveBox } from "../../component/CustomWaveBox";
import { Profile } from "./companyProfileDetail/Profile";
import { SafeAreaView } from "react-native-safe-area-context";
import { RequiredDocuments } from "./companyProfileDetail/RequiredDocuments";

const FirstRoute = () => (
    <Profile />
);

const SecondRoute = () => (
    <RequiredDocuments />
);

const ThirdRoute = () => (
    <View></View>
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
});


export const CompanyProfile = () => {

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: '프로필' },
        { key: 'second', title: '필수서류' },
        { key: 'third', title: '부속장치' },
    ]);

    return (
        <SafeAreaView style={{flex:1}}>
            <BackHeader title="장비회사 프로필"/>
            <View style={{flex:1}}>
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
            </View>
        </SafeAreaView>

    )
}