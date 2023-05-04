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
import { EquInputInfoType } from '../../screenType';
import { accessoriesConvert, bankList, getEquStaDetailCon, getEquipListConverter, getEquipStandConverter, locationList } from '../../../component/utils/list';
import { usePostMutation } from '../../../util/reactQuery';
import messaging from '@react-native-firebase/messaging';
import { getProfile } from '@react-native-seoul/kakao-login';
import { useAppDispatch } from '../../../redux/store';
import { toggleLoading } from '../../../redux/actions/LoadingAction';

interface EquInputInfoItemType {
    mb_sex_m : boolean,
    mb_sex_f : boolean,
    isPilot : boolean,
    isNonePilot : boolean,

    met_location : string,

    met_company : string,
    met_ceo : string,
    met_busi_num : string,

    met_bank : string,
    met_bank_num : string,

    met_equip_type : string,
    met_equip_stand1 : string,
    met_equip_stand2 : string,

    met_sub : string[],
}
export const EquInputInfo = ({memberType,sns_id}:EquInputInfoType) => {

    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const getEquipListMutation = usePostMutation('getEquipList','/equip_filter.php');
    const signUpEquMutation = usePostMutation('signUpEqu','member/signup2.php');

    const [equipMainList, setEquipMainList] = React.useState<object[]>([]);
    
        
    const [inputInfo, setInputInfo] = React.useState<EquInputInfoItemType>({
        mb_sex_m : true,
        mb_sex_f : false,
        isPilot : true,
        isNonePilot : false,

        met_company : '',
        met_ceo : '',
        met_busi_num : '',
        met_location : '',
        met_bank : '',
        met_bank_num:'',

        met_equip_type : '',
        met_equip_stand1 : '',
        met_equip_stand2 : '',

        met_sub : [],
    })
    const [tempSelAcc , setTempSelAcc] = React.useState('');
    const [writeSelAcc, setWriteSelAcc] = React.useState(''); //부속장치 직접입력

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

        setEquipMainList(data.data);
    }

    const tempSelAccHandler = (text:string) => { //부속장치 선택했을때 임시 저장
        setTempSelAcc(text);
    }
    const writeSelHandler = (text:string) => {
        setWriteSelAcc(text);
    } 

    const accessoriesAddHandler = () => { //부속장치 추가했을때 이벤트
        if(inputInfo.met_sub.length === 5){
            alertModalOn('부속 장치는 5개까지 선택가능합니다.');
        }
        else if(tempSelAcc === '기타(직접입력)' && writeSelAcc === ''){
            alertModalOn('부속 장치를 입력해주세요.');
        }
        else{
            let tempArray : string[] = [...inputInfo.met_sub];

            let flag = true;
            inputInfo.met_sub.forEach((item,index) => {
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
                    met_sub : [...tempArray],
                })
                setTempSelAcc('');
                setWriteSelAcc('');
            }
        }
    }

    const deleteAccHandler = (index:number) => { //부속장치 삭제
        let tempArray : string[] = [...inputInfo.met_sub];
        if(tempArray[index]){
            tempArray.splice(index,1);

            setInputInfo({
                ...inputInfo,
                met_sub : [...tempArray]
            })
        }
    }

    const saveInfoHandler = async () => { //장비업체 회원가입

        dispatch(toggleLoading(true));
        let met_sub_string = '';

        if(inputInfo.met_sub.length > 0){
            inputInfo.met_sub.map((item,index) => {
                met_sub_string += item+`${inputInfo.met_sub.length-1 !== index ? ',' : ''}`
            })
        }
        const pushToken = await messaging().getToken();
        const profile: any = await getProfile();

        const signUpParams = {
            mt_id : profile.email === 'null' ? 'aaa@aaa.com' : profile.email,
            sns_id : sns_id,
            app_token : pushToken,
            sql_check : 'N',
            mt_type : '2',
            mt_name : profile.nickname === 'null' ? 'name' : profile.nickname,
            mt_birth : profile.birthyear === 'null' || profile.birthday === 'null' ? '1998-01-06' : profile.birthyaer+'-'+profile.birthday,
            // mt_gender : 'M'
            mt_hp : profile.phoneNumber === 'null' ? '010-9793-9181' : profile.phoneNumber,
            mt_gender : inputInfo.mb_sex_m ? 'M' : 'F',
            met_company : inputInfo.met_company,
            met_ceo : inputInfo.met_ceo,
            met_busi_num : inputInfo.met_busi_num,
            met_location:inputInfo.met_location,
            met_type:inputInfo.isPilot ? 'all' : 'equip',
            met_bank:inputInfo.met_bank,
            met_bank_num:inputInfo.met_bank_num,
            met_equip_type : inputInfo.met_equip_type,
            met_equip_stand1 : inputInfo.met_equip_stand1,
            met_equip_stand2 : inputInfo.met_equip_stand2,
            met_sub:met_sub_string,
        }

        const {data,msg,result} = await signUpEquMutation.mutateAsync(signUpParams);
        dispatch(toggleLoading(false))
        if(result === 'true'){
            navigation.replace('RegDocument',{
                fileCheck:data.data.file_check,
                memberType:memberType,
                mt_idx:data.data.mt_idx,
                mt_id:sns_id,
            });
        }
        else{
            alertModalOn(msg,'');
        }
        
    }

    const inputCheckHandler = () => {
        if(inputInfo.met_company === ''  || inputInfo.met_ceo === '' || inputInfo.met_busi_num === '' || inputInfo.met_location === '' || inputInfo.met_bank === '' || inputInfo.met_bank_num === '' || inputInfo.met_equip_type === ''){
            alertModalOn('필수항목을 모두 입력하세요.');
        }
        else if(inputInfo.met_equip_type !== ''){
            if(inputInfo.met_equip_stand1 === ''){
                alertModalOn('장비 규격을 선택해주세요.');
            }
            else{
                if(inputInfo.met_equip_stand2 === ''){
                    alertModalOn('장비 상세 규격을 선택해주세요.');
                }
                else{
                    saveInfoHandler();
                }
            }
        }   
    }

    React.useEffect(()=>{
        getEquipList();
    },[])

    React.useEffect(()=>{
        if(inputInfo.met_equip_type !== ''){
            setInputInfo({
                ...inputInfo,
                met_equip_stand1 : '',
                met_equip_stand2 : '',
                met_sub:[],
            })
            setTempSelAcc('');
        }
    },[inputInfo.met_equip_type])

    React.useEffect(()=>{
        setInputInfo({
            ...inputInfo,
            met_equip_stand2 : '',
        })
    },[inputInfo.met_equip_stand1])


    return(
        <View style={{flex:1}}>
            <View style={{marginTop:20}}>
                <Text style={[fontStyle.f_semibold,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>성별</Text>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center', marginTop:10}}>
                        <CheckBox
                            disabled={inputInfo.mb_sex_m}
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
                            disabled={inputInfo.mb_sex_f}
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
                    input={inputInfo.met_company}
                    setInput={inputInfoHandler}
                    title='회사명'
                    type='met_company'
                    essential
                />
                <CustomInputTextBox 
                    containerStyle={{marginTop:20}}
                    action={()=>{}}
                    button=''
                    editable
                    placeholder='대표자명을 입력해주세요.'
                    placeholderTextColor={colors.GRAY_COLOR}
                    input={inputInfo.met_ceo}
                    setInput={inputInfoHandler}
                    title='대표자명'
                    type="met_ceo"
                    essential
                />
                <CustomInputTextBox 
                    containerStyle={{marginTop:20}}
                    action={()=>{}}
                    button=''
                    editable
                    placeholder='사업자등록번호를 입력해주세요.'
                    placeholderTextColor={colors.GRAY_COLOR}
                    input={inputInfo.met_busi_num}
                    setInput={inputInfoHandler}
                    title='사업자등록번호'
                    type="met_busi_num"
                    essential
                    inputType='number-pad'
                />
                <MarginCom mt={20} />
                <Text style={[fontStyle.f_semibold,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>조종사 차주 여부</Text>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center', marginTop:10}}>
                        <CheckBox
                            disabled={inputInfo.isPilot}
                            value={inputInfo.isPilot}
                            onValueChange={(e) => setInputInfo({
                                ...inputInfo,
                                isPilot : true,
                                isNonePilot : false,
                            })}
                            tintColors={{ true: colors.MAIN_COLOR }}
                            style={{ width: 24, height: 24}}
                            // style={{justifyContent:'flex-start',alignItems:'flex-start'}}
                        />
                        <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginLeft:10}]}>조종사 차주</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center', marginTop:10}}>
                        <CheckBox
                            disabled={inputInfo.isNonePilot}
                            value={inputInfo.isNonePilot}
                            onValueChange={(e) => setInputInfo({
                                ...inputInfo,
                                isPilot : false,
                                isNonePilot : true,
                            })}
                            tintColors={{ true: colors.MAIN_COLOR }}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginLeft:10}]}>비조종사 차주</Text>
                    </View>
                </View>
                <MarginCom mt={20} />
                <CustomSelectBox 
                    strOptionList={locationList}
                    strSetOption={inputInfoHandler}
                    type={'met_location'}
                    selOption={inputInfo.met_location}
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
                    type={'met_bank'}
                    selOption={bankList.filter(el=>el.key === inputInfo.met_bank)[0] ? bankList.filter(el=>el.key === inputInfo.met_bank)[0].name : ''}
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
                    input={inputInfo.met_bank_num}
                    setInput={inputInfoHandler}
                    title='계좌번호'
                    type="met_bank_num"
                    essential
                    inputType='number-pad'
                />
                <MarginCom isBorder isBorderDeep mt={30} mb={30} />
                
                <CustomSelectBox 
                    strOptionList={getEquipListConverter(equipMainList)}
                    strSetOption={inputInfoHandler}
                    selOption={inputInfo.met_equip_type}
                    buttonStyle={selectBoxStyle.btnStyle}
                    buttonTextStyle={selectBoxStyle.btnTextStyle}
                    rowStyle={selectBoxStyle.rowStyle}
                    rowTextStyle={selectBoxStyle.rowTextStyle}
                    defaultText='장비 종류 선택'
                    type={'met_equip_type'}
                    title={'장비 종류'}
                    essential
                />
                <View style={{flexDirection:'row',marginTop:5}}>
                    <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR}]}>*</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR,marginLeft:5}]}>대표자 명의의 보유장비가 여러대일 경우, 메인 장비 1대만 등록 기타 장비는 회원가입 후 '마이페이지-장비현황'에서 추가해주세요.</Text>
                </View>
                <MarginCom mt={20}/>
                <CustomSelectBox 
                    strOptionList={getEquipStandConverter(equipMainList,inputInfo.met_equip_type) ? getEquipStandConverter(equipMainList,inputInfo.met_equip_type) : ['선택하세요.']}
                    strSetOption={inputInfoHandler}
                    selOption={inputInfo.met_equip_stand1}
                    buttonStyle={selectBoxStyle.btnStyle}
                    buttonTextStyle={selectBoxStyle.btnTextStyle}
                    rowStyle={selectBoxStyle.rowStyle}
                    rowTextStyle={selectBoxStyle.rowTextStyle}
                    defaultText={inputInfo.met_equip_type === '' ? '장비 종류를 선택해주세요.' : '장비 규격 선택'}
                    type={'met_equip_stand1'}
                    title={'장비 규격'}
                    essential
                    isDisable={inputInfo.met_equip_type === ''}
                />
                <MarginCom mt={20}/>

                <CustomSelectBox 
                    strOptionList={getEquStaDetailCon(equipMainList,inputInfo.met_equip_type,inputInfo.met_equip_stand1) ? getEquStaDetailCon(equipMainList,inputInfo.met_equip_type,inputInfo.met_equip_stand1) : ['선택하세요.']}
                    strSetOption={inputInfoHandler}
                    selOption={inputInfo.met_equip_stand2}
                    buttonStyle={selectBoxStyle.btnStyle}
                    buttonTextStyle={selectBoxStyle.btnTextStyle}
                    rowStyle={selectBoxStyle.rowStyle}
                    rowTextStyle={selectBoxStyle.rowTextStyle}
                    defaultText={inputInfo.met_equip_stand1 === '' ? '장비 규격을 선택해주세요.' : '장비 상세 규격 선택'}
                    type={'met_equip_stand2'}
                    title={'장비 상세 규격'}
                    essential
                    isDisable={inputInfo.met_equip_stand1 === ''}
                />
                <MarginCom mt={20}/>
                <View>
                    <Text style={[fontStyle.f_semibold,{fontSize:16, color:colors.FONT_COLOR_BLACK,marginBottom:5}]}>부속 장치</Text>
                    <View style={{flexDirection:'row'}}>
                        <CustomSelectBox 
                            strOptionList={accessoriesConvert(inputInfo.met_equip_type) ? accessoriesConvert(inputInfo.met_equip_type) : ['선택하세요.']}
                            strSetOption={tempSelAccHandler}
                            selOption={tempSelAcc}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                            defaultText={inputInfo.met_equip_type === '' ? '장비 종류를 선택해주세요.' : '부속 장비 선택'}
                            style={{flex:7}}
                            isDisable={inputInfo.met_equip_type === ''}
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
                {inputInfo.met_sub.map((item,index) => {
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