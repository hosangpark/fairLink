import React,{useState,useEffect} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView,StyleSheet} from 'react-native';
import { BoardIndexType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { CustomSelectBox } from '../../component/CustomSelectBox';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { CustomAccordion } from '../../component/CustomAccordion';
import { NodataView } from '../../component/NodataView';

export const DetailWork = () => {
    
    return(
         <ScrollView style={{flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
            <BackHeader title="작업세부내용" />
            <View style={{padding:20,backgroundColor:colors.WHITE_COLOR,marginBottom:10}}>
                <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.FONT_COLOR_BLACK,marginBottom:24}]}>작업현황</Text>
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>작업개요</Text>
                <View style={DetailWorkStyle.cardbox}>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>현장명</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText1]}>여수 여수아파트 신축공사</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>작업명</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText1]}>지하층 북층 터파기</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>작업일시</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText1]}>23.01.13</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>작업공종</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText1]}>터파기</Text>
                    </View>
                </View>
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>작업일정관리</Text>
                <View style={{marginBottom:30}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={[DetailWorkStyle.dateday]}>
                            <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>일</Text></View>
                        <View style={[DetailWorkStyle.dateday]}>
                            <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>월</Text></View>
                        <View style={[DetailWorkStyle.dateday]}>
                            <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>화</Text></View>
                        <View style={[DetailWorkStyle.dateday]}>
                            <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>수</Text></View>
                        <View style={[DetailWorkStyle.dateday]}>
                            <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>목</Text></View>
                        <View style={[DetailWorkStyle.dateday]}>
                            <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>금</Text></View>
                        <View style={[DetailWorkStyle.dateday]}>
                            <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>토</Text></View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{alignItems:'center',flex:1}}>
                            <View style={[DetailWorkStyle.dateoff]}>
                            <Text style={[fontStyle.f_medium,DetailWorkStyle.dateoffText]}>2/26</Text>
                        </View>
                            <Text style={[fontStyle.f_medium,DetailWorkStyle.dateoffText]}>기타사유</Text>
                        </View>
                        
                        <View style={{alignItems:'center',flex:1}}>
                            <View style={[DetailWorkStyle.dateon]}>
                            <Text style={[fontStyle.f_medium,DetailWorkStyle.dateonText]}>2/26</Text>
                            </View>
                            <Text style={[fontStyle.f_medium,DetailWorkStyle.dateonText]}>작업일</Text>
                        </View>
                        
                        <View style={{alignItems:'center',flex:1}}>
                            <View style={[DetailWorkStyle.dateon]}>
                            <Text>2/26</Text>
                        </View>
                            <Text style={[fontStyle.f_medium,DetailWorkStyle.dateonText]}>작업일</Text>
                        </View>
                        
                        <View style={{alignItems:'center',flex:1}}>
                            <View style={[DetailWorkStyle.dateon]}>
                            <Text>2/26</Text>
                        </View>
                            <Text style={[fontStyle.f_medium,DetailWorkStyle.dateonText]}>작업일</Text>
                        </View>
                        
                        <View style={{alignItems:'center',flex:1}}>
                            <View style={[DetailWorkStyle.dateoff]}>
                            <Text style={[fontStyle.f_medium,DetailWorkStyle.dateoffText]}>2/26</Text>
                        </View>
                            <Text style={[fontStyle.f_medium,DetailWorkStyle.dateoffText]}>휴무 기상악화</Text>
                        </View>
                        
                        <View style={{alignItems:'center',flex:1}}>
                            <View style={[DetailWorkStyle.date]}>
                            <Text style={[fontStyle.f_medium,DetailWorkStyle.dateText]}>2/26</Text>
                        </View>
                            <Text></Text>
                        </View>
                        
                        <View style={{alignItems:'center',flex:1}}>
                            <View style={[DetailWorkStyle.date]}>
                            <Text style={[fontStyle.f_medium,DetailWorkStyle.dateText]}>2/26</Text>
                        </View>
                            <Text></Text>
                        </View>
                    </View>
                </View>
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>투입장비</Text>
                <View style={DetailWorkStyle.cardbox}>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>장비명</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText1]}>여수 여수아파트 신축공사</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>규격</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText1]}>지하층 북층 터파기</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>사업자명</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText1]}>23.01.13</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>사업자등록번호</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText1]}>터파기</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>대표자명</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText1]}>터파기</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>전화번호</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText1]}>터파기</Text>
                    </View>
                </View>
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>투입조종사</Text>
                <View style={DetailWorkStyle.cardbox}>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>조종사명</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText1]}>여수 여수아파트 신축공사</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>경력</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText1]}>지하층 북층 터파기</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>평점</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText1]}>23.01.13</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>추천수</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText1]}>터파기</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>전화번호</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText1]}>터파기</Text>
                    </View>
                </View>
            </View>
            <View style={{padding:20,backgroundColor:colors.WHITE_COLOR}}>
                <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.FONT_COLOR_BLACK,marginBottom:24}]}>대금관리</Text>
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>장비대금</Text>
                <View>
                    <Text>대금</Text>
                    <Text>총 1,200,000원</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export const DetailWorkStyle = StyleSheet.create({
    cardbox :{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,paddingHorizontal:20,paddingVertical:10,borderRadius:8,borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,marginBottom:30},
    cardInbox:{flexDirection:'row',justifyContent:'space-between',paddingVertical:10},
    boxText1:{fontSize:16,color:colors.FONT_COLOR_BLACK},
    dateday:{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,width:50,height:30,justifyContent:'center',alignItems:'center',marginBottom:10,borderRadius:4},
    date:{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,width:50,height:50,justifyContent:'center',alignItems:'center',marginBottom:10,borderRadius:8},
    dateon:{backgroundColor:colors.BLUE_COLOR3,width:50,height:50,justifyContent:'center',alignItems:'center',marginBottom:10,borderRadius:8,borderWidth:1,borderColor:colors.BORDER_BLUE_COLOR3},
    dateoff:{backgroundColor:colors.RED_COLOR,width:50,height:50,justifyContent:'center',alignItems:'center',marginBottom:10,borderRadius:8,borderWidth:1,borderColor:colors.BORDER_RED_COLOR},
    dateText:{fontSize:14,color:colors.FONT_COLOR_GRAY},
    dateonText:{fontSize:14,color:colors.MAIN_COLOR},
    dateoffText:{fontSize:14,color:colors.FONT_COLOR_RED},
})
