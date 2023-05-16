import React,{useState} from 'react';
import {Text, View, ScrollView,TouchableOpacity,Image,ImageBackground,StyleSheet,Platform} from 'react-native';
import { BackHeader } from '../../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../../style/style';
import { CustomButton } from '../../../component/CustomButton';
import { CustomSelectBox } from '../../../component/CustomSelectBox';
import { accessoriesConvert, equProfileUploadList, getEquStaDetailCon, getEquipListConverter, getEquipStandConverter } from '../../../component/utils/list';
import { MarginCom } from '../../../component/MarginCom';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { usePostMutation } from '../../../util/reactQuery';
import { AlertModal, initialAlert } from '../../../modal/AlertModal';
import { CustomInputTextBox } from '../../../component/CustomInputTextBox';
import { toggleLoading } from '../../../redux/actions/LoadingAction';
import { SelectImageUpload } from '../../../modal/SelectImageUpload';
import { SelImageType } from '../../screenType';
import { NumberObejctType } from '../../../component/componentsType';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../../type/routerType';
import { tempUploadImageType } from '../../screenType';
import { BackHandlerCom } from '../../../component/utils/BackHandlerCom';

type tempUploadImageKeyType = {
    name : string
    type : string,
    tmp_name : string,
    size : number,
    key : string,
}
interface EquInputInfoItemType {
    eit_type : string,
    eit_stand1 : string,
    eit_stand2 : string,

    sub : string[],
}

type uploadImageParamsType = {
    mt_idx : string,
    eit_type : string,
    eit_stand1 : string,
    eit_stand2 : string,
    eit_sub : string,
    [key:string] : tempUploadImageType | string,
}

export const EquimentsAdd = () => {

    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    const [strOption,setStrOption] = useState<string>('')
    const getEquipListMutation = usePostMutation('getEquipList','/equip_filter.php');
    const getEquipDocMutaion = usePostMutation('getEquipDoc' , 'equip/equip_file_list.php');
    const addEquipInfoAdd = usePostMutation('addEquipInfo' , 'equip/equip_info_add.php',true);


    const [guaranteeImage,setguaranteeImage] = useState<undefined>();
    const {mt_idx, mt_type} = useAppSelector(state => state.userInfo);
    const [inputInfo, setInputInfo] = React.useState<EquInputInfoItemType>({
        eit_type : '',
        eit_stand1 : '',
        eit_stand2 : '',

        sub : [],
    })
    const [equipMainList, setEquipMainList] = React.useState<object[]>([]);
    const [tempSelAcc , setTempSelAcc] = React.useState('');
    const [writeSelAcc, setWriteSelAcc] = React.useState(''); //부속장치 직접입력

    const [fileCheck, setFileCheck] = React.useState<NumberObejctType>();

    const [selImgModal, setSelImgModal] = React.useState(false); //카메라 및 앨범 선택 모달
    const [selImage, setSelImage] = React.useState(''); //선택한 문서 idx (앨범 및 카메라 데이터 들어감)
    const [uploadList, setUploadList] = React.useState<tempUploadImageKeyType[]>([]);//

    const writeSelHandler = (text:string) => {
        setWriteSelAcc(text);
    } 

    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);


    const alertModalOff = () => {
        setAlertModal(()=>initialAlert);
    }

    const alertModalOn = (msg:string,type?:string,strongMsg?:string) => {
        setAlertModal({
            alert:true,
            msg:msg,
            type : type ? type : '',
            strongMsg : strongMsg ? strongMsg : '',
        })
    }

    const alertAction = () => {
        if(alertModal.type === 'delete_confirm'){
            deleteImage(String(selImage));
        }
        else if(alertModal.type === 'add_success'){
            navigation.goBack();
        }
    }


    const getEquipList = async () => { //장비 리스트 불러오기
        dispatch(toggleLoading(true));
        const {data} = await getEquipListMutation.mutateAsync({});
        dispatch(toggleLoading(false));


        setEquipMainList(data.data);
    }

    const inputInfoHandler = (text : string, key? : string) => {
        if(key){
            setInputInfo({
                ...inputInfo,
                [key] : text,
            })
        }
    }

    const tempSelAccHandler = (text:string) => { //부속장치 선택했을때 임시 저장
        setTempSelAcc(text);
    }

    const accessoriesAddHandler = () => { //부속장치 추가했을때 이벤트
        if(inputInfo.sub.length === 5){
            alertModalOn('부속 장치는 5개까지 선택가능합니다.');
        }
        else if(tempSelAcc === ''){
            alertModalOn('부속장치를 선택해주세요.');
        }
        else if(tempSelAcc === '기타(직접입력)' && writeSelAcc === ''){
            alertModalOn('부속 장치를 입력해주세요.');
        }
        else{
            let tempArray : string[] = [...inputInfo.sub];

            let flag = true;
            inputInfo.sub.forEach((item,index) => {
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
                    sub : [...tempArray],
                })
                setTempSelAcc('');
                setWriteSelAcc('');
            }
        }
    }

    const deleteAccHandler = (index:number) => { //부속장치 삭제
        let tempArray : string[] = [...inputInfo.sub];
        if(tempArray[index]){
            tempArray.splice(index,1);

            setInputInfo({
                ...inputInfo,
                sub : [...tempArray]
            })
        }
    }

    const loadEquipDocList = async () => { //장비서류 불러오기
        const params = {
            eit_type : inputInfo.eit_type,
            eit_stand1 : inputInfo.eit_stand1,
            eit_stand2 : inputInfo.eit_stand2,
        }
        dispatch(toggleLoading(true));
        const {data, result, msg} = await getEquipDocMutaion.mutateAsync(params);
        dispatch(toggleLoading(false));

        if(result === 'true'){
            setFileCheck(data.data);
        }
    }

    const uploadImage = async (image : SelImageType) => { //이미지 업로드
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
        setSelImage('');
    }
    const deleteImage = async (key:string) => {
        const filterArray = uploadList.filter((el) => el.key !== key);
        setUploadList([...filterArray]);
        // console.log(filterArray);
    }

    const addEquipInfoHandler = async () => {
        let uploadImageParams : uploadImageParamsType = {
            mt_idx : mt_idx,
            eit_type : inputInfo.eit_type,
            eit_stand1 : inputInfo.eit_stand1,
            eit_stand2 : inputInfo.eit_stand2,
            eit_sub : '',
        }
        if(inputInfo.eit_type === ''){
            alertModalOn('장비 종류를 선택해주세요.');
        }
        else if(inputInfo.eit_stand1 === ''){
            alertModalOn('장비 규격을 선택해주세요.');
        }
        else if(inputInfo.eit_stand2 === ''){
            alertModalOn('장비 상세 규격을 선택해주세요.');
        }
        else{
            
            let flag = true;
            for (let key in fileCheck){
                // console.log(fileCheck[key]);
                if(fileCheck[key] === 'Y'){
                    const filterData = uploadList.filter(el => el.key === key);
                    if(filterData.length === 0){
                        const noneData = equProfileUploadList.find(el=> el.key === key);
                        if(noneData){
                            alertModalOn(`${noneData.name}을 업로드해주세요.`,'확인')
                            flag = false;
                            break;
                        }
                    }
                }                
            }
            if(flag){
    
                uploadList.forEach((item,index) => {
                    const keyName = `eit_file${item.key}`;

                    uploadImageParams = {
                        ...uploadImageParams,
                        [keyName] : {
                            name : item.name,
                            size : item.size,
                            uri : Platform.OS === 'android' ? item.tmp_name : item.tmp_name.replace('file://', ''),
                            type : item.type,
                        }
                    }
                })
                let sub_string = '';

                if(inputInfo.sub.length > 0){
                    inputInfo.sub.map((item,index) => {
                        sub_string += item+`${inputInfo.sub.length-1 !== index ? ',' : ''}`
                    })
                }

                uploadImageParams = {
                    ...uploadImageParams,
                    eit_sub : sub_string,
                }

                const {result, msg} = await addEquipInfoAdd.mutateAsync(uploadImageParams);

                if(result === 'true'){
                    alertModalOn('성공적으로 장비가 추가되었습니다.','add_success');
                }
                else{
                    alertModalOn(msg,'');
                }

            }


        }
    }

    React.useEffect(()=>{
        getEquipList();
    },[])

    React.useEffect(()=>{
        if(inputInfo.eit_type !== ''){
            setInputInfo({
                ...inputInfo,
                eit_stand1 : '',
                eit_stand2 : '',
                sub:[],
            })
            setTempSelAcc('');
        }
    },[inputInfo.eit_type])

    React.useEffect(()=>{
        setInputInfo({
            ...inputInfo,
            eit_stand2 : '',
        })
    },[inputInfo.eit_stand1])

    React.useEffect(()=>{
        if(inputInfo.eit_stand2 !== ''){
            loadEquipDocList();
        }
    },[inputInfo.eit_stand2])
    

    return(
        <View style={{flex:1}}>
            <BackHeader title={'장비 추가하기'} />
            <BackHandlerCom />
            <ScrollView style={{ flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
                <View style={ElectronicContractstyle.WhiteBox}>
                    <CustomSelectBox 
                        strOptionList={getEquipListConverter(equipMainList)}
                        strSetOption={inputInfoHandler}
                        selOption={inputInfo.eit_type}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                        defaultText='장비 종류 선택'
                        type={'eit_type'}
                        title={'장비 종류'}
                        essential
                    />
                    <MarginCom mt={20}/>
                    <CustomSelectBox 
                        strOptionList={getEquipStandConverter(equipMainList,inputInfo.eit_type) ? getEquipStandConverter(equipMainList,inputInfo.eit_type) : ['선택하세요.']}
                        strSetOption={inputInfoHandler}
                        selOption={inputInfo.eit_stand1}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                        defaultText={inputInfo.eit_type === '' ? '장비 종류를 선택해주세요.' : '장비 규격 선택'}
                        type={'eit_stand1'}
                        title={'장비 규격'}
                        essential
                        isDisable={inputInfo.eit_type === ''}
                    />
                    <MarginCom mt={20}/>

                    <CustomSelectBox 
                        strOptionList={getEquStaDetailCon(equipMainList,inputInfo.eit_type,inputInfo.eit_stand1) ? getEquStaDetailCon(equipMainList,inputInfo.eit_type,inputInfo.eit_stand1) : ['선택하세요.']}
                        strSetOption={inputInfoHandler}
                        selOption={inputInfo.eit_stand2}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                        defaultText={inputInfo.eit_stand1 === '' ? '장비 규격을 선택해주세요.' : '장비 상세 규격 선택'}
                        type={'eit_stand2'}
                        title={'장비 상세 규격'}
                        essential
                        isDisable={inputInfo.eit_stand1 === ''}
                    />
                </View>
                <View style={ElectronicContractstyle.WhiteBox}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>부속장치 보유현황</Text>
                    {/* <TouchableOpacity>
                        <Text style={[fontStyle.f_medium,{fontSize:14,color:colors.FONT_COLOR_BLACK,backgroundColor:colors.BORDER_GRAY_COLOR,paddingHorizontal:8,borderRadius:12,paddingVertical:3}]}>
                            장치삭제
                        </Text>
                    </TouchableOpacity> */}
                </View>
                    
                <View>
                    <Text style={[fontStyle.f_semibold,{fontSize:16, color:colors.FONT_COLOR_BLACK,marginBottom:5}]}>부속 장치</Text>
                    <View style={{flexDirection:'row'}}>
                        <CustomSelectBox 
                            strOptionList={accessoriesConvert(inputInfo.eit_type) ? accessoriesConvert(inputInfo.eit_type) : ['선택하세요.']}
                            strSetOption={tempSelAccHandler}
                            selOption={tempSelAcc}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                            defaultText={inputInfo.eit_type === '' ? '장비 종류를 선택해주세요.' : '부속 장비 선택'}
                            style={{flex:7}}
                            isDisable={inputInfo.eit_type === ''}
                        />
                        <TouchableOpacity onPress={accessoriesAddHandler} style={[styles.addButton,{flexDirection:'row',justifyContent:'center',alignItems:'center',marginLeft:10}]}>
                            <Image source={require('../../../assets/img/ic_add2.png')} style={{width:16,height:13}}/>
                            <Text style={[fontStyle.f_semibold,{fontSize:18,color:colors.MAIN_COLOR,marginLeft:5}]}>추가</Text>
                        </TouchableOpacity>
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
                </View>
                {inputInfo.sub.map((item,index) => {
                    return(
                        <View key={index}>
                            <MarginCom mt={10} />
                            <View style={[styles.TextInputFalseBox,{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,paddingVertical:15,}]}>
                                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>{item}</Text>
                                <TouchableOpacity onPress={()=>{deleteAccHandler(index)}}>
                                    <Image source={require('../../../assets/img/ic_circle_x.png')} style={{width:20,height:20}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
                    
                </View>
                <View style={ElectronicContractstyle.WhiteBox}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>장비서류 업로드</Text>
                </View>
                <View style={{marginBottom:40}}>
                {  //서류업로드 체크
                    fileCheck ? equProfileUploadList.map((data, index) => { //typeerror 고치기
                        // const fileName:string = 'mpt_file'+String(index+1);
                        // const keyName:string = 'mpt_file'+String(index+1)+'_check';
                        return(
                            <View key={index}>
                                {Object.values(fileCheck)[index] === 'Y' &&
                                    <View style={{ paddingVertical: 10 }} key={index}>
                                        <View style={{ flexDirection: 'row'}}>
                                            <Text style={[fontStyle.f_semibold, { color: colors.FONT_COLOR_BLACK, fontSize: 16, marginRight: 5, marginBottom: 5}]}>{data.name} <Text style={{color:colors.ORANGE_COLOR}}>{Object.values(fileCheck)[index] === 'Y' && '*'}</Text></Text>
                                            {/* <Text style={[fontStyle.f_semibold, { fontSize: 16, color: statusType === 0 ? colors.FONT_COLOR_GRAY : statusType === 1 ? colors.FONT_COLOR_BLACK2 : colors.MAIN_COLOR}]}>
                                                {inputInfo[keyName] === '0' ? '[미등록]' : inputInfo[keyName] === '1' ? '[승인중]' : '[승인완료]'}
                                                <Text style={[ styles.OrengeStar]}>{ data.name !== '통장사본' ? '*' : null }</Text>
                                            </Text> */}
                                        </View>

                                        <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }} onPress={()=>{
                                            setSelImgModal(true); 
                                            setSelImage(String(index+1))
                                        }}>
                                            <ImageBackground
                                            style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:undefined? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                                            source={uploadList[uploadList.findIndex(el=>el.key === String(index+1))] ? { uri : uploadList[uploadList.findIndex(el=>el.key === String(index+1))].tmp_name} : undefined}
                                            resizeMode="cover"
                                            imageStyle={{ borderRadius: 10 }}>
                                                {(!uploadList[uploadList.findIndex(el=>el.key === String(index+1))])&&
                                                    <Image 
                                                    style={{ width: 15, height: 15}}
                                                    source={require('../../../assets/img/ic_add.png')}
                                                    />
                                                }
                                                {uploadList.filter((el) => el.key === String(index+1)).length > 0 &&
                                                    <TouchableOpacity
                                                        style={{ position:'absolute', right: 10, top: 10 }}
                                                        onPress={() =>{
                                                            alertModalOn(`${data.name} 파일을 삭제하시겠습니까?`,'delete_confirm');
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
                                }
                            </View>
                        )
                })
                
                :
                <View>
                    <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}><Text style={{color:colors.RED_COLOR4}}>* </Text>장비를 선택해주세요.</Text>
                </View>
                }
                </View>

                <CustomButton
                // style={{height:46}}
                // labelStyle={{height:46}}
                label={'장비 추가 완료'}
                action={()=>{addEquipInfoHandler()}}
                />
                </View>
                


            </ScrollView>
            <AlertModal 
                show={alertModal.alert}
                msg={alertModal.msg}
                type={alertModal.type}
                hide={alertModalOff}
                action={alertAction}
                btnLabel='확인'
            />
            <SelectImageUpload 
                show={selImgModal}
                hide={()=>{setSelImgModal(false);}}
                setImage={uploadImage}
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