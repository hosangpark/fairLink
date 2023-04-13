import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { BackHeader } from "../../component/header/BackHeader";
import { colors, fontStyle, selectBoxStyle, selectBoxStyle2, styles } from "../../style/style";
import { CustomSelectBox } from "../../component/CustomSelectBox";
import { AlertClearType } from "../../modal/modalType";
import { AlertModal, initialAlert } from "../../modal/AlertModal";

export const SettingProfile = () => {
    const [isEditable, setIsEditable] = useState(false);
    const [strOption,setStrOption] = useState<string>('')
    const [statusType, setstatusType] = useState<number>(0) // 0: 미등록, 1: 승인중, 2: 승인완료
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);

    const alertModalOn = ( msg : string, type? : string ) => {
        setAlertModal({
            alert: true,
            strongMsg: '',
            msg: msg,
            type: type ? type : '' ,
        })
    }

    const alertModalOff = () => {
        setAlertModal(initialAlert)
    }

    const checkInputValue = () => {
        if ( "필수 항목을 모두 입력하지 않음") {
            alertModalOn('필수항목을 모두 입력하세요')
        } else {
            alertModalOn('설정이 완료되었습니다.')
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
                            <Image style={{ width: 110, height: 110}} source={ require('../../assets/img/profile_default.png') }/>
                            <Image style={{ width: 30, height: 30, marginLeft: -30 }} source={ require('../../assets/img/ic_add_img.png') }/>
                        </View>
                    </View>
                </View>
            </View>
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
                            <View style={[ styles.whiteButtonStyle,{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
                                <Image style={{ width: 14, height: 14, marginRight: 6 }} source={ require('../../assets/img/ic_add.png')}/>
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
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>서류 업로드</Text>
                <View style={{ paddingVertical: 10 }}>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={[fontStyle.f_semibold, { color: colors.FONT_COLOR_BLACK, fontSize: 16, marginRight: 5, marginBottom: 5}]}>건설기계등록증</Text>
                        <Text style={[fontStyle.f_semibold, { fontSize: 16, color: statusType === 0 ? colors.FONT_COLOR_GRAY : statusType === 1 ? colors.FONT_COLOR_BLACK2 : colors.MAIN_COLOR}]}>
                            {statusType === 0 ? '[미등록]' : statusType === 1 ? '[승인중]' : '[승인완료]'}
                            <Text style={[ styles.OrengeStar]}>*</Text>
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => alertModalOn('저장된 파일이 있습니다. 변경하시겠습니까?', 'confirm')}>
                        <View style={[styles.docImage]}>
                            <View style={{ flexDirection: 'row', width: '100%', height: '100%'}}>
                                <Image style={{ width: '100%', height: '100%',}} source={ require('../../assets/img/ic_main4.png')}/>
                                <TouchableOpacity onPress={() => alertModalOn('건설기계등록증을 삭제하시겠습니까?')}>
                                    <Image style={{ width: 22, height: 22, marginTop: 10, marginLeft: -30, opacity: 2 }} source={ require('../../assets/img/ic_modify.png')}/>
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
                <View style={{ paddingVertical: 10 }}>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={[fontStyle.f_semibold, { color: colors.FONT_COLOR_BLACK, fontSize: 16, marginRight: 5, marginBottom: 5}]}>특수형태근로자안전보건교육이수증</Text>
                        <Text style={[fontStyle.f_semibold, { fontSize: 16, color: statusType === 0 ? colors.FONT_COLOR_GRAY : statusType === 1 ? colors.FONT_COLOR_BLACK2 : colors.MAIN_COLOR}]}>
                            {statusType === 0 ? '[미등록]' : statusType === 1 ? '[승인중]' : '[승인완료]'}
                            <Text style={[ styles.OrengeStar]}>*</Text>
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => alertModalOn('저장된 파일이 있습니다. 변경하시겠습니까?', 'confirm')}>
                        <View style={[styles.docImage]}>
                            <View style={{ flexDirection: 'row', width: '100%', height: '100%'}}>
                                <Image style={{ width: '100%', height: '100%',}} source={ require('../../assets/img/ic_main4.png')}/>
                                <TouchableOpacity onPress={() => alertModalOn('특수형태근로자안전보건교육이수증을 삭제하시겠습니까?')}>
                                    <Image style={{ width: 22, height: 22, marginTop: 10, marginLeft: -30, opacity: 2 }} source={ require('../../assets/img/ic_modify.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* 서류 없을 때 */}
                    {/* <View style={[styles.docImage, {borderColor: colors.BORDER_GRAY_COLOR, }]}>
                        <Image style={{ width: 16, height: 16,}} source={ require('../../assets/img/ic_add.png')}/>
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