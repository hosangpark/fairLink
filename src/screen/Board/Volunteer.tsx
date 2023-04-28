import React,{useState,useEffect} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView,StyleSheet, TouchableOpacity, Image} from 'react-native';
import { BoardIndexType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { UserInfoCard } from '../../component/card/UserInfoCard';
import { useNavigation } from '@react-navigation/native';    
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { VolunteerListType } from '../../component/componentsType';
import { initialVolunteerInfo } from '../../component/initialInform';
import { usePostQuery } from '../../util/reactQuery';
import { useAppDispatch } from '../../redux/store';
import { toggleLoading } from '../../redux/actions/LoadingAction';


export const Volunteer = ({route}:any) => {
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [volunteerList, setVolunteerList] = React.useState<VolunteerListType>(()=>initialVolunteerInfo); //입력정보
    const dispatch = useAppDispatch();
    const {data : VolunteerListData, isLoading : VolunteerListDataLoading, isError : VolunteerListDataError} = 
    /** mt_idx 임의입력 수정필요 */
    usePostQuery('getVolunteerList',{mt_idx : "17",cot_idx:route.params.cot_idx},'cons/cons_order_apply_list.php')

    useEffect(()=>{
        dispatch(toggleLoading(VolunteerListDataLoading));
        if(VolunteerListData){
            setVolunteerList(VolunteerListData.data);
            console.log(volunteerList.list)
        }
    },[VolunteerListData])

    return(
        <View style={{flex:1}}>
        <BackHeader title="지원자 현황" />
        <ScrollView style={{flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
            <View style={{backgroundColor:colors.MAIN_COLOR,padding:20}}>
                <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.WHITE_COLOR,marginBottom:10}]}>
                    {volunteerList.data.crt_name}
                </Text>
                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:3}]}>요구장비</Text>
                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:10,opacity:0.85}]}>
                    {volunteerList.data.equip} / {volunteerList.data.year}년식+ / {volunteerList.data.sub}
                </Text>
                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:3}]}>작업기간</Text>
                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:10,opacity:0.85}]}>
                    {volunteerList.data.start_date} ~ {volunteerList.data.end_date} {'\n'}
                    {volunteerList.data.start_time} ~ {volunteerList.data.end_time}
                </Text>
            </View>
            <View style={{ margin: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, }}>
                    <Text style={[ fontStyle.f_semibold, {fontSize: 18, color: colors.FONT_COLOR_BLACK}]}>현재까지 지원자 <Text style={{ color: colors.MAIN_COLOR}}>{volunteerList.count}</Text>명</Text>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.MAIN_COLOR, borderRadius: 4, paddingHorizontal: 7, paddingVertical: 2}}>
                            <Image style={{ width: 8, height: 10}} source={ require('../../assets/img/ic_bookmark_sm.png') }/>
                            <Text style={[ fontStyle.f_regular, { fontSize: 14, color: colors.MAIN_COLOR, marginLeft: 4}]}>즐겨찾기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {volunteerList.list.map((items:any,i:any)=>{
                    return(
                    <View style={{ marginVertical: 15 }} key={i}>                
                        <UserInfoCard 
                            index="1"
                            item={items}
                            isDelete={false}
                            isFavorite={false} // (장비업체일 때 즐겨찾기 on: isFavorite='0', off: isFavorite='1')
                            action={()=>{}}
                        />
                    </View>
                    )
                })}
            </View>
            
        </ScrollView>
        </View>
    )
}

const Volunteerstyle = StyleSheet.create({

})