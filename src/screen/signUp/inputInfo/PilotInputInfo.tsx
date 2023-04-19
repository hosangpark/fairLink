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
import { PilotInputInfoType } from '../../screenType';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../../type/routerType';

interface PilotInputInfoItemType {
    mb_sex_m : boolean,
    mb_sex_f : boolean,

    location : string,

    emp_name : string,
    mb_name : string,
    emp_number : string,

    bank : string,
    bank_number : string,

    equ_type : string,
    equ_stand : string,
    equ_stand_detail : string,

    accessories : string[],
}

export const PilotInputInfo = ({memberType}:PilotInputInfoType) => {

    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    const [inputInfo, setInputInfo] = React.useState<PilotInputInfoItemType>({
        mb_sex_m : true,
        mb_sex_f : false,

        emp_name : '',
        mb_name : '',
        emp_number : '',
        location : '',
        bank : '',
        bank_number:'',

        equ_type : '',
        equ_stand : '',
        equ_stand_detail : '',

        accessories : [],
    })
    const [tempSelAcc , setTempSelAcc] = React.useState('');

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


    const tempBankList = [
        '기업은행','부산은행','신한은행','국민은행'
    ];

    const inputInfoHandler = (text : string, key? : string) => {
        if(key){
            setInputInfo({
                ...inputInfo,
                [key] : text,
            })
        }
    }

    // const tempSelAccHandler = (text:string) => { //부속장치 선택했을때 임시 저장
    //     setTempSelAcc(text);
    // }

    // const accessoriesAddHandler = () => { //부속장치 추가했을때 이벤트
    //     let tempArray : string[] = [...inputInfo.accessories];

    //     let flag = true;
    //     inputInfo.accessories.forEach((item,index) => {
    //         if(tempSelAcc === item){
    //             alertModalOn('이미 선택한 부속 장치 입니다.');
    //             flag = false;
    //             return;
    //         }
    //     })
    //     if(flag){
    //         tempArray.push(tempSelAcc);

    //         setInputInfo({
    //             ...inputInfo,
    //             accessories : [...tempArray],
    //         })
    //         setTempSelAcc('');
    //     }
    // }

    // const deleteAccHandler = (index:number) => {
    //     let tempArray : string[] = [...inputInfo.accessories];
    //     if(tempArray[index]){
    //         tempArray.splice(index,1);

    //         setInputInfo({
    //             ...inputInfo,
    //             accessories : [...tempArray]
    //         })
    //     }
    // }

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
                    input={inputInfo.emp_name}
                    setInput={inputInfoHandler}
                    title='회사명'
                    type='emp_name'
                    essential
                />
                <CustomInputTextBox 
                    containerStyle={{marginTop:20}}
                    action={()=>{}}
                    button=''
                    editable
                    placeholder='대표자명을 입력해주세요.'
                    placeholderTextColor={colors.GRAY_COLOR}
                    input={inputInfo.mb_name}
                    setInput={inputInfoHandler}
                    title='대표자명'
                    type="mb_name"
                    essential
                />
                <CustomInputTextBox 
                    containerStyle={{marginTop:20}}
                    action={()=>{}}
                    button=''
                    editable
                    placeholder='사업자등록번호를 입력해주세요.'
                    placeholderTextColor={colors.GRAY_COLOR}
                    input={inputInfo.emp_name}
                    setInput={inputInfoHandler}
                    title='사업자등록번호'
                    type="emp_number"
                    essential
                />
                <MarginCom mt={20} />

                <CustomSelectBox 
                    strOptionList={tempBankList}
                    strSetOption={inputInfoHandler}
                    type={'location'}
                    selOption={inputInfo.location}
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
                    strOptionList={tempBankList}
                    strSetOption={inputInfoHandler}
                    type={'bank'}
                    selOption={inputInfo.bank}
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
                    input={inputInfo.emp_name}
                    setInput={inputInfoHandler}
                    title='사업자등록번호'
                    type="bank_number"
                    essential
                />
                <MarginCom isBorder isBorderDeep mt={30} mb={30} />
                <CustomSelectBox 
                    strOptionList={tempBankList}
                    strSetOption={inputInfoHandler}
                    selOption={inputInfo.equ_type}
                    buttonStyle={selectBoxStyle.btnStyle}
                    buttonTextStyle={selectBoxStyle.btnTextStyle}
                    rowStyle={selectBoxStyle.rowStyle}
                    rowTextStyle={selectBoxStyle.rowTextStyle}
                    defaultText='장비 종류 선택'
                    type={'equ_type'}
                    title={'장비 종류'}
                    essential
                />
                <View style={{flexDirection:'row',marginTop:5}}>
                    <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR}]}>*</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR,marginLeft:5}]}>{`조종 가능한 장비 중 메인 장비 1대만 등록 \n기타 장비는 회원가입 후 '마이페이지-장비현황'에서 추가해주세요.`}</Text>
                </View>
                <MarginCom mt={20}/>
                <CustomSelectBox 
                    strOptionList={tempBankList}
                    strSetOption={inputInfoHandler}
                    selOption={inputInfo.equ_stand}
                    buttonStyle={selectBoxStyle.btnStyle}
                    buttonTextStyle={selectBoxStyle.btnTextStyle}
                    rowStyle={selectBoxStyle.rowStyle}
                    rowTextStyle={selectBoxStyle.rowTextStyle}
                    defaultText={inputInfo.equ_type === '' ? '장비 종류를 선택해주세요.' : '장비 규격 선택'}
                    type={'equ_stand'}
                    title={'장비 규격'}
                    essential
                    isDisable={inputInfo.equ_type === ''}
                />
                <MarginCom mt={20}/>
                <CustomSelectBox 
                    strOptionList={tempBankList}
                    strSetOption={inputInfoHandler}
                    selOption={inputInfo.equ_stand_detail}
                    buttonStyle={selectBoxStyle.btnStyle}
                    buttonTextStyle={selectBoxStyle.btnTextStyle}
                    rowStyle={selectBoxStyle.rowStyle}
                    rowTextStyle={selectBoxStyle.rowTextStyle}
                    defaultText={inputInfo.equ_stand === '' ? '장비 규격을 선택해주세요.' : '장비 상세 규격 선택'}
                    type={'equ_stand_detail'}
                    title={'장비 상세 규격'}
                    essential
                    isDisable={inputInfo.equ_type === ''}
                />
                {/* <MarginCom mt={20}/>
                <View>
                    <Text style={[fontStyle.f_semibold,{fontSize:16, color:colors.FONT_COLOR_BLACK,marginBottom:5}]}>부속 장치</Text>
                    <View style={{flexDirection:'row'}}>
                        <CustomSelectBox 
                            strOptionList={tempBankList}
                            strSetOption={tempSelAccHandler}
                            selOption={tempSelAcc}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                            defaultText={'부속 장비 선택'}
                            style={{flex:7}}
                        />
                        <TouchableOpacity onPress={accessoriesAddHandler} style={[styles.addButton,{flexDirection:'row',justifyContent:'center',alignItems:'center',marginLeft:10}]}>
                            <Image source={require('../../../assets/img/ic_add2.png')} style={{width:16,height:13}}/>
                            <Text style={[fontStyle.f_semibold,{fontSize:18,color:colors.MAIN_COLOR,marginLeft:5}]}>추가</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {inputInfo.accessories.map((item,index) => {
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
                })} */}
                <CustomButton 
                    action={()=>{navigation.replace('RegDocument',{memberType:memberType})}}
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