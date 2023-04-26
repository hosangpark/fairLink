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
import { useAppSelector } from '../../redux/store';
import { usePostQuery } from '../../util/reactQuery';
import { ObjectArrayType } from '../../component/componentsType';
import { ObjArrayType } from '../screenType';
import { SelectModal } from '../../modal/SelectModal';
import DateTimePickerModal from "react-native-modal-datetime-picker";


export const OpenConstruction = ({route}:OpenConstructionType) => {

    const {isData} = route.params;
    const {mt_idx} = useAppSelector(state => state.userInfo);

    const {data : manList, isLoading : manLoading, isError : manError} = usePostQuery('getManagerList',{mt_idx : mt_idx},'cons/manager_list.php')
    const [guaranteeImage,setguaranteeImage] = useState<undefined>();

    const [cameraModal, setCameraModal] = useState(false);

    const crtClearInfo = { //state 초기화 object
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
        crt_origin : '',
    }


    const [consInputInfo, setConsInputInfo] = React.useState(()=>crtClearInfo); //입력정보
    const [managerList, setMangetList] = React.useState<ObjArrayType[]>([]); //담당자 정보리스트
    const [tempSelName, setTempSelName] = React.useState('');

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
    const alertModalOff= () => {
        setAlertModal({
            ...initialAlert,
            title : '',
            btnLabel : '',
        })
    };

    const datePickerHide = () => { //datepicker hide
        setStartDateModal({...startDateModal, show:false});
        setEndDateModal({...startDateModal, show:false});
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
        else if(alertModal.type === 'upload_success'){
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




    React.useEffect(()=>{
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
            // setConsInputInfo({
            //     ...consInputInfo,
            //     crt_m_name:crt_name
            // })
        }
    },[consInputInfo.crt_m_cons_idx])

    return (
        <View style={{flex:1}}>
            <BackHeader title={isData ? '나의 현장' : '현장개설하기'} />
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
                    editable={true}
                />
                <CustomInputTextBox
                    title={'현장소장명'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={consInputInfo.crt_director}
                    setInput={inputHandler}
                    type={'crt_director'}
                    imgfile={undefined}
                    editable={true}
                />
                <CustomInputTextBox
                    title={'담당자'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={consInputInfo.crt_m_name}
                    setInput={inputHandler}
                    type={'crt_m_name'}
                    imgfile={undefined}
                    button={'변경'}
                    editable={false}
                    whiteReadOnly={true}
                    action={()=>{setSelectModal(true)}}
                    placeholder='담당자를 선택해주세요.'
                />
                <CustomInputTextBox
                    title={'담당자 연락처'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={consInputInfo.crt_m_num}
                    setInput={inputHandler}
                    type={'crt_m_num'}
                    imgfile={isData && require('../../assets/img/ic_modify2.png')}
                    editable={false}
                    inputType={'number-pad'}
                    whiteReadOnly={true}
                    placeholder='담당자를 선택해주세요.'
                />
                <CustomInputTextBox
                    title={'담당자 이메일'}
                    essential={true}
                    input={consInputInfo.crt_email}
                    setInput={inputHandler}
                    type={'crt_email'}
                    containerStyle={styles.SubTitleText}
                    imgfile={isData && require('../../assets/img/ic_modify2.png')}
                    editable={false}
                    inputType={'email-address'}
                    whiteReadOnly={true}
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
                        action={()=>{setStartDateModal({...startDateModal,show:true});console.log('dddddd')}}
                        action2={()=>{setEndDateModal({...endDateModal,show:true})}}

                        editable={true}
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
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>대금지급시기
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center'}} onPress={()=>{inputHandler('now','crt_monthly_type')}}>
                            <CheckBox 
                                value={consInputInfo.crt_monthly_type === 'now'}
                                onValueChange={()=>{inputHandler('now','crt_monthly_type')}}
                            />
                            <Text style={[fontStyle.f_medium, {fontSize:16,marginHorizontal:5}]}>당일</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1.3,flexDirection:'row',alignItems:'center'}} onPress={()=>inputHandler('day','crt_monthly_type')}>
                            <CheckBox 
                            value={consInputInfo.crt_monthly_type === 'day'}
                            onValueChange={()=>{inputHandler('day','crt_monthly_type')}}
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
                        source={consInputInfo.crt_file1.uri === '' ? undefined : {uri:consInputInfo.crt_file1.uri}}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 10 }}>
                            {consInputInfo.crt_file1.uri === '' ? 
                            <Image 
                                style={{ width: 15, height: 15}}
                                source={require('../../assets/img/ic_add.png')}
                            />
                            :
                                <TouchableOpacity
                                    style={{ position:'absolute', right: 10, top: 10 }}
                                    onPress={() =>{
                                        alertModalOn('파일을 삭제하시겠습니까?','삭제하기','delete_confirm','','건설기계지급보증서.JPG')
                                    }}>
                                    <Image
                                    style={{ width: 25, height: 25 }}
                                    source={require('../../assets/img/ic_modify.png')}
                                    />
                                </TouchableOpacity>
                            }
                        </ImageBackground>
                    </TouchableOpacity>
                {/* <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={undefined}
                    renderItem={({ item, index }) => (
                    <View style={{ marginRight: 8, width: 100, height: 100 }}>
                        <ImageBackground
                        style={{ flex: 1 }}
                        source={{ uri: item.uri }}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 10 }}>
                        <TouchableOpacity
                            style={{ alignItems: 'flex-end', right: 10, top: 10 }}
                            onPress={() => Delete(index)}>
                            <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../../assets/img/ico_close1.png')}
                            />
                        </TouchableOpacity>
                        </ImageBackground>
                        {index == 0 && (
                        <View
                            style={{
                            position: 'absolute',
                            bottom: 0,
                            backgroundColor: colors.GREEN_COLOR_2,
                            width: '100%',
                            alignItems: 'center',
                            height: 25,
                            justifyContent: 'center',
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            }}>
                            <Text
                            style={[
                                style.text_sb,
                                { fontSize: 13, color: colors.WHITE_COLOR },
                            ]}>
                            {t('대표사진')}
                            </Text>
                        </View>
                        )}
                    </View>
                    )}
                    horizontal={true}
                /> */}
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
                        editable={true}
                        placeholderTextColor={''}
                    />
                </View>
                <CustomButton
                    style={{}}
                    labelStyle={{}}
                    label={'현장개설 완료'}
                    action={()=>{console.log('ㅇ')}}
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
        </View>
    )
}