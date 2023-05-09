import React from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BackHeader } from '../../../component/header/BackHeader';
import { AcqReqStep1Type, ManagerItemType, ObjArrayType, ReqTopInfo } from '../../screenType';
import { usePostMutation, usePostQuery } from '../../../util/reactQuery';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { AlertModal, initialAlert } from '../../../modal/AlertModal';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../../style/style';
import { RouterNavigatorParams } from '../../../../type/routerType';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { toggleLoading } from '../../../redux/actions/LoadingAction';
import { MarginCom } from '../../../component/MarginCom';
import { CustomSelectBox } from '../../../component/CustomSelectBox';
import { accessoriesConvert, getEquStaDetailCon, getEquipListConverter, getEquipStandConverter, speciesList } from '../../../component/utils/list';
import { CustomInputTextBox } from '../../../component/CustomInputTextBox';
import { CustomWaveBox } from '../../../component/CustomWaveBox';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CheckBox from '@react-native-community/checkbox';
import { SelectModal } from '../../../modal/SelectModal';
import { CustomButton } from '../../../component/CustomButton';
import { RequestRouterNavigatorParams } from '../../../../type/RequestRouterType';
import { LastDispatchInfoModal } from '../../../modal/LastDispatchInfoModal';

export type PublicReqStep1ItemType = {
    cot_species : string, //공종
    cot_content:string, //내용
    cot_location:string, //위치
    cot_start_date:string, //작업시작일
    cot_end_date : string, //작업종료일
    cot_start_time :string, //작업시간 시작
    cot_end_time : string, //작업시간 끝
    cot_sat : string, //토요일 제외 y n
    cot_sun : string, //일요일 제외 y n
    cot_m_idx : string, //담당자 idx
    cot_m_name : string, //담당자 이름
    cot_m_num : string, //담당자 번호
    cot_e_sub : string[],  //부속부품

    cot_e_type : string, //장비타입
    cot_e_stand1 : string, //장비 규격
    cot_e_stand2 : string, //장비 세부규격
    cot_e_year : string //장비 최소연식
}

export const PublicReqStep1 = ({route}:AcqReqStep1Type) => { //공개 배차요청 step1

    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams & RequestRouterNavigatorParams>>();
    const dispatch = useAppDispatch();
    // const {item} = route.params //item : 선택한 지인 정보
    const {mt_idx, mt_type} = useAppSelector(state => state.userInfo);

    //상단 정보 (내정보)
    const {data:myInfoData, isLoading : myInfoLoading, isError : myInfoError } = usePostQuery('getMyInfo',{mt_idx:mt_idx},'cons/cons_order_top.php');
    
    //담당자 불러오기
    const {data:myManData, isLoading : myManLoading, isError : myManError} = usePostQuery('getMyManData',{mt_idx:mt_idx},'cons/manager_list.php');
    const getEquipListMutation = usePostMutation('getEquipList','/equip_filter.php');//장비 타입 불러오기
    
    const [myInfo, setMyInfo] = React.useState<ReqTopInfo>();
    const [managerList, setMangetList] = React.useState<ObjArrayType[]>([]); //담당자 정보리스트
    const [tempSelAcc , setTempSelAcc] = React.useState(''); //부속장치 선택값
    const [writeSelAcc, setWriteSelAcc] = React.useState(''); //부속장치 직접입력
    const [equipMainList, setEquipMianList] = React.useState<object[]>([]);

    const [inputInfo, setInputInfo] = React.useState<PublicReqStep1ItemType>({
        cot_species : '',
        cot_content:'',
        cot_location:'',
        cot_start_date:'',
        cot_end_date : '',
        cot_start_time :'',
        cot_end_time : '',
        cot_sat : 'N',
        cot_sun : 'N',
        cot_m_idx : '',
        cot_m_name : '',
        cot_m_num : '',
        cot_e_sub : [],   

        cot_e_type : '',
        cot_e_stand1 : '',
        cot_e_stand2 : '',
        cot_e_year : '2023',
    })
    const [startDateModal, setStartDateModal] = React.useState({ //작업기간 시작일 modal
        show:false,
        date:new Date()
    });
    const [endDateModal, setEndDateModal] = React.useState({ //작업기간 마지막일 modal
        show:false,
        date : new Date()
    });

    const [selectModal, setSelectModal] = React.useState(false);
    const [startTimeModal, setStartTimeModal] = React.useState(false);
    const [endTimeModal, setEndTimeModal] = React.useState(false);
    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);
    const [lastDisModal, setLastDisModal] = React.useState(false);

    const alertModalOn = (msg : string, type? : string) =>{
        setAlertModal({
            ...alertModal,
            alert:true,
            msg:msg,
            type:type ? type : '',
        })
    }
    const alertModalOff = () => {
        setAlertModal(()=>initialAlert);
    }

    const alertAction = () => {
        if(alertModal.type === 'error'){
            navigation.goBack();
        }
    }

    const inputHandler = (text:string , type? : string) => {
        console.log(text, type);
        if(type){
            setInputInfo({
                ...inputInfo,
                [type] : text,
            })
        }
    }

    const datePickerHide = () => { //datepicker hide
        setStartDateModal({...startDateModal, show:false});
        setEndDateModal({...endDateModal, show:false});
    }
    const timePickerHide = () => { //datepicker hide
        setStartTimeModal(false);
        setEndTimeModal(false);
    }

    const startDateHandler = (date : Date) => { //작업기간 시작일 선택 handler
        setStartDateModal({
            show:false,
            date : date,
        })
        const tempDate = `${date.getFullYear()}-${(date.getMonth()+1) < 10 ? '0'+String((date.getMonth()+1)) : date.getMonth()+1}-${(date.getDate()) < 10 ? '0'+date.getDate() : date.getDate()}`
    
        setInputInfo({
            ...inputInfo,
            cot_start_date : tempDate,
        })
    }
    const endDateHandler = (date : Date) => { //작업기간 마지막날 선택 handler
        setEndDateModal({
            show:false,
            date : date,
        })

        const startDate = startDateModal.date;

        if(date < startDate){
            alertModalOn('마지막일은 시작일보다 빠를 수 없습니다.','');
        }
        else{
            const tempDate = `${date.getFullYear()}-${(date.getMonth()+1) < 10 ? '0'+String((date.getMonth()+1)) : date.getMonth()+1}-${(date.getDate()) < 10 ? '0'+date.getDate() : date.getDate()}`
        
            setInputInfo({
                ...inputInfo,
                cot_end_date : tempDate,
            })
        }
    }

    const startTimeHandler = (time : Date) => { //작업기간 시작일 선택 handler
        console.log(time);
        const hour = time.getHours() < 10 ? '0'+time.getHours() : time.getHours();
        const min = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes();
        setStartTimeModal(false);
        setInputInfo({
            ...inputInfo,
            cot_start_time : `${hour}:${min}`
        })
        
    }

    const endTimeHandler = (time : Date) => { //작업기간 시작일 선택 handler
        const hour = time.getHours() < 10 ? '0'+time.getHours() : time.getHours();
        const min = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes();
        setEndTimeModal(false);
        setInputInfo({
            ...inputInfo,
            cot_end_time : `${hour}:${min}`
        })
    }
    const managerSelHandler = () => { //담당자 선택했을때 데이터 처리

        if(inputInfo.cot_m_idx === ''){
            setSelectModal(false);
        }
        else{
            const manaData = myManData.data.data;

            if(manaData && manaData.length > 0){

                const selManaData = manaData.filter((el : ManagerItemType)=>el.crt_m_cons_idx === inputInfo.cot_m_idx);

                setInputInfo({
                    ...inputInfo,
                    cot_m_name : selManaData[0].crt_m_name,
                    cot_m_num : selManaData[0].crt_m_num,
                });

                setSelectModal(false);
            }
        }
    }

    const tempSelAccHandler = (text:string) => { //부속장치 선택했을때 임시 저장
        setTempSelAcc(text);
    }
    const writeSelHandler = (text:string) => {
        setWriteSelAcc(text);
    } 

    const accessoriesAddHandler = () => { //부속장치 추가했을때 이벤트
        if(inputInfo.cot_e_sub.length === 5){
            alertModalOn('부속 장치는 5개까지 선택가능합니다.');
        }
        else if(inputInfo.cot_e_type === ''){
            alertModalOn('장비종류를 선택해주세요.');
        }
        else if(tempSelAcc === '기타(직접입력)' && writeSelAcc === ''){
            alertModalOn('부속 장치를 입력해주세요.');
        }
        else{
            let tempArray : string[] = [...inputInfo.cot_e_sub];

            let flag = true;
            inputInfo.cot_e_sub.forEach((item,index) => {
                if(tempSelAcc === item || writeSelAcc === item){
                    console.log(tempSelAcc, writeSelAcc);
                    alertModalOn('이미 선택한 부속 장치 입니다.');
                    flag = false;
                    return;
                }
            })
            if(flag){
                if(tempSelAcc === '기타(직접입력)'){
                    tempArray.push(writeSelAcc);
                }
                else{
                    tempArray.push(tempSelAcc);
                }
                setInputInfo({
                    ...inputInfo,
                    cot_e_sub : [...tempArray],
                })
                setTempSelAcc('');
                setWriteSelAcc('');
            }
        }
    }

    const getEquipList = async () => { //장비 리스트 불러오기
        const {data} = await getEquipListMutation.mutateAsync({});

        setEquipMianList(data.data);
    }

    const deleteAccHandler = (index:number) => { //부속장치 삭제
        let tempArray : string[] = [...inputInfo.cot_e_sub];
        if(tempArray[index]){
            tempArray.splice(index,1);

            setInputInfo({
                ...inputInfo,
                cot_e_sub : [...tempArray]
            })
        }
    }

    const inputCheckHandler = () =>{
        if(inputInfo.cot_species === ''){
            alertModalOn('작업정보 공종을 선택해주세요.');
        }
        else if(inputInfo.cot_content === ''){
            alertModalOn('작업정보 내용을 입력해주세요.');
        } 
        else if(inputInfo.cot_location === ''){
            alertModalOn('작업정보 위치를 입력해주세요.');
        }
        else if(inputInfo.cot_start_date === '' || inputInfo.cot_end_date === ''){
            alertModalOn('작업기간을 선택해주세요.');
        }
        else if(inputInfo.cot_start_time === '' || inputInfo.cot_end_time === ''){
            alertModalOn('작업시간을 선택해주세요.');
        }
        else if(inputInfo.cot_m_idx === ''){
            alertModalOn('담당자를 선택해주세요.');
        }
        else if(inputInfo.cot_e_type === ''){
            alertModalOn('장비 종류를 선택해주세요.');
        }
        else if(inputInfo.cot_e_stand1 === ''){
            alertModalOn('장비 규격을 선택해주세요.');
        }
        else if(inputInfo.cot_e_stand2 === ''){
            alertModalOn('장비 상세 규격을 선택해주세요.');
        }
        else{
            navigation.navigate('PublicReqStep2',{firstInputInfo:inputInfo});
        }
    }

    React.useEffect(()=>{
        getEquipList();
    },[])

    React.useEffect(()=>{
        if(inputInfo.cot_e_type !== ''){
            setInputInfo({
                ...inputInfo,
                cot_e_stand1 : '',
                cot_e_stand2 : '',
                cot_e_sub:[],
            })
            setTempSelAcc('');
        }
    },[inputInfo.cot_e_type])

    React.useEffect(()=>{
        setInputInfo({
            ...inputInfo,
            cot_e_stand2 : '',
        })
    },[inputInfo.cot_e_stand1])

    React.useEffect(()=>{
        dispatch(toggleLoading(myInfoLoading));
        if(myInfoError){
            alertModalOn(`예기치 못한 오류가 발생했습니다\n고객센터로 문의해주세요. \n error type : Filed load cons_order_top`,'error');
        }
        else{
            if(myInfoData){
                if(myInfoData.result == 'true'){
                    setMyInfo(myInfoData.data.data);
                }
                else{
                    alertModalOn(myInfoData.msg,'error')
                }
            }
        }
    },[myInfoData,myInfoLoading,myInfoError])

    React.useEffect(()=>{
        dispatch(toggleLoading(myManLoading));
        if(myManData){
            // console.log(manList);
            const manListArray = myManData.data.data;

            let tempArray : ObjArrayType[] = []; //매니저정보 selectBox화
            if(manListArray.length > 0 ){
                manListArray.forEach((item:ManagerItemType,index:number) => {
                    tempArray.push({
                        name : item.crt_m_name,
                        key : item.crt_m_cons_idx
                    })
                })
            }

            setMangetList([...tempArray]);
        }
        
    },[myManData])

    React.useEffect(()=>{
        if(myManData){
            const crt_arr = myManData.data.data.filter((el:any) => el.crt_m_cons_idx === inputInfo.cot_m_idx);
            if(crt_arr.length > 0){
                setInputInfo({
                    ...inputInfo,
                    cot_m_name : crt_arr[0].crt_m_name,
                    cot_m_num : crt_arr[0].crt_m_num
                })
            }
        }
    },[inputInfo.cot_m_idx])
    return(
        <View style={{flex:1}}>
            <BackHeader title={'공개 배차요청'}/>
            {myInfoData &&
                <ScrollView style={{flex:1}}>
                    <KeyboardAvoidingView>
                        <View style={[styles.white_box_con]}>
                            <View style={[styles.card2Wrapper,{borderWidth:1,paddingHorizontal:0,paddingBottom:0}]}>
                                <View style={{paddingHorizontal:20,paddingBottom:20}}>
                                    <Text style={[fontStyle.f_semibold,{fontSize:16, color:colors.MAIN_COLOR}]}>현장명</Text>
                                    <Text style={[fontStyle.f_semibold,{fontSize:18 , color:colors.FONT_COLOR_BLACK}]}>{myInfo?.crt_name}</Text>
                                </View>
                                <View style={{borderTopWidth:1,borderTopColor:colors.BORDER_GRAY_COLOR,padding:20,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,zIndex:1,borderBottomEndRadius:8}}>
                                    <View>
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                            <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,flex:3}]}>회사명</Text>
                                            <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,flex:7}]}>{myInfo?.company}</Text>
                                        </View>
                                    </View>
                                    <MarginCom mt={15} />
                                    <View>
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                            <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,flex:3}]}>현장소장</Text>
                                            <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,flex:7}]}>{myInfo?.crt_director}</Text>
                                        </View>
                                    </View>
                                    <MarginCom mt={15} />
                                    <View>
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                            <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,flex:3}]}>현장주소</Text>
                                            <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,flex:7}]}>{myInfo?.detail_location}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <MarginCom mt={20} />
                        </View>
                        <View style={[styles.white_box_con,{marginTop:10,paddingBottom:20}]}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>작업정보 입력</Text>
                                <TouchableOpacity 
                                    onPress={()=>{
                                        setLastDisModal(true);
                                    }}
                                    style={{borderWidth:1, borderColor:colors.MAIN_COLOR,paddingHorizontal:12,paddingVertical:7,borderRadius:4}}
                                >
                                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.MAIN_COLOR}]}>최근 배차정보 불러오기</Text>
                                </TouchableOpacity>
                            </View>
                            <MarginCom mt={20} />
                            <CustomSelectBox 
                                title={'공종'}
                                strOptionList={speciesList}
                                selOption={inputInfo.cot_species}
                                strSetOption={inputHandler}
                                type={'cot_species'}
                                buttonStyle={selectBoxStyle.btnStyle}
                                buttonTextStyle={selectBoxStyle2.btnTextStyle}
                                rowStyle={selectBoxStyle.rowStyle}
                                rowTextStyle={selectBoxStyle.rowTextStyle}
                                defaultText={'선택하세요.'}
                                essential
                            />
                            <MarginCom mt={20} />
                            <CustomInputTextBox 
                                input={inputInfo.cot_content}
                                setInput={inputHandler}
                                type={'cot_content'}
                                placeholder='ex) 철근자재 하역 및 정리'
                                placeholderTextColor={colors.BORDER_GRAY_COLOR3}
                                title='내용'
                                editable={true}
                                essential
                            />
                            <MarginCom mt={20} />
                            <CustomInputTextBox 
                                input={inputInfo.cot_location}
                                setInput={inputHandler}
                                type={'cot_location'}
                                placeholder='ex)  북측야적장 정리'
                                placeholderTextColor={colors.BORDER_GRAY_COLOR3}
                                title='위치'
                                editable={true}
                                essential
                            />
                            <MarginCom mt={20} />
                            <CustomWaveBox
                                text1={inputInfo.cot_start_date}
                                setText1={inputHandler}
                                type1={'crt_start_date'}
                                whiteReadOnly1={true}
                                text2={inputInfo.cot_end_date}
                                setText2={inputHandler}
                                type2={'crt_end_date'}
                                whiteReadOnly2={true}
                                imgfile={require('../../../assets/img/ic_calendar.png')}
                                action={()=>{setStartDateModal({...startDateModal,show:true})}}
                                action2={()=>{setEndDateModal({...endDateModal,show:true})}}
                                editable={false}
                                title={'작업기간'}
                                essential
                            />
                            <MarginCom mt={10} />
                            <View style={[styles.card2Wrapper,{paddingVertical:10,paddingHorizontal:10,flexDirection:'row',backgroundColor:colors.BACKGROUND_COLOR_GRAY1}]}>
                                <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center'}} onPress={()=>{
                                    setInputInfo({
                                        ...inputInfo,
                                        cot_sat:inputInfo.cot_sat === 'Y' ? 'N' : 'Y'
                                    })
                                }}>
                                    <CheckBox 
                                        value={inputInfo.cot_sat === 'Y'}
                                        onValueChange={()=>{
                                            setInputInfo({
                                                ...inputInfo,
                                                cot_sat:inputInfo.cot_sat === 'Y' ? 'N' : 'Y',
                                            })
                                        }}
                                        // disabled={editMode === 'view'}
                                    />
                                    <Text style={[fontStyle.f_medium, {fontSize:16,marginHorizontal:5}]}>토요일 제외</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center',marginLeft:10}} onPress={()=>{
                                    setInputInfo({
                                        ...inputInfo,
                                        cot_sun:inputInfo.cot_sun === 'Y' ? 'N' : 'Y',
                                    })
                                }}>
                                    <CheckBox 
                                        value={inputInfo.cot_sun === 'Y'}
                                        onValueChange={()=>{setInputInfo({
                                            ...inputInfo,
                                            cot_sun:inputInfo.cot_sun === 'Y' ? 'N' : 'Y',
                                        })}}
                                        // disabled={editMode === 'view'}
                                    />
                                    <Text style={[fontStyle.f_medium, {fontSize:16,marginHorizontal:5}]}>일요일 제외</Text>
                                </TouchableOpacity>
                            </View>
                            <MarginCom mt={30}/>
                            <CustomWaveBox
                                text1={inputInfo.cot_start_time}
                                setText1={inputHandler}
                                type1={'cot_start_time'}
                                whiteReadOnly1={true}
                                text2={inputInfo.cot_end_time}
                                setText2={inputHandler}
                                type2={'cot_end_time'}
                                whiteReadOnly2={true}
                                imgfile={require('../../../assets/img/ic_time.png')}
                                action={()=>{setStartTimeModal(true)}}
                                action2={()=>{setEndTimeModal(true)}}
                                editable={false}
                                title={'작업시간'}
                                essential
                            />
                            <MarginCom mt={30} />
                            {managerList.length > 0 &&
                                <CustomSelectBox 
                                    title={'담당자'}
                                    objOptionList={managerList}
                                    objSetOption={inputHandler}
                                    type={'cot_m_idx'}
                                    defaultText='선택하세요.'
                                    selOption={inputInfo.cot_m_name}
                                    buttonStyle={selectBoxStyle.btnStyle}
                                    buttonTextStyle={selectBoxStyle2.btnTextStyle}
                                    rowStyle={selectBoxStyle.rowStyle}
                                    rowTextStyle={selectBoxStyle.rowTextStyle}
                                    essential
                                />
                            }
                        </View>
                        <MarginCom mt={10} />
                        <View style={[styles.white_box_con]}>
                            <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>장비정보</Text>
                            <MarginCom mt={30} />
                            <CustomSelectBox 
                                strOptionList={getEquipListConverter(equipMainList)}
                                strSetOption={inputHandler}
                                selOption={inputInfo.cot_e_type}
                                buttonStyle={selectBoxStyle.btnStyle}
                                buttonTextStyle={selectBoxStyle.btnTextStyle}
                                rowStyle={selectBoxStyle.rowStyle}
                                rowTextStyle={selectBoxStyle.rowTextStyle}
                                defaultText='장비 종류 선택'
                                type={'cot_e_type'}
                                title={'장비 종류'}
                                essential
                            />
                            <MarginCom mt={20}/>
                            <CustomSelectBox 
                                strOptionList={getEquipStandConverter(equipMainList,inputInfo.cot_e_type) ? getEquipStandConverter(equipMainList,inputInfo.cot_e_type) : ['선택하세요.']}
                                strSetOption={inputHandler}
                                selOption={inputInfo.cot_e_stand1}
                                buttonStyle={selectBoxStyle.btnStyle}
                                buttonTextStyle={selectBoxStyle.btnTextStyle}
                                rowStyle={selectBoxStyle.rowStyle}
                                rowTextStyle={selectBoxStyle.rowTextStyle}
                                defaultText={inputInfo.cot_e_type === '' ? '장비 종류를 선택해주세요.' : '장비 규격 선택'}
                                type={'cot_e_stand1'}
                                title={'장비 규격'}
                                essential
                                isDisable={inputInfo.cot_e_type === ''}
                            />
                            <MarginCom mt={20}/>

                            <CustomSelectBox 
                                strOptionList={getEquStaDetailCon(equipMainList,inputInfo.cot_e_type,inputInfo.cot_e_stand1) ? getEquStaDetailCon(equipMainList,inputInfo.cot_e_type,inputInfo.cot_e_stand1) : ['선택하세요.']}
                                strSetOption={inputHandler}
                                selOption={inputInfo.cot_e_stand2}
                                buttonStyle={selectBoxStyle.btnStyle}
                                buttonTextStyle={selectBoxStyle.btnTextStyle}
                                rowStyle={selectBoxStyle.rowStyle}
                                rowTextStyle={selectBoxStyle.rowTextStyle}
                                defaultText={inputInfo.cot_e_stand1 === '' ? '장비 규격을 선택해주세요.' : '장비 상세 규격 선택'}
                                type={'cot_e_stand2'}
                                title={'장비 상세 규격'}
                                essential
                                isDisable={inputInfo.cot_e_stand1 === ''}
                            />
                            <MarginCom mt={20} />
                            <CustomSelectBox 
                                strOptionList={['2023','2022','2021','2020']}
                                strSetOption={inputHandler}
                                selOption={inputInfo.cot_e_year}
                                buttonStyle={selectBoxStyle.btnStyle}
                                buttonTextStyle={selectBoxStyle.btnTextStyle}
                                rowStyle={selectBoxStyle.rowStyle}
                                rowTextStyle={selectBoxStyle.rowTextStyle}
                                defaultText={'선택하세요.'}
                                type={'cot_e_year'}
                                title={'최소연식'}
                                essential
                                labelFooter='년'
                            />
                            <MarginCom mt={20} />
                            <View>
                                <Text style={[fontStyle.f_semibold,{fontSize:16, color:colors.FONT_COLOR_BLACK,marginBottom:5}]}>부속 장치</Text>
                                <View style={{flexDirection:'row'}}>
                                    <CustomSelectBox 
                                        strOptionList={accessoriesConvert(inputInfo.cot_e_type) ? accessoriesConvert(inputInfo.cot_e_type) : ['선택하세요.']}
                                        strSetOption={tempSelAccHandler}
                                        selOption={tempSelAcc}
                                        buttonStyle={selectBoxStyle.btnStyle}
                                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                                        rowStyle={selectBoxStyle.rowStyle}
                                        rowTextStyle={selectBoxStyle.rowTextStyle}
                                        defaultText={'부속 장비 선택'}
                                        style={{flex:7}}
                                        isDisable={inputInfo.cot_e_type === ''}
                                    />
                                    <TouchableOpacity onPress={accessoriesAddHandler} style={[styles.addButton,{flexDirection:'row',justifyContent:'center',alignItems:'center',marginLeft:10}]}>
                                        <Image source={require('../../../assets/img/ic_add2.png')} style={{width:16,height:13}}/>
                                        <Text style={[fontStyle.f_semibold,{fontSize:18,color:colors.MAIN_COLOR,marginLeft:5}]}>추가</Text>
                                    </TouchableOpacity>
                                </View>
                                {tempSelAcc === '기타(직접입력)' &&
                                    <CustomInputTextBox 
                                        input={writeSelAcc}
                                        setInput={(acc : string)=>{ writeSelHandler(acc)}}
                                        action={()=>{}}
                                        button=''
                                        placeholder='부속 장치를 입력해주세요.'
                                        editable
                                        placeholderTextColor={colors.FONT_COLOR_GRAY}
                                        containerStyle={{flex:1,marginTop:5}}
                                    />
                                }
                            </View>
                            <MarginCom mt={10} />
                            {inputInfo.cot_e_sub.length > 0 &&
                                <View style={[styles.card2Wrapper,{paddingVertical:15,paddingHorizontal:20,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}]}>
                                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.MAIN_COLOR}]}>요구사항</Text>
                                    <MarginCom mt={10} />
                                    {inputInfo.cot_e_sub.map((item,index) => {
                                        return(
                                            <View key={index}>
                                                <View style={[styles.TextInputBox,{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:15,paddingVertical:15,backgroundColor:colors.WHITE_COLOR}]}>
                                                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>{item}</Text>
                                                    <TouchableOpacity onPress={()=>{deleteAccHandler(index)}}>
                                                        <Image source={require('../../../assets/img/ic_circle_x.png')} style={{width:20,height:20}}/>
                                                    </TouchableOpacity>
                                                </View>
                                                <MarginCom mt={10} />
                                            </View>
                                        )
                                    })}
                                </View>
                            }

                            <CustomButton 
                                action={()=>{inputCheckHandler();}}
                                label='다음'
                                style={{marginVertical:20}}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            }
            <AlertModal 
                show={alertModal.alert}
                msg={alertModal.msg}
                type={alertModal.type}
                hide={alertModalOff}
                action={alertAction}
            />
            <LastDispatchInfoModal 
                show={lastDisModal}
                hide={()=>{setLastDisModal(false)}}
                action={()=>{}}
            />
            <DateTimePickerModal //공사기간 시작일 date picker
                isVisible={startDateModal.show}
                mode="date"
                onConfirm={startDateHandler}
                onCancel={datePickerHide}
                date={startDateModal.date}
                minimumDate={new Date()}
            />
             <DateTimePickerModal //공사기간 마지막일 date picker
                isVisible={endDateModal.show}
                mode="date"
                onConfirm={endDateHandler}
                onCancel={datePickerHide}
                date={endDateModal.date}
                minimumDate={new Date()}
            />
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
            {/* <SelectModal  //담당자 선택 modal
                bigTitle='담당자를 변경해주세요.'
                
            /> */}
        </View>
    )
}