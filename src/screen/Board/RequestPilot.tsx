import React from 'react';
import { ReqeustPilotType } from '../screenType';
import { ScrollView, Text, View } from 'react-native';
import { BackHeader } from '../../component/header/BackHeader';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { colors, fontStyle, selectBoxStyle2, styles } from '../../style/style';
import { MarginCom } from '../../component/MarginCom';
import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity } from 'react-native';
import { CustomSelectBox } from '../../component/CustomSelectBox';
import { ageList, goodsList, payDateList, pilotCarrerKeyList, scoreList } from '../../component/utils/list';
import { CustomInputTextBox } from '../../component/CustomInputTextBox';
import { NumberComma } from '../../util/func';
import { CustomButton } from '../../component/CustomButton';
import { usePostMutation } from '../../util/reactQuery';
import { initialAlert } from '../../modal/AlertModal';
import { BackHandlerCom } from '../../component/utils/BackHandlerCom';
import { AlertModal } from '../../modal/AlertModal';
import { toggleLoading } from '../../redux/actions/LoadingAction';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';

export const RequestPilot = ({route}:ReqeustPilotType) => {

    const dispatch = useAppDispatch();
    const {item:reqInfo,selEquip} = route.params;


    const {mt_idx} = useAppSelector(state => state.userInfo);
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const orderOpenPilotMutation = usePostMutation('orderOpenPilot','equip/equip_order_open_pilot.php');

    const [inputInfo, setInputInfo] = React.useState({
        pay_type : 'Y',
        pay_date : '0',
        pay_etc : '',
        pay_price : '',
    })
    const [tempPrice , setTempPrice] = React.useState('');

    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);

    const alertModalOn = (msg:string, type?:string) => {
        setAlertModal({
            ...alertModal,
            alert:true,
            msg:msg,
            type : type ? type : '',
        })
    }

    const alertModalOff = () => {
        setAlertModal(()=>initialAlert);
    }

    const alertAction = () => {
        if(alertModal.type === 'order_confirm'){
            orderPilotHandler();
        }
        else if(alertModal.type === 'success_order_pilot'){
            navigation.navigate('Board');
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



    const equipOrderOpenPilotHandler = () => { //공개구인하기 컨펌 및 예외처리
        if(inputInfo.pay_date === '0' && inputInfo.pay_etc === ''){
            alertModalOn('지급시기를 입력해주세요.');
        }
        else if(inputInfo.pay_price === ''){
            alertModalOn('대금을 입력해주세요.');
        }
        else{
            alertModalOn('요구사항에 맞는 주변지역 조종사에게 \n공개구인요청을 하겠습니다.','order_confirm');
        }
    }

    const orderPilotHandler = async () => { //공개구인하기 - 파일럿
        const params = {
            mt_idx : mt_idx,
            cot_idx : reqInfo.cot_idx,
            eit_idx : selEquip.eit_idx,
            ...inputInfo,
        }

        dispatch(toggleLoading(true));
        const {data,result,msg} = await orderOpenPilotMutation.mutateAsync(params);
        dispatch(toggleLoading(false));

        console.log(result,msg,data);

        if(result === 'true'){
            alertModalOn('새로운 조종사 모집 요청이 접수됐습니다.','success_order_pilot')
        }
        else{
            alertModalOn(msg);
        }
    }


    React.useEffect(()=>{
        if(inputInfo.pay_date !== '0' && inputInfo.pay_etc !== ''){
            setInputInfo({
                ...inputInfo,
                pay_etc : '',
            })
        }
    },[inputInfo.pay_date])

    React.useEffect(()=>{
        const noneCommaPrice = inputInfo.pay_price.split(",").join("");;
        setTempPrice(String(NumberComma(Number(noneCommaPrice))));        
    },[inputInfo.pay_price])

    React.useEffect(()=>{
        console.log('reqInfo ??? ' , reqInfo);
    },[])

    return(
        <View style={{flex:1}}>
            <BackHeader title={'조종사 요청하기'} />
            <BackHandlerCom />
            <AlertModal 
                show={alertModal.alert}
                msg={alertModal.msg}
                hide={alertModalOff}
                type={alertModal.type}
                action={alertAction}
            />
            <ScrollView style={{flex:1}}>
                <View style={[styles.white_box_con]}>
                    <View style={[styles.card2Wrapper,{borderWidth:1,paddingHorizontal:0,paddingBottom:0}]}>
                        <View style={{paddingHorizontal:20,paddingBottom:20}}>
                            <Text style={[fontStyle.f_semibold,{fontSize:16, color:colors.MAIN_COLOR}]}>현장명</Text>
                            <Text style={[fontStyle.f_semibold,{fontSize:18 , color:colors.FONT_COLOR_BLACK}]}>{reqInfo.crt_name}</Text>
                        </View>
                        <View style={{borderTopWidth:1,borderTopColor:colors.BORDER_GRAY_COLOR,padding:20,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,zIndex:1,borderBottomEndRadius:8}}>
                            <View>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,flex:3}]}>회사명</Text>
                                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,flex:7}]}>{reqInfo.mct_company}</Text>
                                </View>
                            </View>
                            <MarginCom mt={15} />
                            <View>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,flex:3}]}>현장소장</Text>
                                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,flex:7}]}>{reqInfo.crt_director}</Text>
                                </View>
                            </View>
                            <MarginCom mt={15} />
                            <View>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,flex:3}]}>현장주소</Text>
                                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,flex:7,textAlign:'left'}]}>{reqInfo.crt_location}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <MarginCom mt={20} />
                    <View style={{ marginVertical: 10, padding: 15, backgroundColor: colors.BACKGROUND_COLOR_GRAY1, borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 8}}>
                        <View style={{ flexDirection: 'row', marginBottom: 8}}>
                            <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 3}]}>장비종류</Text>
                            <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 7}]}>{reqInfo.equip_stand1} {reqInfo.equip_type}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 8}}>
                            <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 3}]}>작업내용</Text>
                            <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 7}]}>{reqInfo.cot_content}</Text>
                        </View>
                        <View style={{ flexDirection: 'row'}}>
                            <Text style={[ fontStyle.f_semibold, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 3}]}>작업기간</Text>
                            <Text style={[ fontStyle.f_regular, { fontSize: 16, color: colors.FONT_COLOR_BLACK, flex: 7}]}>{reqInfo.start_date} ~ {reqInfo.end_date}</Text>
                        </View>
                    </View>
                </View>
                <MarginCom mt={10} />
                <View style={[styles.white_box_con]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>대금지급방식 입력</Text>
                    <View style={{marginTop:20}}>
                        <Text style={[fontStyle.f_semibold,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>지급방식</Text>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center', marginTop:10}}>
                                <CheckBox
                                    disabled={inputInfo.pay_type === 'Y'}
                                    value={inputInfo.pay_type === 'Y'}
                                    onValueChange={(e) => setInputInfo({
                                        ...inputInfo,
                                        pay_type : 'Y'
                                    })}
                                    tintColors={{ true: colors.MAIN_COLOR }}
                                    style={{ width: 24, height: 24}}
                                    // style={{justifyContent:'flex-start',alignItems:'flex-start'}}
                                />
                                <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginLeft:10}]}>일대</Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center', marginTop:10}}>
                                <CheckBox
                                    disabled={inputInfo.pay_type === 'N'}
                                    value={inputInfo.pay_type === 'N'}
                                    onValueChange={(e) => setInputInfo({
                                        ...inputInfo,
                                        pay_type : 'N'
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
                                defaultText={payDateList.filter(el=>el.key === inputInfo.pay_date)[0].name}
                                objOptionList={payDateList}
                                selOption={payDateList.filter(el=>el.key === inputInfo.pay_date)[0].name}
                                objSetOption={inputHandler}
                                type={'pay_date'}
                                buttonStyle={selectBoxStyle2.btnStyle}
                                buttonTextStyle={selectBoxStyle2.btnTextStyle}
                                rowStyle={selectBoxStyle2.rowStyle}
                                rowTextStyle={selectBoxStyle2.rowTextStyle}
                            />
                            <View style={{flex:3}}/>
                        </View>
                        {inputInfo.pay_date === '0' &&
                        <View>
                            <MarginCom mt={10} />
                            <CustomInputTextBox 
                                input={inputInfo.pay_etc}
                                setInput={inputHandler}
                                type={'pay_etc'}
                                placeholder='지급시기를 입력해주세요.'
                                editable
                            />
                        </View>
                        }
                    </View>
                    <MarginCom mt={20} />
                    <View>
                        <Text style={[fontStyle.f_semibold,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>대금</Text>
                        <View>
                            <MarginCom mt={10} />
                            <CustomInputTextBox 
                                input={tempPrice}
                                setInput={inputHandler}
                                type={'pay_price'}
                                placeholder='직접입력'
                                isTextLabel='만원'
                                inputType='number-pad'
                                editable
                            />
                        </View>
                    </View>
                </View>
                <MarginCom mt={10} />
                <View style={[styles.white_box_con]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>요구경력</Text>
                    <MarginCom mt={30} />
                    <CustomInputTextBox
                        title={'최소경력'}
                        input={pilotCarrerKeyList.filter(el=>el.key === reqInfo.apply_info[0])[0].name}
                    />
                    <MarginCom mt={20} />
                    <CustomInputTextBox
                        title={'연령제한'}
                        input={ageList.filter(el=>el.key === reqInfo.apply_info[1])[0].name}
                    />
                    <MarginCom mt={20} />
                    <CustomInputTextBox
                        title={'최소평점'}
                        input={scoreList.filter(el=>el.key === reqInfo.apply_info[2])[0].name}
                    />
                    <MarginCom mt={20} />
                    <CustomInputTextBox
                        title={'최소추천수'}
                        input={goodsList.filter(el=>el.key === reqInfo.apply_info[3])[0].name}
                    />
                    <MarginCom mt={30} />
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <CustomButton
                            style={{flex:1,marginRight:10}}
                            action={()=>{equipOrderOpenPilotHandler()}}
                            label={'공개 구인'}
                        />
                        <CustomButton
                            action={()=>{navigation.navigate('MatchingPilot',{item:reqInfo,selEquip:selEquip,type:'favorite'})}}
                            label={'즐겨찾기 구인'}
                            style={{...styles.whiteButtonStyle,flex:1}}
                            labelStyle={styles.whiteButtonLabelStyle}
                        />
                    </View>
                </View>

                
            </ScrollView>
        </View>
    )
}