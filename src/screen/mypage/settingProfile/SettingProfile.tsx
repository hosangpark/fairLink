import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { BackHeader } from "../../../component/header/BackHeader";
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from "../../../style/style";
import { CustomSelectBox } from "../../../component/CustomSelectBox";
import { AlertClearType } from "../../../modal/modalType";
import { AlertModal, initialAlert } from "../../../modal/AlertModal";
import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouterNavigatorParams } from "../../../../type/routerType";
import { DocCheckItemType, EquipInputInfoType, MyPageIndexType, SelImageType, mptEquipItemType } from "../../screenType";
import { BackHandlerCom } from "../../../component/utils/BackHandlerCom";
import { useAppSelector } from "../../../redux/store";
import { SelectImageUpload } from "../../../modal/SelectImageUpload";
import { usePostMutation } from "../../../util/reactQuery";
import { equProfileUploadList, getEquStaDetailCon, getEquipListConverter, getEquipStandConverter, pilotCareerList, pilotProfileUploadList, pilotUploadList } from "../../../component/utils/list";
import { MarginCom } from "../../../component/MarginCom";
import { NumberObejctType } from "../../../component/componentsType";

// 마이페이지 -> 프로필 설정하기 -> 해당 페이지로 이동해야함
export const SettingProfile = ({route}:any) => {
    const {mt_type, mt_idx} = useAppSelector(state => state.userInfo);
    const reqFileList = pilotProfileUploadList;

    const [strOption,setStrOption] = useState<string>('')
    const [statusType, setstatusType] = useState<number>(0) // 0: 미등록, 1: 승인중, 2: 승인완료
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);
    const [isChecked, setIsChecked] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    const [profileImageModal, setProfileImageModal] = React.useState(false);
    const [docImageModal, setDocImageModal] = React.useState(false);

    const [equipMainList, setEquipMainList] = React.useState<object[]>([]); //장비 리스트

    const getEquipFileListMuataion = usePostMutation('getEquipFileList','equip_file_list.php'); //장비 종류 변경시 파일리스트
    const getEquipListMutation = usePostMutation('getEquipList','/equip_filter.php'); //장비 종류 불러오기
    const getEquipProfileInfo = usePostMutation('getEquipProfileInfo' , 'equip/profile_info.php');

    const [inputInfo, setInputInfo] = React.useState<EquipInputInfoType>({
        mpt_before_profile : '',
        mpt_profile : {
            size:0,
            name : '',
            type : '',
            uri : '',
        },
        mpt_career : '없음',
        mpt_equip : [
            {
                mpt_equip_type : '',
                mpt_equip_stand1 : '',
                mpt_equip_stand2 : '',
            }
        ],
        mpt_equip_memo : '',
        mpt_aspire : '',
        mpt_file_list : [],
        mpt_file1 : '',
        mpt_file1_check : '0',
        mpt_file2 : '',
        mpt_file2_check : '0',
        mpt_file3 : '',
        mpt_file3_check : '0',
        mpt_file4 : '',
        mpt_file4_check : '0',
        mpt_file5 : '',
        mpt_file5_check : '0',
        mpt_file6 : '',
        mpt_file6_check : '0',

    });

    const [fileCheck, setFileCheck] = React.useState<NumberObejctType>()

    const documentData = [
        {id: 0, name: '건설기계조종사면허증'},
        {id: 1, name: '운전면허증'},
        {id: 2, name: '건설기계조종사 안전교육이수증'},
        {id: 3, name: '화물운송종사자 자격증'},
        {id: 4, name: '이동식 크레인조종교육이수증'},
        {id: 5, name: '기중기 운전기능사'},
        {id: 6, name: '통장사본'},
    ]

    const handlePressIn = () => setIsPressed(true);
    const handlePressOut = () => setIsPressed(false);

    const handleCheck = () => {
        setIsChecked(!isChecked);
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

    const checkInputValue = () => {
        if ( "필수 항목을 모두 입력하지 않음") {
            alertModalOn('필수항목을 모두 입력하세요');
        } else {
            alertModalOn('설정이 완료되었습니다.');
            navigation.navigate('MyPage');
        }
    }

    const inputHandler = (text : string, type? : string) => { //입력 handler
        if(type){
            setInputInfo({
                ...inputInfo,
                [type] : text,
            })
        }
    }

    const equipSelHandler = async (text : string, type? : string, index? : number) => { //주특기 장비 관리

        if(type === 'mpt_equip_type' || type === 'mpt_equip_stand1' || type === 'mpt_equip_stand2'){
            if(index || index === 0){
                let tempEquipInfo : EquipInputInfoType = inputInfo;


                tempEquipInfo.mpt_equip[index][type] = text;

                setInputInfo({
                    ...tempEquipInfo
                });

                let tempEquArray : string[] = [];
                tempEquipInfo.mpt_equip.map((item,index) => {
                    const pushEl = `${item.mpt_equip_type}|${item.mpt_equip_stand1}|${item.mpt_equip_stand2}`
                    tempEquArray.push(pushEl);
                })

                if(type === 'mpt_equip_stand2'){
                    const params = {
                        type : 'pilot',
                        equip_arr : tempEquArray,
                    }

                    const {data,result,msg} = await getEquipFileListMuataion.mutateAsync(params);
                    console.log(data.data);
                    setFileCheck(data.data);
                }


            }
        }
    }
    const addEquipHandler = () => { //장비추가
        let tempEquipInfo : EquipInputInfoType = inputInfo;

        tempEquipInfo.mpt_equip.push({
            mpt_equip_type : '',
            mpt_equip_stand1 : '',
            mpt_equip_stand2 : '',
        })

        setInputInfo({
            ...tempEquipInfo,
        })
    }
    const uploadProfileImage = async (image : SelImageType) => {
        // setBusRegImage(image);
        setInputInfo({
            ...inputInfo,
            mpt_profile : {
                name : image.fileName,
                type : 'image/jpg',
                uri : image.uri,
                size : image.fileSize,
            }
        })
        // setBusRegImage({
        //     name : image.fileName,
        //     type : 'image/jpg',
        //     uri : image.uri,
        //     size : image.fileSize,
        // })
    }

    const getEquipList = async () => { //장비 리스트 불러오기 및 프로필 정보 불러오기
        const {data : equipData, result : equipResult, msg : equipMsg} = await getEquipListMutation.mutateAsync({});
        const {data:profileData, result : profileResult, msg : profileMsg} = await getEquipProfileInfo.mutateAsync({mt_idx:mt_idx});

        if(equipResult === 'false'){
            alertModalOn(equipMsg,'error');
        }
        else if(profileResult === 'false'){
            alertModalOn(profileMsg,'error');
        }
        else{
            setEquipMainList(equipData.data); //장비 리스트 넣기
            setInputInfo({ //기저장 프로필 정보 넣기
                ...inputInfo,
                ...profileData.data,
                mpt_before_profile : profileData.data.mpt_profile,
                mpt_career : profileData.data.mpt_career === '' ? '없음' : pilotCareerList[Number(profileData.data.mpt_career)],
                mpt_equip : [...profileData.data.mpt_equip],
            });
            console.log(profileData);

            if(profileData.data.mpt_equip.length > 0 ){ //체크해야할 파일 리스트

                let tempEquArray : string[] = [];
                profileData.data.mpt_equip.map((item:mptEquipItemType,index:number) => {
                    const pushEl = `${item.mpt_equip_type}|${item.mpt_equip_stand1}|${item.mpt_equip_stand2}`
                    tempEquArray.push(pushEl);
                })

                const params = {
                    type : 'pilot',
                    equip_arr : tempEquArray,
                }

                const {data : fileData, result : fileResult, msg : fileMsg} = await getEquipFileListMuataion.mutateAsync(params)

                setFileCheck(fileData.data);
            }
        }
    }

    React.useEffect(()=>{
        getEquipList();
    },[]);

    React.useEffect(()=>{
        console.log(inputInfo);
    },[inputInfo])


    return (
        <ScrollView>
            <BackHeader title="프로필 설정하기"/>
            <BackHandlerCom />
            <SelectImageUpload 
                show={profileImageModal}
                hide={()=>{setProfileImageModal(false)}}
                setImage={uploadProfileImage}
            />
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <View style={{ paddingVertical: 10 }}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>사진등록</Text>
                            <View style={{ flexDirection: 'row'}}>
                                <Text style={[ styles.OrengeStar]}>*</Text>
                                <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK}]}>필수항목</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>setProfileImageModal(true)} style={{ flexDirection: 'row', alignItems: 'flex-end'}}>
                            {inputInfo.mpt_profile.uri === '' ?
                                <Image style={{ width: 110, height: 110,borderRadius:100}} source={ require('../../../assets/img/profile_default.png') }/>
                            :
                                <Image style={{ width: 110, height: 110,borderRadius:100}} source={ {uri : inputInfo.mpt_profile.uri} }/>
                            }
                            <Image style={{ width: 30, height: 30, marginLeft: -30 }} source={ require('../../../assets/img/ic_add_img.png') }/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            { // (조종사 일 때)
                route.params.mt_type ==='4'
                &&
                <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                    <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>활동지역</Text>
                    <View style={{ paddingVertical: 10 }}>
                        <View style={{ marginBottom: 15 }}>
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>지역<Text style={[ styles.OrengeStar]}>*</Text></Text>
                            <CustomSelectBox 
                                defaultText='선택하세요.'
                                strOptionList={['영흥', '삼천포', '본사', '여수',]}
                                selOption={strOption}
                                strSetOption={setStrOption}
                                buttonStyle={selectBoxStyle.btnStyle}
                                buttonTextStyle={selectBoxStyle2.btnTextStyle}
                                rowStyle={selectBoxStyle.rowStyle}
                                rowTextStyle={selectBoxStyle.rowTextStyle}
                            />
                        </View>
                    </View>
                </View>
            }
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>경력사항</Text>
                <View style={{ paddingVertical: 10 }}>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>경력<Text style={[ styles.OrengeStar]}>*</Text></Text>
                        <CustomSelectBox 
                            defaultText={inputInfo.mpt_career}
                            strOptionList={pilotCareerList}
                            selOption={inputInfo.mpt_career}
                            strSetOption={inputHandler}
                            type={'mpt_career'}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle2.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                            labelFooter={' 이상'}
                        />
                    </View>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>주특기 장비<Text style={[ styles.OrengeStar]}>*</Text></Text>
                        {inputInfo.mpt_equip.map((item,index) => {
                            return(
                                <View key={index}>
                                    {index !== 0 &&
                                        <MarginCom isBorderDeep isBorder  mt={10} mb={10} />
                                    }
                                    <View style={{ flexDirection: 'row',}}>
                                        <View style={{ flex: 1, marginRight: 10 }}>
                                            <CustomSelectBox 
                                                defaultText='장비 종류 선택'
                                                strOptionList={getEquipListConverter(equipMainList)}
                                                selOption={item.mpt_equip_type}
                                                strSetOption={equipSelHandler}
                                                buttonStyle={selectBoxStyle.btnStyle}
                                                buttonTextStyle={selectBoxStyle2.btnTextStyle}
                                                rowStyle={selectBoxStyle.rowStyle}
                                                rowTextStyle={selectBoxStyle.rowTextStyle}
                                                selIndex={index}
                                                type={'mpt_equip_type'}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <CustomSelectBox 
                                                defaultText={inputInfo.mpt_equip[index].mpt_equip_type === '' ? '장비 종류를 선택해주세요.' : '장비 규격 선택'}
                                                strOptionList={getEquipStandConverter(equipMainList,inputInfo.mpt_equip[index].mpt_equip_type) ? getEquipStandConverter(equipMainList,inputInfo.mpt_equip[index].mpt_equip_type) : ['선택하세요.']}
                                                selOption={item.mpt_equip_stand1}
                                                strSetOption={equipSelHandler}
                                                buttonStyle={selectBoxStyle.btnStyle}
                                                buttonTextStyle={selectBoxStyle2.btnTextStyle}
                                                rowStyle={selectBoxStyle.rowStyle}
                                                rowTextStyle={selectBoxStyle.rowTextStyle}
                                                selIndex={index}
                                                type={'mpt_equip_stand1'}
                                                isDisable={inputInfo.mpt_equip[index].mpt_equip_type === ''}
                                            />
                                        </View>
                                    </View>
                                    <View>
                                        <CustomSelectBox 
                                            containerStyle={{marginTop:5}}
                                            defaultText={inputInfo.mpt_equip[index].mpt_equip_stand1 === '' ? '장비 규격을 선택해주세요.' : '장비 상세 규격 선택'}
                                            strOptionList={
                                                getEquStaDetailCon(equipMainList,inputInfo.mpt_equip[index].mpt_equip_type,inputInfo.mpt_equip[index].mpt_equip_stand1) ? 
                                                getEquStaDetailCon(equipMainList,inputInfo.mpt_equip[index].mpt_equip_type,inputInfo.mpt_equip[index].mpt_equip_stand1) : 
                                                ['선택하세요.']}
                                            selOption={item.mpt_equip_stand2}
                                            strSetOption={equipSelHandler}
                                            buttonStyle={selectBoxStyle.btnStyle}
                                            buttonTextStyle={selectBoxStyle2.btnTextStyle}
                                            rowStyle={selectBoxStyle.rowStyle}
                                            rowTextStyle={selectBoxStyle.rowTextStyle}
                                            selIndex={index}
                                            type={'mpt_equip_stand2'}
                                            isDisable={inputInfo.mpt_equip[index].mpt_equip_stand1 === ''}
                                        />
                                    </View>
                                </View>
                            )
                        })}
                        {inputInfo.mpt_equip.length < 5 &&
                            <TouchableOpacity onPress={addEquipHandler}>
                                <View style={[ styles.whiteButtonStyle,{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}]}>
                                    <Image style={{ width: 14, height: 14, marginRight: 6 }} source={ require('../../../assets/img/ic_add.png')}/>
                                    <Text style={[fontStyle.f_semibold, { fontSize: 18, color: colors.MAIN_COLOR}]}>장비 추가</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        <View style={{ marginVertical: 10}}>
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>세부경력정보 직접기입<Text style={[ styles.OrengeStar]}>*</Text></Text>
                            <TextInput 
                                style={{ borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 4, padding: 10, minHeight: 150, }}
                                textAlignVertical="top"
                                placeholder="ex) - 흙막이 작업 : 3년"
                                placeholderTextColor={colors.BORDER_GRAY_COLOR3}
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={(e)=>inputHandler(e,'mpt_equip_memo')}
                                value={inputInfo.mpt_equip_memo}
                                // value={}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>나의 포부</Text>
                <View style={{ paddingVertical: 10 }}>
                    <TextInput 
                        style={{ borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 4, padding: 10, minHeight: 150, }}
                        textAlignVertical="top"
                        placeholder="ex) 누구보다 성실하게 일해왔다고 자부합니다."
                        placeholderTextColor={colors.BORDER_GRAY_COLOR3}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(e) => inputHandler(e,'mpt_aspire')}
                        value={inputInfo.mpt_aspire}
                    />
                </View>
            </View>
            { // (조종사 일 때)
                route.params.mt_type ==='4'
                &&
                <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                    <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>소속회사</Text>
                    <View style={{ paddingVertical: 10,  }}>
                        {/* <View style={{ marginBottom: 15, }}> */}
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>소속유무<Text style={[ styles.OrengeStar]}>*</Text></Text>
                            <View style={{ flexDirection: 'row'}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1}}>
                                    <CheckBox
                                        disabled={false}
                                        value={isChecked}
                                        onValueChange={() => handleCheck()}
                                        tintColors={{ true: colors.MAIN_COLOR }}
                                        style={{ width: 20, height: 20, marginVertical: 6, marginRight: 12 }}
                                    />
                                    <Text style={[ fontStyle.f_semibold, { color: colors.FONT_COLOR_BLACK, fontSize: 16}]}>있음</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1}}>
                                    <CheckBox
                                        disabled={false}
                                        value={!isChecked}
                                        onValueChange={() => handleCheck()}
                                        tintColors={{ true: colors.MAIN_COLOR }}
                                        style={{ width: 20, height: 20, marginVertical: 6, marginRight: 12 }}
                                    />
                                    <Text style={[ fontStyle.f_semibold, { color: colors.FONT_COLOR_BLACK, fontSize: 16}]}>없음</Text>
                                </View>
                            </View>
                            {   
                                isChecked &&
                                <View>
                                    <Text style={[ styles.textLabel, fontStyle.f_semibold, { marginTop: 15 }]}>회사 검색</Text>
                                    <View style={{ position: 'relative'}}>
                                        <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut}>
                                            <TextInput 
                                                placeholder='회사명 또는 사업자등록번호로 검색' 
                                                placeholderTextColor={colors.BORDER_GRAY_COLOR3} 
                                                style={[fontStyle.f_light, { fontSize: 16 , borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 4, paddingLeft: 15, paddingRight: 45}]}
                                            />
                                            <Image 
                                                source={ isPressed ? require('../../../assets/img/ic_search_g.png') : require('../../../assets/img/ic_search.png')} 
                                                style={{position: 'absolute', width: 20, height: 20, top: 15, right: 15,}}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{paddingVertical: 10}}>
                                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>회사명</Text>
                                        <TextInput style={{borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 4, paddingHorizontal: 15}}/>
                                    </View>
                                    <View style={{paddingVertical: 10}}>
                                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>대표자</Text>
                                        <TextInput style={{borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 4, paddingHorizontal: 15}}/>
                                    </View>
                                </View>
                            }
                    </View>
                </View>
            }
            { // (조종사 일 때)
                route.params.mt_type ==='4'
                &&
                <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                    <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>계좌정보</Text>
                    <View style={{ paddingVertical: 10 }}>
                        <View style={{ marginBottom: 15 }}>
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>은행명<Text style={[ styles.OrengeStar]}>*</Text></Text>
                            <CustomSelectBox 
                                defaultText='선택하세요.'
                                strOptionList={['국민','기업','농협','신한','산업','우리','한국씨티','하나','SC제일','경남','광주','대구','도이치','부산','산림조합중앙회','저축','새마을금고','수협','신협','우체국','전북','제주','케이뱅크','토스뱅크',]}
                                selOption={strOption}
                                strSetOption={setStrOption}
                                buttonStyle={selectBoxStyle.btnStyle}
                                buttonTextStyle={selectBoxStyle2.btnTextStyle}
                                rowStyle={selectBoxStyle.rowStyle}
                                rowTextStyle={selectBoxStyle.rowTextStyle}
                            />
                            <View style={{paddingVertical: 10}}>
                                <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>계좌번호</Text>
                                <TextInput style={{borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 4, paddingHorizontal: 15}}/>
                            </View>
                        </View>
                    </View>
                </View>
            }
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>서류 업로드</Text>
                
                {  //서류업로드 체크
                    fileCheck && reqFileList.map((data, index) => { //typeerror 고치기
                        const keyName:string = 'mpt_file'+String(index+1)+'_check';
                        return(
                            <View style={{ paddingVertical: 10 }} key={index}>
                                {Object.values(fileCheck)[index] === 'Y' &&
                                        <>
                                            <View style={{ flexDirection: 'row'}}>
                                                <Text style={[fontStyle.f_semibold, { color: colors.FONT_COLOR_BLACK, fontSize: 16, marginRight: 5, marginBottom: 5}]}>{data.name}</Text>
                                                <Text style={[fontStyle.f_semibold, { fontSize: 16, color: statusType === 0 ? colors.FONT_COLOR_GRAY : statusType === 1 ? colors.FONT_COLOR_BLACK2 : colors.MAIN_COLOR}]}>
                                                    {inputInfo[keyName] === '0' ? '[미등록]' : inputInfo[keyName] === '1' ? '[승인중]' : '[승인완료]'}
                                                    <Text style={[ styles.OrengeStar]}>{ data.name !== '통장사본' ? '*' : null }</Text>
                                                </Text>
                                            </View>
                                            <TouchableOpacity onPress={() => alertModalOn('저장된 파일이 있습니다. 변경하시겠습니까?', 'confirm')}>
                                                <View style={[styles.docImage]}>
                                                    <View style={{ flexDirection: 'row', width: '100%', height: '100%'}}>
                                                        <Image style={{ width: '100%', height: '100%',}} source={ require('../../../assets/img/ic_main4.png')}/>
                                                        <TouchableOpacity onPress={() => alertModalOn(`${data.name}을 삭제하시겠습니까?`, 'confirm')}>
                                                            <Image style={{ width: 22, height: 22, marginTop: 10, marginLeft: -30, opacity: 2 }} source={ require('../../../assets/img/ic_modify.png')}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </>
                                }
                            </View>
                        )
                })
                }
                 
                {/* 서류 없을 때 */}
                    {/* <View style={[styles.docImage, {borderColor: colors.BORDER_GRAY_COLOR, }]}>
                        <Image style={{ width: 16, height: 16,}} source={ require('../../../assets/img/ic_add.png')}/>
                    </View> */}
                <View style={{ marginVertical: 20,}}>
                    <TouchableOpacity onPress={checkInputValue}>
                        <View style={[styles.buttonStyle,]}>
                            <Text style={[ styles.buttonLabelStyle,]}>프로필 설정 완료</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <AlertModal 
                show={alertModal.alert}
                msg={alertModal.msg}
                // action={} // 저장일 때 -> 저장 -> "파일이 저장되었습니다.", 삭제일 때 -> 삭제, 설정완료 버튼 클릭 시(필수항목체크 후) -> 마이페이지 이동  
                hide={alertModalOff}
                type={alertModal.type}
            />
        </ScrollView>
    )
}