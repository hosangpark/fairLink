import React from "react";
import { ScrollView, View, Text, useWindowDimensions } from "react-native";
import { colors, fontStyle, styles } from "../../../style/style";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { AlertClearType } from "../../../modal/modalType";
import { AlertModal, initialAlert } from "../../../modal/AlertModal";
import { BackHeader } from "../../../component/header/BackHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FavoriteSpare } from "./FavoriteSpare";
import { AffiliationFilot } from "./AffiliationFilot";
import { BackHandlerCom } from "../../../component/utils/BackHandlerCom";

const FirstRoute = () => (
    <ScrollView style={{ flex: 1 }}>
        <FavoriteSpare />
    </ScrollView>
);

const SecondRoute = () => (
    <ScrollView style={{ flex: 1 }}>
        <AffiliationFilot />
    </ScrollView>
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

export const FavoriteFilotIndex = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);
    const [routes] = React.useState([
        { key: 'first', title: '즐겨찾기 (스페어) ' },
        { key: 'second', title: '소속 조종사' },
    ]);

    const alertModalOn = ( msg : string, type? : string ) => {
        setAlertModal({
            alert: true,
            strongMsg: '',
            msg: msg ,
            type: 'confirm',
        })
    }

    const alertModalOff = () => {
        setAlertModal(initialAlert)
    }

    return (

        <View style={{flex:1}}>
            <BackHeader title="나의 조종사 관리"/>
            <BackHandlerCom />
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
            {/* <TouchableOpacity onPress={() => alertModalOn('{name} 조종사를 즐겨찾기에서 삭제하시겠습니까?')}>
                <View style={[styles.buttonStyle, {}]}>
                    <Text style={[styles.buttonLabelStyle, fontStyle.f_semibold, ]}>장비회사 선정</Text>
                </View>
            </TouchableOpacity> */}
            <AlertModal 
                show={alertModal.alert}
                msg={alertModal.msg}
                // action={} // 서류작성_임대계약페이지 만들어지면 연결
                hide={alertModalOff}
                type={alertModal.type}
            />
        </View>
    )
}