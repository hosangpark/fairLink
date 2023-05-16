import React,{useState,useEffect, SetStateAction} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import { BoardIndexType, ContractItemType, ElectronicContractType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { CustomButton } from '../../component/CustomButton';
import { useNavigation } from '@react-navigation/native';    
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { CustomInputTextBox } from '../../component/CustomInputTextBox';
import { CustomWaveBox } from '../../component/CustomWaveBox';
import { CustomSelectBox } from '../../component/CustomSelectBox';
import CheckBox from '@react-native-community/checkbox';
import { TextInput } from 'react-native-gesture-handler';
import { comma } from '../../component/utils/funcKt';
import { AlertModal,initialAlert } from '../../modal/AlertModal';
import { AlertClearType } from '../../modal/modalType';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleLoading } from '../../redux/actions/LoadingAction';
import { usePostMutation, usePostQuery } from '../../util/reactQuery';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { initialElectorincInfo } from '../../component/initialInform';



export const ElectronicContract = ({route}:ElectronicContractType) => {
    const {cot_idx,cat_idx,contract_idx,route_type} = route.params;
    const dispatch = useAppDispatch();
    const {mt_idx,mt_type} = useAppSelector(state => state.userInfo);
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [editMode, setEditMode] = React.useState('');
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(()=>initialAlert); //alert 객체 생성 (초기값으로 clear);

    const [Electronic, setElectronic] = React.useState<ContractItemType>(initialElectorincInfo); //입력정보

    const [startDateModal, setStartDateModal] = React.useState({ //공시기간 시작일 modal
        show:false,
        date:new Date()
    });
    const [endDateModal, setEndDateModal] = React.useState({ //공사기간 마지막일 modal
        show:false,
        date : new Date()
    });

    const alertModalOn = (msg : string, type? : string) => { //alert 켜기
        setAlertModal({
            alert:true,
            strongMsg:'',
            msg:msg,
            type:type? type:'confirm' ,
        })
    }
    const alertModalOff = () =>{ //modal 종료
        setAlertModal(initialAlert)
    }

    const {data : ElectronicData, isLoading : ElectronicDataLoading, isError : ElectronicDataError} = 
    /** mt_idx 임의입력 수정필요 */
    route_type == 'Info2' ?
    usePostQuery('getElectronicInfo2',{mt_idx : mt_idx,contract_idx:contract_idx},'cons/cons_contract_info2.php')
    :
    usePostQuery('getElectronicInfo',{mt_idx : mt_idx,cot_idx:cot_idx,cat_idx:cat_idx},'cons/cons_contract_info.php')

    const contractAdd = usePostMutation('getcontractAdd' , 'cons/cons_contract_add.php'); //프로필 정보 불러오기

    const inputHandler = (text:string, type? : string) => { //state input handler
        if(type){
            console.log(text,type);
            setElectronic({
                ...Electronic,
                data:{
                    ...Electronic.data,
                    [type] : text,
                }
            })
        }
    }
    const datePickerHide = () => { //datepicker hide
        setStartDateModal({...startDateModal, show:false});
        setEndDateModal({...endDateModal, show:false});
    }

    const startDateHandler = (date : Date) => { //공사기간 시작일 선택 handler
        setStartDateModal({
            show:false,
            date : date,
        })
        const tempDate = `${date.getFullYear()}-${(date.getMonth()+1) < 10 ? '0'+String((date.getMonth()+1)) : date.getMonth()+1}-${(date.getDate()) < 10 ? '0'+date.getDate() : date.getDate()}`
    
        setElectronic({
            ...Electronic,
            data:{
                ...Electronic.data,
                cct_start_date : tempDate,
            }
        })
    }
    const endDateHandler = (date : Date) => { //공사기간 마지막날 선택 handler
        setEndDateModal({
            show:false,
            date : date,
        })
        const startDate = startDateModal.date;
        if(date < startDate){
            alertModalOn('마지막일은 시작일보다 빠를 수 없습니다.','확인');
        }
        else{
            const tempDate = `${date.getFullYear()}-${(date.getMonth()+1) < 10 ? '0'+String((date.getMonth()+1)) : date.getMonth()+1}-${(date.getDate()) < 10 ? '0'+date.getDate() : date.getDate()}`
            setElectronic({
                ...Electronic,
                data:{
                    ...Electronic.data,
                    cct_end_date : tempDate,
                }
            })
        }
    }

    const Contracthandler = async()=>{
        let param = {
            mt_idx:mt_idx,
            cot_idx:Electronic.data.cot_idx,
            cat_idx:Electronic.data.cat_idx,
            cct_e_type:Electronic.data.cct_e_type,
            cct_e_reg_no:Electronic.data.cct_e_reg_no,
            cct_e_style:Electronic.data.cct_e_style,
            cct_e_ocrdate2:Electronic.data.cct_e_ocrdate2,
            cct_e_ocrdate1:Electronic.data.cct_e_ocrdate1,
            cct_c_name:Electronic.data.cct_c_name,
            cct_c_location:Electronic.data.cct_c_location,
            cct_c_manage:Electronic.data.cct_c_manage,
            cct_c_company:Electronic.data.cct_c_company,
            cct_c_file_check:Electronic.data.cct_c_file_check,
            cct_start_date:Electronic.data.cct_start_date,
            cct_end_date:Electronic.data.cct_end_date,
            cct_pay_price:Electronic.data.cct_pay_price,
            cct_time:Electronic.data.cct_time,
            cct_pay_check1:Electronic.data.cct_pay_check1,
            cct_pay_check2:Electronic.data.cct_pay_check2,
        }
        if(alertModal.type == 'check'){
            navigation.navigate('Board')
        } else {
            const {data, result , msg } = await contractAdd.mutateAsync(param);
            if(result == 'true'){
                alertModalOn(msg,'check')
            } else {
                alertModalOn(msg,'check')
            }
        }
    }

    /** 이미 신청된 경우 */
    // useEffect(()=>{
    //     alertModalOn('장비회사가 계약 확인중입니다.', 'test')
    // },[])
    useEffect(()=>{
        if(mt_type !== '1'){
            setEditMode('view')
        }
        dispatch(toggleLoading(ElectronicDataLoading));
        if(ElectronicData){
            if(ElectronicData.result == 'true'){
                setElectronic(ElectronicData.data);
            }
        }
    },[ElectronicData])

    return(
        <View style={{flex:1}}>
        <BackHeader title="전자계약" />
        {ElectronicData &&
        <ScrollView style={{flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
                <View style={ElectronicContractstyle.WhiteBox}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                        건설기계</Text>
                </View>
                <CustomInputTextBox
                    style={{height:46}}
                    title={'건설기계명'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={Electronic.data.cct_e_type}
                    setInput={inputHandler}
                    type={'cct_e_type'}
                    imgfile={undefined}
                    editable={editMode !== 'view'}
                    placeholder={'빈칸'}
                />
                <CustomInputTextBox
                    style={{height:46}}
                    title={'등록번호'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={Electronic.data.cct_e_reg_no}
                    setInput={inputHandler}
                    type={'cct_e_reg_no'}
                    imgfile={undefined}
                    editable={editMode !== 'view'}
                    placeholder={'빈칸'}
                />
                <CustomInputTextBox
                    style={{height:46}}
                    title={'형식'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={Electronic.data.cct_e_style}
                    setInput={inputHandler}
                    type={'cct_e_style'}
                    imgfile={undefined}
                    editable={editMode !== 'view'}
                    placeholder={'빈칸'}
                />
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>보험가입현황
                    </Text>
                    <CustomWaveBox
                        style={{height:46}}
                        placeholderTextColor=''
                        text1={Electronic.data.cct_start_date}
                        setText1={inputHandler}
                        type1={'crt_start_date'}
                        text2={Electronic.data.cct_end_date}
                        setText2={inputHandler}
                        type2={'crt_end_date'}
                        imgfile={require('../../assets/img/ic_calendar.png')}
                        action={()=>{if(editMode !== 'view')setStartDateModal({...startDateModal,show:true})}}
                        action2={()=>{if(editMode !== 'view')setEndDateModal({...endDateModal,show:true})}}
                        editable={editMode !== 'view'}
                    />
                </View>
                <CustomInputTextBox
                    style={{height:46}}
                    title={'정기검사여부'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={Electronic.data.cct_e_ocrdate1}
                    setInput={inputHandler}
                    type={'cct_e_ocrdate1'}
                    imgfile={undefined}
                    editable={editMode !== 'view'}
                    placeholder={'빈 칸'}
                />
                </View>
                <View style={ElectronicContractstyle.WhiteBox}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                        현장</Text>
                </View>
                <CustomInputTextBox
                    style={{height:46}}
                    title={'현장명'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={Electronic.data.cct_c_name}
                    setInput={inputHandler}
                    type={'cct_c_name'}
                    imgfile={undefined}
                    editable={editMode !== 'view'}
                />
                <CustomInputTextBox
                    style={{height:46}}
                    title={'현장소재지'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={Electronic.data.cct_c_location}
                    setInput={inputHandler}
                    type={'cct_c_location'}
                    imgfile={undefined}
                    editable={editMode !== 'view'}
                />
                <CustomInputTextBox
                    style={{height:46}}
                    title={'발주자'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={Electronic.data.cct_c_manage}
                    setInput={inputHandler}
                    type={'cct_c_manage'}
                    imgfile={undefined}
                    editable={editMode !== 'view'}
                />
                <CustomInputTextBox
                    style={{height:46}}
                    title={'건설업자'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={Electronic.data.cct_c_company}
                    setInput={inputHandler}
                    type={'cct_c_company'}
                    imgfile={undefined}
                    editable={editMode !== 'view'}
                />
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>건설기계대여대금지급보증여부
                    </Text>
                    <TouchableOpacity style={{flexDirection:'row',}} onPress={()=>[setElectronic({
                            ...Electronic,
                            data: {
                                ...Electronic.data,
                                cct_c_file_check:Electronic.data.cct_c_file_check == "Y" ? "N":"Y"
                            }
                        })]}
                        disabled={editMode == 'view'}
                        >
                        <CheckBox 
                        value={Electronic.data.cct_c_file_check == "Y"}
                        onValueChange={()=>{
                            setElectronic({
                            ...Electronic,
                            data: {
                                ...Electronic.data,
                                cct_c_file_check:Electronic.data.cct_c_file_check == "Y" ? "N":"Y"
                            }
                        })
                        }}
                        disabled={editMode == 'view'}
                        />
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginTop:3}]}>가입완료
                        </Text>
                    </TouchableOpacity>
                </View>
                
                </View>
                <View style={ElectronicContractstyle.WhiteBox}>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>사용기간
                    </Text>
                    <CustomWaveBox
                        style={{height:46}}
                        placeholderTextColor=''
                        text1={Electronic.data.cct_start_date}
                        setText1={inputHandler}
                        type1={'crt_start_date'}
                        text2={Electronic.data.cct_end_date}
                        setText2={inputHandler}
                        type2={'crt_end_date'}
                        imgfile={require('../../assets/img/ic_calendar.png')}
                        action={()=>{if(editMode !== 'view')setStartDateModal({...startDateModal,show:true})}}
                        action2={()=>{if(editMode !== 'view')setEndDateModal({...endDateModal,show:true})}}
                        editable={editMode !== 'view'}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText,]}>사용금액
                    </Text>
                    <View style={[(editMode !== 'view') ?styles.TextInputBox:styles.TextInputFalseBox,{flexDirection:'row',flex:1,alignItems:'center',marginBottom:26}]}>
                        <TextInput
                        style={[fontStyle.f_regular,{flexShrink:1,paddingHorizontal:10,flex:1,fontSize:16,height:46,color:colors.FONT_COLOR_BLACK}]}
                        textAlign={'right'}
                        value={Electronic.data.cct_pay_price}
                        keyboardType={'number-pad'}
                        onChangeText={(e:string)=>{
                            setElectronic({
                            ...Electronic,
                            data: {
                                ...Electronic.data,
                                cct_pay_price:comma(e)
                            }
                        })
                        }}
                        editable={editMode !== 'view'}
                        />
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginRight:15}]}>원</Text>
                    </View>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText,]}>가동시간
                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{flexDirection:'row',flex:1}} onPress={()=>{
                            setElectronic({
                            ...Electronic,
                            data: {
                                ...Electronic.data,
                                cct_time:Electronic.data.cct_time == "1" ? "2":"1"
                            }})
                        }}
                        disabled={editMode == 'view'}
                        >
                            <CheckBox 
                            value={Electronic.data.cct_time == "1"}
                            onValueChange={()=>{
                            setElectronic({
                            ...Electronic,
                            data: {
                                ...Electronic.data,
                                cct_time:Electronic.data.cct_time == "1" ? "2":"1"
                            }})
                            }}
                            disabled={editMode == 'view'}
                            />
                            <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginTop:3,flexShrink:1}]}>1일 8시간 기준
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',flex:1}} onPress={()=>{
                             setElectronic({
                            ...Electronic,
                            data: {
                                ...Electronic.data,
                                cct_time:Electronic.data.cct_time == "1" ? "2":"1"
                            }})
                        }}
                        disabled={editMode == 'view'}
                        >
                            <CheckBox 
                            value={Electronic.data.cct_time == "2"}
                            onValueChange={()=>{
                            setElectronic({
                            ...Electronic,
                            data: {
                                ...Electronic.data,
                                cct_time:Electronic.data.cct_time == "1" ? "2":"1"
                            }})
                            }}
                            disabled={editMode == 'view'}
                            />
                            <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginTop:3,flexShrink:1}]}>월 200시간 기준
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText,{marginTop:26}]}>지급시기
                    </Text>
                    <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:16,color:colors.FONT_COLOR_BLACK}}> · </Text>
                        <View>
                            <Text style={[fontStyle.f_medium,ElectronicContractstyle.DefaultBlackText]}>
                                대여기간이 1개월 초과하는 경우
                            </Text>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={[fontStyle.f_regular,ElectronicContractstyle.DefaultBlackText]}>
                                    매월 종료하는 날부터
                                </Text>
                                <TextInput style={[fontStyle.f_regular,{padding:0,width:70,borderBottomWidth:1,borderBottomColor:colors.BORDER_GRAY_COLOR,marginLeft:20,height:30,fontSize:16,marginBottom:10}]} textAlign="center"
                                value={Electronic.data.cct_pay_check1}
                                onChangeText={(e)=>{inputHandler(e,'cct_pay_check1')}}
                                editable={editMode !== 'view'}
                                />
                                <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>
                                    일 이내
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:16,color:colors.FONT_COLOR_BLACK}}> · </Text>
                        <View>
                            <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>
                                대여기간이 1개월 이하인 경우
                            </Text>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={[fontStyle.f_regular,ElectronicContractstyle.DefaultBlackText]}>
                                    그 기간이 종료하는 날부터
                                </Text>
                                <TextInput style={[fontStyle.f_regular,{padding:0,width:70,borderBottomWidth:1,borderBottomColor:colors.BORDER_GRAY_COLOR,marginLeft:20,height:30,fontSize:16,marginBottom:10}]} textAlign="center"
                                value={Electronic.data.cct_pay_check2}
                                onChangeText={(e)=>{inputHandler(e,'cct_pay_check2')}}
                                editable={editMode !== 'view'}
                                />
                                <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>
                                    일 이내
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                  
                
                </View>
                <View style={ElectronicContractstyle.WhiteBox}>
                <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'flex-end',}}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>계약서 작성일</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                    2023.03.03
                    </Text>
                </View>
                </View>
                <View style={ElectronicContractstyle.WhiteBox}>
                <View style={[styles.TitleText]}>
                <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                    임대인</Text>
                </View>
                <View>
                    <ElectronicLayoutbox
                        title={'상호'}
                        text={Electronic.data1.company}
                    />
                    <ElectronicLayoutbox
                        title={'사업자등록번호'}
                        text={Electronic.data1.busi_num}
                    />
                    <ElectronicLayoutbox
                        title={'성명'}
                        text={Electronic.data1.name}
                    />
                    <ElectronicLayoutbox
                        title={'주민등록번호'}
                        text={Electronic.data1.birth_num}
                    />
                    <ElectronicLayoutbox
                        title={'주소'}
                        text={'주소없음'}
                    />
                </View>
                </View>
                <View style={ElectronicContractstyle.WhiteBox}>
                    <View style={[styles.TitleText]}>
                <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                    임차인</Text>
                </View>
                <View style={{marginBottom:30}}>
                    <ElectronicLayoutbox
                        title={'상호'}
                        text={Electronic.data2.company}
                    />
                    <ElectronicLayoutbox
                        title={'사업자등록번호'}
                        text={Electronic.data2.busi_num}
                    />
                    <ElectronicLayoutbox
                        title={'성명'}
                        text={Electronic.data2.name}
                    />
                    <ElectronicLayoutbox
                        title={'주민등록번호'}
                        text={Electronic.data2.birth_num}
                    />
                    <ElectronicLayoutbox
                        title={'주소'}
                        text={'주소없음'}
                    />
                </View>
                {route_type == 'Info2'?
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <CustomButton
                        style={{flex:1,marginRight:10}}
                        label={'계약 체결'}
                        action={()=>{alertModalOn(`건설기계임대차계약을${'\n'}체결하시게습니까?`, 'confirm');}}
                    />
                    <CustomButton
                        style={{...styles.whiteButtonStyle,flex:1}}
                        label={'계약서 수정 요청'}
                        labelStyle={styles.whiteButtonLabelStyle}
                        action={()=>{alertModalOn(`계약서 수정요청을 하시겠습니까?`, 'confirm');}}
                    />
                </View>
                :
                <CustomButton
                style={{}}
                labelStyle={{}}
                label={'임대계약서 전송'}
                action={()=>{
                    alertModalOn('임대계약서를 전송하시겠습니까?', 'confirm');}}
                />
                }
                </View>
        </ScrollView>
        }
        <AlertModal
            show={alertModal.alert}
            msg={alertModal.msg}
            hide={alertModalOff}
            type={alertModal.type}
            action={Contracthandler}
        />
        <DateTimePickerModal //공사기간 시작일 date picker
            isVisible={startDateModal.show}
            mode="date"
            onConfirm={startDateHandler}
            onCancel={datePickerHide}
            date={startDateModal.date}
        />
        <DateTimePickerModal //공사기간 마지막일 date picker
            isVisible={endDateModal.show}
            mode="date"
            onConfirm={endDateHandler}
            onCancel={datePickerHide}
            date={endDateModal.date}
        />
        </View>
    )
}

const ElectronicContractstyle = StyleSheet.create({
    WhiteBox:{paddingHorizontal:20,paddingTop:30,paddingBottom:30,backgroundColor:colors.WHITE_COLOR,marginBottom:10},
    DefaultBlackText:{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10},
    cardInbox:{flexDirection:'row',justifyContent:'space-between',marginBottom:14},
    boxText1:{fontSize:16,color:colors.FONT_COLOR_BLACK},
})

const ElectronicLayoutbox = ({title,text}:{title:string,text:string}) =>{
    return(
        <View style={ElectronicContractstyle.cardInbox}>
            <Text style={[fontStyle.f_semibold,ElectronicContractstyle.boxText1,{marginRight:80}]}>
                {title}
            </Text>
            <Text style={[fontStyle.f_regular,ElectronicContractstyle.boxText1,{flexShrink:1}]}>
                {text}
            </Text>
        </View>
    )
}