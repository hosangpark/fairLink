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
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { usePostQuery } from '../../util/reactQuery';
import { toggleLoading } from '../../redux/actions/LoadingAction';
import { initialdetailWorkInfo } from '../../component/initialInform';
import RNFetchBlob from 'rn-fetch-blob';
import { ImageModal } from '../../modal/ImageModal';

export const DetailWork = ({route}:any) => {
    const dispatch = useAppDispatch();
    const {mt_idx,mt_type} = useAppSelector(state => state.userInfo);
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [strOption , setStrOption] = React.useState<string>('');
    const [selectoday , setSelectoday] = React.useState<boolean>(false);
    const [openbox,setOpenbox] = useState<boolean>(false)
    const [show,setshow] = useState<boolean>(false)
    const [onimageUri,setOnimageUri] = useState<string>('')
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(()=>initialAlert); //alert 객체 생성 (초기값으로 clear);
    const [selecttModal, setSelectModal] = React.useState<boolean>(false); //alert 객체 생성 (초기값으로 clear);
    const selectModalOn = (msg : string,strongMsg?:string, type? : string) => { //alert 켜기
        setSelectModal(true)
    }

    const [detailWorkInfo, setDetailWorkInfo] = React.useState<any>(()=>initialdetailWorkInfo); //입력정보

    const {data : DetailWorkData, isLoading : DetailWorkDataLoading, isError : DetailWorkDataError} = 
    /** mt_idx 임의입력 수정필요 */
    mt_type =="1"?
    usePostQuery('getConsDetailWorkData',{mt_idx : "17", cot_idx:route.params.cot_idx, cat_idx:route.params.cat_idx},'cons/cons_order_info2.php')
    :
    usePostQuery('getEquipDetailWorkData',{mt_idx : "17", cot_idx:route.params.cot_idx, cat_idx:route.params.cat_idx},'equip/equip_order_info2.php')


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
    /**이미지 다운로드 */
    // const ImageDownload = async()=>{
    //     await RNFetchBlob.config({
    //     addAndroidDownloads: {
    //     useDownloadManager: true,
    //     notification: true,
    //     path: `${RNFetchBlob.fs.dirs.DownloadDir}/${onimageUri}`,
    //     },
    // }).fetch('GET', onimageUri);
    // }

    React.useEffect(()=>{
        dispatch(toggleLoading(DetailWorkDataLoading));
        if(DetailWorkData){
            setDetailWorkInfo(DetailWorkData.data.data);
        }
    },[DetailWorkData])

    React.useEffect(()=>{
        console.log(detailWorkInfo)
    },[])

    
    return(
        <View style={{flex:1}}>
        <BackHeader title="작업세부내용" />
         <ScrollView style={{flex:1,backgroundColor:colors.BACKGROUND_COLOR_GRAY1}}>
            {mt_type !== '1' &&
            <View style={DetailWorkStyle.Whitebox}>
                <View style={{borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,borderRadius:8,marginBottom:20}}>
                    <View style={{backgroundColor:colors.WHITE_COLOR,paddingHorizontal:20,paddingVertical:16,borderRadius:8}}>
                        <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.MAIN_COLOR}]}>현장명</Text>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText3]}>{detailWorkInfo.작업정보?.crt_name}</Text>
                    </View>
                    <View style={DetailWorkStyle.cardbox2}>
                        <WorkLayoutbox
                            title={'회사명'}
                            text={detailWorkInfo.작업정보?.crt_company}
                            boxfontstyle={fontStyle.f_regular}
                        />
                        <WorkLayoutbox
                            title={'현장소명'}
                            text={detailWorkInfo.작업정보?.crt_director}
                            boxfontstyle={fontStyle.f_regular}
                        />
                        <WorkLayoutbox
                            title={'현장주소'}
                            text={detailWorkInfo.작업정보?.crt_location}
                            boxfontstyle={fontStyle.f_regular}
                        />
                    </View>
                </View>
                <View style={{borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,borderRadius:8,paddingHorizontal:20,paddingVertical:16,}}>
                    <View style={DetailWorkStyle.cardInbox}>
                        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>담당자</Text>
                        <Text style={[fontStyle.f_regular,DetailWorkStyle.boxText2]}>{detailWorkInfo.작업정보?.crt_m_name}</Text>
                    </View>
                    <CustomPhoneCall
                        phonenumber={detailWorkInfo.작업정보?.crt_m_num}
                        alertModalOn={()=>alertModalOn(detailWorkInfo.작업정보?.crt_m_num)}
                    />
                </View>
            </View>
            }
            <View style={DetailWorkStyle.Whitebox}>
                <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.FONT_COLOR_BLACK,marginBottom:24}]}>작업현황</Text>
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>작업개요</Text>
                {mt_type == '1'?
                <View style={DetailWorkStyle.cardbox}>
                    <WorkLayoutbox
                        title={'현장명'}
                        text={detailWorkInfo.작업내용?.crt_name}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'작업명'}
                        text={detailWorkInfo.작업내용?.content}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'작업일시'}
                        text={detailWorkInfo.작업내용?.date}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'작업공종'}
                        text={detailWorkInfo.작업내용?.species}
                        boxfontstyle={fontStyle.f_light}
                    />
                </View>
                :
                <View style={DetailWorkStyle.cardbox}>
                    <WorkLayoutbox
                        title={'작업공종'}
                        text={detailWorkInfo.작업개요?.species}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'작업명'}
                        text={detailWorkInfo.작업개요?.content}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'작업기간'}
                        text={detailWorkInfo.작업개요?.start_date + " ~ " + detailWorkInfo.작업개요?.end_date}
                        boxfontstyle={fontStyle.f_light}
                    />
                </View>
                }
                {mt_type=='1'&&
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
                {mt_type !== '2' ?
                <View style={DetailWorkStyle.cardbox}>
                    <WorkLayoutbox
                        title={'장비명'}
                        text={detailWorkInfo.투입장비?.equip_name}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'규격'}
                        text={detailWorkInfo.투입장비?.stand1 +"\n"+detailWorkInfo.투입장비?.stand2}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'사업자명'}
                        text={detailWorkInfo.투입장비?.company}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'사업자등록번호'}
                        text={detailWorkInfo.투입장비?.busi_num}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'대표자명'}
                        text={detailWorkInfo.투입장비?.ceo}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <CustomPhoneCall
                        phonenumber={detailWorkInfo.투입장비?.hp}
                        alertModalOn={()=>alertModalOn(detailWorkInfo.투입장비?.hp)}
                    />
                </View>
                :
                <View style={{borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,borderRadius:8,flexDirection:'row',marginBottom:30}}>
                    <Image style={{width:125,height:125}} source={require('../../assets/img/no_image.png')}/>
                    <View style={{flex:1,paddingHorizontal:15,justifyContent:'center',borderLeftColor:colors.BORDER_GRAY_COLOR}}>
                        <WorkLayoutbox
                            title={'차종 및 규격'}
                            text={detailWorkInfo.투입장비?.e_name}
                            boxfontstyle={fontStyle.f_light}
                        />
                        <WorkLayoutbox
                            title={'제작연도'}
                            text={detailWorkInfo.투입장비?.e_year}
                            boxfontstyle={fontStyle.f_light}
                        />
                        <WorkLayoutbox
                            title={'차량번호'}
                            text={detailWorkInfo.투입장비?.e_num}
                            boxfontstyle={fontStyle.f_light}
                        />
                    </View>
                </View>
                }
                {mt_type == '1'?
                <>
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>투입조종사</Text>
                <View style={DetailWorkStyle.cardbox}>
                    <WorkLayoutbox
                        title={'조종사명'}
                        text={detailWorkInfo.투입조종사?.name}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'경력'}
                        text={detailWorkInfo.투입조종사?.career + '년'}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'평점'}
                        text={detailWorkInfo.투입조종사?.score}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'추천수'}
                        text={detailWorkInfo.투입조종사?.good}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <CustomPhoneCall
                        phonenumber={detailWorkInfo.투입조종사?.hp}
                        alertModalOn={()=>alertModalOn(detailWorkInfo.투입조종사?.hp)}
                    />
                </View>
                </>
                    :
                    <>
                    {mt_type == '2' &&
                    <>
                    <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>투입조종사</Text>
                    <View style={{borderWidth:1,borderColor:colors.BORDER_GRAY_COLOR,borderRadius:8}}>
                        {/* <UserInfoCard
                            index="1"
                            empName='힘찬중기'
                            jobType='0' // (장비업체일 때 jobType = '0')
                            location='[경남]'
                            // rating={detailWorkInfo.투입조종사?.p_score}
                            // score={detailWorkInfo.투입조종사?.p_score_count}
                            // recEmpCount={detailWorkInfo.투입조종사?.good}
                            // userName={detailWorkInfo.투입조종사?.p_name}
                            userProfileUrl=''
                            isDelete={false}
                            isFavorite='' // (장비업체일 때 즐겨찾기 on: isFavorite='0', off: isFavorite='1')
                            action={()=>{navigation.navigate('CompanyProfile')}}
                        /> */}
                    </View>
                    </>
                    }
                    </>
                }
            </View>
            <View style={DetailWorkStyle.Whitebox}>
                <Text style={[fontStyle.f_bold,{fontSize:20,color:colors.FONT_COLOR_BLACK,marginBottom:24}]}>대금관리</Text>
                {mt_type !== '3'?
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>장비대금</Text>
                :
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>스페어대금</Text>
                }
                <View style={DetailWorkStyle.paymentcolorBox}>
                    <Text style={[fontStyle.f_semibold,DetailWorkStyle.MaincolorText]}>
                        대금</Text>
                    <Text style={[fontStyle.f_semibold,DetailWorkStyle.MaincolorText]}>
                        총 {detailWorkInfo.대금관리?.all_price} 만원</Text>
                </View>
                <View style={DetailWorkStyle.paymentBox}>
                    <WorkLayoutbox
                        title={'기간'}
                        text={detailWorkInfo.대금관리?.date}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={detailWorkInfo.대금관리?.price_type == "Y" ? '일대':'월대'}
                        text={detailWorkInfo.대금관리?.price + "만원"}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'대금'}
                        text={detailWorkInfo.대금관리?.check_price}
                        boxfontstyle={fontStyle.f_light}
                    />
                    {/* <WorkLayoutbox
                        title={''}
                        text={'= 1,200,000원'}
                        boxfontstyle={fontStyle.f_light}
                    /> */}
                </View>
                {mt_type=='1' ?
                <View style={[DetailWorkStyle.paymentinBox,{marginVertical:30}]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                        입금기한</Text>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                        {detailWorkInfo.대금관리?.pay_date}</Text>
                </View>
                :
                <View style={[{marginVertical:30}]}>
                    <Text style={[fontStyle.f_semibold,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                        입금예정일</Text>
                    <Text style={[fontStyle.f_regular,{fontSize:16,color:colors.FONT_COLOR_BLACK}]}>
                        {detailWorkInfo.대금관리?.pay_date}</Text>
                </View>
                }
                {mt_type=='1' ?
                <>
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>
                    계좌정보</Text>
                <View style={DetailWorkStyle.paymentBox}>
                    <WorkLayoutbox
                        title={'은행명'}
                        text={detailWorkInfo.대금관리?.met_bank}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'계좌번호'}
                        text={detailWorkInfo.대금관리?.met_bank_num}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'예금주'}
                        text={detailWorkInfo.대금관리?.met_vholder}
                        boxfontstyle={fontStyle.f_light}
                    />
                </View>
                </>
                :
                <>
                <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>
                    세금계산서 발행처</Text>
                <View style={DetailWorkStyle.paymentBox}>
                    <WorkLayoutbox
                        title={'회사명'}
                        text={'에이스종합건설'}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'사업자등록번호'}
                        text={'110-398-556960'}
                        boxfontstyle={fontStyle.f_light}
                    />
                    <WorkLayoutbox
                        title={'대표자명'}
                        text={'구구구'}
                        boxfontstyle={fontStyle.f_light}
                    />
                </View>
                </>
                }

                {mt_type=='1' &&
                <View style={DetailWorkStyle.paymentBox}>
                    <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1,{marginBottom:10}]}>
                    통장사본</Text>
                    <View style={{flexDirection:'row',flex:1,}}>
                        <CustomButton
                        style={[styles.whiteButtonStyle,{flex:1,marginRight:10}]}
                        labelStyle={[styles.whiteButtonLabelStyle,{fontSize:16}]}
                        label={'미리보기'}
                        action={()=>{setshow(true)}}
                        />
                        <CustomButton
                        style={{flex:1}}
                        labelStyle={{fontSize:16}}
                        label={'다운로드'}
                        // action={()=>{ImageDownload}}
                        action={()=>{}}
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
                {mt_type == "1" &&
                <User1DocumentList
                    items1={detailWorkInfo['서류관리-장비(차량) 서류']}
                    items2={detailWorkInfo['서류관리-자격 및 기타 서류']}
                    items3={detailWorkInfo['서류관리-계약서류']}
                    items4={detailWorkInfo['서류관리-작업일보']}
                />
                }
                {mt_type == "2" &&
                <User2DocumentList
                    items1={detailWorkInfo['서류관리-장비(차량) 서류']}
                    items2={detailWorkInfo['서류관리-자격 및 기타 서류']}
                    items3={detailWorkInfo['서류관리-계약서류']}
                    items4={detailWorkInfo['서류관리-작업일보']}
                />
                }
                {mt_type == "3" &&
                <User3DocumentList
                    items1={detailWorkInfo['서류관리-작업일보']}
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
        <ImageModal
            show={show}
            action={()=>{}}
            hide={()=>{setshow(false)}}
            imgrl={detailWorkInfo.대금관리.bank_file}
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

const WorkLayoutbox = ({title,text,boxfontstyle}:{title:string,text:string,boxfontstyle:object})=>{
    return(
    <View style={DetailWorkStyle.cardInbox}>
        <Text style={[fontStyle.f_semibold,DetailWorkStyle.boxText1]}>{title}</Text>
        <Text style={[boxfontstyle,DetailWorkStyle.boxText2]}>{text}</Text>
    </View>
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
