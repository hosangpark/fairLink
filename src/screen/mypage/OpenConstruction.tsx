import React,{useState} from 'react';
import { FlatList, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { BackHeader } from '../../component/header/BackHeader';
import { MyPageIndexType } from '../screenType';
import { useIsFocused } from '@react-navigation/native';
import { CustomInputTextBox } from '../../component/CustomInputTextBox';
import { CustomButton } from '../../component/CustomButton';
import { CustomSelectBox } from '../../component/CustomSelectBox';
import { CustomWaveBox } from '../../component/CustomWaveBox';



export const OpenConstruction = ({setTabIndex}:MyPageIndexType) => {

    const [strOption,setStrOption] = useState<string>('')
    const [guaranteeImage,setguaranteeImage] = useState<undefined>()

    return (
        <View style={{flex:1}}>
            <BackHeader title="현장개설하기" />
            <ScrollView style={{ flex:1,backgroundColor:colors.WHITE_COLOR}}>
                <View style={{paddingHorizontal:20,paddingTop:30,paddingBottom:25}}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>현장정보 기입</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>
                        <Text style={styles.OrengeStar}>*</Text>
                        필수항목
                        </Text>
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>현장명
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <CustomInputTextBox
                        style={{}}
                        placeholder={'계약서에 명시된 현장명을 기입하세요.'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                        editable={true}
                        placeholderTextColor={''}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>현장소장명
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <CustomInputTextBox
                        style={{}}
                        placeholder={''}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                        editable={true}
                        placeholderTextColor={''}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>담당자
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <CustomInputTextBox
                        style={{}}
                        placeholder={''}
                        imgfile={undefined}
                        button={'변경'}
                        action={()=>{}}
                        editable={true}
                        placeholderTextColor={''}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>담당자 연락처
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <CustomInputTextBox
                        style={{}}
                        placeholder={''}
                        imgfile={require('../../assets/img/ic_modify2.png')}
                        button={''}
                        action={()=>{}}
                        editable={true}
                        placeholderTextColor={''}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>담당자 이메일
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <CustomInputTextBox
                        style={{}}
                        placeholder={''}
                        imgfile={require('../../assets/img/ic_modify2.png')}
                        button={''}
                        action={()=>{}}
                        editable={true}
                        placeholderTextColor={''}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>공사기간
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <CustomWaveBox
                        style={{}}
                        placeholder1={''}
                        placeholder2={''}
                        imgfile={require('../../assets/img/ic_calendar.png')}
                        button={''}
                        action={()=>{}}
                        editable={true}
                        placeholderTextColor={''}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>현장 주소
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <CustomSelectBox 
                        defaultText='선택하세요.'
                        strOptionList={['가','나','다','라',]}
                        selOption={strOption}
                        strSetOption={setStrOption}
                        buttonStyle={selectBoxStyle.btnStyle}
                        buttonTextStyle={selectBoxStyle.btnTextStyle}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>대금지급시기
                    <Text style={styles.OrengeStar}>*</Text>
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
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>대금지급산출기간
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <CustomWaveBox
                        style={{}}
                        placeholder1={''}
                        placeholder2={''}
                        imgfile={require('../../assets/img/ic_dropdown.png')}
                        button={''}
                        action={()=>{}}
                        editable={true}
                        placeholderTextColor={''}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>건설기계지급보증서
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
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>원도급사명
                    </Text>
                    <CustomInputTextBox
                        style={{}}
                        placeholder={'하도급사만 작성'}
                        imgfile={undefined}
                        button={''}
                        action={()=>{}}
                        editable={true}
                        placeholderTextColor={''}
                    />
                </View>
                <CustomButton
                style={{}}
                labelStyle={{}}
                label={'현장개설 완료'}
                action={()=>{}}
                />
                </View>
            </ScrollView>
        </View>
    )
}