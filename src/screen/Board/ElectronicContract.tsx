import React,{useState,useEffect, SetStateAction} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import { BoardIndexType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { CustomButton } from '../../component/CustomButton';
import { useNavigation } from '@react-navigation/native';    
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { CustomInputTextBox } from '../../component/CustomInputTextBox';
import { CustomWaveBox } from '../../component/CustomWaveBox';
import { CustomSelectBox } from '../../component/CustomSelectBox';
import CheckBox from '@react-native-community/checkbox';
import { TextInput } from 'react-native-gesture-handler';
import { comma } from '../../component/utils/funcKt';
import { AlertModal,initialAlert } from '../../modal/AlertModal';
import { AlertClearType } from '../../modal/modalType';



export const ElectronicContract = () => {
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [strOption,setStrOption] = useState<string>('')
    const [guaranteeImage,setguaranteeImage] = useState<undefined>()
    const [check, setCheck] = useState(false);
    const [check1, setCheck1] = useState(false);
    const [text, setText] = useState<SetStateAction<any>>('');
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(()=>initialAlert); //alert 객체 생성 (초기값으로 clear);

    const alertModalOn = (msg : string, type? : string) => { //alert 켜기
        setAlertModal({
            alert:true,
            strongMsg:'',
            msg:msg,
            type:type? type:'confirm' ,
        })
    }
    const alertModalOff = () =>{ //modal 종료
        setAlertModal(initialAlert)
    }
    /** 이미 신청된 경우 */
    // useEffect(()=>{
    //     alertModalOn('장비회사가 계약 확인중입니다.', 'test')
    // },[])

    return(
        <View style={{flex:1}}>
        <BackHeader title="전자계약" />
        <ScrollView style={{flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
                <View style={ElectronicContractstyle.WhiteBox}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                        건설기계</Text>
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>건설기계명
                    </Text>
                    <CustomInputTextBox
                        style={{height:46}}
                        placeholder={'빈칸'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>등록번호
                    </Text>
                    <CustomInputTextBox
                        style={{height:46}}
                        placeholder={'빈칸'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>형식
                    </Text>
                    <CustomInputTextBox
                        style={{height:46}}
                        placeholder={'빈칸'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>보험가입현황
                    </Text>
                    <CustomWaveBox
                        style={{height:46}}
                        placeholder={''}
                        imgfile={require('../../assets/img/ic_calendar.png')}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>정기검사여부
                    </Text>
                    <CustomInputTextBox
                        style={{height:46}}
                        placeholder={'빈칸'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                </View>
                <View style={ElectronicContractstyle.WhiteBox}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                        현장</Text>
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>현장명
                    </Text>
                    <CustomInputTextBox
                        style={{height:46}}
                        placeholder={'빈칸'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>현장소재지
                    </Text>
                    <CustomInputTextBox
                        style={{height:46}}
                        placeholder={'빈칸'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>발주자
                    </Text>
                    <CustomInputTextBox
                        style={{height:46}}
                        placeholder={'빈칸'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>건설업자
                    </Text>
                    <CustomInputTextBox
                        style={{height:46}}
                        placeholder={'빈칸'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>건설기계대여대금지급보증여부
                    </Text>
                    <TouchableOpacity style={{flexDirection:'row',}} onPress={()=>setCheck(!check)}>
                        <CheckBox 
                        value={check}
                        onValueChange={()=>{}}
                        />
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginTop:3}]}>가입완료
                        </Text>
                    </TouchableOpacity>
                </View>
                
                </View>
                <View style={ElectronicContractstyle.WhiteBox}>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>사용기간
                    </Text>
                    <CustomWaveBox
                        style={{height:46}}
                        placeholder={''}
                        imgfile={require('../../assets/img/ic_calendar.png')}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText,]}>사용금액
                    </Text>
                    <View style={[styles.TextInputBox,{flexDirection:'row',flex:1,alignItems:'center',marginBottom:26}]}>
                        <TextInput
                        style={[fontStyle.f_regular,{flexShrink:1,paddingHorizontal:10,flex:1,fontSize:16,height:46}]}
                        textAlign={'right'}
                        value={text}
                        onChangeText={(e:string)=>{setText(comma(e))}}
                        />
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginRight:15}]}>원</Text>
                    </View>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText,]}>가동시간
                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{flexDirection:'row',flex:1}} onPress={()=>setCheck1(!check1)}>
                            <CheckBox 
                            value={!check1}
                            onValueChange={()=>{}}
                            />
                            <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginTop:3,flexShrink:1}]}>1일 8시간 기준
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',flex:1}} onPress={()=>setCheck1(!check1)}>
                            <CheckBox 
                            value={check1}
                            onValueChange={()=>{}}
                            />
                            <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginTop:3,flexShrink:1}]}>월 200시간 기준
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText,{marginTop:26}]}>지급시기
                    </Text>
                    <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:16,color:colors.FONT_COLOR_BLACK}}> · </Text>
                        <View>
                            <Text style={[fontStyle.f_medium,ElectronicContractstyle.DefaultBlackText]}>
                                대여기간이 1개월 초과하는 경우
                            </Text>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={[fontStyle.f_regular,ElectronicContractstyle.DefaultBlackText]}>
                                    매월 종료하는 날부터
                                </Text>
                                <TextInput style={[fontStyle.f_regular,{padding:0,width:70,borderBottomWidth:1,borderBottomColor:colors.BORDER_GRAY_COLOR,marginLeft:20,height:30,fontSize:16,marginBottom:10}]} textAlign="center"/>
                                <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>
                                    일 이내
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:16,color:colors.FONT_COLOR_BLACK}}> · </Text>
                        <View>
                            <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>
                                대여기간이 1개월 이하인 경우
                            </Text>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={[fontStyle.f_regular,ElectronicContractstyle.DefaultBlackText]}>
                                    그 기간이 종료하는 날부터
                                </Text>
                                <TextInput style={[fontStyle.f_regular,{padding:0,width:70,borderBottomWidth:1,borderBottomColor:colors.BORDER_GRAY_COLOR,marginLeft:20,height:30,fontSize:16,marginBottom:10}]} textAlign="center"/>
                                <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>
                                    일 이내
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                  
                
                </View>
                <View style={ElectronicContractstyle.WhiteBox}>
                <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'flex-end',}}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>계약서 작성일</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                    2023.03.03
                    </Text>
                </View>
                </View>
                <View style={ElectronicContractstyle.WhiteBox}>
                <View style={[styles.TitleText]}>
                <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                    임차인</Text>
                </View>
                <View>
                    <View style={ElectronicContractstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,ElectronicContractstyle.boxText1,{marginRight:80}]}>현장명</Text>
                        <Text style={[fontStyle.f_regular,ElectronicContractstyle.boxText1,{flexShrink:1}]}>힘찬중기</Text>
                    </View>
                    <View style={ElectronicContractstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,ElectronicContractstyle.boxText1,{marginRight:80}]}>사업자등록번호</Text>
                        <Text style={[fontStyle.f_regular,ElectronicContractstyle.boxText1,{flexShrink:1}]}>힘찬중기</Text>
                    </View>
                    <View style={ElectronicContractstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,ElectronicContractstyle.boxText1,{marginRight:80}]}>성명</Text>
                        <Text style={[fontStyle.f_regular,ElectronicContractstyle.boxText1,{flexShrink:1}]}>힘찬중기</Text>
                    </View>
                    <View style={ElectronicContractstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,ElectronicContractstyle.boxText1,{marginRight:80}]}>주민등록번호</Text>
                        <Text style={[fontStyle.f_regular,ElectronicContractstyle.boxText1,{flexShrink:1}]}>힘찬중기</Text>
                    </View>
                    <View style={ElectronicContractstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,ElectronicContractstyle.boxText1,{marginRight:80}]}>주소</Text>
                        <Text style={[fontStyle.f_regular,ElectronicContractstyle.boxText1,{flexShrink:1}]}>힘찬중기</Text>
                    </View>
                </View>
                </View>
                <View style={ElectronicContractstyle.WhiteBox}>
                    <View style={[styles.TitleText]}>
                <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                    임차인</Text>
                </View>
                <View style={{marginBottom:30}}>
                    <View style={ElectronicContractstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,ElectronicContractstyle.boxText1,{marginRight:80}]}>상호</Text>
                        <Text style={[fontStyle.f_regular,ElectronicContractstyle.boxText1,{flexShrink:1}]}>힘찬중기</Text>
                    </View>
                    <View style={ElectronicContractstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,ElectronicContractstyle.boxText1,{marginRight:80}]}>사업자등록번호</Text>
                        <Text style={[fontStyle.f_regular,ElectronicContractstyle.boxText1,{flexShrink:1}]}>힘찬중기</Text>
                    </View>
                    <View style={ElectronicContractstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,ElectronicContractstyle.boxText1,{marginRight:80}]}>성명</Text>
                        <Text style={[fontStyle.f_regular,ElectronicContractstyle.boxText1,{flexShrink:1}]}>힘찬중기</Text>
                    </View>
                    <View style={ElectronicContractstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,ElectronicContractstyle.boxText1,{marginRight:80}]}>주민등록번호</Text>
                        <Text style={[fontStyle.f_regular,ElectronicContractstyle.boxText1,{flexShrink:1}]}>힘찬중기</Text>
                    </View>
                    <View style={ElectronicContractstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,ElectronicContractstyle.boxText1,{marginRight:80}]}>주소</Text>
                        <Text style={[fontStyle.f_regular,ElectronicContractstyle.boxText1,{flexShrink:1}]}>힘찬중기</Text>
                    </View>
                </View>
                <CustomButton
                    style={{}}
                    labelStyle={{}}
                    label={'임대계약서 전송'}
                    action={()=>{alertModalOn('임대계약서를 전송하시겠습니까?', 'confirm');}}
                    />
                </View>
        </ScrollView>
        <AlertModal
            show={alertModal.alert}
            msg={alertModal.msg}
            hide={alertModalOff}
            type={alertModal.type}
            action={()=>navigation.navigate('Board')}
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