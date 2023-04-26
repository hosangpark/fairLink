import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { BackHeader } from "../../../component/header/BackHeader";
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from "../../../style/style";
import { CustomSelectBox } from "../../../component/CustomSelectBox";
import { AlertClearType } from "../../../modal/modalType";
import { AlertModal, initialAlert } from "../../../modal/AlertModal";
import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouterNavigatorParams } from "../../../../type/routerType";
import { MyPageIndexType } from "../../screenType";

// 마이페이지 -> 프로필 설정하기 -> 해당 페이지로 이동해야함
export const SettingProfile = ({route}:any) => {
    const [isEditable, setIsEditable] = useState(false);
    const [strOption,setStrOption] = useState<string>('')
    const [statusType, setstatusType] = useState<number>(0) // 0: 미등록, 1: 승인중, 2: 승인완료
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);
    const [isChecked, setIsChecked] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();

    const documentData = [
        {id: 0, name: '건설기계조종사면허증'},
        {id: 1, name: '운전면허증'},
        {id: 2, name: '건설기계조종사 안전교육이수증'},
        {id: 3, name: '화물운송종사자 자격증'},
        {id: 4, name: '이동식 크레인조종교육이수증'},
        {id: 5, name: '기중기 운전기능사'},
        {id: 6, name: '통장사본'},
    ]

    const handlePressIn = () => setIsPressed(true);
    const handlePressOut = () => setIsPressed(false);

    const handleCheck = () => {
        setIsChecked(!isChecked);
    } 

    const alertModalOn = ( msg : string, type? : string) => {
        setAlertModal({
            alert: true,
            strongMsg: '',
            msg: msg,
            type: type ? type : '' ,
        })
    }

    const alertModalOff = () => {
        setAlertModal(initialAlert);
    }

    const checkInputValue = () => {
        if ( "필수 항목을 모두 입력하지 않음") {
            alertModalOn('필수항목을 모두 입력하세요');
        } else {
            alertModalOn('설정이 완료되었습니다.');
            navigation.navigate('MyPage');
        }
    }
    return (
        <ScrollView>
            <BackHeader title="프로필 설정하기"/>
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <View style={{ paddingVertical: 10 }}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>사진등록</Text>
                            <View style={{ flexDirection: 'row'}}>
                                <Text style={[ styles.OrengeStar]}>*</Text>
                                <Text style={[ fontStyle.f_regular, { fontSize: 15, color: colors.FONT_COLOR_BLACK}]}>필수항목</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Image style={{ width: 110, height: 110}} source={ require('../../../assets/img/profile_default.png') }/>
                            <Image style={{ width: 30, height: 30, marginLeft: -30 }} source={ require('../../../assets/img/ic_add_img.png') }/>
                        </View>
                    </View>
                </View>
            </View>
            { // (조종사 일 때)
                route.params.mt_type ==='4'
                &&
                <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                    <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>활동지역</Text>
                    <View style={{ paddingVertical: 10 }}>
                        <View style={{ marginBottom: 15 }}>
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>지역<Text style={[ styles.OrengeStar]}>*</Text></Text>
                            <CustomSelectBox 
                                defaultText='선택하세요.'
                                strOptionList={['영흥', '삼천포', '본사', '여수',]}
                                selOption={strOption}
                                strSetOption={setStrOption}
                                buttonStyle={selectBoxStyle.btnStyle}
                                buttonTextStyle={selectBoxStyle2.btnTextStyle}
                                rowStyle={selectBoxStyle.rowStyle}
                                rowTextStyle={selectBoxStyle.rowTextStyle}
                            />
                        </View>
                    </View>
                </View>
            }
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>경력사항</Text>
                <View style={{ paddingVertical: 10 }}>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>경력<Text style={[ styles.OrengeStar]}>*</Text></Text>
                        <CustomSelectBox 
                            defaultText='선택하세요.'
                            strOptionList={['해당없음', '1년이상', '2년이상', '3년이상', '5년이상', '7년이상', '10년이상',]}
                            selOption={strOption}
                            strSetOption={setStrOption}
                            buttonStyle={selectBoxStyle.btnStyle}
                            buttonTextStyle={selectBoxStyle2.btnTextStyle}
                            rowStyle={selectBoxStyle.rowStyle}
                            rowTextStyle={selectBoxStyle.rowTextStyle}
                        />
                    </View>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>주특기 장비<Text style={[ styles.OrengeStar]}>*</Text></Text>
                        <View style={{ flexDirection: 'row',}}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <CustomSelectBox 
                                    defaultText='주특기 장비'
                                    strOptionList={['지게차', '하이랜더', '고소작업대']}
                                    selOption={strOption}
                                    strSetOption={setStrOption}
                                    buttonStyle={selectBoxStyle.btnStyle}
                                    buttonTextStyle={selectBoxStyle2.btnTextStyle}
                                    rowStyle={selectBoxStyle.rowStyle}
                                    rowTextStyle={selectBoxStyle.rowTextStyle}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <CustomSelectBox 
                                    defaultText='세부 규격'
                                    strOptionList={['3톤미만','3톤이상~5톤이하','7톤이상','없음',]}
                                    selOption={strOption}
                                    strSetOption={setStrOption}
                                    buttonStyle={selectBoxStyle.btnStyle}
                                    buttonTextStyle={selectBoxStyle2.btnTextStyle}
                                    rowStyle={selectBoxStyle.rowStyle}
                                    rowTextStyle={selectBoxStyle.rowTextStyle}
                                />
                            </View>
                        </View>
                        <TouchableOpacity>
                            <View style={[ styles.whiteButtonStyle,{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}]}>
                                <Image style={{ width: 14, height: 14, marginRight: 6 }} source={ require('../../../assets/img/ic_add.png')}/>
                                <Text style={[fontStyle.f_semibold, { fontSize: 18, color: colors.MAIN_COLOR}]}>장비 추가</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginVertical: 10}}>
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>세부경력정보 직접기입<Text style={[ styles.OrengeStar]}>*</Text></Text>
                            <TextInput 
                                style={{ borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 4, padding: 10, minHeight: 150, }}
                                textAlignVertical="top"
                                placeholder="ex) - 흙막이 작업 : 3년"
                                placeholderTextColor={colors.BORDER_GRAY_COLOR3}
                                multiline={true}
                                numberOfLines={4}
                                onChange={(e) => console.log(e.nativeEvent.text)}
                                // value={}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>나의 포부</Text>
                <View style={{ paddingVertical: 10 }}>
                    <TextInput 
                        style={{ borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 4, padding: 10, minHeight: 150, }}
                        textAlignVertical="top"
                        placeholder="ex) 누구보다 성실하게 일해왔다고 자부합니다."
                        placeholderTextColor={colors.BORDER_GRAY_COLOR3}
                        multiline={true}
                        numberOfLines={4}
                        onChange={(e) => console.log(e.nativeEvent.text)}
                        // value={}
                    />
                </View>
            </View>
            { // (조종사 일 때)
                route.params.mt_type ==='4'
                &&
                <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                    <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>소속회사</Text>
                    <View style={{ paddingVertical: 10,  }}>
                        {/* <View style={{ marginBottom: 15, }}> */}
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>소속유무<Text style={[ styles.OrengeStar]}>*</Text></Text>
                            <View style={{ flexDirection: 'row'}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1}}>
                                    <CheckBox
                                        disabled={false}
                                        value={isChecked}
                                        onValueChange={() => handleCheck()}
                                        tintColors={{ true: colors.MAIN_COLOR }}
                                        style={{ width: 20, height: 20, marginVertical: 6, marginRight: 12 }}
                                    />
                                    <Text style={[ fontStyle.f_semibold, { color: colors.FONT_COLOR_BLACK, fontSize: 16}]}>있음</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1}}>
                                    <CheckBox
                                        disabled={false}
                                        value={!isChecked}
                                        onValueChange={() => handleCheck()}
                                        tintColors={{ true: colors.MAIN_COLOR }}
                                        style={{ width: 20, height: 20, marginVertical: 6, marginRight: 12 }}
                                    />
                                    <Text style={[ fontStyle.f_semibold, { color: colors.FONT_COLOR_BLACK, fontSize: 16}]}>없음</Text>
                                </View>
                            </View>
                            {   
                                isChecked &&
                                <View>
                                    <Text style={[ styles.textLabel, fontStyle.f_semibold, { marginTop: 15 }]}>회사 검색</Text>
                                    <View style={{ position: 'relative'}}>
                                        <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut}>
                                            <TextInput 
                                                placeholder='회사명 또는 사업자등록번호로 검색' 
                                                placeholderTextColor={colors.BORDER_GRAY_COLOR3} 
                                                style={[fontStyle.f_light, { fontSize: 16 , borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 4, paddingLeft: 15, paddingRight: 45}]}
                                            />
                                            <Image 
                                                source={ isPressed ? require('../../../assets/img/ic_search_g.png') : require('../../../assets/img/ic_search.png')} 
                                                style={{position: 'absolute', width: 20, height: 20, top: 15, right: 15,}}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{paddingVertical: 10}}>
                                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>회사명</Text>
                                        <TextInput style={{borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 4, paddingHorizontal: 15}}/>
                                    </View>
                                    <View style={{paddingVertical: 10}}>
                                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>대표자</Text>
                                        <TextInput style={{borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 4, paddingHorizontal: 15}}/>
                                    </View>
                                </View>
                            }
                    </View>
                </View>
            }
            { // (조종사 일 때)
                route.params.mt_type ==='4'
                &&
                <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                    <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>계좌정보</Text>
                    <View style={{ paddingVertical: 10 }}>
                        <View style={{ marginBottom: 15 }}>
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>은행명<Text style={[ styles.OrengeStar]}>*</Text></Text>
                            <CustomSelectBox 
                                defaultText='선택하세요.'
                                strOptionList={['국민','기업','농협','신한','산업','우리','한국씨티','하나','SC제일','경남','광주','대구','도이치','부산','산림조합중앙회','저축','새마을금고','수협','신협','우체국','전북','제주','케이뱅크','토스뱅크',]}
                                selOption={strOption}
                                strSetOption={setStrOption}
                                buttonStyle={selectBoxStyle.btnStyle}
                                buttonTextStyle={selectBoxStyle2.btnTextStyle}
                                rowStyle={selectBoxStyle.rowStyle}
                                rowTextStyle={selectBoxStyle.rowTextStyle}
                            />
                            <View style={{paddingVertical: 10}}>
                                <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>계좌번호</Text>
                                <TextInput style={{borderWidth: 1, borderColor: colors.BORDER_GRAY_COLOR, borderRadius: 4, paddingHorizontal: 15}}/>
                            </View>
                        </View>
                    </View>
                </View>
            }
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>서류 업로드</Text>
                
                {
                    documentData.map((data, key) => (
                        <View style={{ paddingVertical: 10 }} key={key}>
                            <View style={{ flexDirection: 'row'}}>
                                <Text style={[fontStyle.f_semibold, { color: colors.FONT_COLOR_BLACK, fontSize: 16, marginRight: 5, marginBottom: 5}]}>{data.name}</Text>
                                <Text style={[fontStyle.f_semibold, { fontSize: 16, color: statusType === 0 ? colors.FONT_COLOR_GRAY : statusType === 1 ? colors.FONT_COLOR_BLACK2 : colors.MAIN_COLOR}]}>
                                    {statusType === 0 ? '[미등록]' : statusType === 1 ? '[승인중]' : '[승인완료]'}
                                    <Text style={[ styles.OrengeStar]}>{ data.name !== '통장사본' ? '*' : null }</Text>
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => alertModalOn('저장된 파일이 있습니다. 변경하시겠습니까?', 'confirm')}>
                                <View style={[styles.docImage]}>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '100%'}}>
                                        <Image style={{ width: '100%', height: '100%',}} source={ require('../../../assets/img/ic_main4.png')}/>
                                        <TouchableOpacity onPress={() => alertModalOn(`${data.name}을 삭제하시겠습니까?`, 'confirm')}>
                                            <Image style={{ width: 22, height: 22, marginTop: 10, marginLeft: -30, opacity: 2 }} source={ require('../../../assets/img/ic_modify.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <AlertModal 
                                show={alertModal.alert}
                                msg={alertModal.msg}
                                // action={} // 저장일 때 -> 저장 -> "파일이 저장되었습니다.", 삭제일 때 -> 삭제, 설정완료 버튼 클릭 시(필수항목체크 후) -> 마이페이지 이동  
                                hide={alertModalOff}
                                type={alertModal.type}
                            />
                        </View>
                    ))
                }
                {/* 서류 없을 때 */}
                    {/* <View style={[styles.docImage, {borderColor: colors.BORDER_GRAY_COLOR, }]}>
                        <Image style={{ width: 16, height: 16,}} source={ require('../../../assets/img/ic_add.png')}/>
                    </View> */}
                <View style={{ marginVertical: 20,}}>
                    <TouchableOpacity onPress={checkInputValue}>
                        <View style={[styles.buttonStyle,]}>
                            <Text style={[ styles.buttonLabelStyle,]}>프로필 설정 완료</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}