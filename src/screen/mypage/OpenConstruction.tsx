import React,{useState} from 'react';
import { FlatList, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { BackHeader } from '../../component/header/BackHeader';
import { ManagerItemType, OpenConstructionType, SelImageType } from '../screenType';
import { useIsFocused } from '@react-navigation/native';
import { CustomInputTextBox } from '../../component/CustomInputTextBox';
import { CustomButton } from '../../component/CustomButton';
import { CustomSelectBox } from '../../component/CustomSelectBox';
import { CustomWaveBox } from '../../component/CustomWaveBox';
import { datedata } from '../../component/datedata';
import CheckBox from '@react-native-community/checkbox';
import { dayList, locationList } from '../../component/utils/list';
import { SelectImageUpload } from '../../modal/SelectImageUpload';
import { initialAlert } from '../../modal/AlertModal';
import { AlertModal } from '../../modal/AlertModal';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { usePostMutation, usePostQuery } from '../../util/reactQuery';
import { ObjectArrayType } from '../../component/componentsType';
import { ObjArrayType } from '../screenType';
import { SelectModal } from '../../modal/SelectModal';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import cusToast from '../../util/toast/CusToast';
import { ReqDispatchModal } from '../../modal/ReqDispatchModal';
import { toggleLoading } from '../../redux/actions/LoadingAction';
import { BackHandlerCom } from '../../component/utils/BackHandlerCom';


export const OpenConstruction = ({route}:OpenConstructionType) => {

    const {isData} = route.params;
    const {mt_idx} = useAppSelector(state => state.userInfo);
    const dispatch = useAppDispatch();

    const {data:myReqInfo, isLoading:myReqInfoLoading, isError:myReqInfoError} = usePostQuery('getMyConsReqInfo',{mt_idx:mt_idx},'cons/cons_require_info.php');

    const [editMode, setEditMode] = React.useState('');

    const [guaranteeImage,setguaranteeImage] = useState<undefined>();

    const [cameraModal, setCameraModal] = useState(false);

    const crtClearInfo = { //state 초기화 object
        mt_idx : mt_idx,
        crt_name : '',
        crt_director : '',
        crt_m_cons_idx:'',
        crt_m_name : '',
        crt_m_num : '',
        crt_email : '',
        crt_start_date:'',
        crt_end_date :'',
        crt_location : '',
        crt_monthly : '1',
        crt_monthly_type : 'now',
        crt_monthly_start : '1',
        crt_monthly_end : '1',
        crt_file1 : {
            name : '',
            size : 0,
            uri :'',
            type : '',
        },
        crt_temp_file_uri : '',
        crt_origin : '',
    }


    const [consInputInfo, setConsInputInfo] = React.useState(()=>crtClearInfo); //입력정보

    const [isEditNumber, setIsEditNumber] = React.useState(false);
    const [isEditEmail, setIsEditEmail] = React.useState(false);

    const [managerList, setMangetList] = React.useState<ObjArrayType[]>([]); //담당자 정보리스트
    const [tempSelName, setTempSelName] = React.useState('');

	const [reqConModal, setReqConModal] = React.useState(false);
    const [selectModal, setSelectModal] = React.useState(false);
    const [startDateModal, setStartDateModal] = React.useState({ //공시기간 시작일 modal
        show:false,
        date:new Date()
    });
    const [endDateModal, setEndDateModal] = React.useState({ //공사기간 마지막일 modal
        show:false,
        date : new Date()
    });

    const [alertModal, setAlertModal] = React.useState({
        ...initialAlert,
        title:'',
        btnLabel :'',
    })

    const {data : manList, isLoading : manLoading, isError : manError} = usePostQuery('getManagerList',{mt_idx : mt_idx},'cons/manager_list.php')
    const consReqUpdate = usePostMutation('consReqUpdate','cons/cons_require_update.php',consInputInfo.crt_file1.uri !== '');


    const alertModalOff= () => {
        setAlertModal({
            ...initialAlert,
            title : '',
            btnLabel : '',
        })
    };

    const datePickerHide = () => { //datepicker hide
        setStartDateModal({...startDateModal, show:false});
        setEndDateModal({...endDateModal, show:false});
    }
    const alertModalOn = (msg:string,btnLabel : string, type? : string, strongMsg? : string, title? : string) => {
        setAlertModal({
            alert:true,
            msg:msg,
            type : type ? type : '',
            strongMsg : strongMsg ? strongMsg : '',
            title : title ? title : '',
            btnLabel : btnLabel,
        })
    }
    const alertAction = async () => {
        if(alertModal.type === 'delete_confirm'){
            setConsInputInfo({
                ...consInputInfo,
                crt_file1:{
                    name:'',
                    size:0,
                    type:'',
                    uri:'',
                }
            })
        }
        else if(alertModal.type === 'go_req_confirm'){
            setEditMode('view');
            setReqConModal(true);
        }
    }

    const clearInfo = () => { //state clear
        setConsInputInfo(()=>crtClearInfo);
    }

    const inputHandler = (text:string, type? : string) => { //state input handler
        if(type){
            console.log(text,type);
            setConsInputInfo({
                ...consInputInfo,
                [type] : text,
            })
        }
    }

    const startDateHandler = (date : Date) => { //공사기간 시작일 선택 handler
        setStartDateModal({
            show:false,
            date : date,
        })
        const tempDate = `${date.getFullYear()}-${(date.getMonth()+1) < 10 ? '0'+String((date.getMonth()+1)) : date.getMonth()+1}-${(date.getDate()) < 10 ? '0'+date.getDate() : date.getDate()}`
    
        setConsInputInfo({
            ...consInputInfo,
            crt_start_date : tempDate,
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
        
            setConsInputInfo({
                ...consInputInfo,
                crt_end_date : tempDate,
            })
        }
    }

    const managerSelHandler = () => { //담당자 선택했을때 데이터 처리

        if(consInputInfo.crt_m_cons_idx === ''){
            setSelectModal(false);
        }
        else{
            const manaData = manList.data.data;

            if(manaData && manaData.length > 0){

                const selManaData = manaData.filter((el : ManagerItemType)=>el.crt_m_cons_idx === consInputInfo.crt_m_cons_idx);

                setConsInputInfo({
                    ...consInputInfo,
                    crt_m_name : selManaData[0].crt_m_name,
                    crt_m_num : selManaData[0].crt_m_num,
                });

                setSelectModal(false);
            }
        }
    }

    const uploadImage = async (image : SelImageType) => { //이미지 데이터 셋팅
        // setBusRegImage(image);
        setConsInputInfo({
            ...consInputInfo,
            crt_file1 : {
                name : image.fileName,
                type : 'image/jpg',
                uri : image.uri,
                size : image.fileSize,
            }
        })
    }

    const submitCons = async () => { //현장개설
        if(consInputInfo.crt_name === ''){
            alertModalOn('현장명을 입력해주세요.','확인');
        }
        else if(consInputInfo.crt_director === ''){
            alertModalOn('현장소장명을 입력해주세요','확인');
        }
        else if(consInputInfo.crt_m_name === ''){
            alertModalOn('담당자를 선택해주세요.','확인');
        }
        else if(consInputInfo.crt_m_num === ''){
            alertModalOn('담당자 연락처를 입력해주세요.','확인');
        }
        else if(consInputInfo.crt_start_date === ''){
            alertModalOn('공사 시작날짜를 선택해주세요.','확인');
        }
        else if(consInputInfo.crt_end_date === ''){
            alertModalOn('공사 마지막날짜를 선택해주세요.','확인');
        }
        else if(consInputInfo.crt_location === ''){
            alertModalOn('현장 주소를 선택해주세요.','확인');
        }
        else{
            dispatch(toggleLoading(true));
            const {result,msg,data} = await consReqUpdate.mutateAsync(consInputInfo);

            if(result === 'true'){
                dispatch(toggleLoading(false));
                alertModalOn(`${editMode === 'edit' ? '나의 현장 수정이' : '현장개설이'} 완료되었습니다.\n 지금 바로 배차요청 하시겠습니까?`,'예','go_req_confirm','',consInputInfo.crt_name);
            }
            else{
                dispatch(toggleLoading(false));
                alertModalOn(msg,'확인');
            }
        }        
    }


    React.useEffect(()=>{
        if(isData){
            setEditMode('view');
        }
        else{
            setEditMode('write');
        }
    },[])

    React.useEffect(()=>{
        dispatch(toggleLoading(manLoading));
        if(manList){
            // console.log(manList);
            const manListArray = manList.data.data;

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
        
    },[manList])

    React.useEffect(()=>{
        // console.log(consInputInfo.crt_m_cons_idx);
        if(managerList.length > 0){
            const crt_name_arr = managerList.filter((el) => el.key === consInputInfo.crt_m_cons_idx);

            if(crt_name_arr.length > 0){
                setTempSelName(crt_name_arr[0].name);
            }
        }
    },[consInputInfo.crt_m_cons_idx])

    React.useEffect(()=>{
        dispatch(toggleLoading(myReqInfoLoading));
        if(isData && myReqInfo){

            const bodyData = myReqInfo.data.data;


            setConsInputInfo({
                ...consInputInfo,
                ...bodyData,
                crt_temp_file_uri : bodyData.crt_file1,
            })
        }
    },[myReqInfo])

    return (
        <View style={{flex:1}}>
            <BackHeader title={editMode !== 'write' ? '나의 현장' : '현장개설하기'} />
            <BackHandlerCom />
            <ScrollView style={{ flex:1,backgroundColor:colors.WHITE_COLOR}}>
                <View style={{paddingHorizontal:20,paddingTop:30,paddingBottom:25}}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>현장정보 {!isData && '기입'}</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>
                        <Text style={styles.OrengeStar}>*</Text>
                        필수항목
                        </Text>
                </View>
                <CustomInputTextBox
                    title={'현장명'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={consInputInfo.crt_name}
                    setInput={inputHandler}
                    type={'crt_name'}
                    placeholder={'계약서에 명시된 현장명을 기입하세요.'}
                    imgfile={undefined}
                    editable={editMode !== 'view'}
                />
                <CustomInputTextBox
                    title={'현장소장명'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={consInputInfo.crt_director}
                    setInput={inputHandler}
                    type={'crt_director'}
                    imgfile={undefined}
                    editable={editMode !== 'view'}
                />
                <CustomInputTextBox
                    title={'담당자'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={consInputInfo.crt_m_name}
                    setInput={inputHandler}
                    type={'crt_m_name'}
                    imgfile={undefined}
                    button={editMode !== 'view' ? '변경' :''}
                    editable={false}
                    whiteReadOnly={editMode !== 'view'}
                    action={()=>{if(editMode !== 'view')setSelectModal(true)}}
                    placeholder='담당자를 선택해주세요.'
                />
                <CustomInputTextBox
                    title={'담당자 연락처'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={consInputInfo.crt_m_num}
                    setInput={inputHandler}
                    type={'crt_m_num'}
                    imgfile={editMode !== 'view' && require('../../assets/img/ic_modify2.png')}
                    editable={isEditNumber}
                    inputType={'number-pad'}
                    whiteReadOnly={editMode !== 'view'}
                    placeholder='담당자를 선택해주세요.'
                    action={()=>{
                        if(editMode !== 'view'){
                            setIsEditNumber(true); cusToast('변경할 연락처를 입력해주세요.')
                        }
                    }}
                />
                <CustomInputTextBox
                    title={'담당자 이메일'}
                    essential={true}
                    input={consInputInfo.crt_email}
                    setInput={inputHandler}
                    type={'crt_email'}
                    containerStyle={styles.SubTitleText}
                    imgfile={editMode !== 'view' && require('../../assets/img/ic_modify2.png')}
                    editable={isEditEmail}
                    inputType={'email-address'}
                    whiteReadOnly={editMode !== 'view'}
                    action={()=>{
                        if(editMode !== 'view'){
                            setIsEditEmail(true); cusToast('변경할 이메일을 입력해주세요.');
                        }
                    }}
                />
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>공사기간
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <CustomWaveBox
                        text1={consInputInfo.crt_start_date}
                        setText1={inputHandler}
                        type1={'crt_start_date'}
                        text2={consInputInfo.crt_end_date}
                        setText2={inputHandler}
                        type2={'crt_end_date'}
                        imgfile={require('../../assets/img/ic_calendar.png')}
                        action={()=>{if(editMode !== 'view')setStartDateModal({...startDateModal,show:true})}}
                        action2={()=>{if(editMode !== 'view')setEndDateModal({...endDateModal,show:true})}}
                        editable={editMode !== 'view'}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <CustomSelectBox 
                        defaultText='선택하세요.'
                        strOptionList={locationList}
                        selOption={consInputInfo.crt_location}
                        strSetOption={inputHandler}
                        type={'crt_location'}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                        title='현장 주소'
                        essential
                        isDisable={editMode === 'view'}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>대금지급시기
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center'}} onPress={()=>{
                            if(editMode !== 'view'){
                                inputHandler('now','crt_monthly_type')
                            }
                        }}>
                            <CheckBox 
                                value={consInputInfo.crt_monthly_type === 'now'}
                                onValueChange={()=>{inputHandler('now','crt_monthly_type')}}
                                disabled={editMode === 'view'}
                            />
                            <Text style={[fontStyle.f_medium, {fontSize:16,marginHorizontal:5}]}>당일</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1.3,flexDirection:'row',alignItems:'center'}} onPress={()=>{
                            if(editMode !== 'view'){
                                inputHandler('day','crt_monthly_type')
                            }
                        }}>
                            <CheckBox 
                            value={consInputInfo.crt_monthly_type === 'day'}
                            onValueChange={()=>{inputHandler('day','crt_monthly_type')}}
                            disabled={editMode === 'view'}
                            />
                            <Text style={{marginRight:5}}>매월</Text>
                            <CustomSelectBox 
                                style={{flex:1}}
                                defaultText={consInputInfo.crt_monthly}
                                labelFooter='일'
                                objOptionList={dayList()}
                                selOption={consInputInfo.crt_monthly}
                                objSetOption={inputHandler}
                                type={'crt_monthly'}
                                buttonStyle={selectBoxStyle2.btnStyle}
                                buttonTextStyle={selectBoxStyle2.btnTextStyle}
                                rowStyle={selectBoxStyle2.rowStyle}
                                rowTextStyle={selectBoxStyle2.rowTextStyle}
                                isDisable={editMode === 'view'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>대금지급산출기간
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <CustomSelectBox 
                            defaultText={consInputInfo.crt_monthly_start}
                            selOption={consInputInfo.crt_monthly_start}
                            objOptionList={dayList()}
                            objSetOption={inputHandler}
                            type={'crt_monthly_start'}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                            labelFooter='일'
                            isDisable={editMode === 'view'}
                        />
                        <Text style={{marginHorizontal:10}}>~</Text>
                        <CustomSelectBox 
                            defaultText={consInputInfo.crt_monthly_end}
                            objOptionList={dayList()}
                            selOption={consInputInfo.crt_monthly_end}
                            objSetOption={inputHandler}
                            type={'crt_monthly_end'}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                            labelFooter='일'
                            isDisable={editMode === 'view'}
                        />
                    </View>
                    {/* <CustomWaveBox
                        text1={consInputInfo.crt_monthly_start}
                        setText1={inputHandler}
                        type1={'crt_monthly_start'}
                        text2={consInputInfo.crt_monthly_end}
                        setText2={inputHandler}
                        type2={'crt_monthly_end'}
                        imgfile={require('../../assets/img/ic_dropdown.png')}
                        action={()=>{}}
                        editable={true}
                        placeholderTextColor={''}
                    /> */}
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>건설기계지급보증서
                    </Text>
                    <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR,marginBottom:10}]}>건설기계 대금 200만원 이상인 경우 의무가입 대상입니다.
                    </Text>
                    <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }} onPress={()=>{setCameraModal(true)}}>
                        <ImageBackground
                        style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:guaranteeImage? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                        source={
                            consInputInfo.crt_temp_file_uri === '' ? 
                                consInputInfo.crt_file1.uri === '' ? undefined 
                                :
                                {uri:consInputInfo.crt_file1.uri}
                            :
                            {uri:consInputInfo.crt_temp_file_uri}
                        }
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 10 }}>
                            {consInputInfo.crt_file1.uri === '' ?
                                editMode !== 'view' ?
                                    <Image 
                                        style={{ width: 15, height: 15}}
                                        source={require('../../assets/img/ic_add.png')}
                                    />
                                :
                                    <></>
                            :
                                editMode !== 'view' ?
                                    <TouchableOpacity
                                        style={{ position:'absolute', right: 10, top: 10 }}
                                        onPress={() =>{
                                            if(editMode !== 'view'){
                                                alertModalOn('파일을 삭제하시겠습니까?','삭제하기','delete_confirm','','건설기계지급보증서.JPG')
                                            }
                                        }}>
                                        <Image
                                        style={{ width: 25, height: 25 }}
                                        source={require('../../assets/img/ic_modify.png')}
                                        />
                                    </TouchableOpacity>
                                :
                                    <></>
                            }
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={[styles.SubTitleText]}>
                    <CustomInputTextBox
                        title={'원도급사명'}
                        placeholder={'하도급사만 작성'}
                        input={consInputInfo.crt_origin}
                        setInput={inputHandler}
                        type={'crt_origin'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                        editable={editMode !== 'view'}
                        placeholderTextColor={''}
                    />
                </View>
                <CustomButton
                    style={{}}
                    labelStyle={{}}
                    label={
                        editMode === 'write' ? '현장개설 완료' :
                        editMode === 'view' ? '수정하기' :
                        editMode === 'edit' ? '수정완료' : ''
                    }
                    action={()=>{
                        if(editMode !== 'view'){
                            submitCons();
                        }
                        else{
                            setEditMode('edit');
                        }
                    }}
                />
                </View>
            </ScrollView>
            <SelectImageUpload 
                show={cameraModal}
                hide={()=>{setCameraModal(false)}}
                setImage={uploadImage}
            />
            <AlertModal 
                show={alertModal.alert}
                hide={alertModalOff}
                msg={alertModal.msg}
                title={alertModal.title}
                action={alertAction}
                btnLabel={alertModal.btnLabel}
                type={alertModal.type}
                cancleAction={()=>{setEditMode('view')}} //임시
            />
            <SelectModal  //담당자 선택 modal
                bigTitle='담당자를 변경해주세요.'
                objOptList={managerList}
                objSetOption={inputHandler}
                type={'crt_m_cons_idx'}
                action={()=>{managerSelHandler();}}
                btnLabel='변경완료'
                defaultText='선택하세요.'
                hide={()=>{setSelectModal(false)}}
                show={selectModal}
                selOption={tempSelName}
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
            <ReqDispatchModal 
				show={reqConModal}
				hide={()=>{setReqConModal(false);}}
				action={()=>{console.log('dd')}}
			/>
        </View>
    )
}