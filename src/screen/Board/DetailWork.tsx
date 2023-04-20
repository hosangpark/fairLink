import React,{useState,useEffect} from 'react';
import {SafeAreaView,View,Text,FlatList, ScrollView,StyleSheet, TouchableOpacity, Image} from 'react-native';
import { BoardIndexType } from '../screenType';
import { BackHeader } from '../../component/header/BackHeader';
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from '../../style/style';
import { CustomSelectBox } from '../../component/CustomSelectBox';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouterNavigatorParams } from '../../../type/routerType';
import { NodataView } from '../../component/NodataView';
import { CustomButton } from '../../component/CustomButton';
import { SelectModal } from '../../modal/SelectModal';
import { AlertModal ,initialAlert} from '../../modal/AlertModal';
import { AlertClearType } from '../../modal/modalType';
import { UserInfoCard } from '../../component/card/UserInfoCard';
import { DocumentAccordion } from '../../component/DocumentAccordion';
import { User1DocumentList, User2DocumentList, User3DocumentList } from '../../component/UserDocumentList';
import { CustomPhoneCall } from '../../component/CustomPhoneCall';

export const DetailWork = () => {
    const [userType,setUserType] = useState('3')
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [strOption , setStrOption] = React.useState<string>('');
    const [selectoday , setSelectoday] = React.useState<boolean>(false);
    const [openbox,setOpenbox] = useState<boolean>(false)
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(()=>initialAlert); //alert 객체 생성 (초기값으로 clear);
    const [selecttModal, setSelectModal] = React.useState<boolean>(false); //alert 객체 생성 (초기값으로 clear);
    const selectModalOn = (msg : string,strongMsg?:string, type? : string) => { //alert 켜기
        setSelectModal(true)
    }
    const alertModalOn = (strongMsg?:string) => { //alert 켜기
        setAlertModal({
            alert:true,
            strongMsg:strongMsg? strongMsg:'',
            msg:`로${"\n"}전화연결 하시겠습니까?`,
            type:'confirm' ,
        })
    }
    const alertModalOff = () =>{ //modal 종료
        setAlertModal(initialAlert)
        setSelectModal(false)
    }
    const alertAction = () => { //alert 확인 눌렀을때 발생할 action
       if(alertModal.type === ''){ //alert Type이 지정되어있을때 발생할 이벤트
            //....... some logic
       } 
       alertModalOff();
    }

    
    return(
        <View style={{flex:1}}>
        <BackHeader title="작업세부내용" />
         <ScrollView style={{flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
            {userType !== '1' &&
            <View style={DetailWorkStyle.Whitebox}>
                <View style={{borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,borderRadius:8,marginBottom:20}}>
                    <View style={{backgroundColor:colors.WHITE_COLOR,paddingHorizontal:20,paddingVertical:16,borderRadius:8}}>
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.MAIN_COLOR}]}>현장명</Text>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText3]}>신축공사12345</Text>
                    </View>
                    <View style={DetailWorkStyle.cardbox2}>
                        <View style={DetailWorkStyle.cardInbox}>
                            <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>회사명</Text>
                            <Text style={[fontStyle.f_regular,DetailWorkStyle.boxText2]}>에이스 종합건설</Text>
                        </View>
                        <View style={DetailWorkStyle.cardInbox}>
                            <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>현장소명</Text>
                            <Text style={[fontStyle.f_regular,DetailWorkStyle.boxText2]}>고길동</Text>
                        </View>
                        <View style={DetailWorkStyle.cardInbox}>
                            <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>현장주소</Text>
                            <Text style={[fontStyle.f_regular,DetailWorkStyle.boxText2]}>전남 여수시 남산동 2000-4141번지전남 여수시 남산동 2000-4141번지</Text>
                        </View>
                    </View>
                </View>
                <View style={{borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,borderRadius:8,paddingHorizontal:20,paddingVertical:16,}}>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>담당자</Text>
                        <Text style={[fontStyle.f_regular,DetailWorkStyle.boxText2]}>이상순 차장</Text>
                    </View>
                    <CustomPhoneCall
                        phonenumber={'010-2641-1541'}
                        alertModalOn={()=>alertModalOn('010-2641-1541')}
                    />
                </View>
            </View>
            }
            <View style={DetailWorkStyle.Whitebox}>
                <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.FONT_COLOR_BLACK,marginBottom:24}]}>작업현황</Text>
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>작업개요</Text>
                {userType == '1'?
                <View style={DetailWorkStyle.cardbox}>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>현장명</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>여수 여수아파트 신축공사여수 여수아파트 신축공사여수 여수아파트 신축공사</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>작업명</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>지하층 북층 터파기</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>작업일시</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>23.01.13</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>작업공종</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>터파기</Text>
                    </View>
                </View>
                :
                <View style={DetailWorkStyle.cardbox}>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>작업공종</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>터파기</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>작업명</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>지하층 북층 터파기</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>작업기간</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>23.01.13 ~ 23.01.13</Text>
                    </View>
                </View>
                }
                {userType=='1'&&
                <View style={{marginBottom:30}}>
                    <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>작업일정관리</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={[DetailWorkStyle.dateday]}>
                            <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>
                                일</Text></View>
                        <View style={[DetailWorkStyle.dateday]}>
                            <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>
                                월</Text></View>
                        <View style={[DetailWorkStyle.dateday]}>
                            <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>
                                화</Text></View>
                        <View style={[DetailWorkStyle.dateday]}>
                            <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>
                                수</Text></View>
                        <View style={[DetailWorkStyle.dateday]}>
                            <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>
                                목</Text></View>
                        <View style={[DetailWorkStyle.dateday]}>
                            <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>
                                금</Text></View>
                        <View style={[DetailWorkStyle.dateday]}>
                            <Text style={[fontStyle.f_regular,{fontSize:15,color:colors.FONT_COLOR_BLACK2}]}>
                                토</Text></View>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <DateBox action={()=>selectModalOn('테스트')}/>
                        <DateBox action={()=>selectModalOn('테스트')}/>
                        <DateBox action={()=>selectModalOn('테스트')}/>
                        <DateBox action={()=>selectModalOn('테스트')}/>
                        <DateBox action={()=>selectModalOn('테스트')}/>
                        <DateBox action={()=>selectModalOn('테스트')}/>
                        <DateBox action={()=>selectModalOn('테스트')}/>
                    </View>
                    <View style={{backgroundColor:colors.WHITE_COLOR}}>
                    <SelectModal
                        date='2023.03.01'
                        bigTitle='작업일정관리'
                        defaultText='선택하세요.'
                        strOptList={['작업일','휴무','기상악화','기타사유']}
                        strSetOption={setStrOption}
                        btnLabel="일정변경"
                        action={()=>{}}
                        show={selecttModal}
                        hide={alertModalOff}
                        style={{width:'100%',backgroundColor:colors.WHITE_COLOR,borderRadius:8}}
                    />
                    </View>
                </View>
                }
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>투입장비</Text>
                {userType !== '2' ?
                <View style={DetailWorkStyle.cardbox}>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>장비명</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>여수 여수아파트 신축공사</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>규격</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>지하층 북층 터파기</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>사업자명</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>23.01.13</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>사업자등록번호</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>터파기</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>대표자명</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>터파기</Text>
                    </View>
                    <CustomPhoneCall
                        phonenumber={'010-2641-1541'}
                        alertModalOn={()=>alertModalOn('010-2641-1541')}
                    />
                </View>
                :
                <View style={{borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,borderRadius:8,flexDirection:'row',marginBottom:30}}>
                    <Image style={{width:130,height:130}} source={require('../../assets/img/no_image.png')}/>
                    <View style={{flex:1,paddingHorizontal:15,justifyContent:'center',borderLeftWidth:1,borderLeftColor:colors.BORDER_GRAY_COLOR}}>
                        <View style={DetailWorkStyle.cardInbox}>
                            <Text style={[fontStyle.f_medium,DetailWorkStyle.boxText1]}>차종 및 규격</Text>
                            <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>017 굴삭기</Text>
                        </View>
                        <View style={DetailWorkStyle.cardInbox}>
                            <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>제작연도</Text>
                            <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>2018년</Text>
                        </View>
                        <View style={DetailWorkStyle.cardInbox}>
                            <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>차량번호</Text>
                            <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>경기 12머6040</Text>
                        </View>
                    </View>
                </View>
                }
                {userType == '1'?
                <>
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>투입조종사</Text>
                <View style={DetailWorkStyle.cardbox}>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>조종사명</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>여수 여수아파트 신축공사</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>경력</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>지하층 북층 터파기</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>평점</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>23.01.13</Text>
                    </View>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>추천수</Text>
                        <Text style={[fontStyle.f_light,DetailWorkStyle.boxText2]}>터파기</Text>
                    </View>
                    <CustomPhoneCall
                        phonenumber={'010-2641-1541'}
                        alertModalOn={()=>alertModalOn('010-2641-1541')}
                    />
                </View>
                </>
                    :
                    <>
                    {userType == '2' &&
                    <>
                    <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>투입조종사</Text>
                    <View style={{borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,borderRadius:8}}>
                        <UserInfoCard
                            index="1"
                            empName='힘찬중기'
                            jobType='0' // (장비업체일 때 jobType = '0')
                            location='[경남]'
                            rating={23}
                            score={5}
                            recEmpCount={64}
                            userName='알파치노'
                            userProfileUrl=''
                            isDelete={false}
                            isFavorite='' // (장비업체일 때 즐겨찾기 on: isFavorite='0', off: isFavorite='1')
                            action={()=>{navigation.navigate('CompanyProfile')}}
                        />
                    </View>
                    </>
                    }
                    </>
                }
            </View>
            <View style={DetailWorkStyle.Whitebox}>
                <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.FONT_COLOR_BLACK,marginBottom:24}]}>대금관리</Text>
                {userType !== '3'?
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>장비대금</Text>
                :
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>스페어대금</Text>
                }
                <View style={DetailWorkStyle.paymentcolorBox}>
                    <Text style={[fontStyle.f_semibold,DetailWorkStyle.MaincolorText]}>
                        대금</Text>
                    <Text style={[fontStyle.f_semibold,DetailWorkStyle.MaincolorText]}>
                        총 1,200,000원</Text>
                </View>
                <View style={DetailWorkStyle.paymentBox}>
                    <View style={DetailWorkStyle.paymentinBox}>
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            기간</Text>
                        <Text style={[fontStyle.f_light,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            23.01.13 ~ 23.01.14 (2일)</Text>
                    </View>
                    <View style={[DetailWorkStyle.paymentinBox,{marginVertical:10}]}>
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            일대</Text>
                        <Text style={[fontStyle.f_light,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            600,000원600,000원600,000원</Text>
                    </View>
                    <View style={DetailWorkStyle.paymentinBox}>
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            대금</Text>
                        <Text style={[fontStyle.f_light,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            600,000원 X 2일</Text>
                    </View>
                    <View style={{alignItems:'flex-end'}}>
                        <Text style={[fontStyle.f_light,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            = 1,200,000원</Text>
                    </View>
                </View>
                {userType=='1' ?
                <View style={[DetailWorkStyle.paymentinBox,{marginVertical:30}]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                        입금기한</Text>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                        23.02.28</Text>
                </View>
                :
                <View style={[{marginVertical:30}]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                        입금예정일</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                        23.02.28</Text>
                </View>
                }
                {userType=='1' ?
                <>
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>
                    계좌정보</Text>
                <View style={DetailWorkStyle.paymentBox}>
                    <View style={DetailWorkStyle.paymentinBox}>
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            은행명</Text>
                        <Text style={[fontStyle.f_light,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            신한</Text>
                    </View>
                    <View style={[DetailWorkStyle.paymentinBox,{marginVertical:10}]}>
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            계좌번호</Text>
                        <Text style={[fontStyle.f_light,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            110-398-556960</Text>
                    </View>
                    <View style={DetailWorkStyle.paymentinBox}>
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            예금주</Text>
                        <Text style={[fontStyle.f_light,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            박호상</Text>
                    </View>
                </View>
                </>
                :
                <>
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>
                    세금계산서 발행처</Text>
                <View style={DetailWorkStyle.paymentBox}>
                    <View style={DetailWorkStyle.paymentinBox}>
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            회사명</Text>
                        <Text style={[fontStyle.f_light,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            에이스종합건설</Text>
                    </View>
                    <View style={[DetailWorkStyle.paymentinBox,{marginVertical:10}]}>
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            사업자등록번호</Text>
                        <Text style={[fontStyle.f_light,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            110-398-556960</Text>
                    </View>
                    <View style={DetailWorkStyle.paymentinBox}>
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            대표자명</Text>
                        <Text style={[fontStyle.f_light,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                            박호상</Text>
                    </View>
                </View>
                </>
                }

                {userType=='1' &&
                <View style={DetailWorkStyle.paymentBox}>
                    <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>
                    통장사본</Text>
                    <View style={{flexDirection:'row',flex:1,}}>
                        <CustomButton
                        style={[styles.whiteButtonStyle,{flex:1,marginRight:10}]}
                        labelStyle={[styles.whiteButtonLabelStyle,{fontSize:16}]}
                        label={'미리보기'}
                        action={()=>{console.log('미리보기')}}
                        />
                        <CustomButton
                        style={{flex:1}}
                        labelStyle={{fontSize:16}}
                        label={'다운로드'}
                        action={()=>{console.log('다운로드')}}
                        />
                    </View>
                </View>
                }
            </View>
            <View style={{padding:20,backgroundColor:colors.WHITE_COLOR}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
                    <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.FONT_COLOR_BLACK}]}>서류관리</Text>
                    <TouchableOpacity>
                        <Text style={[fontStyle.f_regular,DetailWorkStyle.MaincolorText]}>전체선택</Text>
                    </TouchableOpacity>
                </View>
                {userType == "1" &&
                <User1DocumentList
                />
                }
                {userType == "2" &&
                <User2DocumentList
                />
                }
                {userType == "3" &&
                <User3DocumentList
                />
                }
                <CustomButton
                    style={{flex:1,marginRight:10}}
                    labelStyle={[{fontSize:16}]}
                    label={'선택문서 공유하기'}
                    action={()=>{navigation.goBack() ,console.log('선택문서 공유하기')}}
                />
            </View>
        </ScrollView>
        <AlertModal
            show={alertModal.alert}
            msg={alertModal.msg}
            strongMsg={alertModal.strongMsg}
            hide={alertModalOff}
            type={alertModal.type}
            action={()=>{}}
        />
    </View>
    )
}


const DateBox = ({action}:{action:(e:string)=>void})=>{
    const [selectoday,setSelectoday] = useState<boolean>(false)
    return(
    // <TouchableOpacity style={{alignItems:'center',flex:1,borderWidth:1,borderColor:selectoday? colors.FONT_COLOR_BLACK:colors.WHITE_COLOR,borderRadius:8}} onPress={()=>setSelectoday(!selectoday)}>
    //     <View style={[DetailWorkStyle.dateoff]}>
    //     <Text style={[fontStyle.f_medium,DetailWorkStyle.dateoffText]}>2/26</Text>
    // </View>
    //     <Text style={[fontStyle.f_medium,DetailWorkStyle.dateoffText]}>휴무</Text>
    // </TouchableOpacity>

    <TouchableOpacity style={{alignItems:'center',flex:1,borderWidth:1,borderColor:selectoday? colors.FONT_COLOR_BLACK2:colors.WHITE_COLOR,borderRadius:8}} onPress={()=>action('테스트')}>
        <View style={[DetailWorkStyle.dateon]}>
        <Text style={[fontStyle.f_medium,DetailWorkStyle.dateonText]}>2/26</Text>
    </View>
        <Text style={[fontStyle.f_medium,DetailWorkStyle.dateonText]}>작업일</Text>
    </TouchableOpacity>

    // <TouchableOpacity style={{alignItems:'center',flex:1}}>
    //     <View style={[DetailWorkStyle.dateoff]}>
    //     <Text style={[fontStyle.f_medium,DetailWorkStyle.dateoffText]}>2/26</Text>
    // </View>
    //     <Text style={[fontStyle.f_medium,DetailWorkStyle.dateoffText]}>기상악화</Text>
    // </TouchableOpacity>

    // <TouchableOpacity style={{alignItems:'center',flex:1}}>
    //     <View style={[DetailWorkStyle.date]}>
    //     <Text style={[fontStyle.f_medium,DetailWorkStyle.dateText]}>2/26</Text>
    // </View>
    //     <Text></Text>
    // </TouchableOpacity>
    )
}

const DetailWorkStyle = StyleSheet.create({
    cardbox :{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,paddingHorizontal:20,paddingVertical:10,borderRadius:8,borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,marginBottom:30},
    cardbox2 :{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,paddingHorizontal:20,paddingVertical:10,borderTopWidth:1,borderColor:colors.BORDER_GRAY_COLOR,borderBottomLeftRadius:8,borderBottomRightRadius:8},
    Whitebox:{padding:20,backgroundColor:colors.WHITE_COLOR,marginBottom:10},
    cardInbox:{flexDirection:'row',justifyContent:'space-between',paddingVertical:5},
    boxText1:{fontSize:16,color:colors.FONT_COLOR_BLACK,flex:2},
    boxText2:{fontSize:16,color:colors.FONT_COLOR_BLACK,flex:3,flexShrink:1,textAlign:'right'},
    boxText3:{fontSize:18,color:colors.FONT_COLOR_BLACK},
    dateday:{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,width:50,height:30,justifyContent:'center',alignItems:'center',marginBottom:10,borderRadius:4},
    date:{backgroundColor:colors.BACKGROUND_COLOR_GRAY1,width:50,height:50,justifyContent:'center',alignItems:'center',marginBottom:10,borderRadius:8},
    dateon:{backgroundColor:colors.BLUE_COLOR3,width:50,height:50,justifyContent:'center',alignItems:'center',marginBottom:10,borderRadius:8,borderWidth:1,borderColor:colors.BORDER_BLUE_COLOR3},
    dateoff:{backgroundColor:colors.RED_COLOR,width:50,height:50,justifyContent:'center',alignItems:'center',marginBottom:10,borderRadius:8,borderWidth:1,borderColor:colors.BORDER_RED_COLOR},
    dateText:{fontSize:14,color:colors.FONT_COLOR_GRAY},
    dateonText:{fontSize:14,color:colors.MAIN_COLOR},
    dateoffText:{fontSize:14,color:colors.FONT_COLOR_RED},
    paymentcolorBox:{flexDirection:'row',justifyContent:'space-between',padding:20,borderRadius:8,borderWidth:1,borderColor:colors.MAIN_COLOR,marginBottom:10},
    paymentBox:{padding:20,borderRadius:8,borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,marginBottom:10},
    paymentinBox:{flexDirection:'row',justifyContent:'space-between'},
    documentBox:{borderRadius:8,borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,marginBottom:20},
    documentBoxinTop:{paddingHorizontal:20,paddingVertical:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
    documentBoxinBox:{borderTopWidth:1,borderColor:colors.BORDER_GRAY_COLOR,paddingVertical:30,paddingHorizontal:20},
    MaincolorText:{color:colors.MAIN_COLOR,fontSize:16},
})
