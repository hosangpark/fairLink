import React,{useState,useEffect} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView,StyleSheet, TouchableOpacity, Image} from 'react-native';
import { BoardIndexType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { UserInfoCard } from '../../component/card/UserInfoCard';
import { useNavigation } from '@react-navigation/native';    
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';


export const Volunteer = () => {
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    return(
        <View style={{flex:1}}>
        <BackHeader title="지원자 현황" />
        <ScrollView style={{flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
            <View style={{backgroundColor:colors.MAIN_COLOR,padding:20}}>
                <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.WHITE_COLOR,marginBottom:10}]}>본사 사옥 신축공사</Text>
                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:3}]}>요구장비</Text>
                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:10,opacity:0.85}]}>
                    {/* <Image/> */}
                    굴착기 03W / 2015년식+ / 브레이커
                </Text>
                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:3}]}>작업기간</Text>
                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:10,opacity:0.85}]}>
                    {/* <Image/> */}
                    2023.03.14 08:00 ~ 17:00
                </Text>
            </View>
            <View style={{ margin: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, }}>
                    <Text style={[ fontStyle.f_semibold, {fontSize: 18, color: colors.FONT_COLOR_BLACK}]}>현재까지 지원자 <Text style={{ color: colors.MAIN_COLOR}}>4</Text>명</Text>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.MAIN_COLOR, borderRadius: 4, paddingHorizontal: 7, paddingVertical: 2}}>
                            <Image style={{ width: 8, height: 10}} source={ require('../../assets/img/ic_bookmark_sm.png') }/>
                            <Text style={[ fontStyle.f_regular, { fontSize: 14, color: colors.MAIN_COLOR, marginLeft: 4}]}>즐겨찾기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 15 }}>                
                    {/* <UserInfoCard 
                        index="1"
                        empName='힘찬중기'
                        jobType='1' // (장비업체일 때 jobType = '0')
                        location='[경남]'
                        rating={23}
                        score={5}
                        recEmpCount={64}
                        userName='김경태'
                        userProfileUrl=''
                        isDelete={false}
                        isFavorite='' // (장비업체일 때 즐겨찾기 on: isFavorite='0', off: isFavorite='1')
                        action={()=>{navigation.navigate('CompanyProfile')}}
                    /> */}
                </View>
                <View style={{ marginVertical: 15 }}>
                    {/* <UserInfoCard 
                        index="2"
                        empName='힘찬중기'
                        jobType='1'
                        location='[경남]'
                        rating={23}
                        score={5}
                        recEmpCount={64}
                        userName='김경태'
                        userProfileUrl=''
                        isDelete={false}
                        action={()=>{navigation.navigate('CompanyProfile')}}
                    /> */}
                </View>
            </View>
            
        </ScrollView>
        </View>
    )
}

const Volunteerstyle = StyleSheet.create({

})