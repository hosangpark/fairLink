import React, { useRef, useState } from "react"
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
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
import { locationList } from "../../../component/utils/list";
import { birth_numeric, email_Check, phone_numeric } from "../../../component/utils/funcKt";
import { bankList } from "../../../component/utils/list";
import { toggleLoading } from "../../../redux/actions/LoadingAction";

export const MyInfo = () => {
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const dispatch = useAppDispatch();
    const {mt_type,mt_idx} = useAppSelector(state => state.userInfo);
    const [isEditable, setIsEditable] = useState(false);
    const [bgColor, setBgColor] = useState(colors.BACKGROUND_COLOR_GRAY1)
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);

    const [name, setName] = useState<string>('')
    const [birth,setBirth] = useState<string>('')
    const [position,setPosition] = useState<string>('')
    const [company,setCompany] = useState<string>('')
    const [location, setLocation] = useState<string>('');
    const [bank, setBank] = useState<string>('');
    const [banknum, setBanknum] = useState<string>('');
    const [ceo,setCeo] = useState<string>('')
    const [businessNum,setBusinessNum] = useState<string>('')
    const [phoneNum,setPhoneNum] = useState<string>('')
    const [email,setEmail] = useState<string>('')

    const scrollViewRef = useRef<ScrollView>(null);

    const consInfoMutation = usePostMutation('consInfo','cons/my_info.php')
    const equipInfoMutation = usePostMutation('equipInfo','equip/my_info.php')
    const pilotInfoMutation = usePostMutation('pilotInfo','pilot/my_info.php')
    const consModifyMutation = usePostMutation('consInfo','cons/my_info_update.php')
    const equipModifyMutation = usePostMutation('equipInfo','equip/my_info_update.php')
    const pilotModifyMutation = usePostMutation('pilotInfo','pilot/my_info_update.php')

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
        switch(mt_type){
            case "1":
                if(name == "" || position =="" || company =="" || ceo=="" || phoneNum=="" || email==""){
                    alertModalOn('미작성항목이 있는 경우 사용기능이 제한됩니다.')
                }else if(!email_Check(email).result){
                    alertModalOn('이메일 형식을 확인해주세요.')
                } else {
                    BackgroundEditable()
                }
            break;
            case "2":
                if(name == "" || birth =="" || company =="" || ceo=="" || phoneNum=="" || banknum ==""){
                    alertModalOn('미작성항목이 있는 경우 사용기능이 제한됩니다.')
                }
                else if(!email_Check(email).result){
                    alertModalOn('이메일 형식을 확인해주세요.')
                } else {
                    BackgroundEditable()
                }
            break;
            case "4":
                if(name == "" || birth =="" || phoneNum=="" || email==""){
                    alertModalOn('미작성항목이 있는 경우 사용기능이 제한됩니다.')
                }else if(!email_Check(email).result){
                    alertModalOn('이메일 형식을 확인해주세요.')
                }else {
                    BackgroundEditable()
                }
            break;
        }
    }
    const BackgroundEditable=()=>{
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true});
        setIsEditable(false)
        setBgColor(colors.BACKGROUND_COLOR_GRAY1)
        ModyfiInform()
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
    

    const InfoInform = async (): Promise<void> => {
        try {
            const idxParams = {
                mt_idx : mt_idx,
            }
            dispatch(toggleLoading(true));
            const {result,data, msg} = 
            mt_type == '1'?  await consInfoMutation.mutateAsync(idxParams)
            :
            mt_type == '2'?  await equipInfoMutation.mutateAsync(idxParams)
            :
            await pilotInfoMutation.mutateAsync(idxParams)

            if(result === 'true'){
                console.log("result",result)
                console.log("data",data.data)
                console.log("msg",msg)
                setName(data.data.mt_name)
                setBirth(data.data.mt_birth)
                setPosition(data.data.mct_position)
                setPhoneNum(data.data.mt_hp)
                setEmail(data.data.mt_email)
                if(mt_type === '1'){
                    setCompany(data.data.mct_company)
                    setCeo(data.data.mct_ceo)
                    setBusinessNum(data.data.mct_busi_num)
                } else if(mt_type ==='2'){
                    setCompany(data.data.met_company)
                    setCeo(data.data.met_ceo)
                    setBusinessNum(data.data.met_busi_num)
                    setLocation(data.data.met_location);
                    setBank(data.data.mt_bank);
                    setBanknum(data.data.mt_bank_num);
                }
            }
            else{
                console.log("else",result)
            }
            dispatch(toggleLoading(false));
        // }
        } catch(err) {
            console.log(err);
            
        }
    };

    const ModyfiInform = async (): Promise<void> => {
        let idxParams:any = {
            mt_idx : mt_idx,
            // mt_name : name,
            mt_hp : phoneNum,
            // mt_email : email,
        }
        try {
            mt_type =="1"?
            idxParams = {
                ...idxParams,
                mct_position: position,
                mct_ceo: ceo,
                mt_name : name,
                mt_email : email,
            }
            :
            mt_type =="2"?
            idxParams = {
                ...idxParams,
                mt_birth: birth,
                // mct_ceo: ceo,
                met_location:location,
                met_bank:bank,
                met_bank_num:banknum,
                met_busi_file:"",
                met_bank_file:""
            }
            :
            idxParams = {
                ...idxParams,
                mt_birth: birth,
                mt_email : email,
            }
            console.log(idxParams)

            const {result,data, msg} = 
            mt_type == '1'?  await consModifyMutation.mutateAsync(idxParams)
            :
            mt_type == '2'?  await equipModifyMutation.mutateAsync(idxParams)
            :
            await pilotModifyMutation.mutateAsync(idxParams)

            if(result === 'true'){
                console.log("result",result)
                console.log("data",data.data)
                console.log("msg",msg)
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
    },[isEditable])
    
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
                            style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                            editable={isEditable}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    { /* 조종사 */
                        mt_type !== '1'
                        &&
                        <View>
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>생년월일</Text>
                            <TextInput 
                                style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                                editable={isEditable}
                                value={birth}
                                onChangeText={e=>setBirth(birth_numeric(e))}
                                keyboardType={"number-pad"}
                            />
                        </View>
                    } 
                    { /* 건설 */
                        mt_type === '1'
                        &&
                        <View> 
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>직책</Text>
                            <TextInput 
                                style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                                editable={isEditable}
                                value={position}
                                onChangeText={setPosition}
                            />
                        </View>
                    }
                </View>
            </View>
            { /* 건설, 장비 */
                mt_type !== '4'
                &&
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
                                style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                                editable={isEditable}
                                value={businessNum}
                                onChangeText={setBusinessNum}
                                keyboardType={"number-pad"}
                            />
                        </View>
                    </View>
                </View>
            }
            { /* 건설, 장비 */
                mt_type == '2'
                &&
                <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                    <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>계좌 정보</Text>
                    <View style={{ paddingVertical: 10 }}>
                        <View>
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>은행명</Text>
                            <CustomSelectBox
                                objOptionList={bankList}
                                objSetOption={setBank}
                                selOption={bankList.filter(el=>el.key === bank)[0] ? bankList.filter(el=>el.key === bank)[0].name : ''}
                                buttonStyle={selectBoxStyle.btnStyle}
                                buttonTextStyle={selectBoxStyle.btnTextStyle}
                                rowStyle={selectBoxStyle.rowStyle}
                                rowTextStyle={selectBoxStyle.rowTextStyle}
                                defaultText='주거래은행을 선택해주세요.'
                                title={'주거래은행'}
                                isDisable={!isEditable}
                                essential
                            />
                        </View>
                        <View>
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>계좌번호</Text>
                            <TextInput 
                                style={[styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                                editable={isEditable}
                                value={banknum}
                                onChangeText={setBanknum}
                            />
                        </View>
                    </View>
                </View>
            }
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR,}}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>연락처</Text>
                <View style={{ paddingTop: 10 }}>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>핸드폰 번호</Text>
                        <TextInput 
                            style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                            editable={isEditable}
                            value={phoneNum}
                            onChangeText={e=>setPhoneNum(phone_numeric(e))}
                            keyboardType={"number-pad"}
                        />
                    </View>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>이메일</Text>
                        <TextInput 
                            style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                            editable={isEditable}
                            value={email}
                            onChangeText={e=>setEmail(e)}
                        />
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
                // action={alertAction}
                hide={alertModalOff}
                type={alertModal.type}
                btnLabel={alertModal.type}
            />
        </ScrollView>
    </>
    )
}