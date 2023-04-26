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
import { datedata } from '../../component/datedata';
import CheckBox from '@react-native-community/checkbox';
import { CustomWaveSelectBox } from '../../component/CustomWaveSelectBox';



export const OpenConstruction = ({setTabIndex}:MyPageIndexType) => {

    const [check1,setCheck1] = useState(false)
    const [strOption,setStrOption] = useState<string>('')
    const [guaranteeImage,setguaranteeImage] = useState<undefined>()
    const [crt_name, setcrt_name] = useState<string>('')
    const [crt_director,setcrt_director] = useState<string>('')
    const [crt_m_name,setcrt_m_name] = useState<string>('')
    const [crt_m_num,setcrt_m_num] = useState<string>('')
    const [crt_email,setcrt_email] = useState<string>('')
    const [crt_start_date,setcrt_start_date] = useState<string>('')
    const [crt_end_date,setcrt_end_date] = useState<string>('')
    const [crt_location,setcrt_location] = useState<string>('')
    const [crt_monthly,setcrt_monthly] = useState<string>('')
    const [crt_monthly_start,setcrt_monthly_start] = useState<string>('')
    const [crt_monthly_end,setcrt_monthly_end] = useState<string>('')
    const [crt_file1,setcrt_file1] = useState<string>('')
    const [crt_origin,setcrt_origin] = useState<string>('')

    React.useEffect(()=>{
        
    },[])

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
                <CustomInputTextBox
                    title={'현장명'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={crt_name}
                    setInput={setcrt_name}
                    placeholder={'계약서에 명시된 현장명을 기입하세요.'}
                    imgfile={undefined}
                    editable={true}
                />
                <CustomInputTextBox
                    title={'현장소장명'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={crt_director}
                    setInput={setcrt_director}
                    imgfile={undefined}
                    editable={true}
                />
                <CustomInputTextBox
                    title={'담당자'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={crt_m_name}
                    setInput={setcrt_m_name}
                    imgfile={undefined}
                    button={'변경'}
                    editable={true}
                />
                <CustomInputTextBox
                    title={'담당자 연락처'}
                    essential={true}
                    containerStyle={styles.SubTitleText}
                    input={crt_m_num}
                    setInput={setcrt_m_num}
                    imgfile={require('../../assets/img/ic_modify2.png')}
                    editable={true}
                    inputType={'number-pad'}
                />
                <CustomInputTextBox
                    title={'담당자 이메일'}
                    essential={true}
                    input={crt_email}
                    setInput={setcrt_email}
                    containerStyle={styles.SubTitleText}
                    imgfile={require('../../assets/img/ic_modify2.png')}
                    editable={true}
                    inputType={'email-address'}
                />
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>공사기간
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <CustomWaveBox
                        text1={crt_start_date}
                        setText1={setcrt_start_date}
                        text2={crt_end_date}
                        setText2={setcrt_end_date}
                        imgfile={require('../../assets/img/ic_calendar.png')}
                        action={()=>{}}
                        editable={true}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>현장 주소
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <CustomSelectBox 
                        defaultText='선택하세요.'
                        strOptionList={['영흥','나','다','라',]}
                        selOption={crt_location}
                        strSetOption={setcrt_location}
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
                        <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center'}} onPress={()=>setCheck1(!check1)}>
                            <CheckBox 
                            value={!check1}
                            onValueChange={()=>{}}
                            />
                            <Text style={[fontStyle.f_medium, {fontSize:16,marginHorizontal:5}]}>당일</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center'}} onPress={()=>setCheck1(!check1)}>
                            <CheckBox 
                            value={check1}
                            onValueChange={()=>{}}
                            />
                            <Text style={{marginHorizontal:5}}>매월</Text>
                            <CustomSelectBox 
                                style={{flex:1}}
                                defaultText='10일'
                                strOptionList={datedata}
                                selOption={crt_monthly}
                                strSetOption={setcrt_monthly}
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
                    <CustomWaveSelectBox
                        style={{}}
                        strOptionList={datedata}
                        selOption1={crt_monthly_start}
                        setStrOption1={setcrt_monthly_start}
                        selOption2={crt_monthly_end}
                        setStrOption2={setcrt_monthly_end}
                    />
                    {/* <CustomWaveBox
                        text1={crt_start_date}
                        setText1={setcrt_start_date}
                        text2={crt_start_date}
                        setText2={setcrt_start_date}
                        imgfile={require('../../assets/img/ic_dropdown.png')}
                        action={()=>{}}
                        editable={true}
                        placeholderTextColor={''}
                    /> */}
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>건설기계지급보증서
                    </Text>
                    <Text style={[fontStyle.f_regular,{fontSize:14,color:colors.MAIN_COLOR,marginBottom:10}]}>건설기계 대금 200만원 이상인 경우 의무가입 대상입니다.
                    </Text>
                    <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }}>
                        <ImageBackground
                        style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:guaranteeImage? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                        source={crt_file1}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 10 }}>
                            <Image 
                            style={{ width: 15, height: 15}}
                            source={require('../../assets/img/ic_add.png')}
                            />
                            <TouchableOpacity
                                style={{ position:'absolute', right: 10, top: 10 }}
                                onPress={() =>{setcrt_file1}}>
                                <Image
                                style={{ width: 25, height: 25 }}
                                source={require('../../assets/img/ic_modify.png')}
                                />
                            </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={[styles.SubTitleText]}>
                    <CustomInputTextBox
                        title={'원도급사명'}
                        placeholder={'하도급사만 작성'}
                        input={crt_origin}
                        setInput={setcrt_origin}
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
                    action={()=>{console.log('ㅇ')}}
                />
                </View>
            </ScrollView>
        </View>
    )
}