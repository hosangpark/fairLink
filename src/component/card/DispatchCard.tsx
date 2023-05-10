import React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { EquipOrderItemType } from '../../screen/screenType';
import { MarginCom } from '../MarginCom';
import { NumberComma } from '../../util/func';
import { AlertModal, initialAlert } from '../../modal/AlertModal';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RequestRouterNavigatorParams } from '../../../type/RequestRouterType';
import { RouterNavigatorParams } from '../../../type/routerType';
import { useAppSelector } from '../../redux/store';

type dispatchItemType = {
    item : EquipOrderItemType
}

export const DispatchCard = ({item}:dispatchItemType) => { //공개배차, 지명배차 카드

    const {mt_type} = useAppSelector(state => state.userInfo);
    const [alertModal, setAlertModal] = React.useState(()=>initialAlert);
    const navigation = useNavigation<StackNavigationProp<RequestRouterNavigatorParams & RouterNavigatorParams>>();


    const alertModalOn = (msg:string, type?:string) => {
        setAlertModal({
            ...alertModal,
            alert:true,
            msg : msg,
            type : type ? type : '',
        })
    }

    const alertAction = () => {

    }

    const goDetail = () => {
        console.log(item);
        if(item.assign_check === 'Y'){
            if(mt_type === '2'){
                navigation.navigate('ScaneDetailField',{cot_idx : item.cot_idx});
            }
            else{
                navigation.navigate('ScaneDetailField',{cat_idx : item.cat_idx});
            }
        }
        else{
            console.log(item.open_check);
            if(item.open_check === 'N'){ //개발완료되면 변경하기
                if(mt_type === '2'){
                    navigation.navigate('ScaneDetailField',{cot_idx : item.cot_idx});
                }
                else{
                    navigation.navigate('ScaneDetailField',{cat_idx : item.cat_idx});
                }
            }
            else{
                alertModalOn('요구조건에 부합하는 보유장비가 없어\n지원이 불가능합니다,','');
            }
        }
    }

    const isAssicnCheck = item.assign_check === 'Y';

    return(
        <View>
            <TouchableOpacity onPress={goDetail} style={[styles.cardWrapper,{position:'relative',backgroundColor:isAssicnCheck ? colors.MAIN_COLOR : colors.WHITE_COLOR}]}>
                {isAssicnCheck &&
                <View style={[styles.cardJobArea,{borderColor:colors.MAIN_COLOR}]}>
                    <Text style={[fontStyle.f_medium,{fontSize:15, color:colors.MAIN_COLOR}]}>
                        지명배차
                    </Text>
                </View>
                }
                <Text style={[fontStyle.f_bold,{color:isAssicnCheck ? colors.WHITE_COLOR : colors.FONT_COLOR_BLACK,fontSize:18}]}>{item.equip}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <View style={{flexDirection:'row',alignItems:'flex-start',flex:2}}>
                        <Image style={{width:10,height:14,marginTop:4}} source={isAssicnCheck ? require('../../assets/img/ic_map_pin_w.png') : require('../../assets/img/ic_map_pin_g.png')} />
                        <Text style={[fontStyle.f_regular,{color:isAssicnCheck ? colors.WHITE_COLOR : '#888888',fontSize:16,marginLeft:3}]}>{item.location}</Text>
                    </View>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Text style={[fontStyle.f_regular,{color:isAssicnCheck ? colors.WHITE_COLOR : colors.FONT_COLOR_BLACK}]}>지원수 <Text style={[fontStyle.f_semibold,{color:isAssicnCheck ? colors.WHITE_COLOR : colors.MAIN_COLOR}]}>{item.apply_cnt}</Text></Text>
                    </View>
                </View>
                <MarginCom isWhiteBorder={isAssicnCheck} isBorder mt={20} mb={20} />

                <View>
                    <Text style={[fontStyle.f_bold,{fontSize:15,color:isAssicnCheck ? colors.WHITE_COLOR : colors.FONT_COLOR_BLACK}]}>현장명</Text>
                    <MarginCom mt={3}/>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:isAssicnCheck ? colors.WHITE_COLOR : colors.FONT_COLOR_BLACK4}]}>{item.crt_name}</Text>
                </View>
                <MarginCom mt={10} />
                <View>
                    <Text style={[fontStyle.f_bold,{fontSize:15,color:isAssicnCheck ? colors.WHITE_COLOR : colors.FONT_COLOR_BLACK}]}>작업내용</Text>
                    <MarginCom mt={3}/>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:isAssicnCheck ? colors.WHITE_COLOR : colors.FONT_COLOR_BLACK4}]}>{item.crt_content}</Text>
                </View>
                <MarginCom mt={10} />
                <View>
                    <Text style={[fontStyle.f_bold,{fontSize:15,color:isAssicnCheck ? colors.WHITE_COLOR : colors.FONT_COLOR_BLACK}]}>작업기간</Text>
                    <MarginCom mt={3}/>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:isAssicnCheck ? colors.WHITE_COLOR : colors.FONT_COLOR_BLACK4}]}>{item.start_date}~{item.end_date}</Text>
                </View>
                <MarginCom mt={20} />
                <View style={[styles.cardWrapper,{paddingVertical:15,backgroundColor : isAssicnCheck ? colors.WHITE_COLOR : colors.BACKGROUND_COLOR_GRAY1,borderColor:colors.BORDER_GRAY_COLOR,borderWidth:isAssicnCheck ? 0 : 1}]}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={[{width:34,height:34,borderWidth:1,borderColor:isAssicnCheck ? colors.BORDER_GRAY_COLOR : colors.MAIN_COLOR, backgroundColor:isAssicnCheck? colors.BLUE_COLOR2 : colors.MAIN_COLOR,borderRadius:4,alignItems:'center',justifyContent:'center'}]}>
                            <Text style={[fontStyle.f_semibold,{fontSize:20,color:isAssicnCheck ? colors.FONT_COLOR_BLACK : colors.WHITE_COLOR}]}>{item.pay_type === 'Y' ? '일' : '월'}</Text>
                        </View>
                        <Text style={[fontStyle.f_bold,{fontSize:26 , color:isAssicnCheck ? colors.FONT_COLOR_BLACK : colors.MAIN_COLOR,marginLeft:10}]}>
                            {NumberComma(Number(item.pay_price))}
                        </Text>
                    </View>
                    <MarginCom mt={20} />
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{flexDirection:'row'}}>
                            {item.payment === 'Y' &&
                                <View style={{alignItems:'center',justifyContent:'center',borderColor:colors.MAIN_COLOR,borderWidth:1,borderRadius:16,width:78,height:30,}}>
                                    <Text style={[fontStyle.f_medium,{fontSize:15,color:colors.MAIN_COLOR}]}>지급보증</Text>
                                </View>
                            }
                            {item.public === 'Y' &&
                                <View style={{alignItems:'center',justifyContent:'center',borderColor:colors.ORANGE_COLOR,borderWidth:1,borderRadius:16,marginLeft:10,width:78,height:30,}}>
                                    <Text style={[fontStyle.f_medium,{fontSize:15,color:colors.ORANGE_COLOR}]}>지급보증</Text>
                                </View>
                            }
                        </View>
                        <View style={{alignItems:'center',justifyContent:'center',borderColor:Math.abs(Number(item.d_day)) < 3 ? colors.RED_COLOR4 : colors.BORDER_GRAY_COLOR,borderWidth:1,borderRadius:16,marginLeft:10,width:78,height:30,backgroundColor:colors.WHITE_COLOR}}>
                            <Text style={[fontStyle.f_medium,{fontSize:15,color:Math.abs(Number(item.d_day)) < 3 ? colors.RED_COLOR4 : colors.FONT_COLOR_BLACK}]}>D-{Math.abs(Number(item.d_day))}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <AlertModal 
                show={alertModal.alert}
                msg={alertModal.msg}
                type={alertModal.type}
                hide={()=>{setAlertModal(()=>initialAlert)}}
                action={alertAction}
            />
        </View>
    )
}