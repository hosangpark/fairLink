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


export const Board = ({route}:any) => {
    const {mt_type} = useAppSelector(state => state.userInfo);
    const [userType,setUserType] = useState(mt_type);
    const [strOption,setStrOption] = useState<string>('')
    const [year,setYear] = useState<string>('')
    const [month,setMonth] = useState<string>('')
    const accordionList = userType =='1'?
    ['배차 모집중','계약 진행중','작업중','작업완료']:
    userType =='2'?
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
      userType:'1'
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
      userType:'1'
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
      userType:'4',
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
      userType:'2',
      total:8
    },
  ])


    useEffect(()=>{
        if(route.params.type=='default'){
            setStrOption('전체')
        } else {
            setStrOption('작업중')
        }
    },[])

    return(
        <View style={{flex:1,}}>
        <BackHeader title="배차이력 및 현황" />
        {/* <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <CustomButton
                    action={()=>{setUserType('1')}}
                    label={'건설회사'}
                    style={{...styles.whiteButtonStyle,flex:1,marginRight:10}}
                    labelStyle={styles.whiteButtonLabelStyle}
                />
                <CustomButton
                    action={()=>{setUserType('2')}}
                    label={'장비회사'}
                    style={{flex:1,marginRight:10}}
                />
                <CustomButton
                    action={()=>{setUserType('4')}}
                    label={'조종사'}
                    style={{...styles.whiteButtonStyle,flex:1,marginRight:10}}
                    labelStyle={styles.whiteButtonLabelStyle}
                />
            </View> */}
         <ScrollView style={{flex:1}}>
            <View style={{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,padding:20}}>
                <View style={{flexDirection:'row'}}>
                <View style={{flex:1,marginRight:10,marginBottom:20}}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]}>연도
                    </Text>
                    <CustomSelectBox 
                        defaultText='선택하세요.'
                        strOptionList={['2020년','2021년','2022년','2023년',]}
                        selOption={year}
                        strSetOption={setYear}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                    />
                </View>
                <View style={{flex:1}}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]}>월
                    </Text>
                    <CustomSelectBox 
                        defaultText='선택하세요.'
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
                        userType =='1'?
                        ['전체','배차 모집중','계약 진행중','작업중','작업완료']:
                        userType == '2'?
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
        {
            accordionList.map((data, i) => (
                <View key={i}>
                {strOption == '전체'?
                <CustomAccordion
                    key={i}
                    title={data}
                    data={items}
                    userType={userType}
                    action={()=>{console.log(i)}}
                />
                :
                strOption == data &&
                <CustomAccordion
                    key={i}
                    title={data}
                    data={items}
                    userType={userType}
                    action={()=>{console.log(i)}}
                />
                }
                </View>
            ))
        }
        {/* <FlatList
            data={accordionList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<NodataView />}
            // ListFooterComponent={isListLoading ? <LoadingIndicator /> : null}
            renderItem={({ item,index} ) => (
              <CustomAccordion
                title={item}
                data={items}
                action={()=>{}}
                Accordionkey={index}
            />
            )}
          /> */}
            
            
        </ScrollView>
    </View>
    )
}