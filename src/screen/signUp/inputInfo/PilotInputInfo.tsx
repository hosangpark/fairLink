import React from 'react';

import {View, Text , Image, TouchableOpacity} from 'react-native';
import { colors, fontStyle, styles } from '../../../style/style';
import CheckBox from '@react-native-community/checkbox';
import { CustomInputTextBox } from '../../../component/CustomInputTextBox';
import { MarginCom } from '../../../component/MarginCom';
import { CustomSelectBox } from '../../../component/CustomSelectBox';
import { selectBoxStyle } from '../../../style/style';
import { AlertModal, initialAlert } from '../../../modal/AlertModal';
import { CustomButton } from '../../../component/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../../type/routerType';
import { EquInputInfoType, PilotInputInfoType } from '../../screenType';
import { accessoriesConvert, bankList, getEquStaDetailCon, getEquipListConverter, getEquipStandConverter, locationList } from '../../../component/utils/list';
import { usePostMutation } from '../../../util/reactQuery';
import messaging from '@react-native-firebase/messaging';
import { KakaoProfile, getProfile } from '@react-native-seoul/kakao-login';
import { useAppDispatch } from '../../../redux/store';
import { toggleLoading } from '../../../redux/actions/LoadingAction';
import { checkCompanyNumber } from '../../../util/func';

interface PilotInputInfoItemType {
    mb_sex_m : boolean,
    mb_sex_f : boolean,

    mpt_location : string,

    mpt_company : string,
    mpt_ceo : string,
    mpt_busi_num : string,

    mpt_vank : string,
    mpt_vank_num : string,

    mpt_equip_type : string,
    mpt_equip_stand1 : string,
    mpt_equip_stand2 : string,

}
export const PilotInputInfo = ({memberType,sns_id}:PilotInputInfoType) => {

    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const getEquipListMutation = usePostMutation('getEquipList','/equip_filter.php');
    const signUpPilotMutation = usePostMutation('signUpPilot','member/signup4.php');

    const [equipMainList, setEquipMianList] = React.useState<object[]>([]);

    
        
    const [inputInfo, setInputInfo] = React.useState<PilotInputInfoItemType>({
        mb_sex_m : true,
        mb_sex_f : false,

        mpt_company : '',
        mpt_ceo : '',
        mpt_busi_num : '',
        mpt_location : '',
        mpt_vank : '',
        mpt_vank_num:'',

        mpt_equip_type : '',
        mpt_equip_stand1 : '',
        mpt_equip_stand2 : '',
    })
    const [tempSelAcc , setTempSelAcc] = React.useState('');

    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

    const [profileInfo, setProfileInfo] = React.useState<KakaoProfile & {birthday:string}>();

    

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


    const inputInfoHandler = (text : string, key? : string) => {
        if(key){
            setInputInfo({
                ...inputInfo,
                [key] : text,
            })
        }
    }

    const getEquipList = async () => { //장비 리스트 불러오기
        const {data} = await getEquipListMutation.mutateAsync({});

        setEquipMianList(data.data);
    }

    const tempSelAccHandler = (text:string) => { //부속장치 선택했을때 임시 저장
        setTempSelAcc(text);
    }


    const saveInfoHandler = async () => { //장비업체 회원가입

        if(profileInfo){
        const pushToken = await messaging().getToken();

        const birthDayYear = profileInfo.birthyear === 'null' ? '1998' : profileInfo.birthyear;
        const birthDay = profileInfo.birthday === 'null' ? '01-06' : profileInfo.birthday.slice(0,2)+'-'+profileInfo.birthday.slice(2,4);


        const signUpParams = {
            mt_id : profileInfo.email === 'null' ? 'aaa@aaa.com' : profileInfo.email,
            sns_id : sns_id,
            app_token : pushToken,
            sql_check : 'N',
            mt_type : '4',
            mt_name : profileInfo.nickname === 'null' ? 'name' : profileInfo.nickname,
            mt_birth : birthDayYear+'-'+birthDay,
            // mt_gender : 'M'
            mt_hp : profileInfo.phoneNumber === 'null' ? '010-9793-9181' : profileInfo.phoneNumber,
            mt_gender : inputInfo.mb_sex_m ? 'M' : 'F',
            mpt_company : inputInfo.mpt_company,
            mpt_ceo : inputInfo.mpt_ceo,
            mpt_busi_num : inputInfo.mpt_busi_num,
            mpt_location:inputInfo.mpt_location,
            mpt_vank:inputInfo.mpt_vank,
            mpt_vank_num:inputInfo.mpt_vank_num,
            mpt_equip_type : inputInfo.mpt_equip_type,
            mpt_equip_stand1 : inputInfo.mpt_equip_stand1,
            mpt_equip_stand2 : inputInfo.mpt_equip_stand2,
        }

        dispatch(toggleLoading(true));
        const {data,msg,result} = await signUpPilotMutation.mutateAsync(signUpParams);
        dispatch(toggleLoading(false));

        console.log(data,msg,result);

        if(result === 'true'){
            navigation.replace('RegDocument',{
                fileCheck:data.data.file_check,
                memberType:memberType,
                mt_idx:data.data.mt_idx,
                mt_id : sns_id,
            });
        }
        else{

        }
        }
    }

    const inputCheckHandler = () => {
        if(inputInfo.mpt_company === ''  || inputInfo.mpt_ceo === '' || inputInfo.mpt_busi_num === '' || inputInfo.mpt_location === '' || inputInfo.mpt_vank === '' || inputInfo.mpt_vank_num === '' || inputInfo.mpt_equip_type === ''){
            alertModalOn('필수항목을 모두 입력하세요.');
        }
        else if(!checkCompanyNumber(inputInfo.mpt_busi_num)){
            alertModalOn(`올바른 사업자등록번호를 입력해주세요.\nex) 123-12-12345`);
        }
        else if(inputInfo.mpt_equip_type !== ''){
            if(inputInfo.mpt_equip_stand1 === ''){
                alertModalOn('장비 규격을 선택해주세요.');
            }
            else{
                if(inputInfo.mpt_equip_stand2 === ''){
                    alertModalOn('장비 상세 규격을 선택해주세요.');
                }
                else{
                    saveInfoHandler();
                }
            }
        }   
    }

    const getProfileInfo = async () => { //카카오 정보 불러오기
        const profile : KakaoProfile & {birthday:string} = await getProfile();
        console.log(profile);
        setProfileInfo(profile);

        if(profile.gender === 'gender' || profile.gender === 'null'){
            setInputInfo({
                ...inputInfo,
                mb_sex_m : true,
                mb_sex_f : false,
            })
        }
        else{
            setInputInfo({
                ...inputInfo,
                mb_sex_m : true,
                mb_sex_f : false,
            })
        }
    }


    React.useEffect(()=>{
        getProfileInfo();
    },[])

    React.useEffect(()=>{
        getEquipList();
    },[])

    React.useEffect(()=>{
        if(inputInfo.mpt_equip_type !== ''){
            setInputInfo({
                ...inputInfo,
                mpt_equip_stand1 : '',
                mpt_equip_stand2 : '',
            })
            setTempSelAcc('');
        }
    },[inputInfo.mpt_equip_type])


    return(
        <View style={{flex:1}}>
            <View style={{marginTop:20}}>
                <Text style={[fontStyle.f_semibold,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>성별</Text>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center', marginTop:10}}>
                        <CheckBox
                            disabled={true}
                            value={inputInfo.mb_sex_m}
                            onValueChange={(e) => setInputInfo({
                                ...inputInfo,
                                mb_sex_m : true,
                                mb_sex_f : false,
                            })}
                            tintColors={{ true: colors.MAIN_COLOR }}
                            style={{ width: 24, height: 24}}
                            // style={{justifyContent:'flex-start',alignItems:'flex-start'}}
                        />
                        <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginLeft:10}]}>남성</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center', marginTop:10}}>
                        <CheckBox
                            disabled={true}
                            value={inputInfo.mb_sex_f}
                            onValueChange={(e) => setInputInfo({
                                ...inputInfo,
                                mb_sex_m : false,
                                mb_sex_f : true,
                            })}
                            tintColors={{ true: colors.MAIN_COLOR }}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginLeft:10}]}>여성</Text>
                    </View>
                </View>
                <MarginCom isBorder isBorderDeep mt={30} mb={30}/>


                <CustomInputTextBox 
                    action={()=>{}}
                    button=''
                    editable
                    placeholder='회사명을 입력해주세요.'
                    placeholderTextColor={colors.GRAY_COLOR}
                    input={inputInfo.mpt_company}
                    setInput={inputInfoHandler}
                    title='회사명'
                    type='mpt_company'
                    essential
                />
                <CustomInputTextBox 
                    containerStyle={{marginTop:20}}
                    action={()=>{}}
                    button=''
                    editable
                    placeholder='대표자명을 입력해주세요.'
                    placeholderTextColor={colors.GRAY_COLOR}
                    input={inputInfo.mpt_ceo}
                    setInput={inputInfoHandler}
                    title='대표자명'
                    type="mpt_ceo"
                    essential
                />
                <CustomInputTextBox 
                    containerStyle={{marginTop:20}}
                    action={()=>{}}
                    button=''
                    editable
                    placeholder='ex) 123-12-12345'
                    placeholderTextColor={colors.GRAY_COLOR}
                    input={inputInfo.mpt_busi_num}
                    setInput={inputInfoHandler}
                    title='사업자등록번호'
                    type="mpt_busi_num"
                    essential
                    inputType='number-pad'
                />
                <MarginCom mt={20} />
                <CustomSelectBox 
                    strOptionList={locationList}
                    strSetOption={inputInfoHandler}
                    type={'mpt_location'}
                    selOption={inputInfo.mpt_location}
                    buttonStyle={selectBoxStyle.btnStyle}
                    buttonTextStyle={selectBoxStyle.btnTextStyle}
                    rowStyle={selectBoxStyle.rowStyle}
                    rowTextStyle={selectBoxStyle.rowTextStyle}
                    defaultText='활동지역을 선택해주세요.'
                    title={'활동지역'}
                    essential
                />
                {/* <View style={[styles.bottomBorder,{height:1,marginVertical:20}]} />
                 */}
                <MarginCom isBorder isBorderDeep mt={30} mb={30} />
                <CustomSelectBox 
                    objOptionList={bankList}
                    objSetOption={inputInfoHandler}
                    type={'mpt_vank'}
                    selOption={bankList.filter(el=>el.key === inputInfo.mpt_vank)[0] ? bankList.filter(el=>el.key === inputInfo.mpt_vank)[0].name : ''}
                    buttonStyle={selectBoxStyle.btnStyle}
                    buttonTextStyle={selectBoxStyle.btnTextStyle}
                    rowStyle={selectBoxStyle.rowStyle}
                    rowTextStyle={selectBoxStyle.rowTextStyle}
                    defaultText='주거래은행을 선택해주세요.'
                    title={'주거래은행'}
                    essential
                />
            
                <CustomInputTextBox 
                    containerStyle={{marginTop:20}}
                    action={()=>{}}
                    button=''
                    editable
                    placeholder="계좌번호를 입력해주세요. ( '-' 포함 )"
                    placeholderTextColor={colors.GRAY_COLOR}
                    input={inputInfo.mpt_vank_num}
                    setInput={inputInfoHandler}
                    title='계좌번호'
                    type="mpt_vank_num"
                    essential
                    inputType='number-pad'
                />
                <MarginCom isBorder isBorderDeep mt={30} mb={30} />
                
                <CustomSelectBox 
                    strOptionList={getEquipListConverter(equipMainList)}
                    strSetOption={inputInfoHandler}
                    selOption={inputInfo.mpt_equip_type}
                    buttonStyle={selectBoxStyle.btnStyle}
                    buttonTextStyle={selectBoxStyle.btnTextStyle}
                    rowStyle={selectBoxStyle.rowStyle}
                    rowTextStyle={selectBoxStyle.rowTextStyle}
                    defaultText='장비 종류 선택'
                    type={'mpt_equip_type'}
                    title={'장비 종류'}
                    essential
                />
                <View style={{flexDirection:'row',marginTop:5}}>
                    <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR}]}>*</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR,marginLeft:5}]}>대표자 명의의 보유장비가 여러대일 경우, 메인 장비 1대만 등록 기타 장비는 회원가입 후 '마이페이지-장비현황'에서 추가해주세요.</Text>
                </View>
                <MarginCom mt={20}/>
                <CustomSelectBox 
                    strOptionList={getEquipStandConverter(equipMainList,inputInfo.mpt_equip_type) ? getEquipStandConverter(equipMainList,inputInfo.mpt_equip_type) : ['선택하세요.']}
                    strSetOption={inputInfoHandler}
                    selOption={inputInfo.mpt_equip_stand1}
                    buttonStyle={selectBoxStyle.btnStyle}
                    buttonTextStyle={selectBoxStyle.btnTextStyle}
                    rowStyle={selectBoxStyle.rowStyle}
                    rowTextStyle={selectBoxStyle.rowTextStyle}
                    defaultText={inputInfo.mpt_equip_type === '' ? '장비 종류를 선택해주세요.' : '장비 규격 선택'}
                    type={'mpt_equip_stand1'}
                    title={'장비 규격'}
                    essential
                    isDisable={inputInfo.mpt_equip_type === ''}
                />
                <MarginCom mt={20}/>

                <CustomSelectBox 
                    strOptionList={getEquStaDetailCon(equipMainList,inputInfo.mpt_equip_type,inputInfo.mpt_equip_stand1) ? getEquStaDetailCon(equipMainList,inputInfo.mpt_equip_type,inputInfo.mpt_equip_stand1) : ['선택하세요.']}
                    strSetOption={inputInfoHandler}
                    selOption={inputInfo.mpt_equip_stand2}
                    buttonStyle={selectBoxStyle.btnStyle}
                    buttonTextStyle={selectBoxStyle.btnTextStyle}
                    rowStyle={selectBoxStyle.rowStyle}
                    rowTextStyle={selectBoxStyle.rowTextStyle}
                    defaultText={inputInfo.mpt_equip_stand1 === '' ? '장비 규격을 선택해주세요.' : '장비 상세 규격 선택'}
                    type={'mpt_equip_stand2'}
                    title={'장비 상세 규격'}
                    essential
                    isDisable={inputInfo.mpt_equip_stand1 === ''}
                />
                <MarginCom mt={20}/>
                
                <CustomButton 
                    // action={()=>{navigation.replace('RegDocument',{memberType:memberType})}}
                    action={inputCheckHandler}
                    label='저장 후 필수서류 등록'
                    style={{marginTop:30}}
                    labelStyle={{...fontStyle.f_semibold}}
                />
            </View>
            <AlertModal 
                show={alertModal.alert}
                msg={alertModal.msg}
                type={alertModal.type}
                hide={alertModalOff}
                action={()=>{}}
                btnLabel='확인'
            />
        </View>
    )
}