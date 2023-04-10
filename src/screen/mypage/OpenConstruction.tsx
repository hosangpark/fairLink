import React,{useState} from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontStyle, styles } from '../../style/style';
import { BackHeader } from '../../component/header/BackHeader';
import { MyPageIndexType } from '../screenType';
import { useIsFocused } from '@react-navigation/native';
import { CustomInputTextBox } from '../../component/CustomInputTextBox';
import { CustomButton } from '../../component/CustomButton';
import { CustomSelectBox } from '../../component/CustomSelectBox';
import { CustomWaveBox } from '../../component/CustomWaveBox';



export const OpenConstruction = ({setTabIndex}:MyPageIndexType) => {

    const [strOption,setStrOption] = useState<string>('')

    return (
        <View style={{flex:1}}>
            <BackHeader title="현장개설하기" />
            <ScrollView style={{ flex:1,backgroundColor:colors.WHITE_COLOR}}>
                <View style={{paddingHorizontal:20,paddingTop:30,paddingBottom:25}}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>현장정보 기입</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>
                        <Text style={styles.OrengeStart}>*</Text>
                        필수항목
                        </Text>
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>현장명
                    <Text style={styles.OrengeStart}>*</Text>
                    </Text>
                    <CustomInputTextBox
                        style={{}}
                        placeholder={'계약서에 명시된 현장명을 기입하세요.'}
                        imgfile={{}}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>현장소장명
                    <Text style={styles.OrengeStart}>*</Text>
                    </Text>
                    <CustomInputTextBox
                        style={{}}
                        placeholder={''}
                        imgfile={{}}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>담당자
                    <Text style={styles.OrengeStart}>*</Text>
                    </Text>
                    <CustomInputTextBox
                        style={{}}
                        placeholder={''}
                        imgfile={{}}
                        button={'변경'}
                        action={()=>{}}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>담당자 연락처
                    <Text style={styles.OrengeStart}>*</Text>
                    </Text>
                    <CustomInputTextBox
                        style={{}}
                        placeholder={''}
                        imgfile={require('../../assets/img/ic_modify2.png')}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>담당자 이메일
                    <Text style={styles.OrengeStart}>*</Text>
                    </Text>
                    <CustomInputTextBox
                        style={{}}
                        placeholder={''}
                        imgfile={require('../../assets/img/ic_modify2.png')}
                        button={''}
                        action={()=>{}}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>공사기간
                    <Text style={styles.OrengeStart}>*</Text>
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
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>현장 주소
                    <Text style={styles.OrengeStart}>*</Text>
                    </Text>
                    <CustomSelectBox 
                        defaultText='선택하세요.'
                        strOptionList={['가','나','다','라',]}
                        selOption={strOption}
                        strSetOption={setStrOption}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>대금지급시기
                    <Text style={styles.OrengeStart}>*</Text>
                    </Text>
                    <CustomSelectBox 
                        defaultText='선택하세요.'
                        strOptionList={[]}
                        selOption={strOption}
                        strSetOption={setStrOption}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>대금지급산출기간
                    <Text style={styles.OrengeStart}>*</Text>
                    </Text>
                    <CustomWaveBox
                        style={{}}
                        placeholder={''}
                        imgfile={{}}
                        button={''}
                        action={()=>{}}
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