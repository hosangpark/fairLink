import React,{useState,useEffect} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView,Image,TouchableOpacity,StyleSheet, Linking} from 'react-native';
import { BoardIndexType, ScaneDetailFieldType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { CustomButton } from '../../component/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { AlertModal,initialAlert } from '../../modal/AlertModal';
import { AlertClearType } from '../../modal/modalType';
import { usePostMutation, usePostQuery } from '../../util/reactQuery';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleLoading } from '../../redux/actions/LoadingAction';
import { DetailFieldBoxDataType, EquDetailFieldBoxDataType } from '../../component/componentsType';
import { initialdetailFieldInfo } from '../../component/initialInform';
import { BackHandlerCom } from '../../component/utils/BackHandlerCom';
import { NumberComma } from '../../util/func';
import { pilotCareerList } from '../../component/utils/list';

type DetailFieldBoxType = {
    title ? : string,
    text? : string,
    pay_type?:string,
    career?:string,
    age?:string,
    score?:string,
    goods?:string,
    start_date?:string,
    end_date?:string,
    start_time?:string,
    end_time?:string,
    pay_date?:string,
    pay_etc?:string
}

const DetailFieldBox = ({
    title,
    text,
    pay_type,
    career,
    age,
    score,
    goods,
    start_date,
    end_date,
    start_time,
    end_time,
    pay_date,
    pay_etc
}:DetailFieldBoxType)=>{
    // {title:string,text:string,cot_pay_type?:string,cot_start_date?:string}
    return(
    <View style={DetailFieldstyle.DetailFieldBox}>
        <Text style={[fontStyle.f_semibold,DetailFieldstyle.DetailFieldTitle]}>{title}</Text>
        {text&&
        <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText]}>
            {text}
        </Text>
        }
        {pay_date&&
        <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText]}>
            {pay_date + " 일"}
        </Text>
        }
        {title == '지원가능' &&
        <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText,{lineHeight:25}]}>
            경력 {pilotCareerList[Number(career)]} 이상 {'\n'}
            연령 {age}세 미만 {'\n'}
            평점 {score == '0'? '무관': score + '이상'} {'\n'}
            추천수 {goods == '0'? '무관': goods + '이상'}
        </Text>
        }
        {title == '작업기간' &&
        <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText,{lineHeight:25}]}>
            {start_date} ~ {end_date} {'\n'}
            {start_time} ~ {end_time}
        </Text>
        }
        {title =='대금' &&
        <>
        {pay_type !== 'Y'?
        <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.MAIN_COLOR,borderWidth:1,borderColor:colors.MAIN_COLOR,borderRadius:4,paddingHorizontal:10,marginLeft:10}]}>
            일대</Text>
            :
        <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.WHITE_COLOR,borderWidth:1,borderColor:colors.MAIN_COLOR,borderRadius:4,paddingHorizontal:10,backgroundColor:colors.MAIN_COLOR,marginLeft:10}]}>
            월대</Text>
        }
        </>
        }
    </View>
    )

}

export const ScaneDetailField = ({route}:ScaneDetailFieldType) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const {mt_idx,mt_type} = useAppSelector(state => state.userInfo);
    const {cot_idx,cat_idx} = route.params;

    const {data : DetailFieldData, isLoading : DetailFieldDataLoading, isError : DetailFieldDataError} = 
    usePostQuery('getDetailFieldData',
        mt_type === '2' ? {mt_idx : mt_idx,cot_idx:cot_idx} : {mt_idx : mt_idx, cat_idx : cat_idx},
        mt_type === '2' ? 'equip/equip_order_info.php' : 'pilot/pilot_order_info.php'); //장비회사 및 조종사 현장세부내용 출력
        
    const getOrderMineMutation = usePostMutation('getOrderMine','equip/equip_order_mine.php');
    const [detailFieldInfo, setDetailFieldInfo] = React.useState<EquDetailFieldBoxDataType>(); //입력정보

    const [alertModal, setAlertModal] = React.useState<AlertClearType>(()=>initialAlert); //alert 객체 생성 
    const alertModalOn = (msg:string,type? : string, strongMsg? : string, ) => { //alert 켜기
        setAlertModal({
            alert:true,
            strongMsg:strongMsg ? strongMsg : '',
            msg:msg,
            type:type ? type :'' ,
        })
    } 

    const alertModalOff = () =>{ //modal 종료
        setAlertModal(initialAlert)
    }
    const alertAction = async() => {
        alertModalOff();
        if(alertModal.type === 'call_confirm'){
            const tempCallNum = DetailFieldData.data.data.m_num.split('-').join('');
            if(tempCallNum.length < 1){
                Linking.openURL(`tel:${tempCallNum}`);
            }
            else{
                Linking.openURL(`tel:${DetailFieldData.data.data.m_num}`);

            }
        }
        if(alertModal.type === 'confirm_A'){
            console.log(detailFieldInfo)
            if(detailFieldInfo?.my_check == "Y" && detailFieldInfo.my_equip_count == "1"){
                dispatch(toggleLoading(true));
                const params = {
                    mt_idx : mt_idx,
                    cot_idx : cot_idx,
                }
                const {data , result, msg} = await getOrderMineMutation.mutateAsync(params);
                dispatch(toggleLoading(false));
                if(result == 'true'){
                    alertModalOn(msg)
                    navigation.navigate('Board');
                } else {
                    alertModalOn(msg)
                }
            }else{
                navigation.navigate('MatchingEquipment',{item:detailFieldInfo});
            }
        }
        if(alertModal.type === 'confirm_B'){
            navigation.navigate('MatchingEquipment',{item:detailFieldInfo});
        }
    }

    
    /** mt_idx 임의입력 수정필요 */
    React.useEffect(()=>{
        dispatch(toggleLoading(DetailFieldDataLoading));
        if(DetailFieldData){
            console.log(DetailFieldData);
            setDetailFieldInfo(DetailFieldData.data.data);
        }
    },[DetailFieldData])


    return(
        <View style={{flex:1,}}>
        <BackHeader title="현장세부내용" />
        <BackHandlerCom />
        <View style={{flex:1,backgroundColor:colors.WHITE_COLOR}}>
        {detailFieldInfo &&
            <ScrollView style={{flex:1,backgroundColor:colors.WHITE_COLOR}}>
                <View style={{backgroundColor:colors.MAIN_COLOR,padding:20}}>
                    <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.WHITE_COLOR,marginBottom:3}]}>
                        {detailFieldInfo.crt_name}
                    </Text>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:8}]}>
                        {detailFieldInfo.mct_company}</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image resizeMode={'contain'} style={{width:10,height:15,marginRight:5}} source={require('../../assets/img/ic_map_pin_w.png')}/>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:3,opacity:0.85}]}>
                        {detailFieldInfo.crt_location}
                    </Text>
                    </View>
                </View>
                <View style={{paddingHorizontal:20,paddingVertical:20}}>
                    <DetailFieldBox
                        title={'장비'}
                        text={detailFieldInfo.equip}
                    />
                    <DetailFieldBox
                        title={'최소연식'}
                        text={detailFieldInfo.year}
                    />
                    <DetailFieldBox
                        title={'부속장치'}
                        text={detailFieldInfo.sub_text}
                    />
                    <DetailFieldBox
                        title={'작업내용'}
                        text={detailFieldInfo.cot_content}
                    />
                    <DetailFieldBox
                        title={'지원가능'}
                        career={detailFieldInfo.apply_info[0]}
                        age={detailFieldInfo.apply_info[1]}
                        score={detailFieldInfo.apply_info[2]}
                        goods={detailFieldInfo.apply_info[3]}
                    />
                    <DetailFieldBox
                        title={'작업기간'}
                        start_date={detailFieldInfo.start_date}
                        end_date={detailFieldInfo.end_date}
                        start_time={detailFieldInfo.start_time}
                        end_time={detailFieldInfo.end_time}
                    />
                    <DetailFieldBox
                        title={'회사명'}
                        text={detailFieldInfo.mct_company}
                    />
                    <DetailFieldBox
                        title={'대금'}
                        text={`${NumberComma(Number(detailFieldInfo.pay_price))} 만원`}
                        pay_type={detailFieldInfo.pay_type}
                    />
                    <DetailFieldBox
                        title={'지급일'}
                        pay_date={detailFieldInfo.pay_date}
                    />
                    <DetailFieldBox
                        title={'담당자'}
                        text={detailFieldInfo.crt_director}
                    />
                    <View style={{
                        ...DetailFieldstyle.DetailFieldBox,
                        alignItems:'center'
                    }}>
                        <Text style={[fontStyle.f_semibold,,DetailFieldstyle.DetailFieldTitle]}>연락처</Text>
                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', borderRadius:8,borderWidth:1,borderColor:colors.MAIN_COLOR,paddingHorizontal:10,paddingVertical:5}}
                            onPress={()=>{
                                alertModalOn(`로 \n전화연결 하시겠습니까?`,'call_confirm',DetailFieldData.data.data.m_num)
                            }}
                        >
                            <Image style={{width:20,height:20}} source={require('../../assets/img/ic_phone.png')}/>
                            <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.MAIN_COLOR,flexShrink:1,marginLeft:5}]}>
                                {detailFieldInfo.m_num}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    {mt_type === '4' &&
                        <View>
                            <DetailFieldBox
                                title={'장비회사'}
                                // text={detailFieldInfo.}
                            />
                            <View style={{
                                ...DetailFieldstyle.DetailFieldBox,
                                alignItems:'center'
                            }}>
                                <Text style={[fontStyle.f_semibold,,DetailFieldstyle.DetailFieldTitle]}>연락처</Text>
                                <TouchableOpacity style={{flexDirection:'row', alignItems:'center', borderRadius:8,borderWidth:1,borderColor:colors.MAIN_COLOR,paddingHorizontal:10,paddingVertical:5}}
                                    onPress={()=>{
                                        alertModalOn(`로 \n전화연결 하시겠습니까?`,'call_confirm',DetailFieldData.data.data.m_num)
                                    }}
                                >
                                    <Image style={{width:20,height:20}} source={require('../../assets/img/ic_phone.png')}/>
                                    <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.MAIN_COLOR,flexShrink:1,marginLeft:5}]}>
                                        {detailFieldInfo.m_num}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }

                </View>
                
            </ScrollView>
        }
        {detailFieldInfo &&
            <View style={[(mt_type === '1' || detailFieldInfo.assign_check === 'N')? DetailFieldstyle.staticbox : DetailFieldstyle.staticbox2, ]}>
                
                {(mt_type === '1' || detailFieldInfo.assign_check === 'N') ?
                <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK,marginBottom:16}]}>
                    지원하기
                </Text>
                :
                <View style={{alignItems:'center'}}>
                <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.MAIN_COLOR,marginBottom:6}]}>
                    지명배차
                </Text>
                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:16}]}>
                    (대상자 : 강범수 님)
                </Text>
                </View>
                }

                {((mt_type === '1' || detailFieldInfo.assign_check === 'N' ) && mt_type !== '4') ?
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={[DetailFieldstyle.staticinbox,{marginRight:20}]}
                        onPress={()=>{
                            alertModalOn(`해당 현장에 '직접조종하기'로 \n지원하시겠습니까?`,'confirm_A')
                        }}
                    >
                        <Text style={[fontStyle.f_semibold,{color:colors.MAIN_COLOR,fontSize:20}]}>
                            조종사
                        </Text>
                        <Text style={[fontStyle.f_regular,{color:colors.FONT_COLOR_BLACK2,fontSize:15}]}>
                            본인 또는 소속 조종사
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={DetailFieldstyle.staticinbox}
                        onPress={()=>{
                            alertModalOn('해당 현장에 장비만 지원하시겠습니까?','confirm_B')
                        }}
                    >
                        <Text style={[fontStyle.f_semibold,{color:colors.MAIN_COLOR,fontSize:20}]}>
                            조종사
                        </Text>
                        <Text style={[fontStyle.f_regular,{color:colors.FONT_COLOR_BLACK2,fontSize:15}]}>
                            스페어 조종사
                        </Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <CustomButton
                        action={()=>{navigation.goBack()}}
                        label={'수락'}
                        style={{flex:1,marginRight:10}}
                    />
                    <CustomButton
                        action={()=>{navigation.navigate('Main')}}
                        label={'거절'}
                        style={{...styles.whiteButtonStyle,flex:1}}
                        labelStyle={styles.whiteButtonLabelStyle}
                    />
                </View>
                }
            </View>
        }
        </View>
        <AlertModal
            show={alertModal.alert}
            msg={alertModal.msg}
            strongMsg={alertModal.strongMsg}
            hide={alertModalOff}
            type={alertModal.type}
            action={alertAction}
        />
    </View>
    )
}

const DetailFieldstyle = StyleSheet.create({
    WhiteBox:{paddingHorizontal:20,paddingTop:30,paddingBottom:30,backgroundColor:colors.WHITE_COLOR,marginBottom:10},
    DefaultBlackText:{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10},
    cardInbox:{flexDirection:'row',justifyContent:'space-between',marginBottom:14},
    boxText1:{fontSize:16,color:colors.FONT_COLOR_BLACK},
    DetailFieldBox:{
        flexDirection:'row',paddingVertical:10
    },
    DetailFieldTitle:{
        fontSize:16,width:85,color:colors.FONT_COLOR_BLACK
    },
    DetailFieldText:{
        fontSize:16,color:colors.FONT_COLOR_BLACK,flexShrink:1
    },
    staticbox:{alignItems:'center',marginHorizontal:20,backgroundColor:colors.BLUE_COLOR4,borderRadius:8,borderWidth:1,borderColor:colors.BORDER_BLUE_COLOR4,paddingHorizontal:20,paddingVertical:16,marginBottom:10},
    staticbox2:{alignItems:'center',marginHorizontal:20,backgroundColor:colors.WHITE_COLOR,borderRadius:8,borderWidth:1,borderColor:colors.BORDER_BLUE_COLOR4,paddingHorizontal:20,paddingVertical:16,marginBottom:10},
    staticinbox:{flex:1,paddingHorizontal:10,paddingVertical:13,backgroundColor:colors.WHITE_COLOR,borderRadius:4,borderWidth:1,borderColor:colors.BORDER_BLUE_COLOR3,alignItems:'center'}
})