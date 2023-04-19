import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle } from '../../style/style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { MemberLineType } from '../screenType';

export const MemberLine = ({route}:MemberLineType) => {

    const {token} = route.params;

    const [selectItem, setSelectItem] = useState<number>(0);
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    const memberLineData = [
        { id: 0, title: '건설회사', detail: '건설회사 임직원', onIcon: require('../../assets/img/ic_member1_on.png'), offIcon: require('../../assets/img/ic_member1_off.png')},
        { id: 1, title: '장비회사', detail: '장비 1대 이상 보유한 장비임대사업자', onIcon: require('../../assets/img/ic_member2_on.png'), offIcon: require('../../assets/img/ic_member2_off.png')},
        { id: 2, title: '조종사', detail: '장비를 보유하지 않은 중장비 조종사', onIcon: require('../../assets/img/ic_member3_on.png'), offIcon: require('../../assets/img/ic_member3_off.png')}
    ]

    return (
        <View style={{ flex: 1,}}>
            <BackHeader title="회원구분" />
                <View style={{ margin: 20 }}>
                    <Text style={[fontStyle.f_bold, {color: colors.FONT_COLOR_BLACK, fontSize: 24, marginBottom: 10 }]}>회원구분 선택</Text>
                </View>
                
                <View style={{ marginHorizontal: 20, }}>
                    { memberLineData.map((data, key) => (
                        
                        <TouchableOpacity key={key} onPress={() => setSelectItem(data.id)} style={{ 
                            marginBottom: 20, 
                            backgroundColor: colors.WHITE_COLOR, 
                            borderColor: selectItem === data.id ? colors.MAIN_COLOR : colors.BORDER_GRAY_COLOR, 
                            borderWidth: 1, 
                            borderRadius: 8,
                            flexDirection:'row',
                            justifyContent:'space-between',
                            alignItems:'center',
                            padding:20,
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center',flex:8 ,marginRight:10}}>
                                <Image style={{ width: 45, height: 52, marginRight: 20 }} source={selectItem === data.id ? data.onIcon : data.offIcon} />
                                <View style={{flex:1}}>
                                    <Text style={[fontStyle.f_bold, { fontSize: 24, color: selectItem === data.id ? colors.MAIN_COLOR : colors.FONT_COLOR_BLACK, opacity: selectItem === data.id ? 1 : 0.55 }]}>{data.title}</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={[fontStyle.f_regular, {flex:1,flexWrap:'wrap', fontSize: 15, color: selectItem === data.id ? colors.MAIN_COLOR : colors.FONT_COLOR_GRAY }]}>{data.detail}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:1,}}>
                                <Image style={{ width: 22, height: 17, }} source={selectItem === data.id ? require('../../assets/img/ic_check_lg_on.png') : require('../../assets/img/ic_check_lg_off.png')} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ margin: 20 }}>
                    <TouchableOpacity style={{ backgroundColor: colors.MAIN_COLOR, borderRadius: 4, padding: 12, }}
                        onPress={()=>{
                            navigation.navigate('JoinInfo',{token:token,memberType : selectItem});
                        }}
                    >
                        <Text style={[ fontStyle.f_semibold, { color: colors.WHITE_COLOR, fontSize: 18, textAlign: 'center', }]}>선택완료</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}