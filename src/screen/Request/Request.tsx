import React,{useState,useEffect, SetStateAction} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView} from 'react-native';
import { BoardIndexType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { CustomSelectBox } from '../../component/CustomSelectBox';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { CustomAccordion } from '../../component/CustomAccordion';
import { NodataView } from '../../component/NodataView';
import { CustomButton } from '../../component/CustomButton';
import { useAppSelector } from '../../redux/store';


export const Request = () => {
    const {mt_type} = useAppSelector(state => state.userInfo);
    const [strOption,setStrOption] = useState<string>('')
    const [year,setYear] = useState<string>('')
    const [month,setMonth] = useState<string>('')
    const accordionList = mt_type =='1'?
    ['배차 모집중','계약 진행중','작업중','작업완료']:
    mt_type =='2'?
    ['조종사 모집중','현장지원 완료','계약진행중','작업중/작업예정','작업완료']
    :
    ['현장지원 완료','작업중/작업예정','작업완료']


    const [items,setItems] = useState([
    {
      empName:'힘찬중기',
      jobType:'1',
      location:'전남 여수시',
      rating:23,
      recEmpCount:64,
      userName:'홍길동',
      score:5,
      complete:true,
      userProfileUrl:'',
      workType:0,
      mt_type:'1'
    },
    {
      empName:'힘찬중기',
      jobType:'1',
      location:'경남',
      rating:23,
      score:5,
      recEmpCount:64,
      userName:'김경태',
      complete:'',
      userProfileUrl:'',
      workType:1,
      mt_type:'1'
    },
    {
      empName:'SKT T1',
      jobType:'2',
      location:'서울',
      rating:2900,
      score:5,
      recEmpCount:64,
      userName:'이상혁',
      complete:'',
      userProfileUrl:'',
      workType:1,
      mt_type:'3',
      total:8
    },
    {
      empName:'SKT T1',
      jobType:'2',
      location:'서울',
      rating:2900,
      score:5,
      recEmpCount:64,
      userName:'이상혁',
      complete:'',
      userProfileUrl:'',
      workType:1,
      mt_type:'2',
      total:8
    },
  ])


    useEffect(()=>{
      console.log('req')
    },[])

    return(
        <View style={{flex:1,}}>
        <BackHeader title={mt_type == '1' ? "배차요청하기" : "현장지원하기"} />
         <ScrollView style={{flex:1}}>
            <View style={{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,padding:20}}>
                <View style={{flexDirection:'row',marginBottom:20}}>
                <View style={{flex:1}}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]}>종류
                    </Text>
                    <CustomSelectBox 
                        defaultText='굴착기'
                        strOptionList={['2020년','2021년','2022년','2023년',]}
                        selOption={year}
                        strSetOption={setYear}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                    />
                </View>
                <View style={{flex:1,marginHorizontal:10}}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]}>규격
                    </Text>
                    <CustomSelectBox 
                        defaultText='6W'
                        strOptionList={['1월','2월','3월','4월',]}
                        selOption={month}
                        strSetOption={setMonth}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                    />
                </View>
                <View style={{flex:1}}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]}>지급
                    </Text>
                    <CustomSelectBox 
                        defaultText='일대'
                        strOptionList={['1월','2월','3월','4월',]}
                        selOption={month}
                        strSetOption={setMonth}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                    />
                </View>
                </View>
                <View style={{marginBottom:6}}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>배차상태
                    </Text>
                    <CustomSelectBox 
                        defaultText='전체'
                        strOptionList={
                        mt_type =='1'?
                        ['전체','배차 모집중','계약 진행중','작업중','작업완료']:
                        mt_type == '2'?
                        ['전체','조종사 모집중','현장지원 완료','계약진행중','작업중/작업예정','작업완료']
                        :
                        ['전체','현장지원 완료','작업중/작업예정','작업완료']
                        }
                        selOption={strOption}
                        strSetOption={setStrOption}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                    />
                </View>
            </View>            
        </ScrollView>
    </View>
    )
}