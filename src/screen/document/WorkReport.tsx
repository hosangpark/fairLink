import React,{useState,useEffect,SetStateAction} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView,StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { BoardIndexType, PilotWorkInfoType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { useNavigation } from '@react-navigation/native';    
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { CustomInputTextBox } from '../../component/CustomInputTextBox';
import { CustomWaveBox } from '../../component/CustomWaveBox';
import { comma } from '../../component/utils/funcKt';
import { CustomButton } from '../../component/CustomButton';
import { usePostQuery } from '../../util/reactQuery';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleLoading } from '../../redux/actions/LoadingAction';
import { initialAlert } from '../../modal/AlertModal';
import { BackHandlerCom } from '../../component/utils/BackHandlerCom';
import { NumberComma } from '../../util/func';


export const WorkReport = ({cdwt_idx}:{cdwt_idx:string}) => {
    const dispatch = useAppDispatch();
    const {mt_idx,mt_type} = useAppSelector(state => state.userInfo);
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [editMode, setEditMode] = React.useState('');
    const [price,setPrice] = useState<SetStateAction<any>>('')
    const [WorkReport, setWorkReport] = React.useState<any>(); //입력정보

    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

    const alertModalOn = (msg : string, type?:string) => {
        if(type){
            setAlertModal({
                ...alertModal,
                alert:true,
                msg:msg,
                type : type ? type : '',
            })
        }
    }

    const alertModalOff = () => {
        setAlertModal(()=>initialAlert);
    }

    const alertAction = () => {

    }

    const {data : WorkReportData, isLoading : WorkReportDataLoading, isError : WorkReportDataError} = 
    /** mt_idx 임의입력 수정필요 */
    usePostQuery('getWorkReport',{mt_idx : '22',cdwt_idx:cdwt_idx},'pilot/pilot_work_info.php');

    const [workPilotInfo, setWorkPilotInfo] = React.useState<PilotWorkInfoType>();

    const inputHandler = (text:string, type? : string) => { //state input handler
        if(type){
            console.log(text,type);
            setWorkReport({
                ...WorkReport,
                data:{
                    ...WorkReport.data,
                    [type] : text,
                }
            })
        }
    }

    useEffect(()=>{
        {setPrice(comma('7000000'))}
    },[])

    React.useEffect(()=>{
        console.log(cdwt_idx);
        dispatch(toggleLoading(WorkReportDataLoading));

        if(WorkReportData){
            const {result,data,msg} = WorkReportData;

            if(result === 'true'){
                setWorkPilotInfo(data.data);
            }  
            else{
                alertModalOn(msg)
            }
        }

    },[WorkReportData,WorkReportDataLoading,WorkReportDataError])
    return(
        <View style={{flex:1}}>
        <BackHeader title="작업일보" />
        <BackHandlerCom />
        {workPilotInfo &&
            <ScrollView style={{flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
                <View style={WorkReportstyle.WhiteBox}>
                    <View style={[styles.TitleText]}>
                        <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                            작업일보</Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK2,marginRight:5}]}>
                            작업일자</Text>
                        <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK2}]}>
                            {workPilotInfo.cdwt_date}</Text>
                        </View>
                    </View>
                    <CustomInputTextBox
                        style={{height:46}}
                        title={'건설기계명'}
                        essential={true}
                        containerStyle={styles.SubTitleText}
                        input={workPilotInfo.cons_name}
                        setInput={inputHandler}
                        // type={'cct_c_company'}
                        imgfile={undefined}
                        editable={editMode !== 'view'}
                    />
                    <View style={[styles.SubTitleText]}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText]}>건설기계명
                        </Text>
                        <CustomInputTextBox
                            style={{height:46}}
                            placeholder={'굴착기'}
                            imgfile={undefined}
                            input={workPilotInfo.equip_name}
                            button={''}
                            action={()=>{}}
                            editable={false}
                            placeholderTextColor={colors.FONT_COLOR_BLACK}
                        />
                    </View>
                    <View style={[styles.SubTitleText]}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText]}>등록번호
                        </Text>
                        <CustomInputTextBox
                            style={{height:46}}
                            placeholder={'경남01가1234'}
                            input={workPilotInfo.equip_reg_no}
                            imgfile={undefined}
                            button={''}
                            action={()=>{}}
                            editable={false}
                            placeholderTextColor={colors.FONT_COLOR_BLACK}
                        />
                    </View>
                    <View style={[styles.SubTitleText]}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText]}>형식
                        </Text>
                        <CustomInputTextBox
                            style={{height:46}}
                            placeholder={'SOLAR55W'}
                            input={workPilotInfo.equip_style}
                            imgfile={undefined}
                            button={''}
                            action={()=>{}}
                            editable={false}
                            placeholderTextColor={colors.FONT_COLOR_BLACK}
                        />
                    </View>
                    <View style={[]}>
                        <View style={[styles.SubTitleText]}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText]}>현장명
                        </Text>
                        <CustomInputTextBox
                            style={{height:46}}
                            placeholder={'빈칸'}
                            input={workPilotInfo.crt_name}
                            imgfile={undefined}
                            button={''}
                            action={()=>{}}
                            editable={false}
                            placeholderTextColor={colors.FONT_COLOR_BLACK}
                        />
                        </View>
                        <View style={[styles.SubTitleText]}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText]}>작업내용
                        </Text>
                        <CustomInputTextBox
                            style={{height:46}}
                            placeholder={'빈칸'}
                            input={workPilotInfo.cdwt_content}
                            imgfile={undefined}
                            button={''}
                            action={()=>{}}
                            editable={false}
                            placeholderTextColor={colors.FONT_COLOR_BLACK}
                        />
                        </View>
                        <View style={[styles.SubTitleText]}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText]}>작업시간
                        </Text>
                        <CustomWaveBox
                            style={{height:46}}
                            placeholder1={'07:30'}
                            placeholder2={'16:30'}
                            imgfile={require('../../assets/img/ic_time.png')}
                            button={''}
                            action={()=>{}}
                            editable={false}
                            placeholderTextColor={colors.FONT_COLOR_BLACK}
                        />
                        </View>
                        <View style={[{borderBottomWidth:1,borderBottomColor:colors.BORDER_GRAY_COLOR,marginBottom:26}]}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText,]}>대금 - {workPilotInfo.cdwt_price_type === 'Y' ? '일대' : '월대'}</Text>
                        <View style={[styles.TextInputBox,{flexDirection:'row',flex:1,alignItems:'center',marginBottom:26,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}]}>
                            <TextInput
                            style={[fontStyle.f_regular,{flexShrink:1,paddingHorizontal:10,flex:1,fontSize:16,height:46,color:colors.FONT_COLOR_BLACK}]}
                            textAlign={'right'}
                            value={NumberComma(Number(workPilotInfo.cdwt_price))}
                            // onChangeText={(e:string)=>{setPrice(comma(e))}}
                            editable={false}
                            placeholderTextColor={colors.FONT_COLOR_BLACK}
                            />
                            <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginRight:15}]}>원</Text>
                        </View>
                        </View>
                        <View style={{}}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText,]}>기타사항
                        </Text>
                        <View style={[styles.TextInputBox,{flexDirection:'row',flex:1,marginBottom:26,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,minHeight:120,padding:10}]}>
                        <Text style={{color:colors.FONT_COLOR_BLACK}}> 글자글자 </Text>
                        </View>
                        </View>
                    </View>
                    </View>
                <View style={WorkReportstyle.WhiteBox}>
                    <View style={[styles.TitleText]}>
                        <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                            조종사</Text>
                    </View>
                    <View style={WorkReportstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.boxText1]}>서명</Text>
                        <Text style={[fontStyle.f_regular,WorkReportstyle.boxText1]}>여수 여수아파트 신축공사</Text>
                    </View>
                    <View style={WorkReportstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.boxText1]}>연락처</Text>
                        <Text style={[fontStyle.f_regular,WorkReportstyle.boxText1]}>010-1234-5678</Text>
                    </View>
                </View>
                <View style={WorkReportstyle.WhiteBox}>
                    <View style={[styles.TitleText]}>
                        <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                            건설회사</Text>
                    </View>
                    <View style={WorkReportstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.boxText1]}>건설회사명</Text>
                        <Text style={[fontStyle.f_regular,WorkReportstyle.boxText1]}>여수 여수아파트 신축공사</Text>
                    </View>
                    <View style={[WorkReportstyle.cardInbox,{marginBottom:26}]}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.boxText1]}>담당자</Text>
                        <Text style={[fontStyle.f_regular,WorkReportstyle.boxText1]}>010-1234-5678</Text>
                    </View>
                        {mt_type === '1' ?
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

                                <CustomButton
                                    action={()=>{console.log('승인'),navigation.goBack()}}
                                    label={'승인'}
                                    style={{flex:1,marginRight:10}}
                                />
                                <CustomButton
                                    action={()=>{console.log('반려')}}
                                    label={'반려'}
                                    style={{...styles.whiteButtonStyle,flex:1}}
                                    labelStyle={styles.whiteButtonLabelStyle}
                                />
                            </View>
                        :
                            <CustomButton
                                action={()=>{}}
                                label={'작업일보 제출하기'}
                                style={{flex:1,marginRight:10,marginTop:20}}
                            />
                        }
                </View>
            </ScrollView>
        }
        </View>
    )
}

const WorkReportstyle = StyleSheet.create({
    WhiteBox:{paddingHorizontal:20,paddingTop:30,paddingBottom:30,backgroundColor:colors.WHITE_COLOR,marginBottom:10},
    DefaultBlackText:{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10},
    cardInbox:{flexDirection:'row',justifyContent:'space-between',marginBottom:14},
    boxText1:{fontSize:16,color:colors.FONT_COLOR_BLACK},
})