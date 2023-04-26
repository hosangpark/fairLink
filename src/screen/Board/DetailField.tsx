import React,{useState,useEffect} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView,Image,TouchableOpacity,StyleSheet} from 'react-native';
import { BoardIndexType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { CustomButton } from '../../component/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { AlertModal,initialAlert } from '../../modal/AlertModal';
import { AlertClearType } from '../../modal/modalType';

export const DetailField = ({route}:any) => {
    const userType:string = "2"
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(()=>initialAlert); //alert 객체 생성 
    const alertModalOn = (strongMsg : string, type? : string) => { //alert 켜기
        setAlertModal({
            alert:true,
            strongMsg:'010-2927-0185',
            msg:`로${"\n"}전화연결 하시겠습니까?`,
            type:'confirm' ,
        })
    }
    const alertModalOff = () =>{ //modal 종료
        setAlertModal(initialAlert)
    }
    useEffect(()=>{console.log(route.params.cot_idx)},[])
    return(
        <View style={{flex:1,}}>
        <BackHeader title="현장세부내용" />
        <ScrollView style={{flex:1,backgroundColor:colors.WHITE_COLOR}}>
            <View style={{backgroundColor:colors.MAIN_COLOR,padding:20}}>
                <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.WHITE_COLOR,marginBottom:3}]}>본사 사옥 신축공사</Text>
                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:8}]}>GS건설</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image resizeMode={'contain'} style={{width:10,height:15,marginRight:5}} source={require('../../assets/img/ic_map_pin_w.png')}/>
                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:3,opacity:0.85}]}>
                    
                    경남 진주시 충무공동 사들로 123번길 32
                </Text>
                </View>
            </View>
            <View style={{paddingHorizontal:20,paddingVertical:20}}>
                <View style={DetailFieldstyle.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,DetailFieldstyle.DetailFieldTitle]}>장비</Text>
                    <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={DetailFieldstyle.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,DetailFieldstyle.DetailFieldTitle]}>최소연식</Text>
                    <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={DetailFieldstyle.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,DetailFieldstyle.DetailFieldTitle]}>부속장치</Text>
                    <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={DetailFieldstyle.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,DetailFieldstyle.DetailFieldTitle]}>작업내용</Text>
                    <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={DetailFieldstyle.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,DetailFieldstyle.DetailFieldTitle]}>지원가능</Text>
                    <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={DetailFieldstyle.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,DetailFieldstyle.DetailFieldTitle]}>작업기간</Text>
                    <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={DetailFieldstyle.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,DetailFieldstyle.DetailFieldTitle]}>회사명</Text>
                    <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText]}>
                        굴삭기6W굴삭기6W굴삭기6W굴삭기6W굴삭기6W굴삭기6W굴삭기6W굴삭기6W굴삭기6W굴삭기6W</Text>
                </View>
                <View style={DetailFieldstyle.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,DetailFieldstyle.DetailFieldTitle]}>대금</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginRight:10,flexShrink:1}]} numberOfLines={1}>
                        70만원70만원70만원70만원70만원70만원70만원70만원70만원</Text>
                    {userType == '1'?
                    <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.MAIN_COLOR,borderWidth:1,borderColor:colors.MAIN_COLOR,borderRadius:4,paddingHorizontal:10,}]}>
                        일대</Text>
                        :
                    <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.WHITE_COLOR,borderWidth:1,borderColor:colors.MAIN_COLOR,borderRadius:4,paddingHorizontal:10,backgroundColor:colors.MAIN_COLOR}]}>
                        월대</Text>
                    }
                </View>
                <View style={DetailFieldstyle.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,DetailFieldstyle.DetailFieldTitle]}>지급일</Text>
                    <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={DetailFieldstyle.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,DetailFieldstyle.DetailFieldTitle]}>담당자</Text>
                    <Text style={[fontStyle.f_regular,DetailFieldstyle.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={DetailFieldstyle.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,DetailFieldstyle.DetailFieldTitle]}>연락처</Text>
                    <TouchableOpacity style={{flexDirection:'row', borderRadius:8,borderWidth:1,borderColor:colors.MAIN_COLOR,paddingHorizontal:10,paddingVertical:5}}
                    onPress={()=>{alertModalOn('')}}
                    >
                    <Image style={{width:25,height:25}} source={require('../../assets/img/ic_phone.png')}/>
                    <Text style={[fontStyle.f_medium,{fontSize:18,color:colors.MAIN_COLOR,flexShrink:1}]}>
                        010-1234-5678</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[userType === '1'? DetailFieldstyle.staticbox : DetailFieldstyle.staticbox2 ]}>
                {userType ==='1' ?
                <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK,marginBottom:16}]}>
                    지원하기
                </Text>
                :
                <View style={{alignItems:'center'}}>
                <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.MAIN_COLOR,marginBottom:6}]}>
                    지명배차
                </Text>
                <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:16}]}>
                    (대상자 : 강범수 님)
                </Text>
                </View>
                }
                
                {userType ==='1' ?
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={[DetailFieldstyle.staticinbox,{marginRight:20}]}>
                        <Text style={[fontStyle.f_semibold,{color:colors.MAIN_COLOR,fontSize:20}]}>
                            조종사
                        </Text>
                        <Text style={[fontStyle.f_regular,{color:colors.FONT_COLOR_BLACK2,fontSize:15}]}>
                            본인 또는 소속 조종사
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={DetailFieldstyle.staticinbox}>
                        <Text style={[fontStyle.f_semibold,{color:colors.MAIN_COLOR,fontSize:20}]}>
                            조종사
                        </Text>
                        <Text style={[fontStyle.f_regular,{color:colors.FONT_COLOR_BLACK2,fontSize:15}]}>
                            스페어 조종사
                        </Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <CustomButton
                        action={()=>{console.log('수락'),navigation.goBack()}}
                        label={'수락'}
                        style={{flex:1,marginRight:10}}
                    />
                    <CustomButton
                        action={()=>{console.log('거절')}}
                        label={'거절'}
                        style={{...styles.whiteButtonStyle,flex:1}}
                        labelStyle={styles.whiteButtonLabelStyle}
                    />
                </View>
                }
            </View>
        </ScrollView>
        <AlertModal
            show={alertModal.alert}
            msg={alertModal.msg}
            strongMsg={alertModal.strongMsg}
            hide={alertModalOff}
            type={alertModal.type}
            action={()=>{}}
        />
    </View>
    )
}

const DetailFieldstyle = StyleSheet.create({
    WhiteBox:{paddingHorizontal:20,paddingTop:30,paddingBottom:30,backgroundColor:colors.WHITE_COLOR,marginBottom:10},
    DefaultBlackText:{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10},
    cardInbox:{flexDirection:'row',justifyContent:'space-between',marginBottom:14},
    boxText1:{fontSize:16,color:colors.FONT_COLOR_BLACK},
    DetailFieldBox:{
        flexDirection:'row',paddingVertical:10
    },
    DetailFieldTitle:{
        fontSize:16,width:85,color:colors.FONT_COLOR_BLACK
    },
    DetailFieldText:{
        fontSize:16,color:colors.FONT_COLOR_BLACK,flexShrink:1
    },
    staticbox:{alignItems:'center',marginHorizontal:20,backgroundColor:colors.BLUE_COLOR4,borderRadius:8,borderWidth:1,borderColor:colors.BORDER_BLUE_COLOR4,paddingHorizontal:20,paddingVertical:16},
    staticbox2:{alignItems:'center',marginHorizontal:20,backgroundColor:colors.WHITE_COLOR,borderRadius:8,borderWidth:1,borderColor:colors.BORDER_BLUE_COLOR4,paddingHorizontal:20,paddingVertical:16},
    staticinbox:{flex:1,paddingHorizontal:10,paddingVertical:13,backgroundColor:colors.WHITE_COLOR,borderRadius:4,borderWidth:1,borderColor:colors.BORDER_BLUE_COLOR3,alignItems:'center'}
})