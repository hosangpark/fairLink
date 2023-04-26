import React,{useState} from 'react';
import {View, TextInput,Image,TouchableOpacity, ScrollView, FlatList, Text} from 'react-native';
import { colors, fontStyle, selectBoxStyle2 } from '../../../../style/style';
import { UserInfoCard } from '../../../../component/card/UserInfoCard';
import { CustomSelectBox } from '../../../../component/CustomSelectBox';
import { selectBoxStyle } from '../../../../style/style';
import { CustomButton } from '../../../../component/CustomButton';
import { CustomAccordion2 } from '../../../../component/CustomAccordion2';
import { CustomInputTextBox } from '../../../../component/CustomInputTextBox';

export const WorkHistory = () => {
    const [userType,setUserType] = useState('3')
    const [year,setYear] = useState<string>('')
    const [month,setMonth] = useState<string>('')
    const [searchlist,setSearchlist] = useState<string>('')

    const accordionList = ['여수화력 00신축공사 현장','여수화력 00신축공사 현장','여수화력 00신축공사 현장']

    const tempList = [
        {
            index:'1',
            empName:'힘찬중기',
            jobType:'1',
            location:'[경남]',
            rating:23,
            score:5,
            recEmpCount:64,
            userName:'김경태',
            userProfileUrl:'',
        },
        {
            index:'2',
            empName:'힘찬중기',
            jobType:'2',
            location:'[경남]',
            rating:23,
            score:5,
            recEmpCount:64,
            userName:'김경태',
            userProfileUrl:'',
        },
    ]

    return(
      <>
      <View style={{backgroundColor:colors.WHITE_COLOR,paddingHorizontal:20,paddingVertical:10}}>
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1,marginRight:10,marginBottom:20}}>
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
      <CustomInputTextBox
        style={{
          height:46,
          marginTop:10,
        }}
        placeholder={'계약서에 명시된 현장명을 기입하세요.'}
        imgfile={undefined}
        button={'검색'}
        action={()=>{}}
        editable={true}
        placeholderTextColor={''}
      />
       {/* <TextInput
          value={searchlist}
          onChangeText={setSearchlist}
          placeholder='여수화력'
          style={{        
            backgroundColor:colors.WHITE_COLOR,
            borderRadius:4,
            borderWidth:1,
            borderColor:colors.BORDER_GRAY_COLOR,
            alignItems:'center',
            height:46,
            marginTop:10,
            paddingHorizontal:20,
            color:colors.FONT_COLOR_BLACK
          }}
          /> */}
          {/* <CustomButton
            style={{height:46,}}
            label='검색'
            action={()=>console.log('검색')}
          /> */}
        </View>
        <ScrollView style={{marginTop:10}}>
        {/* <View><Text>검색결과</Text></View> */}
          {
            accordionList.map((data, i) => (
                <View key={i}>
                {searchlist == ''?
                <CustomAccordion2
                    key={i}
                    title={data}
                    subtitle={'02/11 터파기'}
                    data={tempList}
                    userType={userType}
                    action={()=>{console.log(i)}}
                />
                :
                searchlist == data &&
                <CustomAccordion2
                    key={i}
                    title={data}
                    subtitle={'02/11 터파기'}
                    data={tempList}
                    userType={userType}
                    action={()=>{console.log(i)}}
                />
                }
                </View>
            ))
        }
        </ScrollView>
        {/* <FlatList 
            data={tempList}
            style={{marginTop:10,paddingHorizontal:20}}
            showsVerticalScrollIndicator={false}
            renderItem={({item,index})=>{
                return(
                    <View style={{paddingVertical:15}}>
                    <UserInfoCard
                        index={item.index}
                        empName={item.empName}
                        jobType={item.jobType}
                        location={item.location}
                        rating={item.rating}
                        recEmpCount={item.recEmpCount}
                        score={item.score}
                        userName={item.userName}
                        userProfileUrl={item.userProfileUrl}
                        isDelete={false}
                        isFavorite={'0'}
                        action={()=>{}}
                    />
                    </View>
                )
            }}
        /> */}
      </> 
    )
}