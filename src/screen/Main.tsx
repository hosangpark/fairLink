import React from 'react';
import {SafeAreaView,View,Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {useNavigation} from '@react-navigation/native';
import { RouterNavigatorParams } from '../../type/routerType';
import { Home } from './testPage/Home';
import { Video } from './testPage/Video';
import { Board } from './testPage/Board';
import { Release } from './testPage/Release';
import { MyPage } from './testPage/MyPage';
import { HomeIndex } from './home/HomeIndex';

export const Main = () => {

    /**
     * 
     *  test page는 bottom navigator를 위한 테스트 페이지입니다.
     * 
     *  페이지가 만들어지면 하나씩 지워주시면 됩니다.
     * 
     */

    //type - stackNavigationProp에 routerNavigatorPrams를 종속시킵니다.
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>(); //router 이동시 사용

    const Tab = createBottomTabNavigator();

    function testNavi(path:keyof RouterNavigatorParams){ //이동해야할 path가 존재한다면 RouterNavigatorParams에 추가해주세요.
        
        navigation.navigate(path); //지정한 이름을가진 스택으로 이동
        //navigation.push('Home'); 
        //navigation.reset('Home'); 스택초기화후 이동
        //navigation.goBack(); 뒤로가기
        //navigation.popToTop() 최상위 스택으로 이동
        
        /* 

        그외 navigation 옵션은  
            https://reactnavigation.org/docs/navigation-prop/
        참고
        */
    }

    return (
        <SafeAreaView
        style={{
            flex: 1,
            backgroundColor:'#fff',
            justifyContent: 'center',
            // alignItems:'center',
        }}>
            <Tab.Navigator
                screenOptions={
                    {headerShown:false}
                }
            >
                <Tab.Screen name="Home" component={HomeIndex} />
                <Tab.Screen name="Video" component={Video} />
                <Tab.Screen name="Board" component={Board} />
                <Tab.Screen name="Release" component={Release} />
                <Tab.Screen name="MyPage" component={MyPage} />
            </Tab.Navigator>
        </SafeAreaView>
    )
}