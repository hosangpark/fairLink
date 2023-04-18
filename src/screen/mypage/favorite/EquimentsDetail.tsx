import React,{useState} from 'react';
import {Text, View, ScrollView,TouchableOpacity,Image,ImageBackground,StyleSheet} from 'react-native';
import { BackHeader } from '../../../component/header/BackHeader';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../../style/style';
import { FavoriteAddPhone } from './favoriteAddDetail/FavoriteAddPhone';
import { CustomInputTextBox } from '../../../component/CustomInputTextBox';
import { CustomButton } from '../../../component/CustomButton';
import { CustomSelectBox } from '../../../component/CustomSelectBox';


export const EquimentsDetail = () => {

    const [modify,setModify] = useState<boolean>(false)
    const [guaranteeImage,setguaranteeImage] = useState<undefined>()
    const [attachment,setAttachment] = useState([
        {
            deviceName:'브레이커'
        },
        {
            deviceName:'지게발'
        },
        {
            deviceName:'채바가지'
        },
        {
            deviceName:'쪽바가지'
        },
    ])
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
            <BackHeader title={'장비 세부정보'} />
            <ScrollView style={{ flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
                <View style={EquimentsDetailstyle.WhiteBox}>
                <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.FONT_COLOR_BLACK,marginBottom:20}]}>
                    017 미니굴삭기
                </Text>
                <View style={{flexDirection:'row'}}>
                    <Image style={{width:130,height:130,borderRadius:4,marginRight:20}} source={require('../../../assets/img/no_image.png')}/>
                    <View style={{justifyContent:'center',flexShrink:1}}>
                        <Text style={[fontStyle.f_medium,EquimentsDetailstyle.boxText1]}>제작연도</Text>
                        <Text style={[fontStyle.f_light,EquimentsDetailstyle.boxText2,{marginBottom:20}]}>2018년</Text>
                        <Text style={[fontStyle.f_medium,EquimentsDetailstyle.boxText1]}>차량번호</Text>
                        <Text style={[fontStyle.f_light,EquimentsDetailstyle.boxText2]}>경기 12머6040</Text>
                    </View>
                </View>
                </View>
                <View style={EquimentsDetailstyle.WhiteBox}>
                    <Text style={[fontStyle.f_semibold,{fontSize:20,color:colors.FONT_COLOR_BLACK,marginBottom:30}]}>세부정보</Text>
                    <View style={{justifyContent:'center',flexShrink:1,marginBottom:30}}>
                        <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1,{marginBottom:10}]}>
                            정기검사 유효기간
                        </Text>
                        <Text style={[fontStyle.f_regular,EquimentsDetailstyle.boxText1,{marginBottom:30}]}>
                            2021.01.05 ~ 2023.01.04
                        </Text>
                        <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1,{marginBottom:10}]}>
                            보험가입 유효기간
                        </Text>
                        <Text style={[fontStyle.f_regular,EquimentsDetailstyle.boxText1,]}>
                            2021.01.05 ~ 2023.01.04
                        </Text>
                    </View>
                    <View style={{marginBottom:20}}>
                    <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1,{marginBottom:10}]}>
                            어태치먼트
                    </Text>
                    {attachment.map((item,index)=>{
                        return(
                    <View style={{flexDirection:'row',marginBottom:10}} key={index}>
                        <View style={EquimentsDetailstyle.graybox}>
                            <Text style={[fontStyle.f_regular,EquimentsDetailstyle.boxText1]}>
                                {item.deviceName}
                            </Text>
                        </View>
                        {modify&&
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',paddingHorizontal:10}}
                        onPress={()=>{console.log(index+1)}}
                        >
                            <Image style={{width:20,height:20}} source={require('../../../assets/img/ic_circle_x.png')}/>
                        </TouchableOpacity>
                        }
                    </View>
                        )
                    })}
                    <CustomButton
                        style={[styles.whiteButtonStyle,{height:46}]}
                        labelStyle={[styles.whiteButtonLabelStyle,{height:46}]}
                        label={'부속장치 추가'}
                        action={()=>{setModify(!modify)}}
                    />

                    </View>
                    <View style={{marginBottom:30}}>
                    <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1,{marginBottom:10}]}>
                            형식
                    </Text>
                    <Text style={[fontStyle.f_regular,EquimentsDetailstyle.boxText1,{marginBottom:10}]}>
                            HX60AMT
                    </Text>
                    </View>
                <View style={{}}>
                    <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1,{marginBottom:10}]}>
                            주요제원
                    </Text>
                    <View style={EquimentsDetailstyle.cardbox}>
                    <View style={EquimentsDetailstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1]}>
                            길이
                        </Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={[fontStyle.f_regular,EquimentsDetailstyle.boxText1,{marginRight:5}]}>
                            12360
                        </Text>
                        <Text style={[fontStyle.f_medium,EquimentsDetailstyle.boxText1]}>
                            MM
                        </Text>
                        </View>
                    </View>
                    <View style={EquimentsDetailstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1]}>
                            너비
                            </Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={[fontStyle.f_regular,EquimentsDetailstyle.boxText1,{marginRight:5}]}>
                            12360
                        </Text>
                        <Text style={[fontStyle.f_medium,EquimentsDetailstyle.boxText1]}>
                            MM
                        </Text>
                        </View>
                    </View>
                    <View style={EquimentsDetailstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1]}>
                            높이
                        </Text>
                         <View style={{flexDirection:'row'}}>
                        <Text style={[fontStyle.f_regular,EquimentsDetailstyle.boxText1,{marginRight:5}]}>
                            12360
                        </Text>
                        <Text style={[fontStyle.f_medium,EquimentsDetailstyle.boxText1]}>
                            MM
                        </Text>
                        </View>
                    </View>
                    <View style={EquimentsDetailstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1]}>
                            총중량
                        </Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={[fontStyle.f_regular,EquimentsDetailstyle.boxText1,{marginRight:5}]}>
                            12360
                        </Text>
                        <Text style={[fontStyle.f_medium,EquimentsDetailstyle.boxText1]}>
                            kg
                        </Text>
                        </View>
                    </View>
                    <View style={EquimentsDetailstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1]}>
                            정격출력
                        </Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={[fontStyle.f_regular,EquimentsDetailstyle.boxText1,{marginRight:5}]}>
                            12360
                        </Text>
                        <Text style={[fontStyle.f_medium,EquimentsDetailstyle.boxText1]}>
                            Ps/rpm
                        </Text>
                        </View>
                    </View>
                    <View style={EquimentsDetailstyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,EquimentsDetailstyle.boxText1]}>
                            최대적재량
                        </Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={[fontStyle.f_regular,EquimentsDetailstyle.boxText1,{marginRight:5}]}>
                            12360
                        </Text>
                        <Text style={[fontStyle.f_medium,EquimentsDetailstyle.boxText1]}>
                            kg
                        </Text>
                        </View>
                    </View>
                    </View>
                </View>
                </View>
                <View style={EquimentsDetailstyle.WhiteBox}>
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
                style={[[modify&& styles.whiteButtonStyle],{height:46}]}
                labelStyle={[[modify&& styles.whiteButtonLabelStyle],{height:46}]}
                label={modify?'수정하기':'장비 세부정보 수정 완료'}
                action={()=>{setModify(!modify)}}
                />
                </View>
            </ScrollView>
        </View>
    )
}

const EquimentsDetailstyle = StyleSheet.create({
    WhiteBox:{paddingHorizontal:20,paddingVertical:30,backgroundColor:colors.WHITE_COLOR,marginBottom:10},
    cardbox :{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,paddingHorizontal:20,paddingVertical:10,borderRadius:8,borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,marginBottom:30},
    DefaultBlackText:{fontSize:16,color:colors.FONT_COLOR_BLACK,marginBottom:10},
    cardInbox:{flexDirection:'row',justifyContent:'space-between',marginVertical:7},
    boxText1:{fontSize:16,color:colors.FONT_COLOR_BLACK},
    boxText2:{fontSize:16,color:colors.FONT_COLOR_BLACK2},
    graybox:{height:46,backgroundColor:colors.BACKGROUND_COLOR_GRAY1,borderRadius:4,borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,justifyContent:'center',paddingHorizontal:15,flex:1}
})