import React,{useState,useEffect} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView} from 'react-native';
import { BoardIndexType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';



export const DetailField = () => {

    
    return(
        <ScrollView style={{flex:1,backgroundColor:colors.WHITE_COLOR}}>
            <BackHeader title="현장세부내용" />
            <View style={{backgroundColor:colors.MAIN_COLOR,padding:20}}>
                <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.WHITE_COLOR,marginBottom:3}]}>본사 사옥 신축공사</Text>
                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:8}]}>GS건설</Text>
                <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.WHITE_COLOR,marginBottom:3,opacity:0.85}]}>
                    {/* <Image/> */}
                    경남 진주시 충무공동 사들로 123번길 32
                </Text>
            </View>
            <View style={{paddingHorizontal:20,paddingVertical:20}}>
                <View style={styles.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,styles.DetailFieldTitle]}>장비</Text>
                    <Text style={[fontStyle.f_regular,styles.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={styles.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,styles.DetailFieldTitle]}>최소연식</Text>
                    <Text style={[fontStyle.f_regular,styles.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={styles.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,styles.DetailFieldTitle]}>부속장치</Text>
                    <Text style={[fontStyle.f_regular,styles.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={styles.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,styles.DetailFieldTitle]}>작업내용</Text>
                    <Text style={[fontStyle.f_regular,styles.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={styles.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,styles.DetailFieldTitle]}>지원가능</Text>
                    <Text style={[fontStyle.f_regular,styles.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={styles.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,styles.DetailFieldTitle]}>작업기간</Text>
                    <Text style={[fontStyle.f_regular,styles.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={styles.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,styles.DetailFieldTitle]}>회사명</Text>
                    <Text style={[fontStyle.f_regular,styles.DetailFieldText]}>
                        굴삭기6W굴삭기6W굴삭기6W굴삭기6W굴삭기6W굴삭기6W굴삭기6W굴삭기6W굴삭기6W굴삭기6W</Text>
                </View>
                <View style={styles.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,styles.DetailFieldTitle]}>대금</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginRight:10,flexShrink:1}]} numberOfLines={1}>
                        70만원70만원70만원70만원70만원70만원70만원70만원70만원</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR,borderWidth:1,borderColor:colors.MAIN_COLOR,borderRadius:4,paddingHorizontal:10,}]}>
                        일대</Text>

                </View>
                <View style={styles.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,styles.DetailFieldTitle]}>지급일</Text>
                    <Text style={[fontStyle.f_regular,styles.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={styles.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,styles.DetailFieldTitle]}>담당자</Text>
                    <Text style={[fontStyle.f_regular,styles.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
                <View style={styles.DetailFieldBox}>
                    <Text style={[fontStyle.f_semibold,,styles.DetailFieldTitle]}>연락처</Text>
                    <Text style={[fontStyle.f_regular,styles.DetailFieldText]}>
                        굴삭기6W</Text>
                </View>
            </View>
            
        </ScrollView>
    )
}