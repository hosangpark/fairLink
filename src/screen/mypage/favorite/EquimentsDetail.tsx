import React,{useState} from 'react';
import {Text, View, ScrollView,TouchableOpacity,Image,ImageBackground,StyleSheet,Platform} from 'react-native';
import { BackHeader } from '../../../component/header/BackHeader';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../../style/style';
import { FavoriteAddPhone } from './favoriteAddDetail/FavoriteAddPhone';
import { CustomButton } from '../../../component/CustomButton';
import { CustomSelectBox } from '../../../component/CustomSelectBox';
import { BackHandlerCom } from '../../../component/utils/BackHandlerCom';
import { usePostMutation, usePostQuery } from '../../../util/reactQuery';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { toggleLoading } from '../../../redux/actions/LoadingAction';
import { EquipDetailDataType, NumberObejctType } from '../../../component/componentsType';
import { SelImageType, tempUploadImageKeyType, tempUploadImageType } from '../../screenType';
import { AlertClearType } from '../../../modal/modalType';
import { AlertModal, initialAlert } from '../../../modal/AlertModal';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../../type/routerType';
import { EquimentsDetailDocList, accessoriesConvert } from '../../../component/utils/list';
import { SelectImageUpload } from '../../../modal/SelectImageUpload';
import { equUploadList } from '../../../component/utils/list';
import { CustomInputTextBox } from '../../../component/CustomInputTextBox';
import { MarginCom } from '../../../component/MarginCom';

type UploadParamsType = {
    mt_idx : string,
    eit_idx : string,
    eit_sub? : string,
}

export const EquimentsDetail = ({route}:{eit_idx:string}) => {
    const {eit_idx} = route.params
    const {mt_type , mt_idx} = useAppSelector(state => state.userInfo);
    const [modify,setModify] = useState<boolean>(false)
    const [selImage, setSelImage] = React.useState('');
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);
    const [equDetail, setEquDetail] = useState<EquipDetailDataType>();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [selImgModal, setSelImgModal] = React.useState(false);
    const [fileCheck, setFileCheck] = React.useState<NumberObejctType>()
    const [tempSelAcc , setTempSelAcc] = React.useState('');
    const [writeSelAcc, setWriteSelAcc] = React.useState(''); //부속장치 직접입력
    const reqFileList = equUploadList;
    const dispatch = useAppDispatch();

    const [subList, setsubList] = useState<any>([])

    const {data:EquipDetailData, isLoading:EquipDetailLoading ,isError:EquipDetailError } = usePostQuery('getEquipDetailData',{mt_idx:mt_idx, eit_idx:eit_idx},'equip/equip_info_detail.php');
    const EquipDetailModify = usePostMutation('getEquipDetailModify' , 'equip/equip_info_update.php',true); //장비세부 정보 수정하기
    const getEquipFileListMuataion = usePostMutation('getEquipFileList','equip_file_list.php'); //장비 종류 변경시 파일리스트
    const [uploadList, setUploadList] = React.useState<tempUploadImageKeyType[]>([]);

    const uploadImage = async (image : SelImageType) => {
        console.log(image);
        const tempArray = [...uploadList];
        const tempObj = {
            // ...image,
            name : image.fileName,
            type : 'image/jpg',
            tmp_name : image.uri,
            size : image.fileSize,
            key : selImage,
        }

        tempArray.push(tempObj);
        setUploadList([...tempArray]);
        // console.log(tempArray);
        // console.log(uploadList);
        setSelImage('');
    }
    const deleteImage = async (key:string) => {
        const filterArray = uploadList.filter((el) => el.key !== key);
        setUploadList([...filterArray]);
        // console.log(filterArray);
        // console.log(uploadList);
    }

    const alertModalOn = ( msg : string, type? : string) => {
        setAlertModal({
            alert: true,
            strongMsg: '',
            msg: msg,
            type: type ? type : '' ,
        })
    }

    const alertModalOff = () => {
        setAlertModal(initialAlert);
    }
    const alertAction = () => {
        if(alertModal.type === 'edit_success'){
            navigation.goBack();
        }
        else if(alertModal.type === 'doc_change_confirm'){
            setSelImgModal(true);
        }
        else if(alertModal.type === 'delete_confirm'){
            deleteImage(String(selImage));
        }
    }

    const tempSelAccHandler = (text:string) => { //부속장치 선택했을때 임시 저장
        setTempSelAcc(text);
    }
    const accessoriesAddHandler = () => { //부속장치 추가했을때 이벤트
        if(subList.length === 5){
            alertModalOn('부속 장치는 5개까지 선택가능합니다.');
        }
        else if(tempSelAcc === '기타(직접입력)' && writeSelAcc === ''){
            alertModalOn('부속 장치를 입력해주세요.');
        }
        else{
            let tempArray : string[] = [...subList];

            let flag = true;
            subList.forEach((item,index) => {
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
                setsubList([...tempArray])
                setTempSelAcc('');
                setWriteSelAcc('');
            }
        }
    }
    const deleteAccHandler = (index:number) => { //부속장치 삭제
        let tempArray : string[] = [...subList];;
        if(tempArray[index]){
            tempArray.splice(index,1);

            setsubList([...tempArray])
        }
    }

    const ModifyRequest = async () => { //수정요청
        let uploadParams:any = {
            mt_idx:mt_idx,
            eit_idx:eit_idx,
        }

        uploadList.forEach((item,index) => {
            const keyName = `eit_file${item.key}`;
            uploadParams = {
                ...uploadParams,
                [keyName] : {
                    name : item.name,
                    size : item.size,
                    uri : Platform.OS === 'android' ? item.tmp_name : item.tmp_name.replace('file://', ''),
                    type : item.type,
                }
            }
        })

        let tempEquArray:string[] = []
        for (let i = 0; i<subList.length; i++){
            tempEquArray.push(subList[i])
        }

        uploadParams = {
            ...uploadParams,
            eit_sub : tempEquArray.join("|"),
            eit_file_del : "",
        }
        console.log(uploadParams);
        dispatch(toggleLoading(true))
        const {data , msg, result} = await EquipDetailModify.mutateAsync(uploadParams);
        dispatch(toggleLoading(false))

        if(result === 'true'){
            alertModalOn('프로필 설정이 완료되었습니다.','edit_success')
        }
        else{
            alertModalOn(msg);
        }
        
    }



    React.useEffect(()=>{
        dispatch(toggleLoading(EquipDetailLoading));
        if(EquipDetailData){
            setEquDetail(EquipDetailData.data.data);
            setsubList(EquipDetailData.data.data.sub)
        }
    },[EquipDetailData,EquipDetailLoading])
    React.useEffect(()=>{
    },[uploadList])
    

    return(
        <View style={{flex:1}}>
            <BackHeader title={'장비 세부정보'} />
            <BackHandlerCom />
            <ScrollView style={{ flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
                <View style={EquimentsDetailstyle.WhiteBox}>
                <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.FONT_COLOR_BLACK,marginBottom:20}]}>
                    {equDetail?.device}
                </Text>
                <View style={{flexDirection:'row'}}>
                    <Image style={{width:130,height:130,borderRadius:4,marginRight:20}}
                    source={equDetail?.img? {uri:equDetail?.img} :require('../../../assets/img/no_image.png') }
                    />
                    <View style={{justifyContent:'center',flexShrink:1}}>
                        <Text style={[fontStyle.f_medium,EquimentsDetailstyle.boxText1]}>제작연도</Text>
                        <Text style={[fontStyle.f_light,EquimentsDetailstyle.boxText2,{marginBottom:20}]}>
                            {equDetail?.year}
                        </Text>
                        <Text style={[fontStyle.f_medium,EquimentsDetailstyle.boxText1]}>차량번호</Text>
                        <Text style={[fontStyle.f_light,EquimentsDetailstyle.boxText2]}>
                            {equDetail?.reg_no}
                        </Text>
                    </View>
                </View>
                </View>
                <View style={EquimentsDetailstyle.WhiteBox}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK,marginBottom:30}]}>세부정보</Text>
                    <View style={{justifyContent:'center',flexShrink:1,marginBottom:30}}>
                        <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1,{marginBottom:10}]}>
                            정기검사 유효기간
                        </Text>
                        <Text style={[fontStyle.f_regular,EquimentsDetailstyle.boxText1,{marginBottom:30}]}>
                            {equDetail?.ocr_date1}
                        </Text>
                        <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1,{marginBottom:10}]}>
                            보험가입 유효기간
                        </Text>
                        <Text style={[fontStyle.f_regular,EquimentsDetailstyle.boxText1,]}>
                            {equDetail?.ocr_date2}
                        </Text>
                    </View>
                    <View style={{marginBottom:20}}>
                    <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1,{marginBottom:10}]}>
                            어태치먼트
                    </Text>
                    {subList.map((item:string,index:number)=>{
                    return(
                    <View key={index}>
                        <MarginCom mt={10} />
                        <View style={[styles.TextInputFalseBox,{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,paddingVertical:15,}]}>
                            <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>{item}</Text>
                            {modify&&
                            <TouchableOpacity onPress={()=>{deleteAccHandler(index)}}>
                                <Image source={require('../../../assets/img/ic_circle_x.png')} style={{width:20,height:20}}/>
                            </TouchableOpacity>
                            }
                        </View>
                    </View>
                        )
                    })}
                    {modify&&
                    <>
                    <View style={{marginVertical:10}}>
                    <CustomSelectBox 
                        strOptionList={accessoriesConvert('굴착기') ? accessoriesConvert('굴착기') : ['선택하세요.']}
                        // strOptionList={accessoriesConvert(equDetail.device) ? accessoriesConvert(equDetail.device) : ['선택하세요.']}  
                        selOption={tempSelAcc}
                        strSetOption={tempSelAccHandler}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle2.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                        isDisable={!modify? true:false}
                        defaultText={'부속 장비 선택'}
                    />
                    </View>
                    {tempSelAcc === '기타(직접입력)' &&
                        <CustomInputTextBox 
                            input={writeSelAcc}
                            setInput={(acc : string)=>{ setWriteSelAcc(acc)}}
                            action={()=>{}}
                            button=''
                            placeholder='부속 장치를 입력해주세요.'
                            editable
                            placeholderTextColor={colors.FONT_COLOR_GRAY}
                            containerStyle={{flex:1,marginTop:5}}
                        />
                    }
                    <CustomButton
                        style={[styles.whiteButtonStyle,{height:46}]}
                        labelStyle={[styles.whiteButtonLabelStyle]}
                        label={'부속장치 추가'}
                        action={accessoriesAddHandler}
                    />
                    </>
                    }
                    </View>
                    <View style={{marginBottom:30}}>
                    <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1,{marginBottom:10}]}>
                            형식
                    </Text>
                    <Text style={[fontStyle.f_regular,EquimentsDetailstyle.boxText1,{marginBottom:10}]}>
                            {equDetail?.style}
                    </Text>
                    </View>
                <View style={{}}>
                    <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1,{marginBottom:10}]}>
                            주요제원
                    </Text>
                    <View style={EquimentsDetailstyle.cardbox}>
                    <Layoutbox
                        title={"길이"}
                        text={equDetail?.size[0]}
                        unit={"MM"}
                    />
                    <Layoutbox
                        title={"너비"}
                        text={equDetail?.size[1]}
                        unit={"MM"}
                    />
                    <Layoutbox
                        title={"높이"}
                        text={equDetail?.size[2]}
                        unit={"MM"}
                    />
                    <Layoutbox
                        title={"총중량"}
                        text={equDetail?.size[3]}
                        unit={"kg"}
                    />
                    <Layoutbox
                        title={"정격출력"}
                        text={equDetail?.size[4]}
                        unit={"Ps/rpm"}
                    />
                    <Layoutbox
                        title={"최대적재량"}
                        text={equDetail?.size[5]}
                        unit={"kg"}
                    />
                    </View>
                </View>
                </View>
                <View style={EquimentsDetailstyle.WhiteBox}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>장비서류 업로드</Text>
                </View>
                {  //서류업로드 체크
                    equDetail?.file_list.map((data, index) => {
                        return(
                            <View style={{ paddingVertical: 10 }} key={index}>
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={[fontStyle.f_semibold, { color: colors.FONT_COLOR_BLACK, fontSize: 16, marginRight: 5, marginBottom: 5}]}>{reqFileList[index].name}</Text>
                                    <Text style={[fontStyle.f_semibold, { fontSize: 16, color: data.status == '0' || data.status == null ? colors.FONT_COLOR_GRAY : data.status !== "1" ? colors.FONT_COLOR_BLACK2 : colors.MAIN_COLOR}]}>
                                        {data.status == '0' || data.status == null ? '[미등록]' : data.status == '1' ? '[승인중]' : '[승인완료]'}
                                        <Text style={[ styles.OrengeStar]}>{ reqFileList[index].name !== '통장사본' ? '*' : null }</Text>
                                    </Text>
                                </View>
                                {reqFileList[index].name == '장비사진'?
                                <Text style={[fontStyle.f_regular, { fontSize: 14,color:colors.MAIN_COLOR,marginBottom:5}]}>번호판이 나온 사진 필수</Text>
                                :
                                null
                                }
                                <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }} onPress={()=>{
                                    if(data.status == '1'){
                                        alertModalOn('저장된 서류가 있습니다. \n변경하시겠습니까?','doc_change_confirm');
                                    }
                                    else{
                                        setSelImgModal(true); 
                                    }
                                    setSelImage(String(index+1))
                                }}>
                                    <ImageBackground
                                    style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:undefined? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                                    source={uploadList[uploadList.findIndex(el=>el.key === String(index+1))] ? { uri : uploadList[uploadList.findIndex(el=>el.key === String(index+1))].tmp_name}  : data.link !== '' ? {uri : data.link} : undefined}
                                    resizeMode="cover"
                                    imageStyle={{ borderRadius: 10 }}>
                                        {(!uploadList[uploadList.findIndex(el=>el.key === String(index+1))] && 
                                        data.link == ''  )&&
                                            <Image 
                                            style={{ width: 15, height: 15}}
                                            source={require('../../../assets/img/ic_add.png')}
                                            />
                                        }
                                        {uploadList.filter((el) => el.key === String(index+1)).length > 0 &&
                                            <TouchableOpacity
                                                style={{ position:'absolute', right: 10, top: 10 }}
                                                onPress={() =>{
                                                    alertModalOn(`${reqFileList[index].name} 파일을 삭제하시겠습니까?`,'delete_confirm');
                                                    setSelImage(String(index+1))
                                                }}>
                                                <Image
                                                style={{ width: 25, height: 25 }}
                                                source={require('../../../assets/img/ic_modify.png')}
                                                />
                                            </TouchableOpacity>
                                        }
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        )
                })
                }
                <CustomButton
                style={[[!modify&& styles.whiteButtonStyle],{height:46}]}
                labelStyle={[[!modify&& styles.whiteButtonLabelStyle]]}
                label={!modify?'수정하기':'장비 세부정보 수정 완료'}
                action={()=>{!modify? setModify(!modify) : ModifyRequest()}}
                // action={()=>{console.log(uploadList)}}
                />
                </View>
            </ScrollView>
            <AlertModal
                show={alertModal.alert}
                msg={alertModal.msg}
                action={alertAction} // 저장일 때 -> 저장 -> "파일이 저장되었습니다.", 삭제일 때 -> 삭제, 설정완료 버튼 클릭 시(필수항목체크 후) -> 마이페이지 이동  
                hide={alertModalOff}
                type={alertModal.type}
            />
            <SelectImageUpload
                show={selImgModal}
                hide={()=>{setSelImgModal(false);}}
                setImage={uploadImage}
            />
        </View>
    )
}

const EquimentsDetailstyle = StyleSheet.create({
    WhiteBox:{paddingHorizontal:20,paddingVertical:30,backgroundColor:colors.WHITE_COLOR,marginBottom:10},
    cardbox :{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,paddingHorizontal:20,paddingVertical:10,borderRadius:8,borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,marginBottom:30},
    DefaultBlackText:{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10},
    cardInbox:{flexDirection:'row',justifyContent:'space-between',marginVertical:7},
    boxText1:{fontSize:16,color:colors.FONT_COLOR_BLACK},
    boxText2:{fontSize:16,color:colors.FONT_COLOR_BLACK2},
    graybox:{height:46,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:4,borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,justifyContent:'center',paddingHorizontal:15,flex:1}
})

const Layoutbox = ({title,text,unit}:{title:string,text:string | undefined,unit:string})=>{
    return(
        <View style={EquimentsDetailstyle.cardInbox}>
            <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1]}>
                {title}
            </Text>
            <View style={{flexDirection:'row'}}>
            <Text style={[fontStyle.f_regular,EquimentsDetailstyle.boxText1,{marginRight:5}]}>
                {text}
            </Text>
            <Text style={[fontStyle.f_medium,EquimentsDetailstyle.boxText1]}>
                {unit}
            </Text>
            </View>
        </View>
    )
}