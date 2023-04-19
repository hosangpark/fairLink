import React, { useRef, useState } from "react"
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { BackHeader } from "../../../component/header/BackHeader"
import { colors, fontStyle, styles } from '../../../style/style';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouterNavigatorParams } from "../../../../type/routerType";
import { AlertClearType } from "../../../modal/modalType";
import { AlertModal, initialAlert } from "../../../modal/AlertModal";

export const MyInfo = ({route}:any) => {
    const navigation = useNavigation<StackNavigationProp<RouterNavigatorParams>>();
    const [isEditable, setIsEditable] = useState(false);
    const [name, setName] = useState('')
    const [text,setText] = useState<string>('')
    const [bgColor, setBgColor] = useState(colors.BACKGROUND_COLOR_GRAY1)
    const [alertModal, setAlertModal] = React.useState<AlertClearType>(() => initialAlert);

    const scrollViewRef = useRef<ScrollView>(null);

    const handleButtonClick = () => {
        if (isEditable === false) {
            setIsEditable(true)
            setBgColor(colors.WHITE_COLOR)
            scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true});
        } else {
            handleInputCheck()
            console.log('check')
        }
    };
    
    const handleInputCheck = () => {
        // if ("필수항목 누락 시") {
            alertModalOn('미작성항목이 있는 경우 사용기능이 제한됩니다.')
        // } else {
        //     setIsEditable(false)
        //     setBgColor(colors.BACKGROUND_COLOR_GRAY1)
        // }
    }
    const alertModalOn = ( msg : string, type? : string ) => {
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
    
    return (
        <ScrollView ref={scrollViewRef}>
            <BackHeader title="나의 정보" />
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>프로필 정보</Text>
                <View style={{ paddingVertical: 10 }}>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>이름</Text>
                        <TextInput 
                            style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                            editable={isEditable}
                            value={text}
                            onChange={() => setText(text)}
                        />
                    </View>
                    { /* 조종사 */
                        route.params.userType !== '1' 
                        &&
                        <View>
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>생년월일</Text>
                            <TextInput 
                                style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                                editable={isEditable}
                                value={text}
                                onChange={() => setText(text)}
                            />
                        </View>
                    } 
                    { /* 건설 */
                        route.params.userType ==='1' 
                        &&
                        <View> 
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>직책</Text>
                            <TextInput 
                                style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                                editable={isEditable}
                                value={text}
                                onChange={() => setText(text)}
                            />
                        </View>
                    }
                </View>
            </View>
            { /* 건설, 장비 */
                route.params.userType !=='3' 
                &&
                <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                    <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>회사 정보</Text>
                    <View style={{ paddingVertical: 10 }}>
                        <View>
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>회사명</Text>
                            <TextInput 
                                style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                                editable={isEditable}
                                value={text}
                                onChange={() => setText(text)}
                            />
                        </View>
                        <View>
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>대표자</Text>
                            <TextInput 
                                style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                                editable={isEditable}
                                value={text}
                                onChange={() => setText(text)}
                            />
                        </View>
                        <View>
                            <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>사업자번호</Text>
                            <TextInput 
                                style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                                editable={isEditable}
                                value={text}
                                onChange={() => setText(text)}
                            />
                        </View>
                    </View>
                </View>
            }
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR,}}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>연락처</Text>
                <View style={{ paddingTop: 10 }}>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>핸드폰 번호</Text>
                        <TextInput 
                            style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                            editable={isEditable}
                            value={text}
                            onChange={() => setText(text)}
                        />
                    </View>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>이메일</Text>
                        <TextInput 
                            style={[ styles.textInput, fontStyle.f_regular, {backgroundColor:bgColor} ]}
                            editable={isEditable}
                            value={text}
                            onChange={() => setText(text)}
                        />
                    </View>
                </View>
            </View>
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR,}}>
                {
                    isEditable
                    ?   <TouchableOpacity onPress={handleButtonClick}>
                            <View style={[ styles.buttonStyle ]}>
                                <Text style={ [styles.buttonLabelStyle] }>수정완료</Text>
                            </View>
                        </TouchableOpacity>
                    :   <TouchableOpacity onPress={handleButtonClick}>
                            <View style={[ styles.whiteButtonStyle ]}>
                                <Text style={ [styles.whiteButtonLabelStyle] }>수정하기</Text>
                            </View>
                        </TouchableOpacity>
                }
            </View>
            <AlertModal
                show={alertModal.alert}
                msg={alertModal.msg}
                // action={alertAction}
                hide={alertModalOff}
                type={alertModal.type}
                btnLabel={alertModal.type}
            />
        </ScrollView>
    )
}