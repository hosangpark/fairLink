import React, { useRef, useState } from "react"
import { ScrollView, Text, TextInput, TouchableOpacity, View,ImageBackground, Image,Platform } from "react-native"
import { BackHeader } from "../../../component/header/BackHeader"
import { colors, fontStyle, selectBoxStyle, styles } from '../../../style/style';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouterNavigatorParams } from "../../../../type/routerType";
import { AlertClearType } from "../../../modal/modalType";
import { AlertModal, initialAlert } from "../../../modal/AlertModal";
import { usePostMutation } from "../../../util/reactQuery";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { MyInfoDataType, MypageDataType } from "../../../component/componentsType";
import { BackHandlerCom } from "../../../component/utils/BackHandlerCom";
import { CustomSelectBox } from "../../../component/CustomSelectBox";
import { bankList, locationList } from "../../../component/utils/list";
import { MarginCom } from "../../../component/MarginCom";
import { CustomInputTextBox } from "../../../component/CustomInputTextBox";
import { SelImageType } from "../../screenType";
import { SelectImageUpload } from "../../../modal/SelectImageUpload";
import { toggleLoading } from "../../../redux/actions/LoadingAction";

type tempUploadImageType = {
    name : string
    type : string,
    tmp_name : string,
    size : number,
    key : string,
}

export const MyInfoEqu = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const {mt_type,mt_idx} = useAppSelector(state => state.userInfo);
    const [isEditable, setIsEditable] = useState(false);
    const [bgColor, setBgColor] = useState(colors.BACKGROUND_COLOR_GRAY1)
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);
    const [cameraModal, setCameraModal] = React.useState(false);

    const [name, setName] = useState<string>('')
    const [birth,setBirth] = useState<string>('')
    const [position,setPosition] = useState<string>('')
    const [company,setCompany] = useState<string>('')
    const [location, setLocation] = useState<string>('');
    const [ceo,setCeo] = useState<string>('')
    const [businessNum,setBusinessNum] = useState<string>('')
    const [phoneNum,setPhoneNum] = useState<string>('')
    const [email,setEmail] = useState<string>('');
    const [metBank, setMetBank] = useState<string>('');
    const [metBankNum, setMetBankNum] = useState<string>('');

    const [selImage, setSelImage] = React.useState('');

    const [beforeBankImg, setBeforeBankImg] = useState<string>('');
    const [beforeBusiImg, setBeforeBusiImg] = useState<string>('');

    const [uploadList, setUploadList] = React.useState<tempUploadImageType[]>([]);

    // const [bankImg, setBankImg] = useState<tempUploadImageType>({
    //     name : '',
    //     type :'',
    //     uri : '',
    //     size: 0,
    // })
    // const [busiImg, setBusiImg] = useState<tempUploadImageType>({
    //     name : '',
    //     type :'',
    //     uri : '',
    //     size: 0,
    // })


    const scrollViewRef = useRef<ScrollView>(null);

    const equipInfoMutation = usePostMutation('equipInfo','equip/my_info.php')
    const equipModifyMutation = usePostMutation('equipInfo','equip/my_info_update.php',true)

    const handleButtonClick = () => {
        if (isEditable === false) {
            setIsEditable(true)
            setBgColor(colors.WHITE_COLOR)
            scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true});
        } else {
            handleInputCheck()
        }
    };
    const handleInputCheck = () => {

        let flag = true;

        const busiFilterData = uploadList.filter(el => el.key === '1');
        const bankFilterData = uploadList.filter(el => el.key === '9');

        console.log(busiFilterData);
        if(busiFilterData.length === 0 && beforeBusiImg === ''){
            alertModalOn('사업자등록증을 등록해주세요.');
            flag = false;
            return;
        }
        else if(bankFilterData.length === 0 && beforeBankImg === ''){
            alertModalOn('통장사본을 등록해주세요.');
            flag = false;
            return;
        }

       if(name == "" || birth =="" || company =="" || ceo=="" || phoneNum=="" || email=="") {
            alertModalOn('미작성항목이 있는 경우 사용기능이 제한됩니다.')
        } 
        else if(flag) {
            setIsEditable(false)
            setBgColor(colors.BACKGROUND_COLOR_GRAY1)
            ModyfiInform()
        }
    }
    const alertModalOn = ( msg : string, type? : string ) => {
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
        if(alertModal.type === 'delete_confirm'){
            deleteImage(String(selImage));
        }
    }

    const uploadImage = async (image : SelImageType) => { //사진 업로드
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
    

    const InfoInform = async (): Promise<void> => {
        try {
            const idxParams = {
                mt_idx : mt_idx,
            }
            const {result,data, msg} = await equipInfoMutation.mutateAsync(idxParams)


            if(result === 'true'){
                console.log("result",result)
                console.log("msg",msg)
                setName(data.data.mt_name)
                setBirth(data.data.mt_birth)
                setPosition(data.data.mct_position)
                setPhoneNum(data.data.mt_hp)
                setEmail(data.data.mt_email)
                setMetBank(data.data.mt_bank);
                setMetBankNum(data.data.mt_bank_num);


                setBeforeBankImg(data.data.mt_bank_file)
                setBeforeBusiImg(data.data.met_busi_file)
                if(mt_type === '2'){
                    setLocation(data.data.met_location);
                }
                if(mt_type === '1'){
                    setCompany(data.data.mct_company)
                    setCeo(data.data.mct_ceo)
                    setBusinessNum(data.data.mct_busi_num)
                } else if(mt_type ==='2'){
                    setCompany(data.data.met_company)
                    setCeo(data.data.met_ceo)
                    setBusinessNum(data.data.met_busi_num)
                }
            }
            else{
                console.log("else",result)
            }
        // }
        } catch(err) {
            console.log(err);
            
        }
    };

    React.useEffect(()=>{
        console.log(uploadList[uploadList.findIndex(el=>el.key === '9')]);
        console.log(uploadList[uploadList.findIndex(el=>el.key === '1')]);
        console.log(beforeBankImg);
        console.log(beforeBusiImg);
    },[beforeBankImg,beforeBusiImg])
    const ModyfiInform = async (): Promise<void> => {
        try {
            let idxParams : {
                mt_idx : string,
                mt_birth : string,
                mt_hp : string,
                met_location : string,
                met_bank : string,
                met_bank_num : string,
                met_busi_file? : object,
                met_bank_file? : object,
            } = {
                mt_idx : mt_idx,
                mt_birth : birth,
                mt_hp : phoneNum,
                met_location : location,
                met_bank : metBank,
                met_bank_num : metBankNum,
            }   

            const busiFilterData = uploadList.filter(el => el.key === '1');
            const bankFilterData = uploadList.filter(el => el.key === '9');

            if(busiFilterData.length > 0){
                idxParams = {
                    ...idxParams,
                    met_busi_file : {
                        name : busiFilterData[0].name,
                        size : busiFilterData[0].size,
                        uri : Platform.OS === 'android' ? busiFilterData[0].tmp_name :  busiFilterData[0].tmp_name.replace('file://', ''),
                        type : busiFilterData[0].type
                    }
                }
            }
            if(bankFilterData.length > 0){
                idxParams = {
                    ...idxParams,
                    met_bank_file : {
                        name : bankFilterData[0].name,
                        size : bankFilterData[0].size,
                        uri : Platform.OS === 'android' ? bankFilterData[0].tmp_name :  bankFilterData[0].tmp_name.replace('file://', ''),
                        type : bankFilterData[0].type
                    }
                }
            }            
            dispatch(toggleLoading(true));
            const {result,data, msg} =  await equipModifyMutation.mutateAsync(idxParams)
            dispatch(toggleLoading(false));

            if(result === 'true'){
                console.log("result",result)
                console.log("data",data.data)
                console.log("msg",msg)
                setUploadList([]);
                InfoInform();
                alertModalOn('정보 수정이 완료되었습니다.','edit_success');
            }
            else{
                console.log("else",result)
            }
        } catch(err) {
            console.log(err);
            
        }
    };
    

    React.useEffect(()=>{
        InfoInform()
    },[])
    
    return (
        <>
        <BackHeader title="나의 정보" />
        <BackHandlerCom />
        <ScrollView ref={scrollViewRef}>
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>프로필 정보</Text>
                <View style={{ paddingVertical: 10 }}>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>이름</Text>
                        <TextInput 
                            style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:colors.BACKGROUND_COLOR_GRAY1} ]}
                            editable={false}
                            value={name}
                        />
                    </View>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>생년월일</Text>
                        <TextInput 
                            style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:colors.BACKGROUND_COLOR_GRAY1} ]}
                            editable={false}
                            value={birth}
                            onChangeText={setBirth}
                            placeholder="ex) 1999-01-01"
                        />
                    </View>
                </View>
            </View>

            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>회사 정보</Text>
                <View style={{ paddingVertical: 10 }}>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>회사명</Text>
                        <TextInput 
                            style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                            editable={isEditable}
                            value={company}
                            onChangeText={setCompany}
                        />
                    </View>
                    <View>
                        <CustomSelectBox 
                            strOptionList={locationList}
                            strSetOption={setLocation}
                            selOption={location}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                            defaultText='활동지역을 선택해주세요.'
                            title={'활동지역'}
                            isDisable={!isEditable}
                            essential
                        />
                    </View>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>대표자</Text>
                        <TextInput 
                            style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                            editable={isEditable}
                            value={ceo}
                            onChangeText={setCeo}
                        />
                    </View>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>사업자번호</Text>
                        <TextInput 
                            style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:colors.BACKGROUND_COLOR_GRAY1} ]}
                            editable={false}
                            value={businessNum}
                            onChangeText={setBusinessNum}
                        />
                    </View>
                    <MarginCom isBorder isBorderDeep mt={30} mb={30} />
                    <CustomSelectBox 
                        objOptionList={bankList}
                        objSetOption={setMetBank}
                        selOption={bankList.filter(el=>el.key === metBank)[0] ? bankList.filter(el=>el.key === metBank)[0].name : ''}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                        defaultText='주거래은행을 선택해주세요.'
                        title={'주거래은행'}
                        essential
                        isDisable={!isEditable}
                    />
                    <CustomInputTextBox 
                        containerStyle={{marginTop:20}}
                        action={()=>{}}
                        button=''
                        editable={isEditable}
                        placeholder="계좌번호를 입력해주세요. ( '-' 포함 )"
                        placeholderTextColor={colors.GRAY_COLOR}
                        input={metBankNum}
                        setInput={setMetBankNum}
                        title='계좌번호'
                        essential
                        inputType='number-pad'
                    />
                </View>
            </View>
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR,}}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>연락처</Text>
                <View style={{ paddingTop: 10 }}>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>핸드폰 번호</Text>
                        <TextInput 
                            style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                            editable={isEditable}
                            value={phoneNum}
                            onChangeText={setPhoneNum}
                            keyboardType="number-pad"
                        />
                    </View>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>이메일</Text>
                        <TextInput 
                            style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:colors.BACKGROUND_COLOR_GRAY1} ]}
                            editable={false}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>
            </View>
            <MarginCom mt={10} />
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>첨부서류</Text>
                <View>
                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row'}}>
                                <Text style={[fontStyle.f_semibold, { color: colors.FONT_COLOR_BLACK, fontSize: 16, marginRight: 5, marginBottom: 5}]}>사업자등록증 <Text style={{color:colors.ORANGE_COLOR}}>*</Text></Text>
                                {/* <Text style={[fontStyle.f_semibold, { fontSize: 16, color: statusType === 0 ? colors.FONT_COLOR_GRAY : statusType === 1 ? colors.FONT_COLOR_BLACK2 : colors.MAIN_COLOR}]}>
                                    {inputInfo[keyName] === '0' ? '[미등록]' : inputInfo[keyName] === '1' ? '[승인중]' : '[승인완료]'}
                                    <Text style={[ styles.OrengeStar]}>{ data.name !== '통장사본' ? '*' : null }</Text>
                                </Text> */}
                            </View>

                            <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }} onPress={()=>{
                                if(isEditable){
                                    setCameraModal(true); 
                                    setSelImage('1')
                                }
                            }}>
                                <ImageBackground
                                style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:undefined? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                                source={uploadList[uploadList.findIndex(el=>el.key === '1')] ? { uri : uploadList[uploadList.findIndex(el=>el.key === '1')].tmp_name} : beforeBusiImg !== '' ? {uri : beforeBusiImg} : undefined}
                                resizeMode="cover"
                                imageStyle={{ borderRadius: 10 }}>
                                    {(!uploadList[uploadList.findIndex(el=>el.key === '1')] && beforeBusiImg === '')&&
                                        <Image 
                                        style={{ width: 15, height: 15}}
                                        source={require('../../../assets/img/ic_add.png')}
                                        />
                                    }
                                    {uploadList.filter((el) => el.key === '1').length > 0 &&
                                        <TouchableOpacity
                                            style={{ position:'absolute', right: 10, top: 10 }}
                                            onPress={() =>{
                                                alertModalOn(`사업자 등록증 파일을 삭제하시겠습니까?`,'delete_confirm');
                                                setSelImage('1')
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
                </View>
        
                <View>
                    <View style={{ paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row'}}>
                            <Text style={[fontStyle.f_semibold, { color: colors.FONT_COLOR_BLACK, fontSize: 16, marginRight: 5, marginBottom: 5}]}>통장사본 <Text style={{color:colors.ORANGE_COLOR}}>*</Text></Text>
                            {/* <Text style={[fontStyle.f_semibold, { fontSize: 16, color: statusType === 0 ? colors.FONT_COLOR_GRAY : statusType === 1 ? colors.FONT_COLOR_BLACK2 : colors.MAIN_COLOR}]}>
                                {inputInfo[keyName] === '0' ? '[미등록]' : inputInfo[keyName] === '1' ? '[승인중]' : '[승인완료]'}
                                <Text style={[ styles.OrengeStar]}>{ data.name !== '통장사본' ? '*' : null }</Text>
                            </Text> */}
                        </View>

                        <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }} onPress={()=>{
                            if(isEditable){
                                setCameraModal(true); 
                                setSelImage(('9'))
                            }
                        }}>
                            <ImageBackground
                            style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:undefined? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                            source={uploadList[uploadList.findIndex(el=>el.key === '9')] ? { uri : uploadList[uploadList.findIndex(el=>el.key === '9')].tmp_name} : beforeBankImg !== '' ? {uri : beforeBankImg} : undefined}
                            resizeMode="cover"
                            imageStyle={{ borderRadius: 10 }}>
                                {(!uploadList[uploadList.findIndex(el=>el.key === '9')] && beforeBankImg === '')&&
                                    <Image 
                                    style={{ width: 15, height: 15}}
                                    source={require('../../../assets/img/ic_add.png')}
                                    />
                                }
                                {uploadList.filter((el) => el.key === '9').length > 0 &&
                                    <TouchableOpacity
                                        style={{ position:'absolute', right: 10, top: 10 }}
                                        onPress={() =>{
                                            alertModalOn(`통장사본 파일을 삭제하시겠습니까?`,'delete_confirm');
                                            setSelImage('9')
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
                </View>
            </View>
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR,}}>
                {
                    isEditable
                    ?   <TouchableOpacity onPress={handleButtonClick}>
                            <View style={[ styles.buttonStyle ]}>
                                <Text style={ [styles.buttonLabelStyle] }>수정완료</Text>
                            </View>
                        </TouchableOpacity>
                    :   <TouchableOpacity onPress={handleButtonClick}>
                            <View style={[ styles.whiteButtonStyle ]}>
                                <Text style={ [styles.whiteButtonLabelStyle] }>수정하기</Text>
                            </View>
                        </TouchableOpacity>
                }
            </View>
            <AlertModal
                show={alertModal.alert}
                msg={alertModal.msg}
                action={alertAction}
                hide={alertModalOff}
                type={alertModal.type}
                // btnLabel={alertModal.type}
            />
            <SelectImageUpload 
                show={cameraModal}
                hide={()=>{setCameraModal(false);}}
                setImage={uploadImage}
            />
        </ScrollView>
    </>
    )
}