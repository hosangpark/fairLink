import React from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import { BackHeader } from '../../../component/header/BackHeader';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import { colors, fontStyle } from '../../../style/style';
import { FavoriteAddPhone } from './favoriteAddDetail/FavoriteAddPhone';
import { WorkHistory } from './favoriteAddDetail/WorkHistory';
import { BackHandlerCom } from '../../../component/utils/BackHandlerCom';
import { useAppSelector } from '../../../redux/store';
import { FavoriteAddType } from '../../screenType';


export const FavoriteAdd = ({route}:FavoriteAddType) => {

    const {equFavType} = route.params; //장비업체일때 type사용

    const {mt_type, mt_idx} = useAppSelector(state => state.userInfo);

    const layout = useWindowDimensions();

    const FirstRoute = () => (
        <FavoriteAddPhone equFavType={equFavType}/>
      );
      
    const SecondRoute = () => (
        <WorkHistory equFavType={equFavType}/>
    );
    
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: '연락처 검색' },
        { key: 'second', title: '이전작업 검색' },
    ]);

    return(
        <View style={{flex:1}}>
            <BackHeader title={mt_type === '1' ? '즐겨찾기 장비 추가' : '조종사 추가하기'} />
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
        </View>
    )
}