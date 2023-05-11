import React,{useState,useEffect} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView,StyleSheet, TouchableOpacity, Image} from 'react-native';
import { BoardIndexType, VolunteerTopDataType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { UserInfoCard } from '../../component/card/UserInfoCard';
import { useNavigation } from '@react-navigation/native';    
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { VolunteerListType } from '../../component/componentsType';
import { initialVolunteerInfo } from '../../component/initialInform';
import { usePostQuery } from '../../util/reactQuery';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleLoading } from '../../redux/actions/LoadingAction';
import { AlertModal, initialAlert } from '../../modal/AlertModal';
import {FavoriteListItemType} from '../screenType';
import { BackHandlerCom } from '../../component/utils/BackHandlerCom';

export const Volunteer = ({route}:any) => {

    const {mt_idx,mt_type} = useAppSelector(state => state.userInfo);
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    // const [volunteerList, setVolunteerList] = React.useState<VolunteerListType>(()=>initialVolunteerInfo); //입력정보
    const dispatch = useAppDispatch();
    const {data : VolunteerListData, isLoading : VolunteerListDataLoading, isError : VolunteerListDataError} = 
    /** mt_idx 임의입력 수정필요 */
    usePostQuery('getVolunteerList',{
        mt_idx : mt_idx,
        cat_idx : route.params.cat_idx,
        cot_idx:route.params.cot_idx
    },
    mt_type === '1' ? 'cons/cons_order_apply_list.php' : 'equip/equip_apply_list.php');

    const [volunteerTopData, setVolunteerTopData] = React.useState<VolunteerTopDataType>();
    const [volunteerList, setVolunteerList] = React.useState<FavoriteListItemType[]>([]);
    const [totalCount, setTotalCount] = React.useState<number>(0);

    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);
    
    const alertModalOff = () => {
        setAlertModal(()=>initialAlert);
    }

    const alertModalOn = (msg : string , type? : string) => {
        setAlertModal({
            ...alertModal,
            alert:true,
            msg : msg,
            type : type ? type : '',
        })
    }

    const alertAction = () => {
        if(alertModal.type === 'error'){
            navigation.goBack();
        }
    }

    useEffect(()=>{
        dispatch(toggleLoading(VolunteerListDataLoading));
        if(VolunteerListData){
            if(VolunteerListData.result === 'true'){
                console.log({cat_idx : route.params.cat_idx,
                    cot_idx:route.params.cot_idx})
                setVolunteerTopData(VolunteerListData.data.data);
                setVolunteerList([...VolunteerListData.data.list]);
                setTotalCount(VolunteerListData.data.cnt);
            }
            else{
                alertModalOn('정보가 존재하지 않습니다. \n고객센터에 문의해주세요. ','error');
            }
        }
    },[VolunteerListData])

    return(
        <View style={{flex:1}}>
        <BackHeader title="지원자 현황" />
        <BackHandlerCom />
        <ScrollView style={{flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
            {volunteerTopData &&
                <View style={{backgroundColor:colors.MAIN_COLOR,padding:20}}>
                    <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.WHITE_COLOR,marginBottom:10}]}>
                        {volunteerTopData.crt_name}
                    </Text>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:3}]}>요구장비</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:10,opacity:0.85}]}>
                        {volunteerTopData.equip} / {volunteerTopData.year}년식+ / {volunteerTopData.sub}
                    </Text>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:3}]}>작업기간</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:10,opacity:0.85}]}>
                        {volunteerTopData.start_date} ~ {volunteerTopData.end_date} {'\n'}
                        {(volunteerTopData.start_time && volunteerTopData.end_time) && `${volunteerTopData.start_time} ~ ${volunteerTopData.end_time}`}
                    </Text>
                </View>
            }
            {volunteerList &&
                <View style={{ margin: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, }}>
                        <Text style={[ fontStyle.f_semibold, {fontSize: 18, color: colors.FONT_COLOR_BLACK}]}>현재까지 지원자 <Text style={{ color: colors.MAIN_COLOR}}>{totalCount}</Text>명</Text>
                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.MAIN_COLOR, borderRadius: 4, paddingHorizontal: 7, paddingVertical: 2}}>
                                <Image style={{ width: 8, height: 10}} source={ require('../../assets/img/ic_bookmark_sm.png') }/>
                                <Text style={[ fontStyle.f_regular, { fontSize: 14, color: colors.MAIN_COLOR, marginLeft: 4}]}>즐겨찾기</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                        {volunteerList.length > 0 ?
                            volunteerList.map((items:FavoriteListItemType,i:number)=>{
                            return(
                            <View style={{ marginVertical: 15 }} key={i}>                
                                <UserInfoCard 
                                    index="1"
                                    item={items}
                                    isDelete={false}
                                    isFavorite={mt_type === '2' && items.like_check === '1'} // (장비업체일 때 즐겨찾기 on: isFavorite='0', off: isFavorite='1')
                                    action={()=>{}}
                                    cat_idx={route.params.cat_idx}
                                    cot_idx={route.params.cot_idx}
                                />
                            </View>
                            )
                        })
                        :
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>현재 지원자가 없습니다.</Text>
                        </View>
                        }
                </View>
            }
        </ScrollView>
        <AlertModal 
            show={alertModal.alert}
            msg={alertModal.msg}
            hide={alertModalOff}
            action={alertAction}
            btnLabel='확인'
        />
        </View>
    )
}

const Volunteerstyle = StyleSheet.create({

})