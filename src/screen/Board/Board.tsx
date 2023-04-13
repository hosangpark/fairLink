import React,{useState,useEffect} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView} from 'react-native';
import { BoardIndexType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { CustomSelectBox } from '../../component/CustomSelectBox';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { CustomAccordion } from '../../component/CustomAccordion';
import { NodataView } from '../../component/NodataView';

export const Board = ({setTabIndex}:BoardIndexType) => {
    const [strOption,setStrOption] = useState<string>('')

    const [items,setItems] = useState([
    {
      empName:'힘찬중기',
      jobType:'1',
      location:'전남 여수시',
      rating:23,
      recEmpCount:64,
      userName:'홍길동',
      score:5,
      complete:'완료',
      userProfileUrl:'',
      workType:0,
    },
    {
      empName:'힘찬중기',
      jobType:'1',
      location:'[경남]',
      rating:23,
      score:5,
      recEmpCount:64,
      userName:'김경태',
      complete:'',
      userProfileUrl:'',
      workType:1,
    },
  ])

    const isFocused = useIsFocused();
    useEffect(()=>{
        if(isFocused && setTabIndex){
            setTabIndex(3);
        }
    },[])

    return(
         <ScrollView style={{flex:1}}>
            <BackHeader title="배차이력 및 현황" />
            <View style={{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,padding:20}}>
                <View style={{flexDirection:'row'}}>
                <View style={{flex:1,marginRight:10,marginBottom:20}}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:8}]}>연도
                    </Text>
                    <CustomSelectBox 
                        defaultText='선택하세요.'
                        strOptionList={['2020년','2021년','2022년','2023년',]}
                        selOption={strOption}
                        strSetOption={setStrOption}
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
                        selOption={strOption}
                        strSetOption={setStrOption}
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
                        strOptionList={['배차 모집중','계약 진행중','작업중','작업완료',]}
                        selOption={strOption}
                        strSetOption={setStrOption}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                    />
                </View>
            </View>
          {/* <FlatList
            style={{ paddingHorizontal: 20 }}
            data={items}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<NodataView />}
            // ListFooterComponent={isListLoading ? <LoadingIndicator /> : null}
            renderItem={({ item }) => (
              <UserInfoCard2
                  empName={item.empName}
                  jobType={item.jobType}
                  location={item.location}
                  rating={item.rating}
                  score={item.score}
                  recEmpCount={item.recEmpCount}
                  userName={item.userName}
                  userProfileUrl={item.userProfileUrl}
              />
            )}
          /> */}
            <CustomAccordion
                title={'배차 모집중'}
                data={items}
                action={()=>{}}
                Accordionkey={1}
            />
            <CustomAccordion
                title={'계약 진행중'}
                data={items}
                action={()=>{}}
                Accordionkey={2}
            />
            <CustomAccordion
                title={'작업중'}
                data={items}
                action={()=>{}}
                Accordionkey={3}
            />
            <CustomAccordion
                title={'작업완료'}
                data={items}
                action={()=>{}}
                Accordionkey={4}
            />
            
        </ScrollView>
    )
}