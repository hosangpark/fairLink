import React, { useState } from 'react';
import {SafeAreaView,View,Text, Image} from 'react-native';
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
import { colors, fontStyle } from '../style/style';
import { MyPageIndex } from './mypage/MyPageIndex';
import { Agreements } from './signUp/Agreements';

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

    const [tabIndex, setTabIndex] = useState(1);

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
                    {   
                        headerShown:false,
                        tabBarStyle:{height:70}
                    }
                }
                initialRouteName='Home'
            >
                <Tab.Screen
                    name="Home" 
                    children={()=>
                        // <HomeIndex 
                        //     setTabIndex={setTabIndex}
                        // />
                        <Home />
                    }
                    listeners={{
                        tabPress : (e)=>{
                          setTabIndex(1);
                        }
                      }}
                    options={{
                        headerShown:false,
                        tabBarShowLabel:false,
                        tabBarIcon: ({color, size}) => (
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Image style={{width:25,height:25,resizeMode:'contain'}} source={tabIndex === 1 ? require('../assets/img/b_menu1_on.png') : require('../assets/img/b_menu1_off.png')} />
                                <Text style={[fontStyle.f_medium,{fontSize:14, color:tabIndex === 1 ? colors.MAIN_COLOR : colors.FONT_COLOR_GRAY,marginTop:5}]}>홈</Text>
                            </View>
                            ),
                    }}
                />
                <Tab.Screen 
                    name="Vedio" 
                    // component={Video}
                    component={Agreements}
                    
                    listeners={{
                        tabPress : (e)=>{
                          setTabIndex(2);
                        }
                      }}
                    options={{
                        headerShown:false,
                        tabBarShowLabel:false,
                        tabBarIcon: ({color, size}) => (
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Image style={{width:25,height:25,resizeMode:'contain'}} source={tabIndex === 2 ? require('../assets/img/b_menu2_on.png') : require('../assets/img/b_menu2_off.png')} />
                                <Text style={[fontStyle.f_medium,{fontSize:14, color:tabIndex === 2 ? colors.MAIN_COLOR : colors.FONT_COLOR_GRAY,marginTop:5}]}>배차요청</Text>
                            </View>
                            ),
                    }}
                />
                <Tab.Screen 
                    name="Board" 
                    component={Board}
                    
                    listeners={{
                        tabPress : (e)=>{
                          setTabIndex(3);
                        }
                      }}
                    options={{
                        headerShown:false,
                        tabBarShowLabel:false,
                        tabBarIcon: ({color, size}) => (
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Image style={{width:25,height:25,resizeMode:'contain'}} source={tabIndex === 3 ? require('../assets/img/b_menu3_on.png') : require('../assets/img/b_menu3_off.png')} />
                                <Text style={[fontStyle.f_medium,{fontSize:14, color:tabIndex === 3 ? colors.MAIN_COLOR : colors.FONT_COLOR_GRAY,marginTop:5}]}>이력 및 현황</Text>
                            </View>
                            ),
                    }}
                />
                <Tab.Screen 
                    name="MyPage" 
                    // component={MyPageIndex}
                    children={()=>
                        <MyPageIndex 
                            setTabIndex={setTabIndex}
                        />
                    }
                    listeners={{
                        tabPress : (e)=>{
                          setTabIndex(4);
                        }
                      }}
                    options={{
                        headerShown:false,
                        tabBarShowLabel:false,
                        tabBarIcon: ({color, size}) => (
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Image style={{width:25,height:25,resizeMode:'contain'}} source={tabIndex === 4 ? require('../assets/img/b_menu4_on.png') : require('../assets/img/b_menu4_off.png')} />
                                <Text style={[fontStyle.f_medium,{fontSize:14, color:tabIndex === 4 ? colors.MAIN_COLOR : colors.FONT_COLOR_GRAY,marginTop:5}]}>마이페이지</Text>
                            </View>
                            ),
                    }}
                />
                <Tab.Screen 
                    name="document" 
                    component={MyPage}
                    
                    listeners={{
                        tabPress : (e)=>{
                          setTabIndex(5);
                        }
                      }}
                    options={{
                        headerShown:false,
                        tabBarShowLabel:false,
                        tabBarIcon: ({color, size}) => (
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Image style={{width:25,height:25,resizeMode:'contain'}} source={tabIndex === 5 ? require('../assets/img/b_menu5_on.png') : require('../assets/img/b_menu5_off.png')} />
                                <Text style={[fontStyle.f_medium,{fontSize:14, color:tabIndex === 5 ? colors.MAIN_COLOR : colors.FONT_COLOR_GRAY,marginTop:5}]}>서류자동화</Text>
                            </View>
                            ),
                    }}
                />

                {/* <Tab.Screen name="Video" component={Video} />
                <Tab.Screen name="Board" component={Board} />
                <Tab.Screen name="Release" component={Release} />
                <Tab.Screen name="MyPage" component={MyPage} /> */}
            </Tab.Navigator>
        </SafeAreaView>
    )
}