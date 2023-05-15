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
import { usePostMutation, usePostQuery } from '../../util/reactQuery';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleLoading } from '../../redux/actions/LoadingAction';
import { AlertModal, initialAlert } from '../../modal/AlertModal';
import { BackHandlerCom } from '../../component/utils/BackHandlerCom';
import { NumberComma } from '../../util/func';
import DateTimePickerModal from "react-native-modal-datetime-picker";


export const WorkReport = ({cdwt_idx}:{cdwt_idx:string}) => {
    const {mt_idx,mt_type} = useAppSelector(state => state.userInfo);
    const dispatch = useAppDispatch();
    const {data : WorkReportData, isLoading : WorkReportDataLoading, isError : WorkReportDataError} = 
    /** mt_idx 임의입력 수정필요 */
    usePostQuery('getWorkReport',{mt_idx :mt_idx,cdwt_idx:cdwt_idx},'pilot/pilot_work_info.php');

    const writePilotWorkMutation = usePostMutation('writePilotWork' , 'pilot/pilot_work_write.php');

    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [editMode, setEditMode] = React.useState('');
    const [price,setPrice] = useState<SetStateAction<any>>('')
    const [inputInfo, setInputInfo] = React.useState({
        cdwt_content : '',
        cdwt_start_time : '',
        cdwt_end_time : '',
        cdwt_memo : '',
    }); //입력정보
    const [workPilotInfo, setWorkPilotInfo] = React.useState<PilotWorkInfoType>();

    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);
    const [startTimeModal, setStartTimeModal] = React.useState(false);
    const [endTimeModal, setEndTimeModal] = React.useState(false);


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
        if(alertModal.type === 'load_error'){
            navigation.goBack();
        }
        else if(alertModal.type === 'write_success'){
            navigation.popToTop(); //메인이동
        }
    }

    const inputHandler = (text:string, type? : string) => { //state input handler
        if(type){
            console.log(text,type);
            setInputInfo({
                ...inputInfo,
                [type] : text,
            })
        }
    }

    const timePickerHide = () => { //datepicker hide
        setStartTimeModal(false);
        setEndTimeModal(false);
    }

    const startTimeHandler = (time : Date) => { //작업시간 시작시각 선택 handler
        console.log(time);
        const hour = time.getHours() < 10 ? '0'+time.getHours() : time.getHours();
        const min = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes();
        setStartTimeModal(false);
        setInputInfo({
            ...inputInfo,
            cdwt_start_time : `${hour}:${min}:00`
        })
        
    }

    const endTimeHandler = (time : Date) => { //작업시간 종료시각 선택 handler
        const hour = time.getHours() < 10 ? '0'+time.getHours() : time.getHours();
        const min = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes();
        setEndTimeModal(false);
        setInputInfo({
            ...inputInfo,
            cdwt_end_time : `${hour}:${min}:00`
        })
    }

    const writePilotWorkHandler = async () => { //작업일보 작성

        const params = {
            mt_idx : mt_idx,
            cdwt_idx : cdwt_idx,
            cdwt_content : inputInfo.cdwt_content,
            cdwt_start_time : inputInfo.cdwt_start_time,
            cdwt_end_time : inputInfo.cdwt_end_time,
            cdwt_memo : inputInfo.cdwt_memo,
        }

        console.log(params);

        dispatch(toggleLoading(true));
        const {result,msg} = await writePilotWorkMutation.mutateAsync(params);
        dispatch(toggleLoading(false));

        console.log(result,msg);

        if(result === 'true'){
            alertModalOn('작업일보 제출이 완료되었습니다.','write_success');
        }
        else{
            alertModalOn(msg,'write_error');
        }
    }

    const writePilotWorkCheck = () => { //작업일보 작성 유효성 검사
        if(inputInfo.cdwt_content === ''){
            alertModalOn('작업내용을 입력해주세요.');
        }
        else if(inputInfo.cdwt_start_time === ''){
            alertModalOn('작업 시작시각을 선택해주세요.');
        }
        else if(inputInfo.cdwt_end_time === ''){
            alertModalOn('작업 종료시각을 선택해주세요.');
        }
        else{
            writePilotWorkHandler();
        }
    }

    React.useEffect(()=>{
        dispatch(toggleLoading(WorkReportDataLoading));

        if(WorkReportData){
            const {result,data,msg} = WorkReportData;

            if(result === 'true'){
                setWorkPilotInfo(data.data);
                setInputInfo({
                    ...inputInfo,
                    cdwt_content:data.data.cdwt_content,
                    cdwt_start_time:data.data.cdwt_start_time,
                    cdwt_end_time : data.data.cdwt_end_time,
                    cdwt_memo : data.data.cdwt_memo,
                })
            }  
            else{
                // alertModalOn('비정상적인 접근입니다.','load_error')
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
                        editable={false}
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
                        <CustomInputTextBox
                            title={'작업내용'}
                            style={{height:46}}
                            placeholder={'작업내용을 입력해주세요.'}
                            input={inputInfo.cdwt_content}
                            setInput={inputHandler}
                            type={'cdwt_content'}
                            imgfile={undefined}
                            editable
                            placeholderTextColor={colors.FONT_COLOR_BLACK}
                        />
                        </View>
                        <View style={[styles.SubTitleText]}>
                            <CustomWaveBox
                                text1={inputInfo.cdwt_start_time}
                                setText1={inputHandler}
                                type1={'cdwt_start_time'}
                                whiteReadOnly1={true}
                                text2={inputInfo.cdwt_end_time}
                                setText2={inputHandler}
                                type2={'cdwt_end_time'}
                                whiteReadOnly2={true}
                                imgfile={require('../../assets/img/ic_time.png')}
                                action={()=>{setStartTimeModal(true)}}
                                action2={()=>{setEndTimeModal(true)}}
                                editable={false}
                                title={'작업시간'}
                                essential
                            />
                        </View>
                        <View style={[{borderBottomWidth:1,borderBottomColor:colors.BORDER_GRAY_COLOR,marginBottom:26}]}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText,]}>대금 - {workPilotInfo.cdwt_price_type === 'Y' ? '일대' : '월대'}</Text>
                        <View style={[styles.TextInputBox,{flexDirection:'row',flex:1,alignItems:'center',marginBottom:26,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}]}>
                            <TextInput
                            style={[fontStyle.f_regular,{flexShrink:1,paddingHorizontal:10,flex:1,fontSize:16,height:46,color:colors.FONT_COLOR_BLACK}]}
                            textAlign={'right'}
                            value={String(NumberComma(Number(workPilotInfo.cdwt_price)))}
                            // onChangeText={(e:string)=>{setPrice(comma(e))}}
                            editable={false}
                            placeholderTextColor={colors.FONT_COLOR_BLACK}
                            />
                            <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginRight:15}]}>원</Text>
                        </View>
                        </View>
                        <View style={{}}>
                            <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText,]}>기타사항</Text>
                            <View>
                                <TextInput 
                                    style={{ borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 4, padding: 10, minHeight: 150,}}
                                    textAlignVertical="top"
                                    placeholder="기타사항을 입력해주세요."
                                    placeholderTextColor={colors.BORDER_GRAY_COLOR3}
                                    multiline={true}
                                    numberOfLines={4}
                                    editable
                                    onChange={(e) => console.log(e.nativeEvent.text)}
                                />
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
                        <Text style={[fontStyle.f_regular,WorkReportstyle.boxText1]}>{workPilotInfo.pilot_name}</Text>
                    </View>
                    <View style={WorkReportstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.boxText1]}>연락처</Text>
                        <Text style={[fontStyle.f_regular,WorkReportstyle.boxText1]}>{workPilotInfo.pilot_hp}</Text>
                    </View>
                </View>
                <View style={WorkReportstyle.WhiteBox}>
                    <View style={[styles.TitleText]}>
                        <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                            건설회사</Text>
                    </View>
                    <View style={WorkReportstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.boxText1]}>건설회사명</Text>
                        <Text style={[fontStyle.f_regular,WorkReportstyle.boxText1]}>{workPilotInfo.cons_name}</Text>
                    </View>
                    <View style={[WorkReportstyle.cardInbox,{marginBottom:26}]}>
                        <Text style={[fontStyle.f_semibold,WorkReportstyle.boxText1]}>담당자 전화번호</Text>
                        <Text style={[fontStyle.f_regular,WorkReportstyle.boxText1]}>{workPilotInfo.cons_hp}</Text>
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
                                action={writePilotWorkCheck}
                                label={'작업일보 제출하기'}
                                style={{flex:1,marginRight:10,marginTop:20}}
                            />
                        }
                </View>
            </ScrollView>
        }
        <DateTimePickerModal //작업시간 picker
            isVisible={startTimeModal}
            mode="time"
            onConfirm={startTimeHandler}
            onCancel={timePickerHide}
        />
            <DateTimePickerModal //작업시간 picker
            isVisible={endTimeModal}
            mode="time"
            onConfirm={endTimeHandler}
            onCancel={timePickerHide}
        />
        <AlertModal 
            show={alertModal.alert}
            msg={alertModal.msg}
            type={alertModal.type}
            hide={alertModalOff}
            action={alertAction}
        />
        </View>
    )
}

const WorkReportstyle = StyleSheet.create({
    WhiteBox:{paddingHorizontal:20,paddingTop:30,paddingBottom:30,backgroundColor:colors.WHITE_COLOR,marginBottom:10},
    DefaultBlackText:{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10},
    cardInbox:{flexDirection:'row',justifyContent:'space-between',marginBottom:14},
    boxText1:{fontSize:16,color:colors.FONT_COLOR_BLACK},
})