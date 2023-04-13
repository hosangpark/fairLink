import React,{useState,useEffect} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView,StyleSheet} from 'react-native';
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
        <ScrollView style={{flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
            <BackHeader title="지원자 현황" />
            <View style={{backgroundColor:colors.MAIN_COLOR,padding:20}}>
                <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.WHITE_COLOR,marginBottom:10}]}>본사 사옥 신축공사</Text>
                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:3}]}>요구장비</Text>
                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:10,opacity:0.85}]}>
                    {/* <Image/> */}
                    굴착기 03W / 2015년식+ / 브레이커
                </Text>
                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:3}]}>요구장비</Text>
                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:10,opacity:0.85}]}>
                    {/* <Image/> */}
                    2023.03.14 08:00 ~ 17:00
                </Text>
            </View>
            <View style={{ margin: 20 }}>
                <View style={{ marginBottom: 25 }}>
                    <Text style={[ fontStyle.f_semibold, {fontSize: 18, color: colors.FONT_COLOR_BLACK}]}>현재까지 지원자 <Text style={{ color: colors.MAIN_COLOR}}>4</Text>명</Text>
                </View>
                <View style={{ marginVertical: 5 }}>                
                    <UserInfoCard 
                        index="1"
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
                    />
                </View>
                <View style={{ marginVertical: 5 }}>                
                    <UserInfoCard 
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
                    />
                </View>
            </View>
            
        </ScrollView>
    )
}

const Volunteerstyle = StyleSheet.create({

})