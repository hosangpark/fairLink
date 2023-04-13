import React, { useState } from "react";
import { ScrollView, View, Text, TextInput } from "react-native";
import { BackHeader } from "../../component/header/BackHeader";
import { colors, fontStyle, styles } from "../../style/style";

export const SettingProfile = () => {
    const [isEditable, setIsEditable] = useState(false);

    return (
        <ScrollView>
            <BackHeader title="프로필 설정하기"/>
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <View style={{ paddingVertical: 10 }}>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>사진등록</Text>
                        <TextInput 
                            style={[ styles.textInput, fontStyle.f_regular ]}
                            editable={isEditable}
                            // value={}
                            onChange={(e) => console.log(e.nativeEvent.text)}
                        />
                    </View>
                </View>
            </View>
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>활동지역</Text>
                <View style={{ paddingVertical: 10 }}>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>지역</Text>
                        <TextInput 
                            style={[ styles.textInput, fontStyle.f_regular ]}
                            editable={isEditable}
                            // value={}
                            onChange={(e) => console.log(e.nativeEvent.text)}
                        />
                    </View>
                </View>
            </View>
            <View style={{ padding: 20, backgroundColor: colors.WHITE_COLOR, marginBottom: 10 }}>
                <Text style={[ fontStyle.f_semibold, {color: colors.FONT_COLOR_BLACK, fontSize: 20, marginVertical: 10} ]}>경력사항</Text>
                <View style={{ paddingVertical: 10 }}>
                    <View>
                        <Text style={[ styles.textLabel, fontStyle.f_semibold ]}>경력</Text>
                        <TextInput 
                            style={[ styles.textInput, fontStyle.f_regular ]}
                            editable={isEditable}
                            // value={}
                            onChange={(e) => console.log(e.nativeEvent.text)}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}