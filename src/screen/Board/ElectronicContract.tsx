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