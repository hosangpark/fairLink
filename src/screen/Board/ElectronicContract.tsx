import React,{useState,useEffect} from 'react';
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



export const ElectronicContract = () => {
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [strOption,setStrOption] = useState<string>('')
    const [guaranteeImage,setguaranteeImage] = useState<undefined>()
    const [check, setCheck] = useState(false);

    return(
        <ScrollView style={{flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
            <BackHeader title="전자계약" />
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
                        style={{}}
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
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <CheckBox 
                        value={check}
                        onValueChange={setCheck}
                        />
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>가입완료
                        </Text>
                    </View>
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

                    
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>대금지급시기
                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center'}} onPress={()=>{}}>
                            <Image style={{width:20,height:20}} source={require('../../assets/img/ic_check_off_sm.png')}/>
                            <Text style={[fontStyle.f_medium, {fontSize:16,marginHorizontal:5}]}>당일</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center'}} onPress={()=>{}}>
                            <Image style={{width:20,height:20}} source={require('../../assets/img/ic_check_off_sm.png')}/>
                            <Text style={{marginHorizontal:5}}>매월</Text>
                            <CustomSelectBox 
                                style={{flex:1}}
                                defaultText='10일'
                                strOptionList={['1일','2일','3일','4일']}
                                selOption={strOption}
                                strSetOption={setStrOption}
                                buttonStyle={selectBoxStyle2.btnStyle}
                                buttonTextStyle={selectBoxStyle2.btnTextStyle}
                                rowStyle={selectBoxStyle2.rowStyle}
                                rowTextStyle={selectBoxStyle2.rowTextStyle}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>대금지급산출기간
                    </Text>
                    <CustomWaveBox
                        style={{}}
                        placeholder={''}
                        imgfile={require('../../assets/img/ic_dropdown.png')}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>건설기계지급보증서
                    </Text>
                    <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR,marginBottom:10}]}>건설기계 대금 200만원 이상인 경우 의무가입 대상입니다.
                    </Text>
                    <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }}>
                        <ImageBackground
                        style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:guaranteeImage? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                        source={guaranteeImage}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 10 }}>
                        <Image 
                        style={{ width: 15, height: 15}}
                        source={require('../../assets/img/ic_add.png')}
                        />
                        <TouchableOpacity
                            style={{ position:'absolute', right: 10, top: 10 }}
                            onPress={() =>{setguaranteeImage}}>
                            <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../assets/img/ic_modify.png')}
                            />
                        </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                {/* <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={undefined}
                    renderItem={({ item, index }) => (
                    <View style={{ marginRight: 8, width: 100, height: 100 }}>
                        <ImageBackground
                        style={{ flex: 1 }}
                        source={{ uri: item.uri }}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 10 }}>
                        <TouchableOpacity
                            style={{ alignItems: 'flex-end', right: 10, top: 10 }}
                            onPress={() => Delete(index)}>
                            <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../../assets/img/ico_close1.png')}
                            />
                        </TouchableOpacity>
                        </ImageBackground>
                        {index == 0 && (
                        <View
                            style={{
                            position: 'absolute',
                            bottom: 0,
                            backgroundColor: colors.GREEN_COLOR_2,
                            width: '100%',
                            alignItems: 'center',
                            height: 25,
                            justifyContent: 'center',
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            }}>
                            <Text
                            style={[
                                style.text_sb,
                                { fontSize: 13, color: colors.WHITE_COLOR },
                            ]}>
                            {t('대표사진')}
                            </Text>
                        </View>
                        )}
                    </View>
                    )}
                    horizontal={true}
                /> */}
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,ElectronicContractstyle.DefaultBlackText]}>원도급사명
                    </Text>
                    <CustomInputTextBox
                        style={{}}
                        placeholder={'하도급사만 작성'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                <CustomButton
                style={{}}
                labelStyle={{}}
                label={'임대계약서 전송'}
                action={()=>{}}
                />
                </View>
        </ScrollView>
    )
}

const ElectronicContractstyle = StyleSheet.create({
    WhiteBox:{paddingHorizontal:20,paddingTop:30,paddingBottom:30,backgroundColor:colors.WHITE_COLOR,marginBottom:10},
    DefaultBlackText:{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}
})