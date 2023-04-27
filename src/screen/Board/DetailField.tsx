import React,{useState,useEffect} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView,Image,TouchableOpacity,StyleSheet} from 'react-native';
import { BoardIndexType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { CustomButton } from '../../component/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { AlertModal,initialAlert } from '../../modal/AlertModal';
import { AlertClearType } from '../../modal/modalType';
import { usePostQuery } from '../../util/reactQuery';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleLoading } from '../../redux/actions/LoadingAction';
import { DetailFieldBoxDataType } from '../../component/componentsType';
import { initialdetailFieldInfo } from '../../component/initialInform';

const DetailFieldBox = ({
    title,
    text,
    cot_pay_type,
    cot_career,
    cot_age,
    cot_score,
    cot_goods,
    cot_start_date,
    cot_end_date,
    cot_start_time,
    cot_end_time,
    cot_pay_date,
    cot_pay_etc
}:any)=>{
    // {title:string,text:string,cot_pay_type?:string,cot_start_date?:string}
    return(
    <View style={DetailFieldstyle.DetailFieldBox}>
        <Text style={[fontStyle.f_semibold,DetailFieldstyle.DetailFieldTitle]}>{title}</Text>
        {text&&
        <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText]}>
            {text}
        </Text>
        }
        {cot_pay_date&&
        <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText]}>
            {cot_pay_date + " 일"}
        </Text>
        }
        {title == '지원가능' &&
        <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText,{lineHeight:25}]}>
            경력 {cot_career} 년 이상 {'\n'}
            연령 {cot_age}세 미만 {'\n'}
            평점 {cot_score == '0'? '무관': cot_score + '이상'} {'\n'}
            추천수 {cot_goods == '0'? '무관': cot_goods + '이상'}
        </Text>
        }
        {title == '작업기간' &&
        <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText,{lineHeight:25}]}>
            {cot_start_date} ~ {cot_end_date} {'\n'}
            {cot_start_time} ~ {cot_end_time}
        </Text>
        }
        {title =='대금' &&
        <>
        {cot_pay_type !== 'Y'?
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

export const DetailField = ({route}:any) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const {mt_idx,mt_type} = useAppSelector(state => state.userInfo);

    
    const [detailFieldInfo, setDetailFieldInfo] = React.useState<DetailFieldBoxDataType>(()=>initialdetailFieldInfo); //입력정보
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(()=>initialAlert); //alert 객체 생성 
    const alertModalOn = (strongMsg : string, type? : string) => { //alert 켜기
        setAlertModal({
            alert:true,
            strongMsg:strongMsg,
            msg:`로${"\n"}전화연결 하시겠습니까?`,
            type:'confirm' ,
        })
    }
    const alertModalOff = () =>{ //modal 종료
        setAlertModal(initialAlert)
    }

    const {data : DetailFieldData, isLoading : DetailFieldDataLoading, isError : DetailFieldDataError} = 
    /** mt_idx 임의입력 수정필요 */
    usePostQuery('getDetailFieldData',{mt_idx : "17",cot_idx:route.params.cot_idx},'cons/cons_order_info1.php')

    React.useEffect(()=>{
        console.log('test')
    },[])

    React.useEffect(()=>{
        dispatch(toggleLoading(DetailFieldDataLoading));
        if(DetailFieldData){
            setDetailFieldInfo(DetailFieldData.data.data);
        }
    },[DetailFieldData])

    return(
        <View style={{flex:1,}}>
        <BackHeader title="현장세부내용" />
        <ScrollView style={{flex:1,backgroundColor:colors.WHITE_COLOR}}>
            <View style={{backgroundColor:colors.MAIN_COLOR,padding:20}}>
                <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.WHITE_COLOR,marginBottom:3}]}>
                    {detailFieldInfo.crt_name}
                </Text>
                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:8}]}>
                    {detailFieldInfo.company}</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image resizeMode={'contain'} style={{width:10,height:15,marginRight:5}} source={require('../../assets/img/ic_map_pin_w.png')}/>
                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:3,opacity:0.85}]}>
                    {detailFieldInfo.detail_location}
                </Text>
                </View>
            </View>
            <View style={{paddingHorizontal:20,paddingVertical:20}}>
                <DetailFieldBox
                    title={'장비'}
                    text={detailFieldInfo.cot_e_type}
                />
                <DetailFieldBox
                    title={'최소연식'}
                    text={detailFieldInfo.cot_e_year}
                />
                <DetailFieldBox
                    title={'부속장치'}
                    text={detailFieldInfo.cot_e_sub}
                />
                <DetailFieldBox
                    title={'작업내용'}
                    text={detailFieldInfo.cot_content}
                />
                <DetailFieldBox
                    title={'지원가능'}
                    cot_career={detailFieldInfo.cot_career}
                    cot_age={detailFieldInfo.cot_age}
                    cot_score={detailFieldInfo.cot_score}
                    cot_goods={detailFieldInfo.cot_goods}
                />
                <DetailFieldBox
                    title={'작업기간'}
                    cot_start_date={detailFieldInfo.cot_start_date}
                    cot_end_date={detailFieldInfo.cot_end_date}
                    cot_start_time={detailFieldInfo.cot_start_time}
                    cot_end_time={detailFieldInfo.cot_end_time}
                />
                <DetailFieldBox
                    title={'회사명'}
                    text={detailFieldInfo.company}
                />
                <DetailFieldBox
                    title={'대금'}
                    text={detailFieldInfo.cot_pay_price}
                    cot_pay_type={detailFieldInfo.cot_pay_type}
                />
                <DetailFieldBox
                    title={'지급일'}
                    cot_pay_date={detailFieldInfo.cot_pay_date}
                />
                <DetailFieldBox
                    title={'담당자'}
                    text={detailFieldInfo.cot_m_name}
                />
                <View style={DetailFieldstyle.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,DetailFieldstyle.DetailFieldTitle]}>연락처</Text>
                    <TouchableOpacity style={{flexDirection:'row', borderRadius:8,borderWidth:1,borderColor:colors.MAIN_COLOR,paddingHorizontal:10,paddingVertical:5}}
                    onPress={()=>{alertModalOn(DetailFieldData.data.data.cot_m_num)}}
                    >
                    <Image style={{width:25,height:25}} source={require('../../assets/img/ic_phone.png')}/>
                    <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.MAIN_COLOR,flexShrink:1}]}>
                        {detailFieldInfo.cot_m_num}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[mt_type === '1'? DetailFieldstyle.staticbox : DetailFieldstyle.staticbox2 ]}>
                {mt_type ==='1' ?
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
                
                {mt_type ==='1' ?
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={[DetailFieldstyle.staticinbox,{marginRight:20}]}>
                        <Text style={[fontStyle.f_semibold,{color:colors.MAIN_COLOR,fontSize:20}]}>
                            조종사
                        </Text>
                        <Text style={[fontStyle.f_regular,{color:colors.FONT_COLOR_BLACK2,fontSize:15}]}>
                            본인 또는 소속 조종사
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={DetailFieldstyle.staticinbox}>
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
                        action={()=>{console.log('수락'),navigation.goBack()}}
                        label={'수락'}
                        style={{flex:1,marginRight:10}}
                    />
                    <CustomButton
                        action={()=>{console.log('거절')}}
                        label={'거절'}
                        style={{...styles.whiteButtonStyle,flex:1}}
                        labelStyle={styles.whiteButtonLabelStyle}
                    />
                </View>
                }
            </View>
        </ScrollView>
        <AlertModal
            show={alertModal.alert}
            msg={alertModal.msg}
            strongMsg={alertModal.strongMsg}
            hide={alertModalOff}
            type={alertModal.type}
            action={()=>{}}
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
    staticbox:{alignItems:'center',marginHorizontal:20,backgroundColor:colors.BLUE_COLOR4,borderRadius:8,borderWidth:1,borderColor:colors.BORDER_BLUE_COLOR4,paddingHorizontal:20,paddingVertical:16},
    staticbox2:{alignItems:'center',marginHorizontal:20,backgroundColor:colors.WHITE_COLOR,borderRadius:8,borderWidth:1,borderColor:colors.BORDER_BLUE_COLOR4,paddingHorizontal:20,paddingVertical:16},
    staticinbox:{flex:1,paddingHorizontal:10,paddingVertical:13,backgroundColor:colors.WHITE_COLOR,borderRadius:4,borderWidth:1,borderColor:colors.BORDER_BLUE_COLOR3,alignItems:'center'}
})