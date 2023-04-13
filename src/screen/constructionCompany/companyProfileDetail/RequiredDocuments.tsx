import React from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, fontStyle } from '../../../style/style';
import { StatusDisplayHeader } from '../../../component/StatusDisplayHeader';
import { StatusDisplay } from '../../../component/StatusDisplay';

export const RequiredDocuments = () => {

    return (
        <ScrollView style={{ backgroundColor: colors.WHITE_COLOR, paddingHorizontal: 20, paddingBottom: 20 }}>
            <View style={{ marginVertical: 20}}>
                <StatusDisplayHeader category={'차량서류'} />
                <StatusDisplay name={'건설기계등록증'} type={1}/>
                <StatusDisplay name={'정기검사 이수'} type={1}/>
                <StatusDisplay name={'제원표'} type={1}/>
                <StatusDisplay name={'비파괴검사'} type={1}/>
                <StatusDisplay name={'보험증서'} type={1}/>
            </View>
            <View style={{ marginVertical: 20}}>
                <StatusDisplayHeader category={'안전교육'} />
                <StatusDisplay name={'건설업기초보건안전교육'} type={1}/>
                <StatusDisplay name={'건설기계조종사안전교육'} type={1}/>
            </View>
            <View style={{ marginVertical: 20}}>
                <StatusDisplayHeader category={'자격증'} />
                <StatusDisplay name={'건설기계조종사면허증'} type={1}/>
                <StatusDisplay name={'운전면허증(1종)'} type={1}/>
            </View>
        </ScrollView>
    )
}