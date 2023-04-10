import React from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import { BackHeader } from '../../../component/header/BackHeader';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import { colors, fontStyle } from '../../../style/style';
import { FavoriteAddPhone } from './favoriteAddDetail/FavoriteAddPhone';

const FirstRoute = () => (
    <FavoriteAddPhone />
  );
  
const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#fff' }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

export const FavoriteAdd = () => {

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: '연락처 검색' },
        { key: 'second', title: '이전작업 검색' },
    ]);

    return(
        <View style={{flex:1}}>
            <BackHeader title={'즐겨찾기 장비 추가'} />
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
    )
}