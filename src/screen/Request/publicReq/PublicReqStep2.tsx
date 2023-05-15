import React from 'react';
import {View , ScrollView , KeyboardAvoidingView, Text, TextInput} from 'react-native';
import { BackHeader } from '../../../component/header/BackHeader';
import { BackHandlerCom } from '../../../component/utils/BackHandlerCom';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../../style/style';
import { AcqReqStep2Type } from '../../screenType';
import CheckBox from '@react-native-community/checkbox';
import { MarginCom } from '../../../component/MarginCom';
import { CustomSelectBox } from '../../../component/CustomSelectBox';
import { ageList, dayList, goodsList, payDateList, pilotCareerList, pilotCarrerKeyList, scoreList } from '../../../component/utils/list';
import { CustomInputTextBox } from '../../../component/CustomInputTextBox';
import { NumberComma } from '../../../util/func';
import { CustomButton } from '../../../component/CustomButton';
import { AlertModal, initialAlert } from '../../../modal/AlertModal';
import { useAppSelector } from '../../../redux/store';
import { usePostMutation } from '../../../util/reactQuery';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../../type/routerType';
import { RequestRouterNavigatorParams } from '../../../../type/RequestRouterType';

export const PublicReqStep2 = ({route}:AcqReqStep2Type) => {

    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams & RequestRouterNavigatorParams>>();

    const {mt_idx} = useAppSelector(state => state.userInfo);
    const {firstInputInfo} = route.params;
    const AcqReqMutation = usePostMutation('acqReq','cons/cons_open_order.php');

    const [inputInfo, setInputInfo] = React.useState({
        cot_pay_type : 'Y',
        cot_pay_date : '0',
        cot_pay_etc : '',
        cot_pay_price : '',
        cot_career : '0',
        cot_age : '0',
        cot_score : '0',
        cot_goods : '0',
        cot_memo : '',
        ...firstInputInfo,
    })
    console.log(firstInputInfo);
    const [tempPrice , setTempPrice] = React.useState('');

    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

    const alertModalOn = (msg:string, type? : string,strongMsg? : string) => {
        setAlertModal({
            ...alertModal,
            alert:true,
            msg:msg,
            type : type ? type : '',
            strongMsg : strongMsg ? strongMsg : '',
        })
    }
    const alertModalOff = () => {
        setAlertModal(()=>initialAlert);
    }
    const alertAction = () =>{
        if(alertModal.type === 'req_confirm'){
            acqReqAccess();
        }
    }

    const inputHandler = (text:string, type? : string) => {
        if(type){
            setInputInfo({
                ...inputInfo,
                [type]:text,
            })
        }
    }

    const acqReqHandler = () => { //지인배차 요청 유효성 체크 및 confirm
        if(inputInfo.cot_pay_date === '0' && inputInfo.cot_pay_etc === ''){
            alertModalOn('지급시기를 입력해주세요.');
        }
        else if(inputInfo.cot_pay_price === ''){
            alertModalOn('대금 금액을 입력해주세요.');
        }
        else{
            alertModalOn(`요구사항에 부합하는\n주변지역 장비업체에게\n공개배차 요청하겠습니까?`,'req_confirm');
        }
    }
    const acqReqAccess = async () => { //배차요청

        try{
            let stringSubList = '';
            const stringPayPrice = inputInfo.cot_pay_price.split(",").join("");;
            if(firstInputInfo.cot_e_sub.length > 0 ){
                firstInputInfo.cot_e_sub.forEach((item:string,index:number) => {
                    if(index === 0){
                        stringSubList += item
                    }   
                    else{
                        stringSubList += ','+item;
                    }
                });
            }

            const params = {
                ...firstInputInfo,
                ...inputInfo,
                mt_idx : mt_idx,
                cot_e_sub:stringSubList,
                cot_pay_price : stringPayPrice,

            }
            console.log(params);

            const {data,result,msg} = await AcqReqMutation.mutateAsync(params);

            if(result === 'true'){
                navigation.navigate('Board')
            }
            else{
                alertModalOn(msg);
            }
        }
        catch(err){
            alertModalOn(`예기치 못한 오류가 발생했습니다.\n error_code - ${err}`);
        }
    }

    React.useEffect(()=>{
        const noneCommaPrice = inputInfo.cot_pay_price.split(",").join("");;
        console.log(tempPrice);
        setTempPrice(String(NumberComma(Number(noneCommaPrice))));        
    },[inputInfo.cot_pay_price])

    React.useEffect(()=>{
        
    },[])



    return(
        <View style={{flex:1}}>
            <BackHeader title={'공개 배차요청'}/>
            <BackHandlerCom />
            <ScrollView style={{flex:1}}>
                <KeyboardAvoidingView>
                    <View style={[styles.white_box_con]}>
                        <Text style={[fontStyle.f_semibold,{fontSize:20 , color:colors.FONT_COLOR_BLACK}]}>대금지급방식 입력</Text>

                        <View style={{marginTop:20}}>
                            <Text style={[fontStyle.f_semibold,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>지급방식</Text>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center', marginTop:10}}>
                                    <CheckBox
                                        disabled={inputInfo.cot_pay_type === 'Y'}
                                        value={inputInfo.cot_pay_type === 'Y'}
                                        onValueChange={(e) => setInputInfo({
                                            ...inputInfo,
                                            cot_pay_type : 'Y'
                                        })}
                                        tintColors={{ true: colors.MAIN_COLOR }}
                                        style={{ width: 24, height: 24}}
                                        // style={{justifyContent:'flex-start',alignItems:'flex-start'}}
                                    />
                                    <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginLeft:10}]}>일대</Text>
                                </View>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center', marginTop:10}}>
                                    <CheckBox
                                        disabled={inputInfo.cot_pay_type === 'N'}
                                        value={inputInfo.cot_pay_type === 'N'}
                                        onValueChange={(e) => setInputInfo({
                                            ...inputInfo,
                                            cot_pay_type : 'N'
                                        })}
                                        tintColors={{ true: colors.MAIN_COLOR }}
                                        style={{ width: 24, height: 24 }}
                                    />
                                    <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginLeft:10}]}>월대</Text>
                                </View>
                            </View>
                        </View>
                        <MarginCom mt={20} />
                        <View>
                        <Text style={[fontStyle.f_semibold,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>지급시기</Text>
                        <MarginCom mt={10} />
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>매월</Text>
                            <CustomSelectBox
                                containerStyle={{marginLeft:5,flex:6}} 
                                style={{flex:1}}
                                defaultText={payDateList.filter(el=>el.key === inputInfo.cot_pay_date)[0].name}
                                objOptionList={payDateList}
                                selOption={payDateList.filter(el=>el.key === inputInfo.cot_pay_date)[0].name}
                                objSetOption={inputHandler}
                                type={'cot_pay_date'}
                                buttonStyle={selectBoxStyle2.btnStyle}
                                buttonTextStyle={selectBoxStyle2.btnTextStyle}
                                rowStyle={selectBoxStyle2.rowStyle}
                                rowTextStyle={selectBoxStyle2.rowTextStyle}
                            />
                            <View style={{flex:3}}/>
                        </View>
                        {inputInfo.cot_pay_date === '0' &&
                        <View>
                            <MarginCom mt={10} />
                            <CustomInputTextBox 
                                input={inputInfo.cot_pay_etc}
                                setInput={inputHandler}
                                type={'cot_pay_etc'}
                                placeholder='지급시기를 입력해주세요.'
                                editable
                            />
                        </View>
                        }
                    </View>
                        <MarginCom mt={20} />
                        <View>
                            <CustomInputTextBox 
                                input={tempPrice}
                                setInput={inputHandler}
                                type={'cot_pay_price'}
                                title='대금'
                                placeholder='직접입력'
                                inputType={'number-pad'}
                                editable
                                isTextLabel='만원'
                                essential
                            />
                        </View>
                    </View>
                    <MarginCom mt={10} />
                    <View style={[styles.white_box_con]}>
                        <Text style={[fontStyle.f_semibold,{fontSize:20 , color:colors.FONT_COLOR_BLACK}]}>요구경력</Text>
                        <MarginCom mt={20} />
                        <CustomSelectBox
                            title={'최소경력'}
                            containerStyle={{marginLeft:5,flex:6}} 
                            style={{flex:1}}
                            defaultText={pilotCarrerKeyList.filter(el=>el.key === inputInfo.cot_career)[0].name}
                            objOptionList={pilotCarrerKeyList}
                            selOption={pilotCarrerKeyList.filter(el=>el.key === inputInfo.cot_career)[0].name}
                            objSetOption={inputHandler}
                            type={'cot_career'}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                        />
                        <MarginCom mt={20} />
                        <CustomSelectBox
                            title={'연령제한'}
                            containerStyle={{marginLeft:5,flex:6}} 
                            style={{flex:1}}
                            defaultText={ageList.filter(el=>el.key === inputInfo.cot_age)[0].name}
                            objOptionList={ageList}
                            selOption={ageList.filter(el=>el.key === inputInfo.cot_age)[0].name}
                            objSetOption={inputHandler}
                            type={'cot_age'}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                        />
                        <MarginCom mt={20} />
                        <CustomSelectBox
                            title={'최소평점'}
                            containerStyle={{marginLeft:5,flex:6}} 
                            style={{flex:1}}
                            defaultText={scoreList.filter(el=>el.key === inputInfo.cot_score)[0].name}
                            objOptionList={scoreList}
                            selOption={scoreList.filter(el=>el.key === inputInfo.cot_score)[0].name}
                            objSetOption={inputHandler}
                            type={'cot_score'}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                        />
                        <MarginCom mt={20} />
                        <CustomSelectBox
                            title={'최소추천수'}
                            containerStyle={{marginLeft:5,flex:6}} 
                            style={{flex:1}}
                            defaultText={goodsList.filter(el=>el.key === inputInfo.cot_goods)[0].name}
                            objOptionList={goodsList}
                            selOption={goodsList.filter(el=>el.key === inputInfo.cot_goods)[0].name}
                            objSetOption={inputHandler}
                            type={'cot_goods'}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                        />
                    </View>
                    <MarginCom mt={10} />
                    <View style={[styles.white_box_con]}>
                        <Text style={[fontStyle.f_semibold,{fontSize:20 , color:colors.FONT_COLOR_BLACK}]}>기타사항</Text>
                        <MarginCom mt={5} />
                        <TextInput
                            multiline
                            numberOfLines={4}
                            style={[fontStyle.f_regular,styles.border,{borderRadius:4,padding:15,textAlignVertical:'top',height:150,fontSize:16}]} 
                            placeholder='ex) 열정적이고 매사에 적극적인 분 선호합니다.'
                            placeholderTextColor={colors.BORDER_GRAY_COLOR3}
                            onChangeText={(e)=>{inputHandler(e,'cot_memo')}}
                            value={inputInfo.cot_memo}
                        />
                        <MarginCom mt={30} />
                        <CustomButton 
                            action={()=>{acqReqHandler()}}
                            label='배차하기'
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <AlertModal 
                show={alertModal.alert}
                msg={alertModal.msg}
                type={alertModal.type}
                strongMsg={alertModal.strongMsg}
                hide={alertModalOff}
                action={alertAction}
            />
        </View>
    )
}