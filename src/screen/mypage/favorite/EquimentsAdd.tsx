import React,{useState} from 'react';
import {Text, View, ScrollView,TouchableOpacity,Image,ImageBackground,StyleSheet} from 'react-native';
import { BackHeader } from '../../../component/header/BackHeader';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../../style/style';
import { FavoriteAddPhone } from './favoriteAddDetail/FavoriteAddPhone';
import { CustomButton } from '../../../component/CustomButton';
import { CustomSelectBox } from '../../../component/CustomSelectBox';


export const EquimentsAdd = () => {

    const [strOption,setStrOption] = useState<string>('')
    const [guaranteeImage,setguaranteeImage] = useState<undefined>()
    const [equipment, setEquipment] = React.useState<any>({
        equiInform: '',
        equiType: '',
        accessory1: '',
        accessory2: '',
        accessory3: '',
        accessory4: '',
    })
    

    return(
        <View style={{flex:1}}>
            <BackHeader title={'장비 추가'} />
            <ScrollView style={{ flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
                <View style={ElectronicContractstyle.WhiteBox}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>장비 정보 입력</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK}]}>
                        <Text style={styles.OrengeStar}>*</Text>
                        필수항목
                        </Text>
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>장비 종류
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <CustomSelectBox 
                        defaultText='종류'
                        strOptionList={['2020년','2021년','2022년','2023년',]}
                        selOption={strOption}
                        strSetOption={()=>{setEquipment(equipment.accessory1)}}
                        buttonStyle={[selectBoxStyle.btnStyle,{height:46}]}
                        buttonTextStyle={[selectBoxStyle.btnTextStyle,{fontSize:16}]}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                    />
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>장비 규격
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                    <CustomSelectBox 
                        defaultText='규격'
                        strOptionList={['2020년','2021년','2022년','2023년',]}
                        selOption={strOption}
                        strSetOption={setStrOption}
                        buttonStyle={[selectBoxStyle.btnStyle,{height:46}]}
                        buttonTextStyle={[selectBoxStyle.btnTextStyle,{fontSize:16}]}
                        rowStyle={selectBoxStyle.rowStyle}
                        rowTextStyle={selectBoxStyle.rowTextStyle}
                    />
                </View>
                </View>
                <View style={ElectronicContractstyle.WhiteBox}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>부속장치 보유현황</Text>
                    <TouchableOpacity>
                        <Text style={[fontStyle.f_medium,{fontSize:14,color:colors.FONT_COLOR_BLACK,backgroundColor:colors.BORDER_GRAY_COLOR,paddingHorizontal:8,borderRadius:12,paddingVertical:3}]}>
                            장치삭제
                        </Text>
                    </TouchableOpacity>
                </View>
                    
                    <CustomSelectBox 
                        defaultText='부속장치1'
                        strOptionList={['2020년','2021년','2022년','2023년',]}
                        selOption={strOption}
                        strSetOption={setStrOption}
                        buttonStyle={[selectBoxStyle.btnStyle,{height:46,marginBottom:12}]}
                        buttonTextStyle={[selectBoxStyle.btnTextStyle,{fontSize:16}]}
                        rowStyle={selectBoxStyle2.rowStyle}
                        rowTextStyle={selectBoxStyle2.rowTextStyle}
                    />

                    {/* <Image source={require('../../../assets/img/ic_circle_x.png')}/> */}

                    <CustomSelectBox 
                        defaultText='부속장치2'
                        strOptionList={['2020년','2021년','2022년','2023년',]}
                        selOption={strOption}
                        strSetOption={setStrOption}
                        buttonStyle={[selectBoxStyle.btnStyle,{height:46,marginBottom:12}]}
                        buttonTextStyle={[selectBoxStyle.btnTextStyle,{fontSize:16}]}
                        rowStyle={selectBoxStyle2.rowStyle}
                        rowTextStyle={selectBoxStyle2.rowTextStyle}
                    />
                    <CustomSelectBox 
                        defaultText='부속장치3'
                        strOptionList={['2020년','2021년','2022년','2023년',]}
                        selOption={strOption}
                        strSetOption={setStrOption}
                        buttonStyle={[selectBoxStyle.btnStyle,{height:46,marginBottom:12}]}
                        buttonTextStyle={[selectBoxStyle.btnTextStyle,{fontSize:16}]}
                        rowStyle={selectBoxStyle2.rowStyle}
                        rowTextStyle={selectBoxStyle2.rowTextStyle}
                    />
                    <CustomSelectBox 
                        defaultText='부속장치4'
                        strOptionList={['2020년','2021년','2022년','2023년',]}
                        selOption={strOption}
                        strSetOption={setStrOption}
                        buttonStyle={[selectBoxStyle.btnStyle,{height:46,marginBottom:12}]}
                        buttonTextStyle={[selectBoxStyle.btnTextStyle,{fontSize:16}]}
                        rowStyle={selectBoxStyle2.rowStyle}
                        rowTextStyle={selectBoxStyle2.rowTextStyle}
                    />
                    <CustomButton
                        label={'부속장치 추가'}
                        action={()=>{console.log(equipment)}}
                        style={{...styles.whiteButtonStyle,flex:1,height:46,marginRight:10}}
                        labelStyle={[fontStyle.f_semibold,styles.whiteButtonLabelStyle]}
                    />
                    
                </View>
                <View style={ElectronicContractstyle.WhiteBox}>
                <View style={[styles.TitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>장비서류 업로드</Text>
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>건설기계등록증/차량등록증
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                     <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }}>
                        <ImageBackground
                        style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:guaranteeImage? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                        source={guaranteeImage}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 10 }}>
                        <Image 
                        style={{ width: 15, height: 15}}
                        source={require('../../../assets/img/ic_add.png')}
                        />
                        <TouchableOpacity
                            style={{ position:'absolute', right: 10, top: 10 }}
                            onPress={() =>{setguaranteeImage}}>
                            <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../../assets/img/ic_modify.png')}
                            />
                        </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>보험증서
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                     <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }}>
                        <ImageBackground
                        style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:guaranteeImage? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                        source={guaranteeImage}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 10 }}>
                        <Image 
                        style={{ width: 15, height: 15}}
                        source={require('../../../assets/img/ic_add.png')}
                        />
                        <TouchableOpacity
                            style={{ position:'absolute', right: 10, top: 10 }}
                            onPress={() =>{setguaranteeImage}}>
                            <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../../assets/img/ic_modify.png')}
                            />
                        </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>비파괴검사필증
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                     <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }}>
                        <ImageBackground
                        style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:guaranteeImage? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                        source={guaranteeImage}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 10 }}>
                        <Image 
                        style={{ width: 15, height: 15}}
                        source={require('../../../assets/img/ic_add.png')}
                        />
                        <TouchableOpacity
                            style={{ position:'absolute', right: 10, top: 10 }}
                            onPress={() =>{setguaranteeImage}}>
                            <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../../assets/img/ic_modify.png')}
                            />
                        </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>제원표
                    <Text style={styles.OrengeStar}>*</Text>
                    </Text>
                     <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }}>
                        <ImageBackground
                        style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:guaranteeImage? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                        source={guaranteeImage}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 10 }}>
                        <Image 
                        style={{ width: 15, height: 15}}
                        source={require('../../../assets/img/ic_add.png')}
                        />
                        <TouchableOpacity
                            style={{ position:'absolute', right: 10, top: 10 }}
                            onPress={() =>{setguaranteeImage}}>
                            <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../../assets/img/ic_modify.png')}
                            />
                        </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>안전검사합격증명서
                    </Text>
                     <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }}>
                        <ImageBackground
                        style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:guaranteeImage? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                        source={guaranteeImage}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 10 }}>
                        <Image 
                        style={{ width: 15, height: 15}}
                        source={require('../../../assets/img/ic_add.png')}
                        />
                        <TouchableOpacity
                            style={{ position:'absolute', right: 10, top: 10 }}
                            onPress={() =>{setguaranteeImage}}>
                            <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../../assets/img/ic_modify.png')}
                            />
                        </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>안전인증서
                    </Text>
                     <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }}>
                        <ImageBackground
                        style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:guaranteeImage? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                        source={guaranteeImage}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 10 }}>
                        <Image 
                        style={{ width: 15, height: 15}}
                        source={require('../../../assets/img/ic_add.png')}
                        />
                        <TouchableOpacity
                            style={{ position:'absolute', right: 10, top: 10 }}
                            onPress={() =>{setguaranteeImage}}>
                            <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../../assets/img/ic_modify.png')}
                            />
                        </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={[styles.SubTitleText]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10}]}>장비사진
                    </Text>
                     <TouchableOpacity style={{ marginRight: 8, width: 100, height: 100 }}>
                        <ImageBackground
                        style={{ flex: 1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:5,justifyContent:'center',alignItems:'center',borderWidth:guaranteeImage? 0:1,borderColor:colors.BORDER_GRAY_COLOR }}
                        source={guaranteeImage}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 10 }}>
                        <Image 
                        style={{ width: 15, height: 15}}
                        source={require('../../../assets/img/ic_add.png')}
                        />
                        <TouchableOpacity
                            style={{ position:'absolute', right: 10, top: 10 }}
                            onPress={() =>{setguaranteeImage}}>
                            <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../../../assets/img/ic_modify.png')}
                            />
                        </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>

                <CustomButton
                style={{height:46}}
                labelStyle={{height:46}}
                label={'현장개설 완료'}
                action={()=>{}}
                />
                </View>
                


            </ScrollView>
            
        </View>
    )
}

const ElectronicContractstyle = StyleSheet.create({
    WhiteBox:{paddingHorizontal:20,paddingTop:30,paddingBottom:30,backgroundColor:colors.WHITE_COLOR,marginBottom:10},
    DefaultBlackText:{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10},
    cardInbox:{flexDirection:'row',justifyContent:'space-between',marginBottom:14},
    boxText1:{fontSize:16,color:colors.FONT_COLOR_BLACK},
})