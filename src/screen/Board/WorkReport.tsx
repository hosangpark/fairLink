import React,{useState,useEffect,SetStateAction} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView,StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { BoardIndexType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { UserInfoCard } from '../../component/card/UserInfoCard';
import { useNavigation } from '@react-navigation/native';    
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { CustomInputTextBox } from '../../component/CustomInputTextBox';
import { CustomWaveBox } from '../../component/CustomWaveBox';
import { comma } from '../../component/utils/funcKt';
import { CustomButton } from '../../component/CustomButton';


export const WorkReport = () => {
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [price,setPrice] = useState<SetStateAction<any>>('')

    useEffect(()=>{
        {setPrice(comma('7000000'))}
    },[])
    return(
        <View style={{flex:1}}>
        <BackHeader title="작업일보" />
        <ScrollView style={{flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
            <View style={WorkReportstyle.WhiteBox}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                        건설기계</Text>
                    <View style={{flexDirection:'row'}}>
                    <Text style={[fontStyle.f_medium,{fontSize:16,color:colors.FONT_COLOR_BLACK2,marginRight:5}]}>
                        작업일자</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK2}]}>
                        2023.01.01</Text>
                    </View>
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText]}>건설기계명
                    </Text>
                    <CustomInputTextBox
                        style={{height:46}}
                        placeholder={'굴착기'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                        editable={false}
                        placeholderTextColor={colors.FONT_COLOR_BLACK}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText]}>등록번호
                    </Text>
                    <CustomInputTextBox
                        style={{height:46}}
                        placeholder={'경남01가1234'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                        editable={false}
                        placeholderTextColor={colors.FONT_COLOR_BLACK}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText]}>형식
                    </Text>
                    <CustomInputTextBox
                        style={{height:46}}
                        placeholder={'SOLAR55W'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                        editable={false}
                        placeholderTextColor={colors.FONT_COLOR_BLACK}
                    />
                </View>
                <View style={[]}>
                    <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText]}>현장명
                    </Text>
                    <CustomInputTextBox
                        style={{height:46}}
                        placeholder={'빈칸'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                        editable={false}
                        placeholderTextColor={colors.FONT_COLOR_BLACK}
                    />
                    </View>
                    <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText]}>작업내용
                    </Text>
                    <CustomInputTextBox
                        style={{height:46}}
                        placeholder={'빈칸'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                        editable={false}
                        placeholderTextColor={colors.FONT_COLOR_BLACK}
                    />
                    </View>
                    <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText]}>작업시간
                    </Text>
                    <CustomWaveBox
                        style={{height:46}}
                        placeholder1={'07:30'}
                        placeholder2={'16:30'}
                        imgfile={require('../../assets/img/ic_time.png')}
                        button={''}
                        action={()=>{}}
                        editable={false}
                        placeholderTextColor={colors.FONT_COLOR_BLACK}
                    />
                    </View>
                    <View style={[{borderBottomWidth:1,borderBottomColor:colors.BORDER_GRAY_COLOR,marginBottom:26}]}>
                    <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText,]}>대금
                    </Text>
                    <View style={[styles.TextInputBox,{flexDirection:'row',flex:1,alignItems:'center',marginBottom:26,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}]}>
                        <TextInput
                        style={[fontStyle.f_regular,{flexShrink:1,paddingHorizontal:10,flex:1,fontSize:16,height:46,color:colors.FONT_COLOR_BLACK}]}
                        textAlign={'right'}
                        value={price}
                        onChangeText={(e:string)=>{setPrice(comma(e))}}
                        editable={false}
                        placeholderTextColor={colors.FONT_COLOR_BLACK}
                        />
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginRight:15}]}>원</Text>
                    </View>
                    </View>
                    <View style={{}}>
                    <Text style={[fontStyle.f_semibold,WorkReportstyle.DefaultBlackText,]}>기타사항
                    </Text>
                    <View style={[styles.TextInputBox,{flexDirection:'row',flex:1,marginBottom:26,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,minHeight:120,padding:10}]}>
                       <Text style={{color:colors.FONT_COLOR_BLACK}}> 글자글자 </Text>
                    </View>
                    </View>
                </View>
                </View>
            <View style={WorkReportstyle.WhiteBox}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                        조종사</Text>
                </View>
                <View style={WorkReportstyle.cardInbox}>
                    <Text style={[fontStyle.f_semibold,WorkReportstyle.boxText1]}>서명</Text>
                    <Text style={[fontStyle.f_regular,WorkReportstyle.boxText1]}>여수 여수아파트 신축공사</Text>
                </View>
                <View style={WorkReportstyle.cardInbox}>
                    <Text style={[fontStyle.f_semibold,WorkReportstyle.boxText1]}>연락처</Text>
                    <Text style={[fontStyle.f_regular,WorkReportstyle.boxText1]}>010-1234-5678</Text>
                </View>
            </View>
            <View style={WorkReportstyle.WhiteBox}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>
                        건설회사</Text>
                </View>
                <View style={WorkReportstyle.cardInbox}>
                    <Text style={[fontStyle.f_semibold,WorkReportstyle.boxText1]}>건설회사명</Text>
                    <Text style={[fontStyle.f_regular,WorkReportstyle.boxText1]}>여수 여수아파트 신축공사</Text>
                </View>
                <View style={[WorkReportstyle.cardInbox,{marginBottom:26}]}>
                    <Text style={[fontStyle.f_semibold,WorkReportstyle.boxText1]}>담당자</Text>
                    <Text style={[fontStyle.f_regular,WorkReportstyle.boxText1]}>010-1234-5678</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <CustomButton
                        action={()=>{console.log('반려')}}
                        label={'반려'}
                        style={{...styles.whiteButtonStyle,flex:1,marginRight:10}}
                        labelStyle={styles.whiteButtonLabelStyle}
                    />
                    <CustomButton
                        action={()=>{console.log('승인'),navigation.goBack()}}
                        label={'승인'}
                        style={{flex:1}}
                    />
                </View>
            </View>
        </ScrollView>
        </View>
    )
}

const WorkReportstyle = StyleSheet.create({
    WhiteBox:{paddingHorizontal:20,paddingTop:30,paddingBottom:30,backgroundColor:colors.WHITE_COLOR,marginBottom:10},
    DefaultBlackText:{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10},
    cardInbox:{flexDirection:'row',justifyContent:'space-between',marginBottom:14},
    boxText1:{fontSize:16,color:colors.FONT_COLOR_BLACK},
    
})